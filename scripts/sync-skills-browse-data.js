#!/usr/bin/env node
/**
 * Regenerate skills browse assets from catalog.json:
 *   - xfreeze-skills-browse-index.js  (~95KB, loaded on page init)
 *   - data/skills-packs/{id}.json       (lazy-loaded per pack)
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const catalogPath = path.join(repoRoot, 'data/skills-catalog.json');
const indexPath = path.join(repoRoot, 'xfreeze-skills-browse-index.js');
const packsDir = path.join(repoRoot, 'data/skills-packs');
const legacyPath = path.join(repoRoot, 'xfreeze-skills-browse-data.js');

const GROUP_ORDER = [
  'Creator Command Center',
  'Business & Revenue',
  'Product, Developer & Research',
  'Documents, Data & Decisions',
  'Communication & Productivity',
  'Finance, Legal, People & Home',
  'Live Connectors & Automations',
  'Meta Systems',
];

const FALLBACK_GROUP_BY_PACK = {
  'social-media-pack': 'Creator Command Center',
  'canva-pack': 'Creator Command Center',
  'business-pack': 'Business & Revenue',
  'sales-pack': 'Business & Revenue',
  'product-pack': 'Product, Developer & Research',
  'developer-tools-pack': 'Product, Developer & Research',
  'github-pack': 'Product, Developer & Research',
  'research-pack': 'Product, Developer & Research',
  'documents-pack': 'Documents, Data & Decisions',
  'presentations-pack': 'Documents, Data & Decisions',
  'data-pack': 'Documents, Data & Decisions',
  'communication-pack': 'Communication & Productivity',
  'daily-life-pack': 'Communication & Productivity',
  'google-gmail-pack': 'Communication & Productivity',
  'google-calendar-pack': 'Communication & Productivity',
  'google-drive-pack': 'Communication & Productivity',
  'google-docs-sheets-pack': 'Communication & Productivity',
  'google-chat-pack': 'Communication & Productivity',
  'microsoft-outlook-pack': 'Communication & Productivity',
  'microsoft-calendar-pack': 'Communication & Productivity',
  'microsoft-onedrive-pack': 'Communication & Productivity',
  'microsoft-sharepoint-pack': 'Communication & Productivity',
  'microsoft-teams-pack': 'Communication & Productivity',
  'microsoft-word-pack': 'Communication & Productivity',
  'microsoft-excel-ppt-pack': 'Documents, Data & Decisions',
  'finance-pack': 'Finance, Legal, People & Home',
  'legal-pack': 'Finance, Legal, People & Home',
  'hr-pack': 'Finance, Legal, People & Home',
  'health-pack': 'Finance, Legal, People & Home',
  'home-admin-pack': 'Finance, Legal, People & Home',
  'notion-pack': 'Live Connectors & Automations',
  'slack-pack': 'Live Connectors & Automations',
  'zapier-automation-pack': 'Live Connectors & Automations',
  'workflow-combos-pack': 'Live Connectors & Automations',
  'obsidian-memory-pack': 'Meta Systems',
  'meta-tools-pack': 'Meta Systems',
  'other-pack': 'Meta Systems',
};

const INDEX_SKILL_KEYS = new Set([
  'id', 'slash', 'description', 'requiresConnectors', 'integrations', 'connectors',
  'tier', 'realWorldUseCase', 'risk', 'type',
]);
const INDEX_BUNDLE_KEYS = new Set([
  'id', 'name', 'desc', 'icon', 'skillCount', 'tier', 'group',
  'realWorldUseCase', 'platforms', 'priority',
]);
const PACK_SKILL_KEYS = new Set(['id', 'aiInstallPrompt', 'skillContent']);

function slimBundle(bundle) {
  const out = {};
  INDEX_BUNDLE_KEYS.forEach((key) => {
    if (bundle[key] !== undefined) out[key] = bundle[key];
  });
  if (out.skillCount === undefined) out.skillCount = bundle.skills ? bundle.skills.length : 0;
  out.skills = (bundle.skills || []).map((skill) => {
    const slim = {};
    INDEX_SKILL_KEYS.forEach((key) => {
      if (skill[key] !== undefined) slim[key] = skill[key];
    });
    return slim;
  });
  return out;
}

function packPayload(bundle) {
  return {
    id: bundle.id,
    skills: (bundle.skills || []).map((skill) => {
      const out = {};
      PACK_SKILL_KEYS.forEach((key) => {
        if (skill[key] !== undefined) out[key] = skill[key];
      });
      return out;
    }),
  };
}

if (!fs.existsSync(catalogPath)) {
  console.error('Missing', catalogPath);
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

function groupForBundle(bundle) {
  return bundle.group || FALLBACK_GROUP_BY_PACK[bundle.id] || 'Meta Systems';
}

const MEGA = GROUP_ORDER
  .map((group) => [
    group,
    catalog.bundles
      .filter((bundle) => groupForBundle(bundle) === group)
      .map((bundle) => bundle.id),
  ])
  .filter(([, ids]) => ids.length > 0);

const CONNECTOR = catalog.bundles
  .filter((bundle) => (bundle.skills || []).some((skill) => skill.requiresConnectors))
  .map((bundle) => bundle.id);

let instantSkills = 0;
let connectorSkills = 0;
catalog.bundles.forEach((bundle) => {
  bundle.skills.forEach((skill) => {
    if (skill.requiresConnectors) connectorSkills += 1;
    else instantSkills += 1;
  });
});

const indexPayload = {
  BUNDLES: catalog.bundles.map(slimBundle),
  MEGA,
  CONNECTOR,
  totalSkills: catalog.totalSkills,
  totalBundles: catalog.totalBundles,
  instantSkills,
  connectorSkills,
};

fs.mkdirSync(packsDir, { recursive: true });

const existingPacks = new Set(fs.readdirSync(packsDir).filter((f) => f.endsWith('.json')));
const writtenPacks = new Set();

catalog.bundles.forEach((bundle) => {
  const packPath = path.join(packsDir, bundle.id + '.json');
  fs.writeFileSync(packPath, JSON.stringify(packPayload(bundle)));
  writtenPacks.add(bundle.id + '.json');
});

existingPacks.forEach((file) => {
  if (!writtenPacks.has(file)) {
    fs.unlinkSync(path.join(packsDir, file));
  }
});

const indexJs = `/** Auto-generated from data/skills-catalog.json - do not edit by hand */
(function (g) {
  g.XFreezeSkillsBrowseIndex = ${JSON.stringify(indexPayload)};
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.writeFileSync(indexPath, indexJs);

// Keep legacy monolith for older pages until fully migrated.
const legacyPayload = {
  BUNDLES: catalog.bundles,
  MEGA,
  CONNECTOR,
  totalSkills: catalog.totalSkills,
  totalBundles: catalog.totalBundles,
  instantSkills,
  connectorSkills,
};
const legacyJs = `/** Auto-generated from data/skills-catalog.json - do not edit by hand */
(function (g) {
  g.XFreezeSkillsBrowseData = ${JSON.stringify(legacyPayload)};
})(typeof window !== 'undefined' ? window : globalThis);
`;
fs.writeFileSync(legacyPath, legacyJs);

console.log('Wrote', indexPath, `(${catalog.totalSkills} skills)`);
console.log('Wrote', packsDir, `(${catalog.bundles.length} packs)`);
console.log('Wrote', legacyPath, '(legacy fallback)');
