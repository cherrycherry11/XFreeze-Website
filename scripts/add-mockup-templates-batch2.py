#!/usr/bin/env python3
"""Fetch missing Mockup templates (#124+) and rename category to Mockup's."""

from __future__ import annotations

import json
import re
import ssl
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEBSITE_ROOT = Path("/Users/jeevan/Desktop/XFreeze-Website/website")
DATA_FILES = [
    ROOT / "xfreeze-visual-templates-data.js",
    WEBSITE_ROOT / "data" / "visual-templates-data.js",
]
OLD_CAT = "Mock up's"
CAT = "Mockup's"

MISSING_IDS = [
    "a85ccf70-e3b8-4e1a-bd03-43710df04295",
    "1ed0a544-4af8-4cb4-a8aa-f68e8854383c",
    "641bd647-93bf-4361-88ae-9b9377e5497f",
    "406951cc-2cde-4a09-8e66-f9d3a9838994",
    "25ec6d8d-b173-4c6e-9604-0dd3b7812203",
    "c0597e9c-e3a5-4a62-8c98-8a9e7289de76",
    "1c94cdf3-82b4-4964-8630-3c8ee88f53d2",
    "60bb841e-aad3-4686-899f-3e93475d6405",
    "13735c62-be24-402c-9a78-858d28c081fd",
    "0ae90ab8-c479-40cd-ac6d-8817cd056a7b",
    "de856bea-a0cd-46c0-81e2-b7ee8f9689b2",
    "7e2a9253-1888-41aa-bfba-ef3ef8ef6029",
    "a85b21b8-318e-451e-a04f-7ed6e85940e1",
    "6c72fe0e-82a5-486c-a7bf-fd772d97ec6b",
    "031d9901-bbce-46ca-bd0f-f66ddabefd3e",
    "c15b2b52-351b-4c10-99c8-61d0b47dd319",
    "14dd10df-76f9-421d-bf7c-0b648f77f807",
    "d763221b-54dc-44ef-97e0-ed5593c9945d",
    "6ea67dfd-9356-482e-b4d3-1248b23b3b40",
    "08cb26ed-3d35-41e5-879b-e0d7f9d8eb01",
    "f28c7be1-f841-41c1-adc1-e1f52e3f1989",
    "faf0d525-1a2b-4637-a205-04d0009d2d79",
    "e9f1b020-2eae-4ac8-a86c-278f0d5748aa",
    "b53c9a9c-be58-44f9-89eb-fdca7d9eba6f",
    "411c277f-bba8-4f1a-ab46-93127f8a4fd4",
    "07c12cdd-3e58-4c74-9530-ad2d05a5714b",
    "2aa460c0-7cc3-48fc-9bb5-fb85270d114b",
    "41e68b6d-5dfd-4b23-9af5-56a4c65880fd",
    "e436c3f4-3641-436d-9426-b1dd9d967fdc",
    "6bbb11b0-dfd7-4b7d-8975-064282d93857",
    "f79726b0-2e30-4367-a3ed-975a3638f1ac",
    "35666456-8395-406a-a6fa-56185c82b927",
    "bd9aca82-6164-4acc-940f-40e7186b4316",
    "9a19bd9d-ef3c-4aee-b706-4338da5cd29c",
    "3cc5ad5a-ffbf-4ff8-9672-5a87666da770",
    "9ad25655-dacb-4e25-b20a-4c4256761049",
    "5d7441e3-0a83-4e1c-ae75-442dc3776bcf",
    "ea6cd091-7e6b-44f9-8b23-64231225d195",
    "0c419fbc-64e1-44e9-928d-80ec877c8526",
    "ac9ff1e5-d0dd-4d75-92ea-1a6106bc8a6f",
    "8f815d21-b9b0-4b6d-9bfe-39712dd37cca",
    "ea1c72b4-4580-496c-a106-2c5e1f4eb935",
    "e69d08b0-6cc1-440a-9da0-7b32201a4a25",
    "474f2eb4-eb00-4417-8586-dbff8406515c",
    "6e065905-80e5-4c63-9921-56f2a2d234b0",
    "8a995486-18a8-455a-9bb9-ede9dec45f5b",
    "43a2804d-3ac1-4b8e-a2ee-69c96006cef1",
    "b5307bc2-7362-4ec8-bb75-e99b619f7c80",
    "437b7a49-669b-4c42-a532-1f18d0d7ae6e",
    "f8a6af55-33f0-4456-baa1-0f6975f78cf9",
    "ea49ff33-0943-4c15-a00e-c623f1a2a0df",
    "ddb73d7a-8e0c-4fb1-91b4-e4aa98ec2803",
    "808aa865-e2fa-423e-b413-a091abd62cb6",
    "eb96acb0-a55e-44a2-9452-62737945e92d",
    "d2ddaf6c-e4ad-4c3e-89eb-9918baaa2d37",
    "4804e711-bebc-402c-8dc9-08f490792e9b",
    "bc58956f-5cee-4e85-8445-a38521ce8716",
    "af79f97b-4921-4d0e-9c50-6fb459c861b0",
    "8789494d-fcb9-4e5e-be95-5af232b85f21",
    "a6ada8d5-7553-4498-b48b-b0363b8884a0",
    "5880bd17-d186-4382-90fc-449d47789647",
    "a20abdae-02ea-40ef-8632-4e4b4c5f6c3a",
    "cc80975d-1fc2-4d0d-8989-85b2da17f2cc",
    "68ccdd73-b770-419e-a050-fe4150511b4c",
    "e066aba3-7228-4ebc-81d8-08e329d1f307",
    "2b6391b8-5ab2-42d3-a4aa-91ee898b07f5",
    "f5287836-2867-44ab-ad45-05b26bfd2bf3",
    "77d302d2-e008-478f-a228-5a29731dac40",
    "7d0d88f4-bab3-4f19-9bf7-cb7679b8187e",
    "76dd8d27-f413-4eb1-8535-55d977a5e333",
    "c0d4ca9f-6171-4a14-af61-ab62b47143ed",
    "da6c8976-9383-4ba0-9525-7464f71b2d88",
    "e30d0136-1a89-4925-8c7f-ac84cedcfe2a",
    "b4dff480-0fcd-4b69-88a7-badac74f4c91",
    "ce486ed1-e146-42ac-8b47-64b10e8e8993",
    "4dc385f8-0e09-479e-947d-4fea69ac66e6",
    "29de0014-b83e-4e5f-89a2-a705ed6d86c6",
    "c617f1bd-cc48-4898-9399-c9d58ee01577",
    "6708da48-633f-4383-89f9-0ae208e9c810",
    "b80caeee-1f24-4a79-b61c-3df8e01b94b1",
    "8d0eaf94-6b53-454b-ab56-c4fbe86baea2",
    "d6a48d3e-ecb8-4dea-880c-db4fdb69d945",
    "3dea4301-4d08-4be4-a027-72e8680bf451",
    "994d9ae2-0c27-4f45-8d00-dce7015468d5",
    "cc1ecd5f-8310-40ed-bce5-5809bc6a8749",
    "85f0f203-51b6-4c26-92ce-9377489cc11b",
    "7c86c04d-861d-4f7c-b73f-c521a7522d54",
    "720bf7c7-b6a3-4061-b04f-a36c889699d3",
    "d8fbb5d2-24fb-436b-92df-5853566c7049",
    "6d91f8f5-270c-4dde-88d9-4df5c5ffc72a",
    "1eb0098e-217a-4d07-a2c2-b164b19598b5",
    "f62f24fe-a167-4ae3-acf0-893662acdccb",
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
        "name": clean_name(title or "Mockup Template"),
    }


def rename_category(items: list) -> list:
    for t in items:
        if t.get("cat") == OLD_CAT:
            t["cat"] = CAT
    return items


def append_mockup_entries(items: list, new_entries: list) -> list:
    existing_links = {t["link"] for t in items if t.get("cat") == CAT}
    mockups = [t for t in items if t.get("cat") == CAT]
    other = [t for t in items if t.get("cat") != CAT]

    for entry in new_entries:
        if entry["link"] not in existing_links:
            mockups.append(entry)
            existing_links.add(entry["link"])

    return mockups + other


def main():
    data_path = DATA_FILES[1] if DATA_FILES[1].exists() else DATA_FILES[0]
    items = load_existing(data_path)
    items = rename_category(items)

    mu_codes = [
        int(re.search(r"MU-(\d+)", t["code"]).group(1))
        for t in items
        if t.get("code", "").startswith("MU-")
    ]
    next_code = max(mu_codes) + 1

    new_entries = []
    for i, template_id in enumerate(MISSING_IDS, start=1):
        url = f"https://grok.com/imagine/templates/{template_id}"
        try:
            meta = fetch_meta(template_id)
            code = f"MU-{next_code}"
            next_code += 1
            entry = {
                "code": code,
                "cat": CAT,
                "name": meta["name"],
                "link": url,
                "img": meta["img"],
            }
            new_entries.append(entry)
            print(f"  [{i}/{len(MISSING_IDS)}] {code} {meta['name'][:70]}")
        except Exception as exc:
            print(f"  [{i}] ERROR {template_id}: {exc}")
            entry = {
                "code": f"MU-{next_code}",
                "cat": CAT,
                "name": f"Mockup Template {next_code}",
                "link": url,
                "img": "",
            }
            next_code += 1
            new_entries.append(entry)
        time.sleep(0.35)

    updated = append_mockup_entries(items, new_entries)
    mockup_count = sum(1 for t in updated if t.get("cat") == CAT)
    print(f"Mockup's: {mockup_count} | Total: {len(updated)}")

    for path in DATA_FILES:
        if path.parent.exists():
            write_all(path, updated)
            print(f"Wrote {path}")


if __name__ == "__main__":
    main()