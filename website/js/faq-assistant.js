/**
 * X Freeze FAQ Bot - floating chat widget, FAQ answers + skill recommendations
 */
(function (global) {
  'use strict';

  var BOT_NAME = 'Freeze Bot';
  var TYPING_MS = 520;

  var FAQ_DATA = (global.XFreezeFaqBotData && global.XFreezeFaqBotData.faq) || [];

  var QUICK_PICKS = [
    'Is this free?',
    'Which skills for client meetings?',
    'How do I set up connectors in Grok?',
    'What are motion prompts?',
    'Do I need Super Grok for templates?'
  ];

  var SKILL_GUIDES = [
    {
      title: 'Build your own custom skill',
      terms: ['build skill', 'custom skill', 'create skill', 'own skill', 'skill builder', 'make skill', 'new skill', 'build my own'],
      picks: [
        { id: 'skill-builder', label: 'Skill Builder', href: 'skill-builder.html', desc: 'Free wizard - answer five questions and get a meta-prompt for your AI.' },
        { id: 'create-skill', label: 'Build with your AI', href: 'skill-builder.html', desc: 'Your AI drafts, tests, and refines a SKILL.md with you - no backend.' },
        { id: 'contact', label: 'Done-for-you request', href: 'contact.html?topic=skill', desc: 'Prefer hands-off? Request a custom skill from the X Freeze team.' }
      ]
    },
    {
      title: 'E-commerce and product ads',
      terms: ['ecommerce', 'e-commerce', 'product ad', 'product ads', 'shopify', 'listing', 'amazon', 'store', 'product shot', 'sell online'],
      picks: [
        { id: 'ad-copy', pack: 'social-media-pack', desc: 'Short ad copy for Google, Meta, or LinkedIn.' },
        { id: 'canva-social-post', pack: 'canva-pack', desc: 'Turn product angles into social graphics in Canva.' },
        { id: 'product-pack', pack: 'product-pack', desc: 'PRDs, user stories, and product planning skills.' }
      ]
    },
    {
      title: 'Social media and content',
      terms: ['social', 'social media', 'instagram', 'linkedin', 'twitter', 'x post', 'content creator', 'posts', 'caption', 'hashtag'],
      picks: [
        { id: 'linkedin-post', pack: 'social-media-pack', desc: 'Draft LinkedIn posts with a hook and hashtags.' },
        { id: 'instagram-caption', pack: 'social-media-pack', desc: 'Write Instagram captions with CTA and tags.' },
        { id: 'content-pipeline', pack: 'workflow-combos-pack', desc: 'Combo: brief to Canva to Drive to scheduled post.' }
      ]
    },
    {
      title: 'Agencies and client work',
      terms: ['agency', 'freelance', 'freelancer', 'client', 'client work', 'deliverable', 'pitch', 'proposal'],
      picks: [
        { id: 'meeting-notes', pack: 'business-pack', desc: 'Turn messy notes into decisions and action items.' },
        { id: 'proposal-draft', pack: 'sales-pack', desc: 'Draft scope, pricing, and timeline for clients.' },
        { id: 'contract-review-loop', pack: 'workflow-combos-pack', desc: 'Combo: find contract, summarize, log decision.' }
      ]
    },
    {
      title: 'Ops, email, and planning',
      terms: ['ops', 'operations', 'inbox', 'email', 'planning', 'status', 'business team', 'organize', 'triage'],
      picks: [
        { id: 'business-requirements', pack: 'business-pack', desc: 'Turn vague ideas into a clear requirements doc.' },
        { id: 'status-update', pack: 'communication-pack', desc: 'Weekly status update for managers or stakeholders.' },
        { id: 'gmail-inbox-summarize', pack: 'google-gmail-pack', desc: 'Connector: summarize unread Gmail threads.' }
      ]
    },
    {
      title: 'Meetings and follow-ups',
      terms: ['meeting', 'meetings', '1:1', 'one on one', 'standup', 'sync', 'call notes', 'follow up', 'follow-up'],
      picks: [
        { id: 'meeting-agenda', pack: 'business-pack', desc: 'Structured agenda with pre-read and timeboxes.' },
        { id: 'meeting-notes', pack: 'business-pack', desc: 'Decisions, owners, and action items from notes.' },
        { id: 'meeting-closed-loop', pack: 'workflow-combos-pack', desc: 'Combo: prep, notes, follow-up, and file to Drive.' }
      ]
    },
    {
      title: 'Sales and outreach',
      terms: ['sales', 'outreach', 'cold email', 'lead', 'deal', 'crm', 'prospect', 'pipeline'],
      picks: [
        { id: 'cold-email', pack: 'sales-pack', desc: 'Personalized cold outreach emails.' },
        { id: 'proposal-draft', pack: 'sales-pack', desc: 'Client proposals with scope and pricing.' },
        { id: 'sales-closed-loop', pack: 'workflow-combos-pack', desc: 'Combo: CRM note, follow-up email, deal update.' }
      ]
    },
    {
      title: 'Hiring and HR',
      terms: ['hiring', 'recruit', 'recruiting', 'interview', 'job description', 'jd', 'onboarding', 'hr', 'offer'],
      picks: [
        { id: 'job-description', pack: 'hr-pack', desc: 'Inclusive job description with requirements.' },
        { id: 'interview-questions', pack: 'hr-pack', desc: 'Role-specific interview questions.' },
        { id: 'hire-loop', pack: 'workflow-combos-pack', desc: 'Combo: JD, interview pack, scorecard, offer draft.' }
      ]
    },
    {
      title: 'Contracts and legal review',
      terms: ['contract', 'contracts', 'legal', 'nda', 'agreement', 'terms', 'clause'],
      picks: [
        { id: 'contract-summary', pack: 'legal-pack', desc: 'Summarize contract clauses in plain English.' },
        { id: 'nda-review', pack: 'legal-pack', desc: 'Flag unusual NDA terms for review.' },
        { id: 'contract-review-loop', pack: 'workflow-combos-pack', desc: 'Combo: find contract, summarize, log decision.' }
      ]
    },
    {
      title: 'Product and engineering',
      terms: ['product', 'engineering', 'prd', 'roadmap', 'feature', 'spec', 'developer', 'dev team', 'sprint'],
      picks: [
        { id: 'prd-draft', pack: 'product-pack', desc: 'Product requirements document from a brief.' },
        { id: 'user-stories', pack: 'product-pack', desc: 'Epics, stories, and acceptance criteria.' },
        { id: 'design-to-dev', pack: 'workflow-combos-pack', desc: 'Combo: Figma handoff to Linear to GitHub to Slack.' }
      ]
    },
    {
      title: 'Design and Figma handoff',
      terms: ['design', 'figma', 'handoff', 'ui', 'ux', 'mockup', 'component', 'spec'],
      picks: [
        { id: 'figma-handoff-checklist', pack: 'developer-tools-pack', desc: 'Pre-dev Figma handoff checklist.' },
        { id: 'figma-design-spec', pack: 'developer-tools-pack', desc: 'Extract implementation specs from Figma.' },
        { id: 'design-to-dev', pack: 'workflow-combos-pack', desc: 'Combo: Figma to tickets to PR to Slack update.' }
      ]
    },
    {
      title: 'Finance and expenses',
      terms: ['finance', 'expense', 'expenses', 'receipt', 'budget', 'accounting', 'invoice', 'pnl'],
      picks: [
        { id: 'expense-categorize', pack: 'finance-pack', desc: 'Categorize expenses for bookkeeping or tax.' },
        { id: 'gsheets-expense-tracker', pack: 'google-docs-sheets-pack', desc: 'Connector: append expenses to a Google Sheet.' },
        { id: 'finance-closed-loop', pack: 'workflow-combos-pack', desc: 'Combo: receipt email to sheet to P&L summary.' }
      ]
    },
    {
      title: 'Writing and communication',
      terms: ['write', 'writing', 'email', 'memo', 'newsletter', 'blog', 'draft', 'copy', 'communication'],
      picks: [
        { id: 'email-draft', pack: 'communication-pack', desc: 'Professional email for any purpose.' },
        { id: 'memo-draft', pack: 'documents-pack', desc: 'Internal memo with clear sections.' },
        { id: 'blog-draft', pack: 'social-media-pack', desc: 'Full blog draft from an outline or brief.' }
      ]
    }
  ];

  var flatSkillIndex = null;
  var flatSkillIndexLoading = false;

  var STOP_WORDS = {
    a: 1, an: 1, the: 1, is: 1, are: 1, am: 1, be: 1, do: 1, does: 1, did: 1,
    i: 1, me: 1, my: 1, we: 1, you: 1, your: 1, it: 1, its: 1, this: 1, that: 1,
    what: 1, how: 1, when: 1, where: 1, who: 1, why: 1, can: 1, could: 1, should: 1,
    would: 1, will: 1, of: 1, for: 1, to: 1, in: 1, on: 1, at: 1, with: 1, and: 1, or: 1
  };

  var ALIASES = [
    { terms: ['paid', 'subscription', 'premium grok', 'grok account', 'need pay'], index: 0 },
    { terms: ['click template', 'happens when', 'open template', 'use template'], index: 1 },
    { terms: ['free', 'cost', 'price', 'pay money', 'charge'], index: 2 },
    { terms: ['difference', 'template vs', 'template and skill', 'skill vs', 'motion prompt'], index: 3 },
    { terms: ['how often', 'new stuff', 'updates', 'weekly', 'changelog'], index: 4 },
    { terms: ['claude', 'cursor', 'outside grok', 'other ai'], index: 5 },
    { terms: ['connector', 'gmail', 'notion', 'slack', 'drive'], index: 6 },
    { terms: ['combo', 'workflow', 'chain skills'], index: 7 },
    { terms: ['upload', 'what image', 'photo', 'picture'], index: 8 },
    { terms: ['motion', 'animate', 'video prompt', 'runway', 'kling', 'luma'], index: 9 },
    { terms: ['from scratch', 'write prompt', 'write my own'], index: 10 },
    { terms: ['client', 'commercial', 'ads', 'business'], index: 11 },
    { terms: ['find template', 'browse', 'category', 'filter'], index: 12 },
    { terms: ['not match', 'first try', 'wrong result', 'does not work'], index: 13 }
  ];

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/['']/g, "'")
      .replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(text) {
    return normalize(text).split(' ').filter(function (word) {
      return word.length > 2 && !STOP_WORDS[word];
    });
  }

  function loadFaqItems() {
    var nodes = document.querySelectorAll('#xf-faq .xf-faq-item');
    if (nodes.length) {
      return Array.prototype.map.call(nodes, function (node, index) {
        var summary = node.querySelector('summary');
        var answer = node.querySelector('.xf-faq-answer');
        return {
          index: index,
          node: node,
          question: summary ? summary.textContent.trim() : '',
          answerHtml: answer ? answer.innerHTML.trim() : '',
          answerText: answer ? answer.textContent.trim() : ''
        };
      });
    }

    return FAQ_DATA.map(function (item, index) {
      return {
        index: index,
        node: null,
        question: item.question,
        answerHtml: item.answer,
        answerText: item.answer.replace(/<[^>]+>/g, ''),
        tags: item.tags || []
      };
    });
  }

  function scoreQuery(query, item) {
    var q = normalize(query);
    if (!q) return 0;

    var question = normalize(item.question);
    var answer = normalize(item.answerText);
    var score = 0;

    if (question === q) score += 200;
    if (question.indexOf(q) !== -1 || q.indexOf(question) !== -1) score += 120;

    tokenize(q).forEach(function (token) {
      if (question.indexOf(token) !== -1) score += 12;
      if (answer.indexOf(token) !== -1) score += 4;
    });

    (item.tags || []).forEach(function (tag) {
      var t = normalize(tag);
      if (!t) return;
      if (q.indexOf(t) !== -1) score += 32;
      tokenize(t).forEach(function (token) {
        if (q.indexOf(token) !== -1) score += 9;
      });
    });

    ALIASES.forEach(function (alias) {
      if (alias.index !== item.index) return;
      alias.terms.forEach(function (term) {
        if (q.indexOf(normalize(term)) !== -1) score += 40;
      });
    });

    return score;
  }

  function findBestMatch(query, items) {
    var best = null;
    var bestScore = 0;

    items.forEach(function (item) {
      var score = scoreQuery(query, item);
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });

    if (!best || bestScore < 10) return null;
    return best;
  }

  function localizeLinks(html) {
    var base = basePath();
    if (!base) return html;
    return String(html || '').replace(/href="(?!https?:|#|mailto:)([^"]+)"/g, function (_match, path) {
      return 'href="' + base + path + '"';
    });
  }

  function escHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function prettySkillName(id) {
    return String(id || '')
      .split('-')
      .map(function (part) {
        return part ? part.charAt(0).toUpperCase() + part.slice(1) : '';
      })
      .join(' ');
  }

  function skillSlash(id) {
    return '/' + String(id || '').replace(/^\//, '');
  }

  function skillPackHref(pack) {
    return basePath() + 'skills.html#skill-pack/' + encodeURIComponent(pack);
  }

  function hasSkillIntent(query) {
    var q = normalize(query);
    if (!q) return false;

    if (/\b(skill|skills|slash|combo|workflow)\b/.test(q)) return true;
    if (/\b(which|what|recommend|suggest|best|need)\b/.test(q) && /\b(for|to|should)\b/.test(q)) return true;
    if (/\bhelp\b/.test(q) && /\b(with|for)\b/.test(q)) return true;

    return SKILL_GUIDES.some(function (guide) {
      return guide.terms.some(function (term) {
        return q.indexOf(normalize(term)) !== -1;
      });
    });
  }

  function scoreSkillGuide(query, guide) {
    var q = normalize(query);
    if (!q) return 0;

    var score = 0;

    if (q.indexOf(normalize(guide.title)) !== -1) score += 80;

    guide.terms.forEach(function (term) {
      var t = normalize(term);
      if (!t) return;
      if (q === t) score += 70;
      else if (q.indexOf(t) !== -1) score += 28;
      else {
        tokenize(t).forEach(function (token) {
          if (q.indexOf(token) !== -1) score += 10;
        });
      }
    });

    guide.picks.forEach(function (pick) {
      var id = normalize(pick.id);
      if (q.indexOf(id) !== -1) score += 24;
      tokenize(id).forEach(function (token) {
        if (q.indexOf(token) !== -1) score += 8;
      });
    });

    return score;
  }

  function findSkillGuideMatch(query) {
    var best = null;
    var bestScore = 0;

    SKILL_GUIDES.forEach(function (guide) {
      var score = scoreSkillGuide(query, guide);
      if (score > bestScore) {
        bestScore = score;
        best = guide;
      }
    });

    if (!best || bestScore < 14) return null;
    return { guide: best, score: bestScore };
  }

  function buildFlatSkillIndex(data) {
    var list = [];

    (data.BUNDLES || []).forEach(function (bundle) {
      (bundle.skills || []).forEach(function (skill) {
        list.push({
          id: skill.id,
          slash: skill.slash || skillSlash(skill.id),
          pack: bundle.id,
          packName: bundle.name,
          desc: String(skill.description || '').replace(/<[^>]+>/g, '').slice(0, 140),
          searchText: normalize([
            skill.id,
            skill.slash,
            skill.description,
            bundle.name,
            bundle.desc,
            skill.realWorldUseCase
          ].join(' '))
        });
      });
    });

    return list;
  }

  function prefetchSkillIndex() {
    if (flatSkillIndex || flatSkillIndexLoading) return;
    flatSkillIndexLoading = true;

    if (global.XFreezeSkillsBrowseIndex) {
      flatSkillIndex = buildFlatSkillIndex(global.XFreezeSkillsBrowseIndex);
      flatSkillIndexLoading = false;
      return;
    }

    var script = document.createElement('script');
    script.src = basePath() + 'data/skills-browse-index.js';
    script.async = true;
    script.onload = function () {
      flatSkillIndex = buildFlatSkillIndex(global.XFreezeSkillsBrowseIndex || {});
      flatSkillIndexLoading = false;
    };
    script.onerror = function () {
      flatSkillIndexLoading = false;
    };
    document.body.appendChild(script);
  }

  function searchSkillIndex(query, limit) {
    if (!flatSkillIndex || !flatSkillIndex.length) return [];

    var q = normalize(query);
    var tokens = tokenize(query);
    var scored = [];

    flatSkillIndex.forEach(function (skill) {
      var score = 0;

      if (skill.searchText.indexOf(q) !== -1) score += 90;
      if (normalize(skill.id) === q) score += 120;

      tokens.forEach(function (token) {
        if (skill.searchText.indexOf(token) !== -1) score += 14;
      });

      if (score > 0) scored.push({ skill: skill, score: score });
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    return scored.slice(0, limit || 3).map(function (entry) {
      return entry.skill;
    });
  }

  function formatSkillPick(pick) {
    var name = pick.label || prettySkillName(pick.id);
    var href = pick.href || (pick.pack ? skillPackHref(pick.pack) : basePath() + 'skills.html');
    var desc = pick.desc || 'Open the pack and copy the install prompt.';
    var slash = pick.slash || (pick.pack ? skillSlash(pick.id) : '');

    return (
      '<li>' +
        '<a href="' + escHtml(href) + '"><strong>' + escHtml(name) + '</strong></a>' +
        (slash ? ' <code>' + escHtml(slash) + '</code>' : '') +
        ' - ' + escHtml(desc) +
      '</li>'
    );
  }

  function formatSkillReply(title, picks) {
    var list = picks.map(formatSkillPick).join('');
    return (
      'For <strong>' + escHtml(title) + '</strong>, start here:' +
      '<ul class="xf-faq-bot__skill-list">' + list + '</ul>' +
      'Open a pack on the <a href="' + escHtml(basePath() + 'skills.html') + '">Skills page</a>, hit <strong>Copy prompt</strong>, and paste into Grok, Claude, or Cursor.'
    );
  }

  function findSkillRecommendations(query) {
    var guideMatch = findSkillGuideMatch(query);
    if (guideMatch) {
      return {
        title: guideMatch.guide.title,
        picks: guideMatch.guide.picks.slice(0, 3),
        score: guideMatch.score
      };
    }

    var indexHits = searchSkillIndex(query, 3);
    if (indexHits.length) {
      return {
        title: 'your task',
        picks: indexHits.map(function (skill) {
          return {
            id: skill.id,
            slash: skill.slash,
            pack: skill.pack,
            desc: skill.desc
          };
        }),
        score: 18
      };
    }

    return null;
  }

  function basePath() {
    var path = location.pathname || '';
    return path.indexOf('/blog/') !== -1 ? '../' : '';
  }

  function FaqBot() {
    this.items = loadFaqItems();
    this.isOpen = false;
    this.isTyping = false;
    prefetchSkillIndex();
    this.build();
    this.bind();
    this.greet();
  }

  FaqBot.prototype.build = function () {
    var root = document.createElement('div');
    root.id = 'xf-faq-bot';
    root.className = 'xf-faq-bot';
    root.innerHTML =
      '<button type="button" class="xf-faq-bot__launcher" aria-expanded="false" aria-controls="xf-faq-bot-panel" aria-label="Ask Freeze Bot" title="Ask Freeze Bot">' +
        '<i class="fa-solid fa-message" aria-hidden="true"></i>' +
        '<span class="xf-faq-bot__launcher-label">Ask Freeze Bot</span>' +
      '</button>' +
      '<div class="xf-faq-bot__panel" id="xf-faq-bot-panel" role="dialog" aria-label="Freeze Bot chat">' +
        '<div class="xf-faq-bot__head">' +
          '<span class="xf-faq-bot__avatar" aria-hidden="true"><i class="fa-solid fa-snowflake"></i></span>' +
          '<div class="xf-faq-bot__meta">' +
            '<p class="xf-faq-bot__name">' + BOT_NAME + '</p>' +
            '<p class="xf-faq-bot__status">Online - FAQ + skill picks</p>' +
          '</div>' +
          '<button type="button" class="xf-faq-bot__close" aria-label="Close chat">&times;</button>' +
        '</div>' +
        '<div class="xf-faq-bot__messages" data-faq-bot-messages aria-live="polite"></div>' +
        '<div class="xf-faq-bot__quick" data-faq-bot-quick></div>' +
        '<form class="xf-faq-bot__form" data-faq-bot-form>' +
          '<input class="xf-faq-bot__input" data-faq-bot-input type="text" maxlength="240" placeholder="Ask about templates, skills, pricing..." autocomplete="off">' +
          '<button class="xf-faq-bot__send" type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i></button>' +
        '</form>' +
      '</div>';

    root.style.position = 'fixed';
    root.style.right = 'max(1.25rem, env(safe-area-inset-right, 0px))';
    root.style.bottom = 'max(1.25rem, env(safe-area-inset-bottom, 0px))';
    root.style.zIndex = '10050';

    document.body.appendChild(root);

    this.root = root;
    this.launcher = root.querySelector('.xf-faq-bot__launcher');
    this.panel = root.querySelector('.xf-faq-bot__panel');
    this.messagesEl = root.querySelector('[data-faq-bot-messages]');
    this.quickEl = root.querySelector('[data-faq-bot-quick]');
    this.form = root.querySelector('[data-faq-bot-form]');
    this.input = root.querySelector('[data-faq-bot-input]');
    this.closeBtn = root.querySelector('.xf-faq-bot__close');

    this.renderQuickPicks();
  };

  FaqBot.prototype.bind = function () {
    var self = this;

    this.launcher.addEventListener('click', function () {
      self.open();
    });

    this.closeBtn.addEventListener('click', function () {
      self.close();
    });

    this.form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (self.isTyping) return;
      var value = self.input ? self.input.value : '';
      if (self.input) self.input.value = '';
      self.handleQuery(value);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && self.isOpen) self.close();
    });
  };

  FaqBot.prototype.open = function () {
    this.isOpen = true;
    this.root.classList.add('is-open');
    this.launcher.setAttribute('aria-expanded', 'true');
    if (this.input) this.input.focus();
  };

  FaqBot.prototype.close = function () {
    this.isOpen = false;
    this.root.classList.remove('is-open');
    this.launcher.setAttribute('aria-expanded', 'false');
  };

  FaqBot.prototype.renderQuickPicks = function () {
    var self = this;
    if (!this.quickEl) return;
    this.quickEl.innerHTML = '';

    QUICK_PICKS.forEach(function (label) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'xf-faq-bot__quick-btn';
      btn.textContent = label;
      btn.addEventListener('click', function () {
        if (self.isTyping) return;
        self.handleQuery(label);
      });
      self.quickEl.appendChild(btn);
    });
  };

  FaqBot.prototype.greet = function () {
    var count = this.items.length;
    this.addBotMessage(
      'Hey - I am <strong>' + BOT_NAME + '</strong>. I have <strong>' + count + '+ answers</strong> on templates, skills, motion prompts, connectors, pricing, and workflows - or tell me your work and I will point you to the right skills.'
    );
  };

  FaqBot.prototype.addUserMessage = function (text) {
    this.addMessage(text, 'user');
  };

  FaqBot.prototype.addBotMessage = function (html) {
    this.addMessage(html, 'bot');
  };

  FaqBot.prototype.addMessage = function (content, type) {
    if (!this.messagesEl) return;

    var row = document.createElement('div');
    row.className = 'xf-faq-bot__row xf-faq-bot__row--' + type;

    if (type === 'bot') {
      var avatar = document.createElement('span');
      avatar.className = 'xf-faq-bot__row-avatar';
      avatar.innerHTML = '<i class="fa-solid fa-snowflake" aria-hidden="true"></i>';
      row.appendChild(avatar);
    }

    var bubble = document.createElement('div');
    bubble.className = 'xf-faq-bot__bubble xf-faq-bot__bubble--' + type;
    if (type === 'bot') bubble.innerHTML = content;
    else bubble.textContent = content;

    row.appendChild(bubble);
    this.messagesEl.appendChild(row);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  };

  FaqBot.prototype.showTyping = function () {
    if (!this.messagesEl) return null;

    var row = document.createElement('div');
    row.className = 'xf-faq-bot__row xf-faq-bot__row--bot';
    row.setAttribute('data-faq-bot-typing', '');

    var avatar = document.createElement('span');
    avatar.className = 'xf-faq-bot__row-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-snowflake" aria-hidden="true"></i>';

    var typing = document.createElement('div');
    typing.className = 'xf-faq-bot__typing';
    typing.innerHTML = '<span></span><span></span><span></span>';

    row.appendChild(avatar);
    row.appendChild(typing);
    this.messagesEl.appendChild(row);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    return row;
  };

  FaqBot.prototype.replyWithDelay = function (html, callback) {
    var self = this;
    this.isTyping = true;
    var typingRow = this.showTyping();

    window.setTimeout(function () {
      if (typingRow && typingRow.parentNode) typingRow.parentNode.removeChild(typingRow);
      self.addBotMessage(html);
      self.isTyping = false;
      if (callback) callback();
    }, TYPING_MS);
  };

  FaqBot.prototype.highlightFaq = function (item) {
    if (!item || !item.node) return;
    item.node.open = true;
    item.node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  FaqBot.prototype.handleQuery = function (raw) {
    var self = this;
    var query = String(raw || '').trim();
    if (!query || this.isTyping) return;

    if (!this.isOpen) this.open();

    var exact = this.items.find(function (item) {
      return normalize(item.question) === normalize(query);
    });

    if (exact) {
      this.addUserMessage(query);
      this.replyWithDelay(localizeLinks(exact.answerHtml), function () {
        self.highlightFaq(exact);
      });
      return;
    }

    var faqMatch = findBestMatch(query, this.items);
    var skillMatch = hasSkillIntent(query) ? findSkillRecommendations(query) : null;
    var faqScore = faqMatch ? scoreQuery(query, faqMatch) : 0;
    var skillScore = skillMatch ? skillMatch.score : 0;

    this.addUserMessage(query);

    if (skillMatch && skillScore >= 14 && (skillScore >= faqScore || hasSkillIntent(query))) {
      this.replyWithDelay(formatSkillReply(skillMatch.title, skillMatch.picks));
      return;
    }

    if (faqMatch && faqScore >= 10) {
      this.replyWithDelay(localizeLinks(faqMatch.answerHtml), function () {
        self.highlightFaq(faqMatch);
      });
      return;
    }

    if (skillMatch && skillScore >= 14) {
      this.replyWithDelay(formatSkillReply(skillMatch.title, skillMatch.picks));
      return;
    }

    this.replyWithDelay(
      'Hmm - I am not sure on that one. Try asking about <strong>free access</strong>, <strong>connectors</strong>, or <strong>which skills for meetings / sales / social media</strong>. You can also tap a quick reply below.'
    );
  };

  function loadAssets(callback) {
    var base = basePath();

    if (!document.querySelector('link[data-xf-faq-bot-css]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'css/faq-assistant.css?v=8';
      link.setAttribute('data-xf-faq-bot-css', '');
      document.head.appendChild(link);
    }

    callback();
  }

  function bootBot() {
    if (document.getElementById('xf-faq-bot')) return;

    loadAssets(function () {
      if (document.getElementById('xf-faq-bot')) return;
      if (!FAQ_DATA.length && global.XFreezeFaqBotData && global.XFreezeFaqBotData.faq) {
        FAQ_DATA = global.XFreezeFaqBotData.faq;
      }
      new FaqBot();
    });
  }

  function init() {
    if (document.getElementById('xf-faq-bot')) return;

    if (!FAQ_DATA.length && !global.XFreezeFaqBotData) {
      var base = basePath();
      var dataScript = document.createElement('script');
      dataScript.src = base + 'data/faq-bot-data.js?v=1';
      dataScript.onload = bootBot;
      dataScript.onerror = bootBot;
      document.body.appendChild(dataScript);
      return;
    }

    bootBot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.XFreezeFaqBot = {
    init: init,
    loadFaqItems: loadFaqItems,
    findBestMatch: findBestMatch,
    findSkillRecommendations: findSkillRecommendations
  };
})(window);