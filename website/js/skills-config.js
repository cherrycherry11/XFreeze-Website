/**
 * X Freeze Skills Library - config (edit GITHUB_USER when repo is live)
 */
(function (global) {
  const GITHUB_USER = 'YOUR_USERNAME';
  const REPO = 'grok-skill-library';
  const BRANCH = 'main';

  /** Local catalog while developing; switch to GitHub raw URL after publish */
  const CATALOG_URL = 'data/skills-catalog.json';
  const CATALOG_URL_GITHUB =
    'https://raw.githubusercontent.com/' + GITHUB_USER + '/' + REPO + '/' + BRANCH + '/catalog.json';

  const MEGA_CATEGORIES = [
    { id: 'all', label: 'All', icon: 'fa-grid-2' },
    {
      id: 'work',
      label: 'Work & Business',
      icon: 'fa-briefcase',
      bundles: [
        'business-pack', 'sales-pack', 'hr-pack', 'legal-pack', 'product-pack',
        'communication-pack', 'documents-pack', 'presentations-pack',
      ],
    },
    {
      id: 'content',
      label: 'Social & Writing',
      icon: 'fa-share-nodes',
      bundles: ['social-media-pack', 'research-pack'],
    },
    {
      id: 'finance',
      label: 'Finance & Data',
      icon: 'fa-calculator',
      bundles: ['finance-pack', 'data-pack'],
    },
    {
      id: 'life',
      label: 'Daily Life',
      icon: 'fa-sun',
      bundles: ['daily-life-pack', 'home-admin-pack', 'health-pack'],
    },
    {
      id: 'google',
      label: 'Google',
      icon: 'fa-google',
      bundles: [
        'google-gmail-pack', 'google-calendar-pack', 'google-drive-pack',
        'google-docs-sheets-pack', 'google-chat-pack',
      ],
    },
    {
      id: 'microsoft',
      label: 'Microsoft 365',
      icon: 'fa-microsoft',
      bundles: [
        'microsoft-outlook-pack', 'microsoft-calendar-pack', 'microsoft-onedrive-pack',
        'microsoft-sharepoint-pack', 'microsoft-teams-pack', 'microsoft-word-pack',
        'microsoft-excel-ppt-pack',
      ],
    },
    {
      id: 'creative',
      label: 'Canva & Design',
      icon: 'fa-palette',
      bundles: ['canva-pack', 'developer-tools-pack'],
    },
    {
      id: 'productivity',
      label: 'Notion & Slack',
      icon: 'fa-layer-group',
      bundles: ['notion-pack', 'slack-pack', 'github-pack'],
    },
    {
      id: 'automation',
      label: 'Automations',
      icon: 'fa-bolt',
      bundles: ['zapier-automation-pack', 'workflow-combos-pack', 'obsidian-memory-pack', 'meta-tools-pack'],
    },
  ];

  const CONNECTOR_BUNDLE_IDS = new Set([
    'google-gmail-pack', 'google-calendar-pack', 'google-drive-pack', 'google-docs-sheets-pack',
    'google-chat-pack', 'microsoft-outlook-pack', 'microsoft-calendar-pack', 'microsoft-onedrive-pack',
    'microsoft-sharepoint-pack', 'microsoft-teams-pack', 'microsoft-word-pack', 'microsoft-excel-ppt-pack',
    'canva-pack', 'notion-pack', 'slack-pack', 'github-pack', 'developer-tools-pack',
    'zapier-automation-pack', 'workflow-combos-pack', 'obsidian-memory-pack',
  ]);

  function patchGithubUrls(catalog) {
    if (!catalog) return catalog;
    const base = 'https://github.com/' + GITHUB_USER + '/' + REPO + '/blob/' + BRANCH;
    const raw = 'https://raw.githubusercontent.com/' + GITHUB_USER + '/' + REPO + '/' + BRANCH;
    if (GITHUB_USER !== 'YOUR_USERNAME') {
      catalog.repo = 'https://github.com/' + GITHUB_USER + '/' + REPO;
      catalog.rawBase = raw;
    }
    catalog.bundles.forEach(function (b) {
      b.skills.forEach(function (s) {
        if (GITHUB_USER !== 'YOUR_USERNAME') {
          s.githubUrl = base + '/' + s.githubPath;
          s.rawUrl = raw + '/' + s.githubPath;
          if (s.aiInstallPrompt && s.aiInstallPrompt.indexOf('Optional source URL:') === -1) {
            s.aiInstallPrompt += '\n\nOptional source URL: ' + s.rawUrl;
          }
        }
      });
      if (GITHUB_USER !== 'YOUR_USERNAME') {
        b.installMethods = b.installMethods || {};
        b.installMethods.website = catalog.repo + '/tree/' + BRANCH + '/bundles/' + b.id;
        b.installMethods.bundleInstallScript = raw + '/scripts/install-bundle.sh';
        b.installMethods.grokPlugin = GITHUB_USER + '/' + REPO + '#bundles/' + b.id;
      }
    });
    return catalog;
  }

  global.XFreezeSkillsConfig = {
    GITHUB_USER: GITHUB_USER,
    REPO: REPO,
    BRANCH: BRANCH,
    CATALOG_URL: CATALOG_URL,
    CATALOG_URL_GITHUB: CATALOG_URL_GITHUB,
    MEGA_CATEGORIES: MEGA_CATEGORIES,
    CONNECTOR_BUNDLE_IDS: CONNECTOR_BUNDLE_IDS,
    patchGithubUrls: patchGithubUrls,
  };
})(typeof window !== 'undefined' ? window : globalThis);