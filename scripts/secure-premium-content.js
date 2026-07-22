/**
 * Move premium deliverables out of the public static tree.
 *
 * - premium skill packs → website/api/_private/skills-packs/
 * - premium prompt text → website/api/_private/premium-prompts.json
 * - premium template links → website/api/_private/premium-templates.json
 * - redact public motion-prompt + visual-templates data files
 *
 * Run from repo root:
 *   node scripts/secure-premium-content.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WEB = path.join(ROOT, 'website');
const PRIVATE = path.join(WEB, 'api', '_private');
const PACKS_PUBLIC = path.join(WEB, 'data', 'skills-packs');
const PACKS_PRIVATE = path.join(PRIVATE, 'skills-packs');

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function movePremiumPacks() {
  ensureDir(PACKS_PRIVATE);
  const files = fs.readdirSync(PACKS_PUBLIC).filter((f) => f.startsWith('premium-'));
  let moved = 0;
  let skipped = 0;
  for (const f of files) {
    const src = path.join(PACKS_PUBLIC, f);
    if (f.endsWith('.json')) {
      const dest = path.join(PACKS_PRIVATE, f);
      let publicData = null;
      try {
        publicData = JSON.parse(fs.readFileSync(src, 'utf8'));
      } catch (e) {
        publicData = null;
      }
      const publicHasSkills =
        publicData &&
        Array.isArray(publicData.skills) &&
        publicData.skills.length > 0 &&
        !publicData.locked;

      /* Never overwrite a good private pack with a public stub */
      let privateHasSkills = false;
      if (fs.existsSync(dest)) {
        try {
          const priv = JSON.parse(fs.readFileSync(dest, 'utf8'));
          privateHasSkills =
            priv && Array.isArray(priv.skills) && priv.skills.length > 0 && !priv.locked;
        } catch (e2) {}
      }

      if (publicHasSkills) {
        fs.copyFileSync(src, dest);
        moved += 1;
      } else if (privateHasSkills) {
        skipped += 1;
      } else {
        console.warn('WARN: no full content for', f, '(public stub and empty private)');
      }

      const stub = {
        id: f.replace(/\.json$/, ''),
        locked: true,
        error: 'Pro plan required. Load via /api/content/skill-pack',
        skills: [],
      };
      fs.writeFileSync(src, JSON.stringify(stub, null, 2));
    } else if (f.endsWith('.js')) {
      const id = f.replace(/\.js$/, '');
      fs.writeFileSync(
        src,
        `/* Premium pack gated — use /api/content/skill-pack?id=${id} */\n` +
          `(function(g){g.__XF_SKILL_PACKS__=g.__XF_SKILL_PACKS__||{};` +
          `g.__XF_SKILL_PACKS__[${JSON.stringify(id)}]={id:${JSON.stringify(id)},locked:true,skills:[]};})(window);\n`
      );
      moved += 1;
    }
  }
  console.log('Premium packs: copied', moved, 'kept-private', skipped, '→', PACKS_PRIVATE);
}

function redactTemplates() {
  const file = path.join(WEB, 'data', 'visual-templates-data.js');
  const src = fs.readFileSync(file, 'utf8');
  /* File is JS object notation with unquoted keys — not strict JSON */
  const start = src.indexOf('[');
  const end = src.lastIndexOf(']');
  if (start < 0 || end < 0) throw new Error('Could not find templates array');
  const templates = Function('return (' + src.slice(start, end + 1) + ')')();

  const privateMap = {};
  let redacted = 0;
  const publicList = templates.map((t) => {
    if (t && t.tier === 'premium' && t.link) {
      privateMap[t.code] = { link: t.link, name: t.name || null };
      redacted += 1;
      return Object.assign({}, t, { link: '', lockedLink: true });
    }
    return t;
  });

  ensureDir(PRIVATE);
  fs.writeFileSync(
    path.join(PRIVATE, 'premium-templates.json'),
    JSON.stringify(privateMap, null, 0)
  );

  const out =
    '// Auto-generated / secured — premium links served only via /api/content/template\n' +
    'const visualTemplates = ' +
    JSON.stringify(publicList, null, 2) +
    ';\n' +
    'if (typeof window !== "undefined") window.visualTemplates = visualTemplates;\n' +
    'if (typeof module !== "undefined" && module.exports) module.exports = visualTemplates;\n';
  fs.writeFileSync(file, out);
  console.log('Templates: redacted premium links:', redacted);
}

function redactPrompts() {
  const file = path.join(WEB, 'data', 'motion-prompt-library-data.js');
  let src = fs.readFileSync(file, 'utf8');

  /* Extract the library object assignment */
  let data;
  const fnMatch = src.match(
    /(?:window\.)?XFreezeMotionPromptLibrary\s*=\s*(\{[\s\S]*\});?\s*$/m
  );
  if (fnMatch) {
    data = Function('return (' + fnMatch[1] + ')')();
  } else {
    /* IIFE or const form */
    const m2 = src.match(/=\s*(\{[\s\S]*"categories"[\s\S]*\});?\s*(?:\)\(window\)|;?\s*$)/);
    if (!m2) {
      /* try eval whole as module-like */
      const sandbox = { window: {} };
      Function('window', src + '\n;return window.XFreezeMotionPromptLibrary;')(sandbox.window);
      data = sandbox.window.XFreezeMotionPromptLibrary;
    } else {
      data = Function('return (' + m2[1] + ')')();
    }
  }
  if (!data || !data.categories) {
    /* Last resort: run in vm-like */
    const g = { window: global };
    const code =
      src.replace(/^\s*const\s+/, 'var ').replace(/^\s*let\s+/, 'var ') +
      ';\nreturn typeof XFreezeMotionPromptLibrary!=="undefined"?XFreezeMotionPromptLibrary:(window&&window.XFreezeMotionPromptLibrary);';
    try {
      data = Function('window', code)(g.window || {});
    } catch (e) {
      throw new Error('Could not parse motion prompt library: ' + e.message);
    }
  }
  if (!data || !Array.isArray(data.categories)) {
    throw new Error('motion prompt library missing categories');
  }

  const privateMap = {};
  let redacted = 0;
  data.categories.forEach((cat) => {
    (cat.prompts || []).forEach((p) => {
      const isPrem = p.premium === true || p.tier === 'premium';
      if (!isPrem || !p.text) return;
      const id = cat.id + '::' + p.id;
      privateMap[id] = { text: p.text, title: p.title || null };
      p.text = '';
      p.lockedText = true;
      redacted += 1;
    });
  });

  ensureDir(PRIVATE);
  fs.writeFileSync(
    path.join(PRIVATE, 'premium-prompts.json'),
    JSON.stringify(privateMap, null, 0)
  );

  const out =
    '/** Premium prompt body text removed — fetch via /api/content/prompt?id=categoryId::promptId */\n' +
    '(function (global) {\n' +
    '  var data = ' +
    JSON.stringify(data) +
    ';\n' +
    '  global.XFreezeMotionPromptLibrary = data;\n' +
    '})(typeof window !== "undefined" ? window : globalThis);\n';
  fs.writeFileSync(file, out);
  console.log('Prompts: redacted premium texts:', redacted);
}

function main() {
  ensureDir(PRIVATE);
  movePremiumPacks();
  redactTemplates();
  redactPrompts();
  console.log('Done. Private payloads in', PRIVATE);
}

main();
