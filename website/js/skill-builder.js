/**
 * X Freeze Skill Builder - client-side meta-prompt assembly
 */
(function (global) {
  'use strict';

  var PROCESS_BLOCK =
    '## Your process\n\n' +
    '### Step 1 - Clarify only if truly necessary\n' +
    'If my description above is too vague to draft from, ask me ONE question that would change what you write. If it is specific enough, skip straight to drafting - do not stall on questions I have already answered.\n\n' +
    '### Step 2 - Draft the skill\n' +
    'Write a complete SKILL.md using this exact structure:\n\n' +
    '- YAML frontmatter: `name` (kebab-case), `description` (one sentence plus natural-language trigger phrases and the /slash-command), `metadata` block with `category`, `type` (base/connector/premium), `cadence`, `risk`, and `connectors`/`integrations` lines ONLY if live app access was named above.\n' +
    '- `# /skill-name` heading, one-line restatement of what it produces.\n' +
    '- `## Works with` - state plainly that this is a portable SKILL.md that works in Grok, Claude, Cursor, ChatGPT, Codex, VS Code, Gemini, or any tool that takes reusable instructions, with a fallback for tools that do not support slash commands.\n' +
    '- `## When to use` - the specific real situation, not a generic restatement of the task.\n' +
    '- `## Inputs to gather` - check context first, ask at most one question if something critical is missing.\n' +
    '- `## Connector access` (only if live app access was named above) - tool-neutral instructions to check the AI\'s own connector/integration settings (never assume one specific tool\'s mechanism), name the required app(s), give example tool names, and state plainly: never claim to have accessed something without a successful tool call.\n' +
    '- `## Safety` (only if sensitivity level is medium/high, or connector access is involved) - propose-before-acting language, and if the sensitivity is legal/financial/health/hiring-related, an explicit "this is a draft for your own review, not professional advice" line.\n' +
    '- `## Workflow` - 4-8 concrete, specific steps. Every step must describe what actually happens for THIS task - no placeholder steps like "gather inputs" or "analyze systematically" that could apply to any skill.\n' +
    '- `## Output format` - the exact structure of the finished deliverable (headers, table columns, checklist items) - specific to this task, never a generic "Summary / Findings / Recommendations" unless that is genuinely the right shape.\n' +
    '- `## Do` / `## Don\'t` - 2-3 each, specific pitfalls for this exact task.\n' +
    '- `## Quality check` - a short checklist including "works outside Grok" and, if applicable, "connector access verified before claiming results."\n\n' +
    'Apply this test before showing it to me: if someone swapped the skill\'s name for a different task, would the Workflow and Output format sections still read as correct? If yes, they are too generic - rewrite them specific to my actual task before presenting.\n\n' +
    '### Step 3 - Show me the draft, then make me test it for real\n' +
    'After presenting the draft, do not ask "does this look good?" Instead say: "Try this on a real example from your actual work right now, and tell me exactly what happened - what it got right, what it got wrong, and what felt off." Wait for my real test result before changing anything.\n\n' +
    '### Step 4 - Refine surgically\n' +
    'Based on what I report, change only the specific section(s) that caused the problem. Do not rewrite the whole skill from scratch each round - that loses the parts that were already working. Keep a running one-line note of what changed and why.\n\n' +
    '### Step 5 - Know when to stop\n' +
    'After I confirm two tests in a row worked with no complaints, or I say it is good, stop iterating. Give me the final clean version in a single code block, ready to save as a `.md` file, with no further commentary needed.\n\n' +
    'Begin with Step 1.';

  function sensitivityLine(level) {
    if (level === 'somewhat') {
      return 'Somewhat sensitive - touches money or decisions with real consequences; include a light propose-before-acting note in the skill.';
    }
    if (level === 'high') {
      return 'High sensitivity - legal, financial, health, or hiring related; include full disclaimer language and an explicit "not professional advice" line in the skill.';
    }
    return '';
  }

  function assembleMetaPrompt(data) {
    var parts = [
      'You are helping me build a custom AI skill - a reusable SKILL.md file I can paste into any AI tool to run this exact task the same way every time. Follow this process exactly: draft, then help me test it for real, then refine it based on what actually happens. Do not just write one version and call it done.',
      '## What I need this skill to do\n' + data.task
    ];

    if (data.inputs) {
      parts.push('## What information it needs to gather before running\n' + data.inputs);
    }

    if (data.output) {
      parts.push('## What the finished output should look like\n' + data.output);
    }

    if (data.connectorApps) {
      parts.push('## Live app access needed\nYes - needs live access to: ' + data.connectorApps);
    }

    var sens = sensitivityLine(data.sensitivity);
    if (sens) {
      parts.push('## Sensitivity level\n' + sens);
    }

    parts.push('---');
    parts.push(PROCESS_BLOCK);

    return parts.join('\n\n');
  }

  function getFormData(root) {
    var taskEl = root.querySelector('[data-sb-task]');
    var inputsEl = root.querySelector('[data-sb-inputs]');
    var outputEl = root.querySelector('[data-sb-output]');
    var connectorYes = root.querySelector('[data-sb-connector][data-val="yes"]');
    var connectorAppsEl = root.querySelector('[data-sb-connector-apps]');
    var sensitivityEl = root.querySelector('[data-sb-sensitivity].is-selected');

    var connectorOn = connectorYes && connectorYes.classList.contains('is-selected');
    var connectorApps = connectorOn && connectorAppsEl ? connectorAppsEl.value.trim() : '';

    return {
      task: taskEl ? taskEl.value.trim() : '',
      inputs: inputsEl ? inputsEl.value.trim() : '',
      output: outputEl ? outputEl.value.trim() : '',
      connectorApps: connectorApps,
      sensitivity: sensitivityEl ? sensitivityEl.getAttribute('data-val') : 'routine'
    };
  }

  function setPillGroup(root, group, value) {
    root.querySelectorAll('[data-sb-' + group + ']').forEach(function (pill) {
      pill.classList.toggle('is-selected', pill.getAttribute('data-val') === value);
    });

    var connectorField = root.querySelector('[data-sb-connector-field]');
    if (group === 'connector' && connectorField) {
      connectorField.hidden = value !== 'yes';
    }
  }

  function showResult(root, text) {
    var panel = root.querySelector('[data-sb-result]');
    var pre = root.querySelector('[data-sb-result-text]');
    if (!panel || !pre) return;

    pre.textContent = text;
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var label = btn.querySelector('[data-sb-copy-label]');
      var prev = label ? label.textContent : btn.textContent;
      btn.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
      else btn.textContent = 'Copied';
      if (global.XFreezeSupportToast) {
        global.XFreezeSupportToast.show({
          context: 'copy',
          subtitle: 'Paste into Grok, Claude, Cursor, or ChatGPT to build your skill.'
        });
      }
      setTimeout(function () {
        btn.classList.remove('is-copied');
        if (label) label.textContent = prev;
        else btn.textContent = prev;
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        window.prompt('Copy this prompt:', text);
      });
      return;
    }

    window.prompt('Copy this prompt:', text);
  }

  function bind(root) {
    root.querySelectorAll('[data-sb-connector], [data-sb-sensitivity]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var group = pill.hasAttribute('data-sb-connector') ? 'connector' : 'sensitivity';
        setPillGroup(root, group, pill.getAttribute('data-val'));
      });
    });

    var form = root.querySelector('[data-sb-form]');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var data = getFormData(root);
        var errorEl = root.querySelector('[data-sb-error]');

        if (!data.task) {
          if (errorEl) {
            errorEl.hidden = false;
            errorEl.textContent = 'Describe the task first - be specific about what the skill should do.';
          }
          var taskInput = root.querySelector('[data-sb-task]');
          if (taskInput) taskInput.focus();
          return;
        }

        if (errorEl) errorEl.hidden = true;

        var prompt = assembleMetaPrompt(data);
        showResult(root, prompt);
      });
    }

    var copyBtn = root.querySelector('[data-sb-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var pre = root.querySelector('[data-sb-result-text]');
        if (!pre || !pre.textContent) return;
        copyText(pre.textContent, copyBtn);
      });
    }
  }

  function init() {
    var root = document.getElementById('xf-skill-builder');
    if (!root) return;
    bind(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.XFreezeSkillBuilder = { assembleMetaPrompt: assembleMetaPrompt, init: init };
})(window);