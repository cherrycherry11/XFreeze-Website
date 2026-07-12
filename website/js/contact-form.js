/**
 * X Freeze contact form - Formspree, Web3Forms, or mailto fallback
 */
(function () {
  'use strict';

  function config() {
    return window.XFreezeContactConfig || {};
  }

  function isConfigured() {
    var c = config();
    if (c.provider === 'web3forms' && c.web3formsAccessKey) return true;
    if (c.provider === 'formspree' && c.formspreeId) return true;
    return false;
  }

  function showStatus(message, type) {
    var el = document.getElementById('contact-form-status');
    if (!el) return;
    el.textContent = message;
    el.className = 'contact-form-status is-visible is-' + type;
  }

  function hideStatus() {
    var el = document.getElementById('contact-form-status');
    if (el) el.className = 'contact-form-status';
  }

  var TOPIC_PLACEHOLDERS = {
    general: 'Tell me what you need help with…',
    support: 'Describe the issue and where you saw it…',
    template: 'Describe the template you need (category, style, product type, use case)…',
    skill: 'Describe the skill or workflow you want (tool, task, integrations)…',
    prompt: 'Describe the motion prompt or category you need (camera move, subject, mood)…',
    partnership: 'Tell me about your partnership idea…',
  };

  function setTopic(value) {
    var select = document.getElementById('contact-topic');
    if (!select || !value) return;
    if (!select.querySelector('option[value="' + value + '"]')) value = 'general';
    select.value = value;
    var message = document.getElementById('contact-message');
    if (message && !message.value.trim()) {
      message.placeholder = TOPIC_PLACEHOLDERS[value] || TOPIC_PLACEHOLDERS.general;
    }
    document.querySelectorAll('[data-contact-intent]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-contact-intent') === value);
    });
  }

  function initTopic() {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get('topic');
    setTopic(topic || 'general');

    var hint = params.get('hint');
    if (hint) {
      var message = document.getElementById('contact-message');
      if (message && !message.value.trim()) {
        message.placeholder = decodeURIComponent(hint.replace(/\+/g, ' '));
      }
    }
  }

  function initIntents() {
    document.querySelectorAll('[data-contact-intent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTopic(btn.getAttribute('data-contact-intent'));
      });
    });
    var select = document.getElementById('contact-topic');
    if (select) {
      select.addEventListener('change', function () {
        setTopic(select.value);
      });
    }
  }

  function initFaq() {
    document.querySelectorAll('[data-faq-trigger]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.contact-faq-item');
        if (!item) return;
        var isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.contact-faq-item').forEach(function (el) {
          el.classList.remove('is-open');
          var trigger = el.querySelector('[data-faq-trigger]');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    hideStatus();

    var form = event.target;
    if (!form.reportValidity()) return;

    var c = config();
    var data = new FormData(form);
    var name = data.get('name') || '';
    var email = data.get('email') || '';
    var topic = data.get('topic') || 'General';
    var message = data.get('message') || '';
    var submitBtn = document.getElementById('contact-submit-btn');

    if (submitBtn) submitBtn.disabled = true;

    var payload = new FormData();
    payload.append('name', name);
    payload.append('email', email);
    payload.append('topic', topic);
    payload.append('message', message);
    payload.append('_subject', 'X Freeze contact: ' + topic);
    payload.append('_replyto', email);

    try {
      if (!isConfigured()) {
        var body = ['Name: ' + name, 'Email: ' + email, 'Topic: ' + topic, '', message].join('\n');
        window.location.href =
          'mailto:' +
          encodeURIComponent(c.fallbackEmail || 'contact@xfreeze.com') +
          '?subject=' +
          encodeURIComponent('X Freeze - ' + topic) +
          '&body=' +
          encodeURIComponent(body);
        showStatus('Opening your mail app. Add a Formspree or Web3Forms key in js/contact-config.js for inbox delivery.', 'success');
        return;
      }

      var endpoint;
      if (c.provider === 'web3forms') {
        endpoint = 'https://api.web3forms.com/submit';
        payload.append('access_key', c.web3formsAccessKey);
      } else {
        endpoint = 'https://formspree.io/f/' + c.formspreeId;
      }

      var res = await fetch(endpoint, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      var json = {};
      try {
        json = await res.json();
      } catch (err) {}

      if (!res.ok) {
        throw new Error(json.error || json.message || 'Could not send message. Try again or email me directly.');
      }

      form.reset();
      setTopic('general');
      showStatus("Message sent. I'll reply within 24-48 hours.", 'success');
    } catch (error) {
      showStatus(error.message || 'Something went wrong. Email contact@xfreeze.com directly.', 'error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  function init() {
    var setup = document.getElementById('contact-form-setup');
    if (setup && !isConfigured()) setup.classList.add('is-visible');

    var form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', handleSubmit);

    initTopic();
    initIntents();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();