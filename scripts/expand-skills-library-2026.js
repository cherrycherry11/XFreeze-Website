#!/usr/bin/env node
/**
 * One-time library expansion for the 2026 XFreeze skills marketplace.
 *
 * The generated skills are original XFreeze workflows. They are intentionally
 * platform-neutral SKILL.md files: useful in Grok, Claude, Cursor, Codex,
 * VS Code agent skills, or any agent that reads markdown instructions.
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const catalogPath = path.join(repoRoot, 'data/skills-catalog.json');
const taxonomyPath = path.join(repoRoot, 'data/skills-outcome-taxonomy.json');
const roadmapPath = path.join(repoRoot, 'data/skills-roadmap-1000.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const generatedPackIds = new Set([
  'premium-creator-growth-systems-pack',
  'premium-ai-video-visual-production-pack',
  'premium-founder-operator-pack',
  'premium-sales-revenue-ops-pack',
  'premium-customer-support-success-pack',
  'premium-developer-agent-rules-pack',
  'premium-product-research-ux-pack',
  'premium-data-analytics-decision-pack',
  'premium-education-coaching-pack',
  'premium-personal-productivity-life-pack',
  'premium-legal-finance-admin-guardrails-pack',
  'premium-automation-connector-playbooks-pack',
  'premium-marketing-seo-distribution-pack',
  'premium-ecommerce-creator-commerce-pack',
  'premium-hiring-people-ops-pack',
  'premium-security-privacy-risk-pack',
  'premium-real-estate-local-services-pack',
  'premium-health-wellness-nonmedical-pack',
]);

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function titleCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function sentence(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function connectorBlock(integrations) {
  const appLines = integrations.map((app) => {
    const key = app.replace(/^@/, '');
    return `- **${app}** — required live workspace access. Connector names and tool names vary by AI tool; discover available tools before calling anything. MCP key hint: \`${key}\`.`;
  }).join('\n');
  return `\n## Connector access (required)\n\nThis skill cannot run from text alone. It must call live integrations.\n\n1. Confirm each required app is enabled and authenticated in the current AI tool.\n2. Discover the exact available connector tools first; do not assume the example names exist.\n3. Use read-only calls before proposing writes. For sends, deletes, publishes, refunds, or updates, show a review table and wait for explicit approval.\n\n### Required integrations\n\n${appLines}\n\n### If a connector is missing\n\nStop and tell the user which app is missing. Give setup steps for their tool, then ask them to retry after authentication. Do not substitute generic web search for private workspace data.\n`;
}

function safetyBlock(risk, highStakes) {
  if (risk === 'low' && !highStakes) return '';
  const high = highStakes
    ? '\n- For legal, financial, health, hiring, security, or compliance topics, provide decision support only. Tell the user when a qualified professional should review the result.'
    : '';
  return `\n## Safety & approval\n\n- Separate facts, assumptions, and recommendations.\n- Do not invent private data, prices, policies, laws, medical facts, or platform rules.\n- Before any irreversible action, produce a review table and wait for the user to say \`apply\`, \`send\`, \`publish\`, or another explicit approval.${high}\n`;
}

function makeSkill(pack, area, mode) {
  const areaSlug = slugify(area.name);
  const modeSlug = slugify(mode.name);
  const id = `${pack.skillPrefix}-${areaSlug}-${modeSlug}`;
  const slash = `/${id}`;
  const requiresConnectors = Boolean(pack.requiresConnectors || area.integrations);
  const integrations = area.integrations || pack.integrations || [];
  const connectors = integrations.map((i) => i.replace(/^@/, ''));
  const risk = mode.risk || area.risk || pack.risk || (requiresConnectors ? 'medium' : 'low');
  const highStakes = Boolean(pack.highStakes || area.highStakes || mode.highStakes);
  const description = `${sentence(mode.action)} for ${area.label}: ${mode.value}. Produces a copy-ready ${mode.artifact}. Triggers: "${area.label} ${mode.name}", ${slash}.`;
  const connector = requiresConnectors ? connectorBlock(integrations) : '';
  const safety = safetyBlock(risk, highStakes);
  const skillContent = `---\nname: ${id}\ndescription: >\n  ${description}\nmetadata:\n  category: ${pack.category}\n  type: ${requiresConnectors ? 'connector' : 'premium'}\n  tier: premium\n  cadence: on-demand\n  risk: ${risk}\n  real_world_use_case: ${pack.group}\n${requiresConnectors ? `  connectors: ${connectors.join(',')}\n  integrations: ${integrations.join(',')}\n` : ''}allowed-tools: search_tool, use_tool\n---\n# ${slash}\n\n${description}\n\n## Works with\n\nUse this as a portable \`SKILL.md\` in Grok, Claude, Cursor, Codex, VS Code agent skills, or any AI workspace that supports reusable markdown instructions. If a tool does not support slash commands, paste the task and ask the AI to follow this skill.\n\n## When to use\n\nUse this when the user needs ${mode.userNeed} for ${area.label}. Best fit: ${area.scenario}.\n\n## Inputs to gather\n\nCheck context first; ask at most one question if the missing detail changes the answer.\n\n- Goal, audience, and delivery channel\n- Source material, examples, constraints, and deadline\n- Success criteria, review owner, and any must-avoid items\n${requiresConnectors ? '- Which workspace/app/account should be used after connector access is verified\n' : ''}\n## Workflow\n\n1. Restate the target outcome in one sentence.\n2. Identify the audience, constraints, risks, and missing assumptions.\n3. Build the ${mode.artifact} using the ${pack.domain} lens.\n4. Add practical next steps, review checks, and failure cases.\n5. Keep the final output copy-paste-ready; avoid process narration unless the user asks for it.\n${connector}${safety}\n## Output format\n\n**Objective**\n\n**Inputs used**\n\n**${titleCase(mode.artifact)}**\n\n${mode.output}\n\n**Risks / assumptions**\n\n**Next action**\n\n## Do\n\n- Use concrete wording, tables, and checklists where they reduce ambiguity\n- Mark unknowns clearly instead of pretending certainty\n- Make the result usable in ChatGPT, Grok, Claude, Cursor, Gemini, or a human workflow\n\n## Don't\n\n- Don't copy external templates or claim live workspace access without a successful connector/tool call\n- Don't create vague inspiration-only output when the user needs an operational artifact\n- Don't skip approval for sensitive actions\n\n## Quality check (before responding)\n\n- [ ] The user can paste the output directly into their tool or workflow\n- [ ] The result includes enough context to work outside Grok\n- [ ] Assumptions and risks are visible\n- [ ] Any connector or high-stakes action has an approval gate\n`;

  const aiInstallPrompt = `Install the skill '${id}' by writing the file below.\n\nUniversal path: ./skills/${id}/SKILL.md\nGrok path: ~/.grok/skills/${id}/SKILL.md\nCursor path: ~/.cursor/skills/${id}/SKILL.md\nClaude path: ~/.claude/skills/${id}/SKILL.md\nVS Code agent path: .github/skills/${id}/SKILL.md\n\nCreate the folder if needed, then write SKILL.md with this exact content:\n\n\`\`\`markdown\n${skillContent}\`\`\`\n\nAfter writing the file, confirm it exists. The user can then run ${slash} or describe the task from the skill description.`;

  return {
    id,
    name: `${titleCase(areaSlug)} ${titleCase(modeSlug)}`,
    description,
    slash,
    category: pack.category,
    tier: 'premium',
    type: requiresConnectors ? 'connector' : 'premium',
    realWorldUseCase: pack.group,
    requiresConnectors,
    connectors,
    integrations,
    githubPath: `bundles/${pack.id}/${id}/SKILL.md`,
    localPath: `bundles/${pack.id}/${id}/SKILL.md`,
    rawUrl: `https://raw.githubusercontent.com/YOUR_USERNAME/grok-skill-library/main/bundles/${pack.id}/${id}/SKILL.md`,
    githubUrl: `https://github.com/YOUR_USERNAME/grok-skill-library/blob/main/bundles/${pack.id}/${id}/SKILL.md`,
    skillContent,
    aiInstallPrompt,
  };
}

const modeSets = {
  creator: [
    ['brief', 'create a strategic brief', 'a precise plan before creation starts', 'brief', '- Goal\n- Audience\n- Angle\n- Asset list\n- Production checklist'],
    ['audit', 'audit and improve', 'specific fixes that raise quality or conversion', 'audit report', '- Scorecard\n- Gaps\n- Fixes\n- Rewrite/example'],
    ['calendar', 'plan a publishing calendar', 'a repeatable schedule with hooks and assets', 'calendar', '| Date | Asset | Hook | CTA | Notes |'],
    ['repurpose', 'repurpose source material', 'a multi-channel content set from one idea', 'repurpose map', '| Channel | Asset | Opening | CTA | Status |'],
  ],
  business: [
    ['decision-memo', 'write a decision memo', 'a clear recommendation with tradeoffs', 'decision memo', '- Decision\n- Options\n- Evidence\n- Recommendation'],
    ['operating-plan', 'build an operating plan', 'a practical execution plan with owners', 'operating plan', '| Workstream | Owner | Deadline | Metric | Risk |'],
    ['risk-review', 'review operational risk', 'a risk table and mitigation plan', 'risk review', '| Risk | Likelihood | Impact | Mitigation | Owner |'],
    ['stakeholder-brief', 'prepare stakeholder communication', 'a brief stakeholders can understand quickly', 'stakeholder brief', '- Context\n- What changed\n- What is needed\n- Ask'],
  ],
  analysis: [
    ['research-brief', 'build a research brief', 'sourced questions, findings, and implications', 'research brief', '- Question\n- Findings\n- Evidence to verify\n- Implications'],
    ['scorecard', 'create a decision scorecard', 'a weighted comparison for choosing between options', 'scorecard', '| Option | Criteria | Score | Rationale |'],
    ['experiment-plan', 'design an experiment', 'a measurable test plan with success criteria', 'experiment plan', '- Hypothesis\n- Setup\n- Metrics\n- Stop rule'],
    ['insight-report', 'turn raw notes into insights', 'actionable patterns from messy inputs', 'insight report', '- Themes\n- Evidence\n- Opportunities\n- Actions'],
  ],
  connector: [
    ['read-only-digest', 'summarize live workspace activity', 'a read-only digest from connected apps', 'workspace digest', '| Source | Finding | Link/ID | Action |'],
    ['approval-queue', 'prepare changes for approval', 'a safe review queue before any write action', 'approval queue', '| Item | Proposed action | Risk | Approval needed |'],
    ['handoff-brief', 'create a cross-app handoff', 'a handoff package across tools and teams', 'handoff brief', '- Context\n- Links\n- Owners\n- Next actions'],
    ['failure-check', 'diagnose workflow failures', 'a connector troubleshooting report', 'failure report', '| Step | Expected | Observed | Fix |'],
  ],
};

function modes(kind) {
  return (modeSets[kind] || modeSets.analysis).map(([name, action, value, artifact, output]) => ({
    name,
    action,
    value,
    artifact,
    output,
    userNeed: value,
  }));
}

function pack(id, name, group, category, domain, desc, areas, kind, extra = {}) {
  return {
    id,
    name,
    icon: extra.icon || 'sparkles',
    desc,
    group,
    category,
    domain,
    tier: 'premium',
    skillPrefix: id.replace(/^premium-/, '').replace(/-pack$/, ''),
    areas,
    modes: modes(kind),
    ...extra,
  };
}

const packs = [
  pack('premium-creator-growth-systems-pack', 'Premium Creator Growth Systems', 'Creator Command Center', 'creator', 'creator growth', 'Original workflows for creators building content engines, communities, launches, and sponsorship assets.', [
    ['X thread system', 'x thread systems', 'turn one idea into a thread that teaches, proves, and converts'],
    ['Short video script', 'short video scripts', 'write reels, shorts, and TikTok-style scripts with a clear hook'],
    ['Newsletter issue', 'newsletter issues', 'ship a useful issue that can become posts later'],
    ['Community prompt', 'community prompts', 'start useful conversations without engagement bait'],
    ['Launch post sequence', 'launch post sequences', 'introduce a product, pack, or offer with clarity'],
    ['Sponsor pitch', 'sponsor pitches', 'pitch brand collaborations with audience proof'],
    ['Audience research', 'audience research', 'map the pains, language, and objections of a niche'],
    ['Creator offer', 'creator offers', 'shape a paid download, template pack, or service'],
    ['Hook bank', 'hook banks', 'create tested openings for a niche or campaign'],
    ['Brand voice kit', 'brand voice kits', 'make a creator sound consistent across channels'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'creator', { icon: 'bolt' }),

  pack('premium-ai-video-visual-production-pack', 'Premium AI Video & Visual Production', 'Creator Command Center', 'visual-production', 'AI visual production', 'Production-ready skills for cinematic AI visuals, shots, prompts, storyboards, and asset QA.', [
    ['Cinematic shot list', 'cinematic shot lists', 'plan frames, lens language, mood, and continuity'],
    ['AI image prompt', 'AI image prompts', 'write model-neutral image prompts with references and constraints'],
    ['Grok Imagine template', 'Grok Imagine templates', 'convert an idea into a reusable visual template'],
    ['Storyboard sequence', 'storyboard sequences', 'map a scene into shot-by-shot prompts'],
    ['Product render prompt', 'product render prompts', 'create premium commercial-use visuals'],
    ['Style consistency pass', 'style consistency passes', 'keep character, lighting, and world details aligned'],
    ['Thumbnail concept', 'thumbnail concepts', 'make click-worthy but honest visual concepts'],
    ['Motion prompt', 'motion prompts', 'describe camera movement, timing, and transitions'],
    ['Visual QA review', 'visual QA reviews', 'catch artifacts, unreadable text, and brand drift'],
    ['Asset delivery pack', 'asset delivery packs', 'prepare final files, prompt notes, and usage guidance'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'creator', { icon: 'film' }),

  pack('premium-founder-operator-pack', 'Premium Founder Operator', 'Business & Revenue', 'business', 'startup operations', 'Founder workflows for decisions, weekly reviews, product bets, market moves, and execution discipline.', [
    ['Weekly founder review', 'weekly founder reviews', 'turn a messy week into decisions and next actions'],
    ['Startup idea validation', 'startup idea validation', 'test a market thesis before building'],
    ['Offer positioning', 'offer positioning', 'make an offer legible to a specific buyer'],
    ['Pricing experiment', 'pricing experiments', 'set up price tests without confusing customers'],
    ['Hiring justification', 'hiring justifications', 'decide whether a role is actually needed'],
    ['Investor update', 'investor updates', 'communicate progress, risks, and asks'],
    ['Partnership plan', 'partnership plans', 'evaluate collaborations and distribution partners'],
    ['Launch readiness', 'launch readiness reviews', 'check product, support, content, and analytics before launch'],
    ['North star metric', 'north star metric choices', 'choose a metric that reflects customer value'],
    ['Quarterly operating rhythm', 'quarterly operating rhythms', 'turn strategy into a weekly cadence'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'briefcase' }),

  pack('premium-sales-revenue-ops-pack', 'Premium Sales & Revenue Ops', 'Business & Revenue', 'sales', 'revenue operations', 'Sales workflows for lead research, outreach, objections, proposals, pipeline hygiene, and renewals.', [
    ['Lead research', 'lead research', 'understand a prospect before outreach'],
    ['Cold email sequence', 'cold email sequences', 'write respectful outbound that has a reason to exist'],
    ['Discovery call prep', 'discovery call prep', 'prepare questions that reveal buying context'],
    ['Objection handling', 'objection handling', 'respond without pressure or fake urgency'],
    ['Proposal outline', 'proposal outlines', 'turn a call into a clear offer'],
    ['CRM hygiene', 'CRM hygiene', 'clean pipeline notes and next steps'],
    ['Renewal risk', 'renewal risk reviews', 'spot churn signals before renewal'],
    ['Case study request', 'case study requests', 'ask customers for proof in a low-friction way'],
    ['Competitive deal', 'competitive deal plans', 'position against a named competitor'],
    ['Revenue recap', 'revenue recaps', 'summarize pipeline and blockers for leadership'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'chart-line' }),

  pack('premium-customer-support-success-pack', 'Premium Customer Support & Success', 'Business & Revenue', 'customer-success', 'customer operations', 'Support and success workflows for tickets, onboarding, escalation, account reviews, and knowledge base quality.', [
    ['Ticket triage', 'ticket triage', 'classify issues and choose next action'],
    ['Escalation brief', 'escalation briefs', 'hand an urgent issue to engineering or leadership'],
    ['Customer apology', 'customer apology messages', 'respond clearly without overpromising'],
    ['Knowledge base article', 'knowledge base articles', 'write support docs from repeated tickets'],
    ['Onboarding checklist', 'onboarding checklists', 'guide a new customer through activation'],
    ['Account health review', 'account health reviews', 'spot risk and expansion opportunities'],
    ['Bug reproduction', 'bug reproduction briefs', 'turn a complaint into reproducible steps'],
    ['Feature request synthesis', 'feature request synthesis', 'combine many requests into product themes'],
    ['Support macro', 'support macros', 'create reusable replies that still feel human'],
    ['Post-incident customer note', 'post-incident customer notes', 'explain what happened and what changed'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'headset' }),

  pack('premium-developer-agent-rules-pack', 'Premium Developer Agent Rules', 'Product, Developer & Research', 'developer', 'AI-assisted software work', 'Portable rules for coding agents: planning, review, debugging, security, migrations, and release discipline.', [
    ['Repo onboarding', 'repo onboarding', 'learn a codebase before making changes'],
    ['Bug investigation', 'bug investigations', 'trace symptoms to likely causes'],
    ['Code review', 'code reviews', 'find defects, regressions, and missing tests'],
    ['Refactor plan', 'refactor plans', 'reduce risk before changing shared code'],
    ['Test strategy', 'test strategies', 'choose the right test depth for a change'],
    ['Security review', 'security reviews', 'identify secrets, injection, auth, and dependency risks'],
    ['Migration checklist', 'migration checklists', 'move frameworks, APIs, or data safely'],
    ['Release notes', 'release notes', 'summarize changes for users and internal teams'],
    ['Prompt-to-issue', 'prompt-to-issue conversion', 'turn vague requests into implementation tickets'],
    ['Agent safety rules', 'agent safety rules', 'prevent blind command execution and destructive edits'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'analysis', { icon: 'code', risk: 'medium', highStakes: true }),

  pack('premium-product-research-ux-pack', 'Premium Product Research & UX', 'Product, Developer & Research', 'product', 'product discovery', 'Product and UX skills for interviews, JTBD, roadmap choices, onboarding, IA, and conversion audits.', [
    ['User interview', 'user interview guides', 'learn from customers without leading them'],
    ['JTBD synthesis', 'JTBD synthesis', 'turn notes into jobs, pains, and triggers'],
    ['Persona reality check', 'persona reality checks', 'replace generic personas with evidence-backed segments'],
    ['Onboarding audit', 'onboarding audits', 'find friction in first-run flows'],
    ['Pricing page critique', 'pricing page critiques', 'improve comprehension and purchase confidence'],
    ['Roadmap tradeoff', 'roadmap tradeoffs', 'choose between features with clear criteria'],
    ['Feature spec', 'feature specs', 'define behavior, states, and acceptance criteria'],
    ['Usability test plan', 'usability test plans', 'test whether users can complete core tasks'],
    ['Information architecture', 'information architecture reviews', 'organize content so people can find it'],
    ['Changelog strategy', 'changelog strategies', 'communicate product progress without noise'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'analysis', { icon: 'diagram-project' }),

  pack('premium-data-analytics-decision-pack', 'Premium Data Analytics & Decisions', 'Documents, Data & Decisions', 'data', 'decision analytics', 'Analyst workflows for messy data, KPI narratives, experiments, dashboards, and executive decisions.', [
    ['KPI narrative', 'KPI narratives', 'turn metrics into a story leaders can act on'],
    ['Dashboard critique', 'dashboard critiques', 'remove vanity metrics and clarify decisions'],
    ['Experiment readout', 'experiment readouts', 'interpret test results without overclaiming'],
    ['Data cleaning plan', 'data cleaning plans', 'prepare messy spreadsheets for analysis'],
    ['Forecast assumptions', 'forecast assumptions', 'make scenario assumptions visible'],
    ['Metric definition', 'metric definitions', 'define formulas and ownership clearly'],
    ['Cohort analysis', 'cohort analysis', 'compare behavior across user groups'],
    ['Survey analysis', 'survey analysis', 'turn responses into themes and caveats'],
    ['Executive data brief', 'executive data briefs', 'summarize what changed and why it matters'],
    ['Decision log', 'decision logs', 'capture what was decided, why, and what to revisit'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'analysis', { icon: 'table' }),

  pack('premium-education-coaching-pack', 'Premium Education & Coaching', 'Product, Developer & Research', 'education', 'learning design', 'Skills for lessons, study systems, coaching plans, curriculum design, and practical feedback.', [
    ['Lesson plan', 'lesson plans', 'teach a concept with practice and checks'],
    ['Study schedule', 'study schedules', 'turn a goal into daily learning work'],
    ['Rubric builder', 'rubric builders', 'make evaluation criteria explicit'],
    ['Feedback letter', 'feedback letters', 'give specific, useful critique'],
    ['Quiz generator', 'quiz generators', 'test understanding beyond memorization'],
    ['Curriculum map', 'curriculum maps', 'sequence learning from basics to application'],
    ['Coaching session', 'coaching sessions', 'structure reflection and next steps'],
    ['Skill gap analysis', 'skill gap analysis', 'identify what to learn next'],
    ['Workshop outline', 'workshop outlines', 'design a practical group session'],
    ['Learning resource filter', 'learning resource filters', 'choose resources by level and goal'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'analysis', { icon: 'graduation-cap' }),

  pack('premium-personal-productivity-life-pack', 'Premium Personal Productivity & Life', 'Finance, Legal, People & Home', 'personal', 'personal operations', 'Useful life-admin workflows for planning, family coordination, habits, travel, and decision clarity.', [
    ['Weekly reset', 'weekly resets', 'turn scattered obligations into a realistic week'],
    ['Priority filter', 'priority filters', 'choose what matters when everything feels urgent'],
    ['Family schedule', 'family schedules', 'coordinate people, events, and responsibilities'],
    ['Travel plan', 'travel plans', 'prepare an itinerary with constraints and backups'],
    ['Home project', 'home project plans', 'break a home task into budget, materials, and steps'],
    ['Habit design', 'habit design', 'make behavior change small and trackable'],
    ['Decision helper', 'decision helpers', 'compare options without spiraling'],
    ['Message rewrite', 'message rewrites', 'make sensitive personal messages clearer'],
    ['Errand batching', 'errand batching', 'group tasks by location and energy'],
    ['Life admin inbox', 'life admin inboxes', 'sort paperwork, bills, and follow-ups'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'calendar-check' }),

  pack('premium-legal-finance-admin-guardrails-pack', 'Premium Legal, Finance & Admin Guardrails', 'Finance, Legal, People & Home', 'guardrails', 'high-stakes admin support', 'Non-advisory workflows for contracts, budgets, taxes, invoices, policies, and compliance review prep.', [
    ['Contract review prep', 'contract review prep', 'flag clauses and questions for a professional'],
    ['Invoice dispute', 'invoice disputes', 'organize facts and draft a measured response'],
    ['Budget scenario', 'budget scenarios', 'compare costs with assumptions visible'],
    ['Tax document checklist', 'tax document checklists', 'collect documents without giving tax advice'],
    ['Policy summary', 'policy summaries', 'summarize rules and identify unknowns'],
    ['Compliance evidence', 'compliance evidence logs', 'prepare evidence for review'],
    ['Refund request', 'refund requests', 'make a polite, documented request'],
    ['Vendor terms', 'vendor terms reviews', 'compare operational risks in vendor terms'],
    ['Expense review', 'expense reviews', 'categorize spending with caveats'],
    ['Admin SOP', 'admin SOPs', 'document recurring admin tasks safely'],
  ].map(([name, label, scenario]) => ({ name, label, scenario, highStakes: true })), 'business', { icon: 'scale-balanced', risk: 'medium', highStakes: true }),

  pack('premium-automation-connector-playbooks-pack', 'Premium Automation Connector Playbooks', 'Live Connectors & Automations', 'automation', 'connected workspace automation', 'Safe, approval-first skills for live app workflows across email, docs, calendars, CRM, GitHub, Slack, and Zapier.', [
    ['Gmail Drive', 'Gmail and Drive workflows', 'summarize emails, find files, and prepare follow-ups', ['@gmail', '@google-drive']],
    ['Slack Notion', 'Slack and Notion workflows', 'turn channel activity into a project note', ['@slack', '@notion']],
    ['GitHub Linear', 'GitHub and Linear workflows', 'connect PRs, issues, bugs, and sprint updates', ['@github', '@linear']],
    ['Calendar Email', 'calendar and email workflows', 'prepare meetings and follow-up drafts', ['@calendar', '@gmail']],
    ['HubSpot Mail', 'CRM and mail workflows', 'prepare account updates from customer messages', ['@hubspot', '@gmail']],
    ['Stripe Sheet', 'Stripe and spreadsheet workflows', 'summarize revenue with an audit trail', ['@stripe', '@google-sheets']],
    ['Shopify Mail', 'shop and email workflows', 'summarize orders and customer questions', ['@shopify', '@gmail']],
    ['Zendesk Slack', 'support and Slack workflows', 'triage support issues and escalation notes', ['@zendesk', '@slack']],
    ['Figma Linear', 'design and issue workflows', 'convert design comments into trackable work', ['@figma', '@linear']],
    ['YouTube Notion', 'video and Notion workflows', 'capture creator analytics and publishing notes', ['@youtube', '@notion']],
  ].map(([name, label, scenario, integrations]) => ({ name, label, scenario, integrations })), 'connector', { icon: 'plug', requiresConnectors: true, risk: 'medium' }),

  pack('premium-marketing-seo-distribution-pack', 'Premium Marketing, SEO & Distribution', 'Creator Command Center', 'marketing', 'distribution strategy', 'Skills for organic discovery, landing pages, SEO briefs, launches, and owned audience growth.', [
    ['SEO content brief', 'SEO content briefs', 'plan pages that match intent without keyword stuffing'],
    ['Landing page section', 'landing page sections', 'write conversion copy with proof and objections'],
    ['Distribution map', 'distribution maps', 'choose channels and repurposing paths'],
    ['Email campaign', 'email campaigns', 'write launch and nurture emails'],
    ['Case study outline', 'case study outlines', 'turn customer proof into a story'],
    ['Press angle', 'press angles', 'find a specific newsworthy hook'],
    ['Community launch', 'community launches', 'introduce a release inside a group respectfully'],
    ['LinkedIn post', 'LinkedIn posts', 'write practical posts for professional audiences'],
    ['Referral program', 'referral programs', 'design incentives and messaging'],
    ['Analytics review', 'marketing analytics reviews', 'interpret traffic and conversion signals'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'creator', { icon: 'bullhorn' }),

  pack('premium-ecommerce-creator-commerce-pack', 'Premium Ecommerce & Creator Commerce', 'Business & Revenue', 'commerce', 'commerce operations', 'Workflows for product listings, digital packs, storefronts, customer messages, bundles, and conversion.', [
    ['Product listing', 'product listings', 'write specific listings that set buyer expectations'],
    ['Bundle offer', 'bundle offers', 'combine digital products into a clear value ladder'],
    ['Checkout FAQ', 'checkout FAQs', 'answer purchase blockers before checkout'],
    ['Abandoned cart', 'abandoned cart messages', 'recover interest without pressure'],
    ['Customer review request', 'customer review requests', 'ask for proof after a positive experience'],
    ['Refund policy explainer', 'refund policy explainers', 'make policy language easier to understand'],
    ['Upsell path', 'upsell paths', 'suggest the next useful product'],
    ['Storefront audit', 'storefront audits', 'identify trust, copy, and navigation issues'],
    ['Digital delivery note', 'digital delivery notes', 'explain how to access files and get support'],
    ['Creator pack QA', 'creator pack QA', 'check that a paid pack is usable and complete'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'store' }),

  pack('premium-hiring-people-ops-pack', 'Premium Hiring & People Ops', 'Finance, Legal, People & Home', 'people', 'people operations', 'Hiring and people workflows with fairness, clarity, interview structure, onboarding, and performance communication.', [
    ['Role scorecard', 'role scorecards', 'define what success means before hiring'],
    ['Interview plan', 'interview plans', 'structure interviews around evidence'],
    ['Candidate summary', 'candidate summaries', 'compare candidates without bias-heavy language'],
    ['Offer note', 'offer notes', 'communicate compensation and expectations clearly'],
    ['Onboarding plan', 'onboarding plans', 'get a new hire productive without overwhelm'],
    ['Performance feedback', 'performance feedback', 'make feedback specific and behavior-based'],
    ['Team ritual', 'team rituals', 'design useful recurring meetings'],
    ['Manager one-on-one', 'manager one-on-ones', 'prepare topics and follow-ups'],
    ['Training plan', 'training plans', 'build learning paths for a role'],
    ['Exit interview', 'exit interviews', 'learn from departures respectfully'],
  ].map(([name, label, scenario]) => ({ name, label, scenario, highStakes: true })), 'business', { icon: 'users', risk: 'medium', highStakes: true }),

  pack('premium-security-privacy-risk-pack', 'Premium Security, Privacy & Risk', 'Product, Developer & Research', 'security', 'security and privacy review', 'Practical security and privacy skills for non-destructive review, incident prep, access audits, and vendor risk.', [
    ['Access review', 'access reviews', 'check who has access and what should change'],
    ['Incident timeline', 'incident timelines', 'organize events during a security incident'],
    ['Privacy notice check', 'privacy notice checks', 'spot unclear data-use language'],
    ['Vendor risk', 'vendor risk reviews', 'review vendor exposure before approval'],
    ['Secrets handling', 'secrets handling', 'prevent accidental exposure in code or docs'],
    ['Threat model', 'threat models', 'identify realistic abuse cases'],
    ['Security changelog', 'security changelogs', 'communicate fixes without creating risk'],
    ['Phishing response', 'phishing responses', 'triage a suspicious message safely'],
    ['Data retention', 'data retention reviews', 'clarify what should be kept or deleted'],
    ['Permissions matrix', 'permissions matrices', 'map roles to least-privilege access'],
  ].map(([name, label, scenario]) => ({ name, label, scenario, highStakes: true })), 'analysis', { icon: 'fingerprint', risk: 'medium', highStakes: true }),

  pack('premium-real-estate-local-services-pack', 'Premium Real Estate & Local Services', 'Business & Revenue', 'local-services', 'local service business', 'Useful skills for agents, studios, shops, consultants, and local service operators.', [
    ['Listing description', 'listing descriptions', 'describe a property or service with useful specifics'],
    ['Client intake', 'client intake forms', 'collect requirements before quoting work'],
    ['Service quote', 'service quotes', 'turn scope into a transparent estimate'],
    ['Local SEO page', 'local SEO pages', 'write location-specific pages without spam'],
    ['Follow-up message', 'client follow-up messages', 'move a lead forward politely'],
    ['Review reply', 'review replies', 'respond to public feedback with professionalism'],
    ['Appointment prep', 'appointment prep', 'prepare questions and materials before a meeting'],
    ['Maintenance plan', 'maintenance plans', 'turn recurring work into a schedule'],
    ['Referral ask', 'referral asks', 'ask happy clients for introductions'],
    ['Before-after case study', 'before-after case studies', 'show proof of service value'],
  ].map(([name, label, scenario]) => ({ name, label, scenario })), 'business', { icon: 'location-dot' }),

  pack('premium-health-wellness-nonmedical-pack', 'Premium Health & Wellness Non-Medical', 'Finance, Legal, People & Home', 'wellness', 'non-medical wellness planning', 'Non-medical wellness planning skills for routines, reflection, food planning, sleep hygiene, and communication.', [
    ['Meal prep plan', 'meal prep plans', 'organize meals around preferences and constraints'],
    ['Sleep routine', 'sleep routines', 'create a practical wind-down plan'],
    ['Fitness habit', 'fitness habits', 'plan safe, low-friction movement routines'],
    ['Stress reflection', 'stress reflections', 'organize feelings into patterns and supports'],
    ['Appointment notes', 'appointment notes', 'prepare questions for a qualified professional'],
    ['Caregiver checklist', 'caregiver checklists', 'coordinate practical support tasks'],
    ['Wellness journal', 'wellness journals', 'structure daily reflection without diagnosis'],
    ['Grocery plan', 'grocery plans', 'turn meals into a realistic shopping list'],
    ['Boundary message', 'boundary messages', 'write clear personal limits respectfully'],
    ['Routine audit', 'routine audits', 'spot friction in daily habits'],
  ].map(([name, label, scenario]) => ({ name, label, scenario, highStakes: true })), 'business', { icon: 'heart-pulse', risk: 'medium', highStakes: true }),
];

function expandTupleAreas(packSpec) {
  return packSpec.areas;
}

function createBundle(packSpec) {
  const skills = [];
  expandTupleAreas(packSpec).forEach((area) => {
    packSpec.modes.forEach((mode) => {
      skills.push(makeSkill(packSpec, area, mode));
    });
  });
  return {
    id: packSpec.id,
    name: packSpec.name,
    icon: packSpec.icon,
    desc: packSpec.desc,
    group: packSpec.group,
    tier: packSpec.tier,
    realWorldUseCase: packSpec.group,
    platforms: ['Grok', 'Claude', 'Cursor', 'Codex', 'VS Code', 'Gemini'],
    priority: 'premium',
    skillCount: skills.length,
    skills,
  };
}

function improveExistingSkill(skill) {
  if (!skill.skillContent) return;
  skill.tier = skill.tier || 'free';
  skill.realWorldUseCase = skill.realWorldUseCase || skill.category || 'general';
  skill.type = skill.requiresConnectors ? 'connector' : (skill.type || 'base');

  const plain = (skill.description || '').replace(/ Triggers:.*$/i, '').trim();
  skill.skillContent = skill.skillContent.replace(
    /^User wants to ([^\n.]+)\./m,
    `Use this when the user needs a copy-ready workflow for: ${plain}.`
  );

  if (skill.requiresConnectors) {
    const portability = 'Connector tool names vary by AI tool. Discover the available tools first, then call the exact tool name exposed in the current session.';
    if (!skill.skillContent.includes(portability)) {
      skill.skillContent = skill.skillContent.replace(
        '3. Call integrations with `use_tool` and fully-qualified names (`server__tool_name`).',
        `3. Call integrations with \`use_tool\` and fully-qualified names (\`server__tool_name\`).\n4. ${portability}`
      );
    }
    skill.skillContent = skill.skillContent.replace(
      /- Which @integration to use \(e\.g\. @gmail, @onedrive, @canva\) — see \*\*Connector access\*\*/g,
      '- Which required @integration/workspace should be used — see **Connector access**'
    );
  }

  const risky = /(send|publish|delete|schedule|create|update|refund|payment|invoice|contract|legal|medical|health|tax|hiring|security|privacy)/i.test(`${skill.description} ${skill.category}`);
  const hasSafety = /## Safety|not legal advice|not medical advice|not financial advice|wait for user|explicit confirmation/i.test(skill.skillContent);
  if (risky && !hasSafety) {
    skill.skillContent = skill.skillContent.replace(
      '\n## Workflow\n',
      '\n## Safety & approval\n\n- Separate facts, assumptions, and recommendations.\n- Do not give legal, medical, tax, investment, hiring, or security advice as a final authority.\n- For sends, publishing, deletes, refunds, account changes, or other irreversible actions, show a review table and wait for explicit approval.\n\n## Workflow\n'
    );
  }

  const requiredSections = ['## When to use', '## Inputs to gather', '## Workflow', '## Output format', '## Quality check'];
  if (!requiredSections.every((section) => skill.skillContent.includes(section))) {
    skill.skillContent += `\n## When to use\n\nUse this when the user needs ${skill.description}\n\n## Inputs to gather\n\n- Files, diff, branch, or code context to review\n- The user's risk tolerance and desired review depth\n- Any known constraints, deadlines, or areas of concern\n\n## Workflow\n\n1. Inspect the relevant code before forming conclusions.\n2. Prioritize correctness, maintainability, safety, and missing tests.\n3. Lead with findings ordered by severity and cite file/line references when available.\n4. Separate confirmed issues from suggestions and open questions.\n\n## Output format\n\n**Findings**\n\n**Open questions**\n\n**Change summary**\n\n**Test gaps / residual risk**\n\n## Quality check (before responding)\n\n- [ ] Findings are grounded in code evidence\n- [ ] The most severe issue appears first\n- [ ] Suggestions do not require behavior changes unless clearly justified\n- [ ] The user can act on every listed item\n`;
  }

  if (skill.aiInstallPrompt) {
    skill.aiInstallPrompt = skill.aiInstallPrompt
      .replace(/Grok path:/, 'Universal path: ./skills/' + skill.id + '/SKILL.md\nGrok path:')
      .replace(/Claude path: ~\/\.claude\/skills\/([^\n]+)\n/, 'Claude path: ~/.claude/skills/$1\nVS Code agent path: .github/skills/$1\n');
  }
}

catalog.bundles.forEach((bundle) => {
  bundle.group = bundle.group || {
    business: 'Business & Revenue',
    sales: 'Business & Revenue',
    product: 'Product, Developer & Research',
    research: 'Product, Developer & Research',
    documents: 'Documents, Data & Decisions',
    presentations: 'Documents, Data & Decisions',
    data: 'Documents, Data & Decisions',
    communication: 'Communication & Productivity',
    finance: 'Finance, Legal, People & Home',
    legal: 'Finance, Legal, People & Home',
    hr: 'Finance, Legal, People & Home',
    health: 'Finance, Legal, People & Home',
    'daily-life': 'Finance, Legal, People & Home',
  }[bundle.skills?.[0]?.category] || bundle.group;
  bundle.skills.forEach(improveExistingSkill);
});

catalog.bundles = catalog.bundles.filter((bundle) => !generatedPackIds.has(bundle.id));
catalog.bundles.push(...packs.map(createBundle));

const groupOrder = [
  'Creator Command Center',
  'Business & Revenue',
  'Product, Developer & Research',
  'Documents, Data & Decisions',
  'Communication & Productivity',
  'Finance, Legal, People & Home',
  'Live Connectors & Automations',
  'Meta Systems',
];

catalog.bundles.sort((a, b) => {
  const ga = groupOrder.indexOf(a.group || a.realWorldUseCase || '');
  const gb = groupOrder.indexOf(b.group || b.realWorldUseCase || '');
  const groupA = ga === -1 ? 999 : ga;
  const groupB = gb === -1 ? 999 : gb;
  if (groupA !== groupB) return groupA - groupB;
  if ((a.tier === 'premium') !== (b.tier === 'premium')) return a.tier === 'premium' ? -1 : 1;
  return String(a.name).localeCompare(String(b.name));
});

catalog.totalBundles = catalog.bundles.length;
catalog.totalSkills = catalog.bundles.reduce((sum, bundle) => sum + (bundle.skills ? bundle.skills.length : 0), 0);

const taxonomy = {
  generatedAt: '2026-07-02',
  positioning: 'Outcome-first AI skills library for creators, operators, developers, analysts, and everyday users.',
  groups: [
    ['Creator Command Center', 'Content systems, AI visuals, SEO, launches, communities, and creator commerce.'],
    ['Business & Revenue', 'Founder operations, sales, support, ecommerce, local services, and client work.'],
    ['Product, Developer & Research', 'Product discovery, UX, coding-agent rules, security review, and research workflows.'],
    ['Documents, Data & Decisions', 'Reports, decks, spreadsheets, analysis, dashboards, and decision artifacts.'],
    ['Communication & Productivity', 'Email, calendar, docs, collaboration, weekly planning, and workspace productivity.'],
    ['Finance, Legal, People & Home', 'High-stakes admin support with disclaimers, review gates, and human escalation.'],
    ['Live Connectors & Automations', 'Connector-dependent workflows with read-only-first and approval-before-write rules.'],
    ['Meta Systems', 'Skill creation, memory, prompt engineering, and library maintenance.'],
  ].map(([name, purpose]) => ({ name, purpose })),
  qualityStandard: [
    'Every skill must produce an operational artifact, not only advice.',
    'Every connector skill must verify live app access and tool names before claiming results.',
    'Every high-stakes skill must separate facts, assumptions, and professional review needs.',
    'Every SKILL.md must work outside Grok by avoiding Grok-only assumptions.',
  ],
};

const roadmap = {
  generatedAt: '2026-07-02',
  currentTotal: catalog.totalSkills,
  target: '1000+ active copy-paste SKILL.md files',
  phaseComplete: [
    'Audited existing 284 skills for real-world usefulness.',
    'Added original premium expansion packs to reach 1000+ active skills.',
    'Reorganized browse taxonomy around real-world outcomes.',
  ],
  nextExpansionBacklog: [
    { group: 'Creator Command Center', additionalSkills: 120, examples: ['podcast operations', 'brand deals', 'AI avatar production', 'community moderation'] },
    { group: 'Business & Revenue', additionalSkills: 140, examples: ['agency delivery', 'client reporting', 'procurement', 'franchise/local business'] },
    { group: 'Product, Developer & Research', additionalSkills: 160, examples: ['QA automation prompts', 'architecture reviews', 'academic research', 'prompt evals'] },
    { group: 'Documents, Data & Decisions', additionalSkills: 100, examples: ['board decks', 'financial models', 'survey dashboards', 'grant writing'] },
    { group: 'Live Connectors & Automations', additionalSkills: 180, examples: ['Make/n8n playbooks', 'CRM automations', 'analytics digests', 'support escalations'] },
  ],
  sourcePolicy: 'Do not copy third-party skills. Use public repos only for category demand signals, then write original XFreeze workflows from scratch.',
};

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
fs.writeFileSync(taxonomyPath, JSON.stringify(taxonomy, null, 2) + '\n');
fs.writeFileSync(roadmapPath, JSON.stringify(roadmap, null, 2) + '\n');

console.log(`Expanded catalog to ${catalog.totalSkills} skills across ${catalog.totalBundles} bundles.`);
console.log(`Wrote ${taxonomyPath}`);
console.log(`Wrote ${roadmapPath}`);
