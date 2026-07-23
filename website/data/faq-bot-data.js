/**
 * X Freeze FAQ Bot - comprehensive Q&A dataset
 */
(function (global) {
  'use strict';

  global.XFreezeFaqBotData = {
    faq: [
      /* Getting started */
      {
        question: 'What is X Freeze?',
        answer: 'X Freeze is a creator library of <strong>500+ Grok Imagine templates</strong>, <strong>1200+ AI skills</strong>, and <strong>430+ motion prompts</strong>. Browse free, copy what you need, and run it in Grok, Claude, or Cursor.',
        tags: ['what is', 'x freeze', 'about', 'library', 'overview']
      },
      {
        question: 'Is X Freeze affiliated with xAI or Grok?',
        answer: 'No. X Freeze is an <strong>independent fan library</strong> - not affiliated with xAI, Grok, X, or SpaceX. I curate links and prompts; Grok and other tools are run on their own platforms.',
        tags: ['affiliated', 'xai', 'grok', 'official', 'fan', 'unofficial']
      },
      {
        question: 'Do I need an account to use the library?',
        answer: 'No account is required to browse templates, skills, or motion prompts. Sign-in is <strong>optional</strong> - it unlocks My Library for favorites and purchase history on <a href="account.html">account.html</a>.',
        tags: ['account', 'sign in', 'login', 'register', 'required']
      },
      {
        question: "What's the difference between a template and a skill?",
        answer: 'A <strong>template</strong> opens a visual look in Grok Imagine. A <strong>skill</strong> is a task prompt for writing, planning, or automating work in Grok, Claude, or Cursor. <strong>Motion prompts</strong> are a third type - they animate a still image into video.',
        tags: ['difference', 'template', 'skill', 'motion', 'vs']
      },
      {
        question: 'Where should I start as a beginner?',
        answer: 'Pick your goal: visuals → <a href="templates.html">Templates</a>; tasks and writing → <a href="skills.html">Skills</a>; video motion → <a href="prompt-library.html">Motion prompts</a>. The <a href="blog/getting-started.html">getting started guide</a> walks through all three.',
        tags: ['beginner', 'start', 'new', 'first', 'where']
      },
      {
        question: 'Is browsing the library free?',
        answer: 'Yes - browsing, searching, opening template links, and copying skills or motion prompts is <strong>completely free</strong>. You pay separately only for Grok subscriptions, optional offline bundles, or tips if you choose.',
        tags: ['free', 'cost', 'price', 'browse', 'pay']
      },
      {
        question: 'Do I need a paid Grok account?',
        answer: 'Most Grok Imagine <strong>templates need Super Grok or Super Grok Heavy</strong> to run. Browsing X Freeze is free; check <a href="https://grok.com" target="_blank" rel="noopener noreferrer">grok.com</a> for current plans. Skills and motion prompts do not require Grok.',
        tags: ['paid', 'grok', 'subscription', 'super grok', 'premium grok', 'account']
      },
      {
        question: 'What is Super Grok and do I need it?',
        answer: '<strong>Super Grok</strong> and <strong>Super Grok Heavy</strong> are paid Grok tiers that unlock Imagine templates. If a template will not open or run, you likely need an active Super Grok plan. Skills work without it.',
        tags: ['super grok', 'heavy', 'subscription', 'imagine', 'tier']
      },
      {
        question: 'Can I use X Freeze on mobile?',
        answer: 'Yes - the site is mobile-friendly. Templates open Grok in your browser; skills and motion prompts copy to your clipboard for pasting into Grok, Claude, or Cursor on any device.',
        tags: ['mobile', 'phone', 'tablet', 'ios', 'android']
      },
      {
        question: 'How do I turn on dark mode?',
        answer: 'Use the <strong>theme toggle</strong> in the top navigation. Your preference saves automatically and applies across pages.',
        tags: ['dark mode', 'theme', 'light', 'toggle']
      },

      /* Templates */
      {
        question: 'What actually happens when I click a template?',
        answer: 'The card opens <strong>Grok Imagine</strong> in a new tab with that template loaded. Upload your photo or product, hit generate, and you get the same style as the preview.',
        tags: ['click', 'template', 'open', 'happens', 'use']
      },
      {
        question: 'Do templates run inside X Freeze or in Grok?',
        answer: 'Templates run in <strong>Grok Imagine</strong> - not inside X Freeze. I provide the curated link; generation happens on Grok with your own image.',
        tags: ['where', 'run', 'grok', 'inside', 'imagine']
      },
      {
        question: "Why didn't my template open or work?",
        answer: 'Common fixes: confirm you have <strong>Super Grok or Super Grok Heavy</strong>, try another browser, disable pop-up blockers, and make sure you are signed into Grok. If a link is broken, contact me via <a href="contact.html">contact.html</a>.',
        tags: ['broken', 'not working', 'failed', 'open', 'template', 'link']
      },
      {
        question: 'Do I need to write prompts for templates?',
        answer: 'No. Templates are <strong>pre-built looks</strong> - open the link, add your image, and generate. You only tweak if you want a personal spin.',
        tags: ['prompt', 'write', 'template', 'scratch']
      },
      {
        question: 'What image should I upload for a template?',
        answer: 'Use a clear photo - product on a simple background, a portrait for style edits, or a flat mockup for packaging. Higher resolution helps; phone photos work if the subject is in focus and well lit.',
        tags: ['upload', 'image', 'photo', 'picture', 'template']
      },
      {
        question: 'Which template category should I pick first?',
        answer: '<strong>Product</strong> for ads and e-commerce, <strong>Style Edit</strong> for cinematic portraits (all free), <strong>Mockup\'s</strong> for packaging and devices, <strong>Filters</strong> for color grades, <strong>Make-up</strong> for beauty looks.',
        tags: ['category', 'which', 'pick', 'first', 'template', 'filter']
      },
      {
        question: "What's the difference between Product and Mockup templates?",
        answer: '<strong>Product</strong> templates focus on hero shots, campaigns, and studio product photography. <strong>Mockup\'s</strong> place your design on packaging, apparel, devices, print, and retail scenes.',
        tags: ['product', 'mockup', 'difference', 'category']
      },
      {
        question: 'Are Style Edit templates all free?',
        answer: 'Yes - every <strong>Style Edit</strong> template in the gallery is marked free. Great starting point for cinematic portraits and creative edits without a premium badge.',
        tags: ['style edit', 'free', 'template', 'cinematic']
      },
      {
        question: 'What does the Premium badge on a template mean?',
        answer: 'Premium templates are <strong>higher-tier looks in Grok Imagine</strong> - still opened with one tap, but they may require Super Grok access. The badge is a clarity label, not a separate X Freeze paywall.',
        tags: ['premium', 'badge', 'template', 'tier']
      },
      {
        question: 'Can I use templates for client work and ads?',
        answer: 'Yes - most users run templates for social posts, product ads, e-commerce, pitches, and client deliverables. You are responsible for commercial use; check Grok and your AI tool terms for output limits.',
        tags: ['client', 'commercial', 'ads', 'business', 'work']
      },
      {
        question: 'How do I find the right template fast?',
        answer: 'Go to <a href="templates.html">Templates</a>, pick a category tab, use <strong>search</strong> (try words like perfume, laptop, or headshot), or filter <strong>Free / Premium</strong>. Subcategory sections narrow results further.',
        tags: ['find', 'search', 'browse', 'filter', 'template', 'fast']
      },
      {
        question: 'What are template subcategories?',
        answer: 'Each main category has <strong>sections</strong> - for example Product includes Beauty, Food, Tech, and Jewelry. Subcategories group similar looks so you scroll less.',
        tags: ['subcategory', 'section', 'template', 'category']
      },
      {
        question: 'Can I share a template link with my team?',
        answer: 'Yes - each card opens a Grok link you can share. Your teammates still need their own Grok account with the right subscription to run it.',
        tags: ['share', 'team', 'link', 'template', 'collaborate']
      },
      {
        question: 'What if a template does not match my image on the first try?',
        answer: 'Try a clearer photo, crop closer to the subject, or pick a template with similar angle and lighting. Regenerate a few times before switching templates - especially for Style Edit looks.',
        tags: ['not match', 'wrong', 'first try', 'bad result', 'template']
      },
      {
        question: 'How do I request a new template?',
        answer: 'Use <a href="contact.html?topic=template">Request a template</a> on the contact page, the floating button on the Templates page, or the homepage newsletter section. I review requests weekly.',
        tags: ['request', 'new template', 'missing', 'suggest']
      },

      /* Skills - general */
      {
        question: 'What is an AI skill?',
        answer: 'A skill is a <strong>ready-made prompt package</strong> (SKILL.md) that teaches your AI to do one job well - meeting notes, ad copy, inbox triage, PRDs, and more. Copy the install prompt and run a slash command.',
        tags: ['skill', 'what is', 'ai skill', 'definition']
      },
      {
        question: 'What is a slash command?',
        answer: 'A slash command like <code>/meeting-notes</code> or <code>/ad-copy</code> triggers a specific skill after you install it. Each skill card shows its slash on the <a href="skills.html">Skills page</a>.',
        tags: ['slash', 'command', 'trigger', 'skill']
      },
      {
        question: 'Which AI tools support X Freeze skills?',
        answer: 'Skills are built for <strong>Grok</strong>, <strong>Claude</strong>, and <strong>Cursor</strong>. Copy the install prompt into your tool of choice. Templates and motion prompts target Grok Imagine and video tools instead.',
        tags: ['tools', 'claude', 'cursor', 'grok', 'chatgpt', 'support']
      },
      {
        question: 'How do I install a skill?',
        answer: 'Open a pack on <a href="skills.html">Skills</a>, pick a skill, hit <strong>Copy prompt</strong>, paste into Grok/Claude/Cursor, and let the AI write the SKILL.md file. Then run the slash command shown on the card.',
        tags: ['install', 'copy', 'setup', 'skill', 'how']
      },
      {
        question: 'What is SKILL.md?',
        answer: '<strong>SKILL.md</strong> is the skill definition file your AI creates when you paste the install prompt. It holds instructions, triggers, and guardrails for that task.',
        tags: ['skill.md', 'file', 'format', 'install']
      },
      {
        question: 'Do I need GitHub to use skills?',
        answer: 'No GitHub required. Copy-paste install is the default path. Some developer skills mention repos, but the library is designed for <strong>copy and run</strong>.',
        tags: ['github', 'git', 'required', 'skill']
      },
      {
        question: 'Can I preview a skill before copying?',
        answer: 'Yes - open any pack, hit <strong>Preview</strong> on a skill row to read the description and requirements before you copy the install prompt.',
        tags: ['preview', 'skill', 'before', 'read']
      },
      {
        question: 'How many skills are in the library?',
        answer: 'The library includes <strong>1,186 skills</strong> across <strong>75 packs</strong>, organized into instant, connector, and premium tiers. The Skills page shows live counts.',
        tags: ['how many', 'count', 'skills', 'number']
      },
      {
        question: 'What are skill packs?',
        answer: 'Packs group related skills - <strong>Business</strong>, <strong>Canva</strong>, <strong>Gmail</strong>, <strong>Workflow Combos</strong>, and more. Open a pack to see every skill and slash command inside.',
        tags: ['pack', 'bundle', 'group', 'skills']
      },
      {
        question: 'How do I search for a skill?',
        answer: 'Use the search bar on <a href="skills.html">Skills</a> to filter packs by name or topic. Filter <strong>Instant only</strong> if you want zero setup, or browse MEGA categories like Business or Creator.',
        tags: ['search', 'find', 'skill', 'filter']
      },
      {
        question: 'Can I use skills in ChatGPT?',
        answer: 'Skills are optimized for <strong>Grok, Claude, and Cursor</strong>. You can try pasting a SKILL.md into ChatGPT custom instructions, but connectors and slash flows are not guaranteed there.',
        tags: ['chatgpt', 'openai', 'gpt', 'skill']
      },
      {
        question: 'How often is new stuff added?',
        answer: 'New templates, skills, and motion prompts drop <strong>every week</strong>. Follow <a href="https://x.com/XFreeze" target="_blank" rel="noopener noreferrer">@XFreeze</a> for the latest drops.',
        tags: ['updates', 'new', 'weekly', 'often']
      },
      {
        question: 'Can I use skills outside of Grok Imagine?',
        answer: 'Yes - skills are text prompts for <strong>Grok, Claude, and Cursor</strong>. Templates and motion prompts are for Grok Imagine and image-to-video tools.',
        tags: ['outside', 'claude', 'cursor', 'grok imagine', 'skill']
      },

      /* Instant vs connector */
      {
        question: 'What are instant skills?',
        answer: '<strong>Instant skills</strong> need no app setup - copy the prompt, paste, and run. They work on text you provide. Filter <strong>Instant only</strong> on the Skills page.',
        tags: ['instant', 'no setup', 'skill', 'fast']
      },
      {
        question: 'What are connector skills?',
        answer: '<strong>Connector skills</strong> let your AI read and write in Gmail, Notion, Drive, Slack, Canva, and more. Set up connectors once, then the skill works inside those apps. See <a href="connector-setup.html">connector setup</a>.',
        tags: ['connector', 'mcp', 'integration', 'gmail', 'notion']
      },
      {
        question: 'Do I need connectors for every skill?',
        answer: 'No - most skills are <strong>instant</strong>. Only packs tagged <strong>Connector</strong> need app integrations. Roughly 980+ skills work with copy-paste only.',
        tags: ['every', 'all', 'connector', 'required', 'instant']
      },
      {
        question: 'How do I filter to instant-only skills?',
        answer: 'On <a href="skills.html">Skills</a>, tap the <strong>Instant only</strong> filter pill. Connector packs hide until you are ready for live app access.',
        tags: ['filter', 'instant only', 'skills']
      },
      {
        question: 'What apps do connector skills support?',
        answer: 'Common connectors: <strong>Gmail, Google Calendar, Drive, Sheets, Outlook, Teams, Notion, Slack, Canva, GitHub, Zapier, Figma, Linear</strong>. Each skill card lists required integrations.',
        tags: ['apps', 'connector', 'gmail', 'slack', 'notion', 'support']
      },
      {
        question: 'How do I set up connectors in Grok?',
        answer: 'Type <code>/mcps</code> in Grok chat, enable the app, sign in, then press <code>r</code> to refresh. Full steps on <a href="connector-setup.html">connector-setup.html</a> and the <a href="blog/connector-setup-5min.html">5-minute guide</a>.',
        tags: ['grok', 'mcps', 'setup', 'connector', 'how']
      },
      {
        question: 'How do I set up connectors in Cursor?',
        answer: 'Open <strong>Settings → MCP</strong>, add the server for your app, complete OAuth, then paste the skill install prompt. See <a href="connector-setup.html">connector-setup.html</a> for the app table.',
        tags: ['cursor', 'mcp', 'setup', 'connector']
      },
      {
        question: 'How do I set up connectors in Claude Desktop?',
        answer: 'Go to <strong>Settings → Integrations / Connectors</strong>, connect the app, approve permissions, then install the skill. The connector guide maps each app to its setup path.',
        tags: ['claude', 'desktop', 'connector', 'setup']
      },
      {
        question: "Why does my skill say it can't access my email?",
        answer: 'The connector is likely off or not authenticated. Re-open <code>/mcps</code> (Grok) or MCP settings (Cursor), confirm the app shows green/connected, then retry the skill.',
        tags: ['email', 'access', 'gmail', 'cant', 'connector', 'error']
      },
      {
        question: 'Does X Freeze see my Gmail or Notion data?',
        answer: 'No. Connector skills use <strong>your AI tool\'s official integration</strong>. Data flows between you and Gmail/Notion/etc. - X Freeze only provides the prompt text, never your mail or files.',
        tags: ['privacy', 'data', 'gmail', 'notion', 'see', 'safe']
      },

      /* Free vs premium skills */
      {
        question: "What's the difference between free and premium skills?",
        answer: '<strong>Free skills</strong> are fast, broad, copy-paste tasks. <strong>Premium skills</strong> are deeper, consultant-grade packs for teams - legal, HR, security, sales ops, and connector playbooks. Both copy free on the site.',
        tags: ['free', 'premium', 'difference', 'skill', 'tier']
      },
      {
        question: 'Are premium skills behind a paywall on the site?',
        answer: 'No site paywall for skills - premium means <strong>depth and tier label</strong>, not a checkout gate. You copy premium skill prompts the same way as free ones.',
        tags: ['paywall', 'premium', 'pay', 'skill', 'locked']
      },
      {
        question: 'When should I use a premium skill?',
        answer: 'Use premium packs for <strong>high-stakes work</strong> - contracts, hiring, security reviews, revenue ops, health disclaimers, and multi-app handoffs. Free skills are perfect for everyday drafts.',
        tags: ['when', 'premium', 'skill', 'use']
      },
      {
        question: 'What are professional-review flags?',
        answer: 'Some premium skills in legal, HR, health, and security categories include reminders to <strong>have a qualified professional review</strong> output before you act on it. They assist drafting - they are not licensed advice.',
        tags: ['professional', 'review', 'legal', 'disclaimer', 'premium']
      },

      /* Workflow combos */
      {
        question: 'What are workflow combos?',
        answer: 'Combos chain multiple skills into one flow - brief to draft to file to scheduled post. Run one slash command instead of stitching prompts manually. Browse on <a href="workflows.html">Workflows</a>.',
        tags: ['combo', 'workflow', 'chain', 'automation']
      },
      {
        question: 'Where do I find workflow combos?',
        answer: 'Homepage skills section, <a href="workflows.html">Workflows page</a>, and the <strong>Workflow Combos</strong> pack on Skills. Look for multi-step cards like Content Pipeline or Meeting Closed Loop.',
        tags: ['where', 'find', 'combo', 'workflow']
      },
      {
        question: 'What is the Content Pipeline combo?',
        answer: '<code>/content-pipeline</code> chains <strong>Notion brief → Canva design → Drive export → scheduled post</strong>. A connector combo - set up apps first via <a href="connector-setup.html">connector setup</a>.',
        tags: ['content pipeline', 'combo', 'notion', 'canva']
      },
      {
        question: 'What is the Meeting Closed Loop combo?',
        answer: '<code>/meeting-closed-loop</code> covers <strong>calendar prep → meeting notes → follow-up email → file to Drive</strong>. Popular for agencies and ops teams.',
        tags: ['meeting', 'closed loop', 'combo', 'follow up']
      },
      {
        question: "What's a good combo for e-commerce?",
        answer: 'Stack a <strong>Product template</strong> with <code>/ad-copy</code>, <code>/seo-meta</code>, and <code>/canva-social-post</code>. For full automation, see Content Pipeline on Workflows.',
        tags: ['ecommerce', 'combo', 'e-commerce', 'shop', 'product']
      },
      {
        question: "What's a good combo for founders?",
        answer: 'Try <code>/weekly-ceo-brief</code>, <code>/meeting-closed-loop</code>, <code>/research-to-doc</code>, and <code>/content-pipeline</code>. Blog guide: <a href="blog/best-skill-combos.html">best skill combos</a>.',
        tags: ['founder', 'startup', 'combo', 'ceo']
      },
      {
        question: 'Do combos require connector setup?',
        answer: 'Most featured combos are <strong>connector workflows</strong> - they need Gmail, Notion, Drive, or similar apps connected. <code>/hire-loop</code> is an exception with no connectors.',
        tags: ['combo', 'connector', 'required', 'setup']
      },

      /* Motion prompts */
      {
        question: 'What are motion prompts?',
        answer: 'Motion prompts tell AI how to <strong>animate a still image</strong> - camera moves, lighting shifts, product spins, and more. Paste into Grok Imagine, Runway, Kling, Luma, or Pika after you have a still you like.',
        tags: ['motion', 'prompt', 'video', 'animate']
      },
      {
        question: 'Which video tools work with motion prompts?',
        answer: '<strong>Grok Imagine, Runway, Kling, Luma, and Pika</strong> are the main targets. Copy from <a href="prompt-library.html">Motion prompts</a> and paste into your image-to-video tool.',
        tags: ['runway', 'kling', 'luma', 'pika', 'tools', 'video']
      },
      {
        question: 'What are Best Combo Recipes?',
        answer: 'Pre-merged motion prompts that combine camera, lighting, and subject motion in one paste - faster than stacking building blocks. Filter <strong>COMBO</strong> family on the motion library.',
        tags: ['combo recipe', 'best combo', 'motion', 'merged']
      },
      {
        question: "What's the difference between combo recipes and building blocks?",
        answer: '<strong>Combo recipes</strong> are ready-to-run full prompts. <strong>Building blocks</strong> (camera, lighting, expression) let you stack custom motion. Combos are faster; blocks give more control.',
        tags: ['building block', 'combo', 'difference', 'motion']
      },
      {
        question: 'How do I turn a template image into a video?',
        answer: 'Generate a still in <strong>Grok Imagine</strong> from a template, then copy a <strong>motion prompt</strong> from the library and paste it into your image-to-video tool to animate that still.',
        tags: ['template', 'video', 'still', 'animate', 'motion']
      },
      {
        question: 'What are Premium Transformation motion prompts?',
        answer: 'Categories 28-39 include <strong>Premium Transformations</strong> - exploded views, liquid metal morph, bullet-time, costume morph, and more. Tagged PREMIUM in the motion library.',
        tags: ['premium', 'transformation', 'motion', 'special']
      },
      {
        question: 'How do I search the motion library?',
        answer: 'Open <a href="prompt-library.html">Motion prompts</a>, use <strong>search</strong> (title, text, best for), or filter by <strong>family</strong> (Camera, Human, Atmosphere, Industry, Premium). URL params like <code>?cat=product</code> work too.',
        tags: ['search', 'motion', 'find', 'filter', 'library']
      },
      {
        question: 'What does Built from mean on a combo prompt?',
        answer: '<strong>Built from</strong> lists the building-block techniques merged into that combo recipe - useful if you want to learn what camera or lighting moves are inside.',
        tags: ['built from', 'combo', 'motion', 'ingredients']
      },
      {
        question: 'How do I request a new motion prompt?',
        answer: 'Submit via <a href="contact.html?topic=prompt">contact.html?topic=prompt</a> or the <strong>Request prompt</strong> button on the motion library page.',
        tags: ['request', 'motion', 'prompt', 'new']
      },

      /* Use cases */
      {
        question: 'Best templates and skills for e-commerce?',
        answer: '<strong>Templates:</strong> Product and Mockup categories. <strong>Skills:</strong> <code>/ad-copy</code>, <code>/canva-social-post</code>, product pack. See <a href="use-cases.html">Use cases</a> for the full map.',
        tags: ['ecommerce', 'e-commerce', 'shop', 'product', 'ads']
      },
      {
        question: 'Best templates and skills for social creators?',
        answer: '<strong>Templates:</strong> Style Edit, Filters, Make-up. <strong>Skills:</strong> <code>/linkedin-post</code>, <code>/instagram-caption</code>, <code>/content-pipeline</code>.',
        tags: ['social', 'creator', 'instagram', 'content']
      },
      {
        question: 'Best templates and skills for agencies?',
        answer: '<strong>Templates:</strong> Product, Mockup\'s, Common Uses. <strong>Skills:</strong> <code>/meeting-notes</code>, <code>/proposal-draft</code>, <code>/contract-review-loop</code>.',
        tags: ['agency', 'freelance', 'client']
      },
      {
        question: 'Best templates and skills for ops teams?',
        answer: '<strong>Templates:</strong> Common Uses for quick visuals. <strong>Skills:</strong> <code>/business-requirements</code>, <code>/status-update</code>, <code>/gmail-inbox-summarize</code> (connector).',
        tags: ['ops', 'operations', 'business', 'team']
      },

      /* Account, bundles, checkout */
      {
        question: 'What is My Library?',
        answer: '<a href="account.html">My Library</a> saves favorites and tracks purchases when you sign in. Public catalogs stay free without an account.',
        tags: ['my library', 'account', 'favorites', 'saved']
      },
      {
        question: 'How do I sign in?',
        answer: 'Click auth in the nav → <a href="login.html?signin=1">login.html</a>. Use <strong>email/password</strong> or <strong>X (Twitter) OAuth</strong> via Supabase. Optional - not required to browse.',
        tags: ['sign in', 'login', 'auth', 'twitter', 'x']
      },
      {
        question: 'What are offline template bundles?',
        answer: 'Paid <strong>download packs</strong> ($9-$79) for archiving templates offline - Starter, Product Bundle, Style Edit Vault, Creator Pro, Ultimate Library, and more. Checkout uses <strong>Dodo Payments</strong> (USD).',
        tags: ['bundle', 'offline', 'download', 'pack', 'buy']
      },
      {
        question: 'How much do template bundles cost?',
        answer: 'Bundles range from <strong>$9 to $79</strong> - Filters Pack $9, Starter $12, Product Bundle $29, Style Edit Vault $34, Creator Pro $49, Ultimate Library $79. Prices shown at checkout.',
        tags: ['price', 'bundle', 'cost', 'how much']
      },
      {
        question: 'How does checkout work?',
        answer: 'Select a plan or product, pay via <strong>Dodo Payments</strong> (card). Success page confirms payment; Pro unlocks after server verification. Receipt email if provided.',
        tags: ['checkout', 'stripe', 'paypal', 'pay', 'buy']
      },
      {
        question: 'Can I buy individual templates?',
        answer: 'À la carte pricing exists in the product catalog (roughly <strong>$1.99-$3.49</strong> by category). The main free path is one-tap Grok links on the Templates gallery.',
        tags: ['individual', 'single', 'template', 'buy']
      },

      /* Support */
      {
        question: 'How do I contact support?',
        answer: 'Email <a href="mailto:contact@xfreeze.com">contact@xfreeze.com</a>, use the <a href="contact.html">contact form</a>, or DM <a href="https://x.com/XFreeze" target="_blank" rel="noopener noreferrer">@XFreeze</a>. Pick a topic: support, template request, skill request, or partnership.',
        tags: ['contact', 'support', 'help', 'email']
      },
      {
        question: 'What is the response time for the contact form?',
        answer: 'I aim to reply within <strong>24-48 hours</strong> on business days. Template and skill requests are reviewed for weekly drops.',
        tags: ['response', 'time', 'contact', 'wait']
      },
      {
        question: 'How do I follow updates?',
        answer: 'Follow <a href="https://x.com/XFreeze" target="_blank" rel="noopener noreferrer">@XFreeze</a>, or check the About and Help pages.',
        tags: ['follow', 'updates', 'twitter', 'news']
      },
      {
        question: 'How do I support X Freeze?',
        answer: '<a href="https://buymeacoffee.com/xfreeze" target="_blank" rel="noopener noreferrer">Buy me a coffee</a> or use optional crypto wallets in the footer (SOL, BTC, ETH). Tips are voluntary - the library stays free to browse.',
        tags: ['support', 'tip', 'coffee', 'crypto', 'donate']
      },
      {
        question: 'How do I request a new skill?',
        answer: 'Use <a href="contact.html?topic=skill">contact.html?topic=skill</a> or the floating <strong>Request skill</strong> button on the Skills page. Tell me the task you want automated.',
        tags: ['request', 'skill', 'new', 'missing']
      },
      {
        question: 'How do I build my own custom skill?',
        answer: 'Open the free <a href="skill-builder.html">Skill Builder</a> from the Skills page. Answer five questions about your task, copy the generated meta-prompt, and paste it into Grok, Claude, Cursor, or ChatGPT. Your AI drafts, tests, and refines the SKILL.md with you - no backend required.',
        tags: ['build', 'custom', 'own skill', 'skill builder', 'wizard', 'create']
      },

      /* Policies */
      {
        question: 'Can I scrape or bulk-download the catalog?',
        answer: 'No aggressive scraping or misrepresenting the catalog as your own product. Personal use and normal browsing are fine. See <a href="terms.html">Terms</a> for details.',
        tags: ['scrape', 'download', 'bulk', 'terms', 'allowed']
      },
      {
        question: 'What data does X Freeze collect?',
        answer: 'Only the basics: contact form messages, optional sign-in, and normal website/tech prefs. I don’t sell your info and skills don’t send your Gmail/Drive to me. See the simple <a href="privacy.html">Privacy</a> page. Use the library for your own work - please don’t resell or redistribute it (<a href="terms.html">Terms</a>).',
        tags: ['privacy', 'data', 'collect', 'tracking', 'terms', 'resale']
      },
      {
        question: 'Is the library provided with warranties?',
        answer: 'The library is provided <strong>as-is</strong> without warranties. Outputs from Grok or other AI tools are your responsibility. Terms spell out acceptable use.',
        tags: ['warranty', 'as-is', 'terms', 'liability']
      },
      {
        question: 'Who built X Freeze?',
        answer: 'X Freeze is an independent creator project - a curated library for faster AI workflows. Not affiliated with xAI. Learn more on <a href="about.html">About</a>.',
        tags: ['who', 'built', 'creator', 'about']
      },
      {
        question: 'What if Grok changes template URLs or features?',
        answer: 'I update links when I catch breaks - report via <a href="contact.html">contact</a>. Grok controls Imagine features and pricing; I curate on top of their platform.',
        tags: ['grok', 'broken', 'url', 'change', 'update']
      },

      /* Catch-all from original FAQ */
      {
        question: 'Is this free?',
        answer: 'Browsing is <strong>completely free</strong>. Most templates, skills, and motion prompts are free to copy and use. Premium labels mark depth or Grok tier - not a hidden X Freeze charge for browsing.',
        tags: ['free', 'cost', 'price', 'money', 'charge']
      },
      {
        question: 'Do I need to write prompts from scratch?',
        answer: 'No. Templates, skills, and motion prompts are <strong>ready to copy and run</strong>. Pick what matches your task, paste it in, add your image or context, and generate.',
        tags: ['scratch', 'write', 'prompt', 'from zero']
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);