#!/usr/bin/env python3
"""Fetch missing Product templates from Grok and update visual-templates-data.js."""

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
IMG_DIR = WEBSITE_ROOT / "grok-templates" / "product"
IMG_DIR_DEV = ROOT / "grok-templates" / "product"
CAT = "Product"

MISSING_IDS = [
    "bfebb4e9-bbd0-4131-8f7c-510335110ad9",
    "05de1189-4337-4f17-90a1-9f01a8748b9f",
    "0698e595-e660-4724-8c71-4f87dbdb5b07",
    "beb0362b-195a-4c49-b254-73f2c9918fe4",
    "93c84381-d678-4dce-8a59-ce65d6684c4f",
    "0a907b4a-fa88-460e-918d-f0c0ae0b3ece",
    "e818bb01-53b9-4787-91ae-02a1a77ea93f",
    "9d3d754b-e178-4dc6-b506-676bec851bca",
    "7d654d64-9f48-4cc5-99c0-8c602bb54af9",
    "836317a4-005c-4bd7-bda8-e20b06304bc8",
    "81314d9e-d621-4457-aa81-20a6dbcc9fc1",
    "23239a98-2639-4396-9edf-dab5d9469bc6",
    "09df46d2-2398-4945-8369-0c21f40b48b2",
    "ccfd8b9a-0ee3-4cd0-9161-0ecbdca7b18d",
    "d9eff1f5-714b-4cea-812a-62c1ececd9af",
    "5edc794a-fc66-4c79-b77a-749dd438dcc4",
    "2c6a26b9-2276-4da5-a004-ae31be21f053",
    "3cf597ad-867c-46ee-adba-59604ee45220",
    "c502f0e1-fbc8-45e1-9f99-c09eed6f25bb",
    "a243c601-0131-4327-b46a-1b688a8c6359",
    "7986fc0f-d20d-4799-8d13-27f5ade9c9f9",
    "98d4fce7-81df-478e-901e-0c57fbe0530d",
    "134e7427-b622-4594-8b16-4147025889fd",
    "e55cc6f3-520f-4411-8b9a-db8e99b48b82",
    "0127e9ab-4b9b-4e8e-befa-3a0ca9f23d6e",
    "d4d23e73-a3e9-4ba9-9fa3-93c2567f5353",
    "b25f5203-a585-4567-89f2-2eb8521c345d",
    "010a74c2-50fd-4b3d-93a5-a3f444ecca10",
    "3bcee77d-3186-4fbb-a1ef-53a9a476303e",
    "af210115-c0cd-417f-9853-2ed2679ea0a7",
    "483e50bd-2349-4496-a0ed-8a2aaa041698",
    "357597d6-86e9-42cd-8694-676a676aeb10",
    "d94d1b40-7549-4b28-822f-facf68c9a2a5",
    "d75546f3-5155-4f1e-9e56-79483fba04a3",
    "64aff93e-b8af-49c6-9af2-799a2b82b2f8",
    "0cdccf4e-b056-47f4-9685-3580f6096b7b",
    "e1921763-20eb-4777-b821-75c3ca7d8837",
    "c0d79322-cef7-4c21-9fe2-04daf0d16e2b",
    "a5dec1db-fae0-4ddd-829e-2bd8737359e6",
    "4b012230-d410-4461-a5ea-04cc34e07668",
    "f399cd88-3ef7-40d5-acf8-33d349f3b230",
    "ddd8b27b-d4bc-4b43-838b-5eaed677fc23",
    "edff960c-3f1b-4ae8-b264-74a0071438eb",
    "07ef8172-d971-4641-8735-501251dc1c9c",
    "ccb197c7-4ec7-44ea-86fc-2971ba78b6eb",
    "af361c7c-e5ff-4474-9cfd-3ee80631ad57",
    "f63ed240-01ab-4c0b-89bb-263b43922cab",
    "c8a0c14c-8a52-4335-b97d-8f4a6d4f8879",
    "4140d11c-f961-4ff9-b40e-785388d4c85a",
    "d5ed25db-06ad-4e06-a1a7-09f78671468c",
    "aaa451fe-9f7b-421a-afa2-8067c6c3ab49",
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
    body = json.dumps(items, indent=2, ensure_ascii=False)
    body = body.replace("    ", "  ")
    path.write_text(
        "// Auto-generated from Grok Imagine template pages\n"
        f"const visualTemplates = {body};\n"
    )


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
        "name": title or "Product Template",
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
    return ".jpg"


def insert_product_entries(items: list, new_entries: list) -> list:
    """Insert first missing entry after P-21; append the rest after Product block."""
    if not new_entries:
        return items

    first_entry = new_entries[0]
    rest = new_entries[1:]
    non_product = [t for t in items if t.get("cat") != CAT]
    product = [t for t in items if t.get("cat") == CAT]
    existing_links = {t["link"] for t in product}

    rebuilt_product = []
    for t in product:
        rebuilt_product.append(t)
        if t.get("code") == "P-21" and first_entry["link"] not in existing_links:
            rebuilt_product.append(first_entry)
            existing_links.add(first_entry["link"])

    for entry in rest:
        if entry["link"] not in existing_links:
            rebuilt_product.append(entry)
            existing_links.add(entry["link"])

    return rebuilt_product + non_product


def main():
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    IMG_DIR_DEV.mkdir(parents=True, exist_ok=True)

    data_path = DATA_FILES[1] if DATA_FILES[1].exists() else DATA_FILES[0]
    items = load_existing(data_path)

    existing_links = {
        t["link"].split("/")[-1]
        for t in items
        if t.get("cat") == CAT
    }

    product_codes = [
        int(re.search(r"P-(\d+)", t["code"]).group(1))
        for t in items
        if t.get("code", "").startswith("P-")
    ]
    next_code = max(product_codes) + 1

    new_entries = []
    for i, template_id in enumerate(MISSING_IDS, start=1):
        if template_id in existing_links:
            print(f"  skip existing {template_id}")
            continue

        url = f"https://grok.com/imagine/templates/{template_id}"
        try:
            meta = fetch_meta(template_id)
            code = f"P-{next_code}"
            next_code += 1
            ext = ext_from_url(meta["img"])
            filename = f"{code}{ext}"
            rel_img = f"grok-templates/product/{filename}"

            if meta["img"]:
                dest_web = IMG_DIR / filename
                dest_dev = IMG_DIR_DEV / filename
                download_image(meta["img"], dest_web)
                if dest_dev != dest_web:
                    dest_dev.write_bytes(dest_web.read_bytes())

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
                "code": f"P-{next_code}",
                "cat": CAT,
                "name": f"Product Template {next_code}",
                "link": url,
                "img": "",
            }
            next_code += 1
            new_entries.append(entry)
        time.sleep(0.35)

    if not new_entries:
        print("Nothing new to add.")
        return

    updated = insert_product_entries(items, new_entries)
    product_count = sum(1 for t in updated if t.get("cat") == CAT)
    print(f"Product templates: {product_count}")

    for path in DATA_FILES:
        if path.parent.exists():
            write_all(path, updated)
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()