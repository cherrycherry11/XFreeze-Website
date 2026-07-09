#!/usr/bin/env python3
"""Build organized XFreeze website package for Desktop + GitHub."""

from __future__ import annotations

import re
import shutil
from pathlib import Path

SRC = Path("/Users/jeevan/Developer/xfreeze")
OUT = Path("/Users/jeevan/Desktop/XFreeze-Website")

# --- Page renames (old filename -> new filename at site root) ---
PAGE_RENAMES = {
    "xfreeze-prototype-v2.html": "home.html",
    "xfreeze-login.html": "login.html",
    "xfreeze-templates.html": "templates.html",
    "xfreeze-skills.html": "skills.html",
    "xfreeze-bundles.html": "bundles.html",
    "xfreeze-blog.html": "blog.html",
    "xfreeze-contact.html": "contact.html",
    "xfreeze-connector-setup.html": "connector-setup.html",
    "xfreeze-checkout-success.html": "checkout-success.html",
    "xfreeze-checkout-cancel.html": "checkout-cancel.html",
}

# --- CSS: old -> css/new ---
CSS_RENAMES = {
    "xfreeze-site-nav.css": "css/site-nav.css",
    "xfreeze-site-footer.css": "css/site-footer.css",
    "xfreeze-auth.css": "css/auth.css",
    "xfreeze-theme-switch.css": "css/theme-switch.css",
    "xfreeze-scroll-reveal.css": "css/scroll-reveal.css",
    "xfreeze-motion.css": "css/motion.css",
    "xfreeze-support-toast.css": "css/support-toast.css",
    "xfreeze-skills.css": "css/skills.css",
    "xfreeze-skills-browse.css": "css/skills-browse.css",
    "xfreeze-checkout.css": "css/checkout.css",
    "xfreeze-connector-setup.css": "css/connector-setup.css",
    "xfreeze-contact.css": "css/contact.css",
}

# --- JS: old -> js/new or data/new ---
JS_RENAMES = {
    "xfreeze-auth.js": "js/auth.js",
    "xfreeze-auth-config.js": "js/auth-config.js",
    "xfreeze-auth-config.example.js": "js/auth-config.example.js",
    "xfreeze-site-footer.js": "js/site-footer.js",
    "xfreeze-motion.js": "js/motion.js",
    "xfreeze-scroll-reveal.js": "js/scroll-reveal.js",
    "xfreeze-support-toast.js": "js/support-toast.js",
    "xfreeze-skills.js": "js/skills.js",
    "xfreeze-skills-browse.js": "js/skills-browse.js",
    "xfreeze-skills-browse-index.js": "data/skills-browse-index.js",
    "xfreeze-skills-config.js": "js/skills-config.js",
    "xfreeze-checkout.js": "js/checkout.js",
    "xfreeze-contact-form.js": "js/contact-form.js",
    "xfreeze-contact-config.js": "js/contact-config.js",
    "xfreeze-contact-bg.js": "js/contact-bg.js",
    "xfreeze-visual-templates-data.js": "data/visual-templates-data.js",
    "xfreeze-skills-browse-data.js": "data/skills-browse-data.js",
    "xfreeze-products.js": "data/products.js",
}

SITE_PAGES = list(PAGE_RENAMES.keys()) + ["index.html"]

EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    "archive",
    "vision-prototype",
    ".git",
    ".vercel",
}


def rm_out():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)


def copy_assets():
    shutil.copytree(SRC / "assets", OUT / "website" / "assets")
    grok_templates = SRC / "grok-templates"
    if grok_templates.exists():
        shutil.copytree(grok_templates, OUT / "website" / "grok-templates")


def copy_payment_server():
    dst = OUT / "payment-server"
    dst.mkdir(parents=True, exist_ok=True)
    for item in (SRC / "payment-server").iterdir():
        if item.name == "node_modules":
            continue
        target = dst / item.name
        if item.is_dir():
            shutil.copytree(item, target)
        else:
            shutil.copy2(item, target)


def copy_docs_and_scripts():
    shutil.copytree(SRC / "docs", OUT / "docs")
    scripts_out = OUT / "scripts"
    scripts_out.mkdir(parents=True, exist_ok=True)
    for f in (SRC / "scripts").iterdir():
        if f.name == "build-desktop-github-package.py":
            continue
        shutil.copy2(f, scripts_out / f.name)
    shutil.copy2(SRC / "scripts" / "build-desktop-github-package.py", scripts_out / "build-desktop-github-package.py")


def copy_hosting_config():
    for name in ("vercel.json", "netlify.toml", "_redirects", ".htaccess"):
        src = SRC / name
        if src.exists():
            shutil.copy2(src, OUT / "website" / name)


def copy_site_files():
    site = OUT / "website"
    (site / "css").mkdir(parents=True, exist_ok=True)
    (site / "js").mkdir(parents=True, exist_ok=True)
    (site / "data").mkdir(parents=True, exist_ok=True)

    for old_html, new_html in PAGE_RENAMES.items():
        src = SRC / old_html
        if src.exists():
            shutil.copy2(src, site / new_html)

    if (SRC / "index.html").exists():
        shutil.copy2(SRC / "index.html", site / "index.html")

    for old, new in CSS_RENAMES.items():
        src = SRC / old
        if src.exists():
            shutil.copy2(src, site / new)

    for old, new in JS_RENAMES.items():
        src = SRC / old
        if src.exists():
            shutil.copy2(src, site / new)

    skills_packs = SRC / "data" / "skills-packs"
    if skills_packs.exists():
        dst = site / "data" / "skills-packs"
        if dst.exists():
            shutil.rmtree(dst)
        shutil.copytree(skills_packs, dst)

    for name in ("skills-catalog.json", "skills-outcome-taxonomy.json", "skills-roadmap-1000.json"):
        src = SRC / "data" / name
        if src.exists():
            shutil.copy2(src, site / "data" / name)


def apply_replacements():
    site = OUT / "website"
    replacements: list[tuple[str, str]] = []

    for old, new in PAGE_RENAMES.items():
        replacements.append((old, new))
    for old, new in CSS_RENAMES.items():
        replacements.append((old, new))
    for old, new in JS_RENAMES.items():
        replacements.append((old, new))

    # index + hosting defaults
    replacements.extend(
        [
            ("xfreeze-prototype-v2.html", "home.html"),
            ("loginPath: 'xfreeze-login.html'", "loginPath: 'login.html'"),
            ("loginPath: \"xfreeze-login.html\"", "loginPath: \"login.html\""),
            ("defaultRedirect: 'xfreeze-prototype-v2.html'", "defaultRedirect: 'home.html'"),
            ("defaultRedirect: \"xfreeze-prototype-v2.html\"", "defaultRedirect: \"home.html\""),
            ("'xfreeze-login.html'", "'login.html'"),
            ("'xfreeze-prototype-v2.html'", "'home.html'"),
            ("xfreeze-login.html?signin=1", "login.html?signin=1"),
            ("url=xfreeze-prototype-v2.html", "url=home.html"),
            ("replace('xfreeze-prototype-v2.html')", "replace('home.html')"),
            ("/xfreeze-prototype-v2.html", "/home.html"),
            ("/xfreeze-login.html", "/login.html"),
        ]
    )

    protected_old = [
        "xfreeze-templates.html",
        "xfreeze-skills.html",
        "xfreeze-bundles.html",
        "xfreeze-blog.html",
        "xfreeze-contact.html",
        "xfreeze-connector-setup.html",
    ]
    protected_new = [
        "templates.html",
        "skills.html",
        "bundles.html",
        "blog.html",
        "contact.html",
        "connector-setup.html",
    ]
    for o, n in zip(protected_old, protected_new):
        replacements.append((o, n))

    # Sort longest first to avoid partial replacements
    replacements.sort(key=lambda x: len(x[0]), reverse=True)

    text_ext = {".html", ".js", ".css", ".json", ".toml", ".md", ".example.js"}
    for path in site.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix not in text_ext and path.name not in ("_redirects", ".htaccess"):
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in replacements:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")


def write_readme():
    readme = """# XFreeze Website

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
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")


def write_gitignore():
    gitignore = """# dependencies
node_modules/
payment-server/node_modules/

# build
.next/
out/
dist/

# env & secrets
.env
.env.local
.env*.local
payment-server/.env

# OS
.DS_Store
Thumbs.db

# logs
*.log
npm-debug.log*

# typescript
*.tsbuildinfo

# vercel
.vercel
"""
    (OUT / ".gitignore").write_text(gitignore, encoding="utf-8")


def main():
    print(f"Building {OUT} ...")
    rm_out()
    (OUT / "website").mkdir(parents=True)
    copy_site_files()
    copy_assets()
    copy_hosting_config()
    copy_docs_and_scripts()
    copy_payment_server()
    apply_replacements()
    write_readme()
    write_gitignore()
    print("Done.")
    print(f"  Desktop folder: {OUT}")
    print(f"  Deploy folder:  {OUT / 'website'}")


if __name__ == "__main__":
    main()
