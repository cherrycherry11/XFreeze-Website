/**
 * Skills browse taxonomy - categories, subcategories, free/premium helpers.
 * Consumed by js/skills-browse.js (does not replace the auto-generated pack index).
 */
(function (g) {
  'use strict';

  /**
   * Primary topics + subcategories (pack ids).
   * Every pack id should appear in exactly one sub.
   */
  var CATEGORIES = [
    {
      id: 'create',
      label: 'Create & marketing',
      subs: [
        { id: 'social', label: 'Social & content', packs: ['social-media-pack'] },
        { id: 'canva', label: 'Canva', packs: ['canva-pack'] },
        { id: 'podcast', label: 'Podcast', packs: ['podcast-operations-pack'] },
        { id: 'community', label: 'Community', packs: ['community-moderation-pack'] },
        {
          id: 'create-premium',
          label: 'Premium growth & video',
          packs: [
            'premium-creator-growth-systems-pack',
            'premium-marketing-seo-distribution-pack',
            'premium-ai-video-visual-production-pack',
          ],
        },
      ],
    },
    {
      id: 'business',
      label: 'Business & sales',
      subs: [
        { id: 'biz-core', label: 'Business & sales', packs: ['business-pack', 'sales-pack'] },
        {
          id: 'local-trade',
          label: 'Local & trade',
          packs: [
            'real-estate-agent-toolkit-pack',
            'trades-contractor-quoting-pack',
            'fitness-personal-training-client-management-pack',
            'wedding-event-planning-toolkit-pack',
            'etsy-small-ecommerce-seller-toolkit-pack',
            'procurement-vendor-evaluation-pack',
          ],
        },
        { id: 'agency', label: 'Agency', packs: ['agency-client-reporting-pack'] },
        {
          id: 'business-premium',
          label: 'Premium ops',
          packs: [
            'premium-founder-operator-pack',
            'premium-sales-revenue-ops-pack',
            'premium-ecommerce-creator-commerce-pack',
            'premium-customer-support-success-pack',
            'premium-real-estate-local-services-pack',
          ],
        },
      ],
    },
    {
      id: 'product',
      label: 'Product & engineering',
      subs: [
        {
          id: 'product-core',
          label: 'Product & research',
          packs: ['product-pack', 'research-pack', 'qa-automation-architecture-review-pack'],
        },
        {
          id: 'dev',
          label: 'Developer',
          packs: ['developer-tools-pack', 'github-pack'],
        },
        {
          id: 'product-premium',
          label: 'Premium product & security',
          packs: [
            'premium-product-research-ux-pack',
            'premium-developer-agent-rules-pack',
            'premium-security-privacy-risk-pack',
            'premium-education-coaching-pack',
          ],
        },
      ],
    },
    {
      id: 'docs',
      label: 'Docs & data',
      subs: [
        {
          id: 'docs-core',
          label: 'Documents & decks',
          packs: ['documents-pack', 'presentations-pack', 'board-decks-financial-models-pack'],
        },
        { id: 'data', label: 'Data', packs: ['data-pack'] },
        {
          id: 'education',
          label: 'Education & nonprofit',
          packs: ['teacher-educator-toolkit-pack', 'nonprofit-donor-volunteer-engagement-pack'],
        },
        {
          id: 'docs-premium',
          label: 'Premium analytics',
          packs: ['premium-data-analytics-decision-pack'],
        },
        {
          id: 'ms-docs',
          label: 'Microsoft Excel & PowerPoint',
          packs: ['microsoft-excel-ppt-pack'],
        },
      ],
    },
    {
      id: 'apps',
      label: 'Work apps',
      subs: [
        {
          id: 'google',
          label: 'Google',
          packs: [
            'google-gmail-pack',
            'google-calendar-pack',
            'google-drive-pack',
            'google-docs-sheets-pack',
            'google-chat-pack',
          ],
        },
        {
          id: 'microsoft',
          label: 'Microsoft 365',
          packs: [
            'microsoft-outlook-pack',
            'microsoft-calendar-pack',
            'microsoft-onedrive-pack',
            'microsoft-sharepoint-pack',
            'microsoft-teams-pack',
            'microsoft-word-pack',
          ],
        },
        { id: 'notion', label: 'Notion', packs: ['notion-pack'] },
        { id: 'slack', label: 'Slack', packs: ['slack-pack'] },
        {
          id: 'automation',
          label: 'Automations',
          packs: [
            'zapier-automation-pack',
            'workflow-combos-pack',
            'analytics-digests-support-escalation-pack',
            'premium-automation-connector-playbooks-pack',
          ],
        },
      ],
    },
    {
      id: 'life',
      label: 'People, money & life',
      subs: [
        {
          id: 'daily',
          label: 'Daily life',
          packs: [
            'daily-life-pack',
            'home-admin-pack',
            'travel-planning-toolkit-pack',
            'health-pack',
            'neurodivergent-accessibility-support-pack',
            'communication-pack',
          ],
        },
        {
          id: 'money-legal',
          label: 'Finance & legal',
          packs: [
            'finance-pack',
            'legal-pack',
            'personal-finance-retirement-consumer-pack',
            'insurance-agent-toolkit-pack',
            'immigration-visa-case-support-pack',
          ],
        },
        {
          id: 'people',
          label: 'HR & hiring',
          packs: ['hr-pack', 'recruiting-hiring-lifecycle-pack'],
        },
        {
          id: 'life-premium',
          label: 'Premium life & people',
          packs: [
            'premium-personal-productivity-life-pack',
            'premium-hiring-people-ops-pack',
            'premium-legal-finance-admin-guardrails-pack',
            'premium-health-wellness-nonmedical-pack',
          ],
        },
      ],
    },
    {
      id: 'systems',
      label: 'Systems',
      subs: [
        { id: 'meta', label: 'Meta tools', packs: ['meta-tools-pack'] },
        { id: 'memory', label: 'Obsidian & memory', packs: ['obsidian-memory-pack'] },
        { id: 'other', label: 'Other', packs: ['other-pack'] },
      ],
    },
  ];

  function isPremiumPack(bundle) {
    if (!bundle) return false;
    if (bundle.tier === 'premium') return true;
    if (String(bundle.id || '').indexOf('premium-') === 0) return true;
    var skills = bundle.skills || [];
    if (!skills.length) return false;
    var prem = 0;
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].tier === 'premium') prem++;
    }
    return prem > skills.length / 2;
  }

  function isConnectorPack(bundle, connectorSet) {
    if (!bundle) return false;
    if (connectorSet && connectorSet.has(bundle.id)) return true;
    var skills = bundle.skills || [];
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].requiresConnectors) return true;
    }
    return false;
  }

  function packIdsForCategory(catId) {
    var cat = CATEGORIES.find(function (c) { return c.id === catId; });
    if (!cat) return [];
    var ids = [];
    cat.subs.forEach(function (sub) {
      (sub.packs || []).forEach(function (p) { ids.push(p); });
    });
    return ids;
  }

  function packIdsForSub(catId, subId) {
    var cat = CATEGORIES.find(function (c) { return c.id === catId; });
    if (!cat) return [];
    var sub = cat.subs.find(function (s) { return s.id === subId; });
    return sub ? (sub.packs || []).slice() : [];
  }

  function allMappedPackIds() {
    var set = {};
    CATEGORIES.forEach(function (cat) {
      cat.subs.forEach(function (sub) {
        (sub.packs || []).forEach(function (p) { set[p] = true; });
      });
    });
    return set;
  }

  g.XFreezeSkillsTaxonomy = {
    CATEGORIES: CATEGORIES,
    isPremiumPack: isPremiumPack,
    isConnectorPack: isConnectorPack,
    packIdsForCategory: packIdsForCategory,
    packIdsForSub: packIdsForSub,
    allMappedPackIds: allMappedPackIds,
  };
})(typeof window !== 'undefined' ? window : globalThis);
