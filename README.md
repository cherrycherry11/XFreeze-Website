# XFreeze Website

Production static site for [xfreeze.com](https://xfreeze.com).

## Folder layout

```
XFreeze-Website/
├── website/          ← Deploy THIS folder to your host (or repo root = website contents)
│   ├── index.html    ← Site entry (redirects to home.html)
│   ├── home.html     ← Homepage (public)
│   ├── login.html    ← Sign in (public)
│   ├── templates.html
│   ├── skills.html
│   ├── bundles.html
│   ├── blog.html
│   ├── contact.html
│   ├── css/          ← Stylesheets
│   ├── js/           ← Scripts (auth, nav, motion…)
│   ├── data/         ← Template & product data
│   └── assets/
│       ├── images/   ← (inside assets/imagine/…)
│       └── videos/   ← Hero & section videos
├── docs/             ← Setup guides (auth, payments)
├── scripts/          ← Maintenance scripts
└── payment-server/   ← Optional Stripe/PayPal backend
```

## Deploy to xfreeze.com

1. Upload everything inside **`website/`** to your host web root (`public_html`).
2. Ensure **`index.html`** is the default page.
3. See `docs/AUTH-SETUP.md` for Supabase login.

## Local preview

```bash
cd website
python3 -m http.server 8765
```

Open http://localhost:8765/

## Rebuild this package from source

```bash
python3 scripts/build-desktop-github-package.py
```

Source project: `~/Developer/xfreeze`
