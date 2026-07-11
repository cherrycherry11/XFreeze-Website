# XFreeze Website

Production static site for [xfreeze.com](https://xfreeze.com).

## Folder layout

```
XFreeze-Website/
├── website/          ← Deploy THIS folder to your host
│   ├── index.html    ← Entry (redirects to home.html)
│   ├── home.html
│   ├── login.html / signup.html
│   ├── templates.html, prompt-library.html, skills.html
│   ├── css/  js/  data/  assets/  grok-templates/
├── docs/             ← AUTH-SETUP.md, PAYMENT-SETUP.md
├── scripts/          ← Optional skills sync helpers
└── payment-server/   ← Optional Stripe/PayPal backend
```

## Deploy

1. Upload everything inside **`website/`** to your web root.
2. Default page: **`index.html`**.
3. Auth: see `docs/AUTH-SETUP.md`.

## Local preview

```bash
cd website
python3 -m http.server 8765
```

Open http://localhost:8765/
