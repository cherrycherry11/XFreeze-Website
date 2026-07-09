#!/usr/bin/env python3
"""Fetch missing Filters templates from Grok and update visual-templates-data.js."""

from __future__ import annotations

import json
import re
import ssl
import time
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
WEBSITE_ROOT = Path("/Users/jeevan/Desktop/XFreeze-Website/website")
DATA_FILES = [
    ROOT / "xfreeze-visual-templates-data.js",
    WEBSITE_ROOT / "data" / "visual-templates-data.js",
]
IMG_DIRS = [
    WEBSITE_ROOT / "grok-templates" / "filters",
    ROOT / "grok-templates" / "filters",
]
CAT = "Filters"

MISSING_IDS = [
    "0a4e1417-1909-480e-82fa-efabc488defe",
    "5d1c1674-e2cf-4204-9d12-b0a7ed90e930",
    "0f531ea1-9818-4faf-8ea0-f2d436a4ab34",
    "f15ce782-2cf1-43cc-889c-0fe04480c569",
    "e5b3d340-6641-4cc7-a674-bc64dc9b4fa9",
    "0ca76112-dfff-417d-9420-871311cc263f",
    "077af749-79b4-4675-bf65-64e793c251df",
    "7523edde-cacb-431e-9c0f-0c71a3ababb8",
    "fc4ce1c4-6ab5-4f79-9237-64c6a78beca4",
    "a1b88d32-cd09-4dfd-b1ae-93e9c6f844e7",
]

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
CTX = ssl.create_default_context()


def load_existing(path: Path) -> list:
    raw = path.read_text()
    m = re.search(r"const visualTemplates = (\[[\s\S]*\]);", raw)
    if not m:
        raise SystemExit(f"Could not parse visualTemplates in {path}")
    return json.loads(m.group(1))


def write_all(path: Path, items: list) -> None:
    body = json.dumps(items, indent=2, ensure_ascii=False).replace("    ", "  ")
    path.write_text(
        "// Auto-generated from Grok Imagine template pages\n"
        f"const visualTemplates = {body};\n"
    )


def clean_name(name: str) -> str:
    name = re.sub(r"\s*Template\s*—\s*Grok Imagine\s*$", "", name, flags=re.I)
    name = re.sub(r"\s*—\s*Grok Imagine\s*$", "", name, flags=re.I)
    name = re.sub(r"\s*Template\s*$", "", name, flags=re.I)
    return name.strip()


def fetch_meta(template_id: str) -> dict:
    url = f"https://grok.com/imagine/templates/{template_id}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=45) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    img = None
    title = None

    m = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    if m:
        img = m.group(1)

    m = re.search(r'property="og:title"\s+content="([^"]+)"', html)
    if m:
        title = m.group(1).strip()

    if not img:
        m = re.search(
            r"https://imagine-public\.x\.ai/imagine-public/share-images/template-[^\"']+",
            html,
        )
        if m:
            img = m.group(0)

    if not title:
        m = re.search(r"<title>([^<]+)</title>", html, re.I)
        if m:
            title = re.sub(r"\s*[-|].*$", "", m.group(1)).strip()

    return {
        "link": url,
        "img": img or "",
        "name": clean_name(title or "Filter Template"),
    }


def download_image(url: str, dest: Path) -> bool:
    if not url:
        return False
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as resp:
        data = resp.read()
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return True


def ext_from_url(url: str) -> str:
    path = urlparse(url).path.lower()
    for ext in (".jpg", ".jpeg", ".png", ".webp"):
        if path.endswith(ext):
            return ".jpg" if ext == ".jpeg" else ext
    return ".png"


def append_filter_entries(items: list, new_entries: list) -> list:
    existing_links = {t["link"] for t in items if t.get("cat") == CAT}
    filters = [t for t in items if t.get("cat") == CAT]
    other = [t for t in items if t.get("cat") != CAT]

    for entry in new_entries:
        if entry["link"] not in existing_links:
            filters.append(entry)
            existing_links.add(entry["link"])

    return filters + other


def main():
    for d in IMG_DIRS:
        d.mkdir(parents=True, exist_ok=True)

    data_path = DATA_FILES[1] if DATA_FILES[1].exists() else DATA_FILES[0]
    items = load_existing(data_path)

    filter_codes = [
        int(re.search(r"F-(\d+)", t["code"]).group(1))
        for t in items
        if t.get("code", "").startswith("F-")
    ]
    next_code = max(filter_codes) + 1

    new_entries = []
    for i, template_id in enumerate(MISSING_IDS, start=1):
        url = f"https://grok.com/imagine/templates/{template_id}"
        try:
            meta = fetch_meta(template_id)
            code = f"F-{next_code}"
            next_code += 1
            ext = ext_from_url(meta["img"])
            filename = f"{code}{ext}"
            rel_img = f"grok-templates/filters/{filename}"

            if meta["img"]:
                dest = IMG_DIRS[0] / filename
                download_image(meta["img"], dest)
                if IMG_DIRS[1] != IMG_DIRS[0]:
                    (IMG_DIRS[1] / filename).write_bytes(dest.read_bytes())

            entry = {
                "code": code,
                "cat": CAT,
                "name": meta["name"],
                "link": url,
                "img": rel_img if meta["img"] else "",
            }
            new_entries.append(entry)
            print(f"  [{i}/{len(MISSING_IDS)}] {code} {meta['name'][:70]}")
        except Exception as exc:
            print(f"  [{i}] ERROR {template_id}: {exc}")
            entry = {
                "code": f"F-{next_code}",
                "cat": CAT,
                "name": f"Filter Template {next_code}",
                "link": url,
                "img": "",
            }
            next_code += 1
            new_entries.append(entry)
        time.sleep(0.35)

    updated = append_filter_entries(items, new_entries)
    filter_count = sum(1 for t in updated if t.get("cat") == CAT)
    print(f"Filters: {filter_count} | Total: {len(updated)}")

    for path in DATA_FILES:
        if path.parent.exists():
            write_all(path, updated)
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()