#!/usr/bin/env python3
"""Fetch Mock up templates from Grok and append to xfreeze-visual-templates-data.js"""

import json
import re
import ssl
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "xfreeze-visual-templates-data.js"
CAT = "Mockup's"

URLS = """
https://grok.com/imagine/templates/0d1ec735-ee31-4727-9ac1-b4b922c3a84b
https://grok.com/imagine/templates/268c1e1e-0de1-49f1-9ff4-bcc13128bd69
https://grok.com/imagine/templates/3d1e44fc-6ee5-4dad-878b-019b53261a8c
https://grok.com/imagine/templates/ebeae91d-c98f-4ba1-81a0-5cece39331cb
https://grok.com/imagine/templates/5eff002a-10f2-47b2-9eab-aab000bc0da5
https://grok.com/imagine/templates/54a0f7b7-5260-462a-b3c7-56d08d658bad
https://grok.com/imagine/templates/477a63d5-a9d0-4d3b-9a72-bed07684189f
https://grok.com/imagine/templates/55f76b25-e4a1-436f-8207-6382cb85a53f
https://grok.com/imagine/templates/d3228ac1-a44c-4ea1-99f3-f4286879956b
https://grok.com/imagine/templates/86c0937f-554c-47d5-b7c6-0616c7c3a0d4
https://grok.com/imagine/templates/ab3647ab-9a4b-415f-b202-ca889bfb332f
https://grok.com/imagine/templates/2089907e-62ce-40f9-938a-a43f76f6d040
https://grok.com/imagine/templates/50457695-feaa-4013-85ae-8acd0a4aa2af
https://grok.com/imagine/templates/2d03bf74-62fe-4871-90a0-eaa7c9eaa694
https://grok.com/imagine/templates/ed6d30be-778e-4aaf-a5b9-e7a644f6c5e9
https://grok.com/imagine/templates/c49121b0-e410-4262-9fac-a3131155c4ff
https://grok.com/imagine/templates/6aff2b83-b3fb-40ae-851f-71135e181e7d
https://grok.com/imagine/templates/51e7b5ea-33c9-4922-bbab-00d5e61e01e4
https://grok.com/imagine/templates/72707c2d-65bb-436f-a96c-6c81df7efcdd
https://grok.com/imagine/templates/16a72426-39b1-40b3-b144-0d1e7136b949
https://grok.com/imagine/templates/25678f16-4284-4b48-badb-da61eaae353b
https://grok.com/imagine/templates/8c107e08-2ceb-4805-9b85-9ab90d847be2
https://grok.com/imagine/templates/229ce6d9-990c-46e4-8105-3ad02a928408
https://grok.com/imagine/templates/49587260-9976-444e-90fb-98f6a15689b2
https://grok.com/imagine/templates/a866c125-bc22-4737-a151-2d795cce89f5
https://grok.com/imagine/templates/1f9d1ee0-adac-4f38-ade8-c734aca91376
https://grok.com/imagine/templates/d509878f-d9c7-4e46-b3d1-d6fd84e64741
https://grok.com/imagine/templates/6f2e1982-c314-4550-b8b6-8b001520156d
https://grok.com/imagine/templates/84090f1f-7f61-4264-a3cf-ad14664948e6
https://grok.com/imagine/templates/2a5d6f52-8c09-4e0a-a8d6-d10fcf714c1b
https://grok.com/imagine/templates/57594aab-68cd-4bc6-922a-4dfa09564af8
https://grok.com/imagine/templates/21205375-4f9d-4c8d-9764-f76ccc79120d
https://grok.com/imagine/templates/8308012a-d264-4132-9d48-a7b844e6adf1
https://grok.com/imagine/templates/67a78777-17be-43b9-b634-e5469549a62d
https://grok.com/imagine/templates/a42ef5c9-06f4-4868-b467-9e766f9b75a0
https://grok.com/imagine/templates/f327f57f-4cef-4d4c-ab1a-b6a412160d3a
https://grok.com/imagine/templates/070f2086-836a-4b31-b21a-bfe079ceb1e1
https://grok.com/imagine/templates/eda48455-f15c-4dde-a7d6-b9d785664181
https://grok.com/imagine/templates/01200ed0-93be-4a3b-98b4-f46defd121f7
https://grok.com/imagine/templates/afe6056f-da09-460d-b621-e4a7ec39cf27
https://grok.com/imagine/templates/bbd20cda-d6d7-4953-b341-37f99d2376db
https://grok.com/imagine/templates/351fc0c9-665a-4a12-bd97-e5c06679c588
https://grok.com/imagine/templates/289b23c5-bbaa-49b2-8f0c-a33fdd4e6a21
https://grok.com/imagine/templates/94ced1c1-f97f-4b03-b795-e6b9b4b5c395
https://grok.com/imagine/templates/07a460d0-5ea9-4e01-8aa6-81c8ef750c0d
https://grok.com/imagine/templates/618165cb-4b90-4547-bb38-e8b140e75f12
https://grok.com/imagine/templates/1059df11-b7c9-4bbc-81b1-4f64ee11de49
https://grok.com/imagine/templates/d6bf968c-28bb-453e-a8ee-bf35938ac6b4
https://grok.com/imagine/templates/ad29352e-2bda-4603-b229-d1e2f1cb0ff1
https://grok.com/imagine/templates/d9e9f0d9-9bc6-499e-a112-139009e04128
https://grok.com/imagine/templates/8dbae3fe-7ec1-4b92-ad5d-1171c7e9dc4b
https://grok.com/imagine/templates/67e03103-d0f1-4b16-8142-63e8196f18db
https://grok.com/imagine/templates/19ec86e1-03fa-4ca5-bb9c-190089d49126
https://grok.com/imagine/templates/02ca2d4b-d996-44aa-a25e-a6f4fc5c38ba
https://grok.com/imagine/templates/346563a6-18b0-4394-9ef2-4f155322114e
https://grok.com/imagine/templates/0f6b5da1-a18d-43bf-9013-3abcc802ab94
https://grok.com/imagine/templates/81309737-eb17-4c31-bfad-83a90f69786b
https://grok.com/imagine/templates/9c80fbb8-b243-4250-b7d6-e6a0d9988340
https://grok.com/imagine/templates/f24cb93a-5a3e-4dda-b8f2-27a1664c7a89
https://grok.com/imagine/templates/643957ad-4cc6-4f2d-99b9-4526174bf5b9
https://grok.com/imagine/templates/1e0e9c6c-0c36-497d-a7a6-a31f598b83b3
https://grok.com/imagine/templates/375f5258-5f52-4c1f-96cc-9451889fc508
https://grok.com/imagine/templates/f363accd-4f5c-4105-a1e2-fd80283852e3
https://grok.com/imagine/templates/c05c22b1-64be-4e8c-baa1-d03c0b87efb2
https://grok.com/imagine/templates/482abad7-d765-4e59-888d-4b9cecafc55a
https://grok.com/imagine/templates/51f6a704-cce2-4354-b269-0c626a84a841
https://grok.com/imagine/templates/65441081-c3b2-49e0-84fc-3d87223ba7fa
https://grok.com/imagine/templates/ab4208f3-9878-4612-ae57-881a08d0530e
https://grok.com/imagine/templates/3ee5d0fe-1de9-4a78-8846-a70d9ebf3add
https://grok.com/imagine/templates/2016bdba-b24c-422c-93c0-17e18fe28a63
https://grok.com/imagine/templates/b48bd861-bf58-4084-ba49-41ae6373247a
https://grok.com/imagine/templates/b6706a92-7c7c-44c0-8ecc-96146a77dd0d
https://grok.com/imagine/templates/fed55529-4dd5-41ff-966c-0977fd8f377d
https://grok.com/imagine/templates/18264178-f8d5-4f7c-bf95-e88023b583ab
https://grok.com/imagine/templates/6b9e967c-6f8f-40c8-984a-f9192191f5b4
https://grok.com/imagine/templates/bbcbd6af-0854-4e32-b916-aac6395cfd59
https://grok.com/imagine/templates/050367d2-91d0-4727-9465-6eb9770c7e16
https://grok.com/imagine/templates/56d7f1b5-b10a-4f53-9d33-2f4affac173b
https://grok.com/imagine/templates/bd484c7f-b698-4e1a-a658-f5b0fe556487
https://grok.com/imagine/templates/60e3b5f5-11fb-490b-8b46-910d7202bf18
https://grok.com/imagine/templates/37fc713d-0d45-40da-958b-04d898f5f5d2
https://grok.com/imagine/templates/74277e47-5eb8-4e4c-b9d6-702b81a23ab5
https://grok.com/imagine/templates/40a6ef56-eee4-48a9-a9a9-927f06136ca6
https://grok.com/imagine/templates/ba43af57-92da-409f-8d69-f381e031d98c
https://grok.com/imagine/templates/45a7aedc-db6f-4938-8249-49aeb30f711e
https://grok.com/imagine/templates/00634f26-ad7d-4c5e-bcf3-378048b3295e
https://grok.com/imagine/templates/56b184ba-1e3d-46cf-90ee-87dd4174a78c
https://grok.com/imagine/templates/546f59d8-7d6d-44fe-bccf-fd11273991fc
https://grok.com/imagine/templates/43a3cc91-565c-4a3d-bce7-5928874770d5
https://grok.com/imagine/templates/8e0cbda2-1545-4c91-a90d-6157140df965
https://grok.com/imagine/templates/4d44b8c8-9727-4a0b-9f18-c51b0aba1ea8
https://grok.com/imagine/templates/4fe499b7-d657-4b81-94d5-4c8467baa626
https://grok.com/imagine/templates/d4cb4f6d-b2e8-49bd-874e-e98799c04036
https://grok.com/imagine/templates/69c991b8-1843-4258-b32d-c293bbe3d260
https://grok.com/imagine/templates/0d8450e2-b13a-4fe7-877a-2cdc92a61a98
https://grok.com/imagine/templates/78ebaa76-586d-4fc9-8815-7ab4a7e70023
https://grok.com/imagine/templates/e1bb420e-f1f3-4e9a-9414-770473bef1da
https://grok.com/imagine/templates/687c098b-609c-464d-8951-f2e65ac2fd23
https://grok.com/imagine/templates/ef96df1a-03b8-4a6b-b57c-75c119cc7db1
https://grok.com/imagine/templates/26196a75-d8e9-4951-9564-aecbe965153d
https://grok.com/imagine/templates/3bd93d2a-27e0-411a-bcaf-8f7b9b907dfc
https://grok.com/imagine/templates/ef3aa998-2363-4b8c-8fd8-fea40a444aa1
https://grok.com/imagine/templates/7d916e0e-59e8-4a95-8494-dd70f41f78b9
https://grok.com/imagine/templates/666b2a29-cded-4078-a0cb-df00a7b17b6a
https://grok.com/imagine/templates/ab2ed722-13ba-422a-806e-4874467b249c
https://grok.com/imagine/templates/b2d426de-1c88-41f4-b026-a1c10b6531e6
https://grok.com/imagine/templates/bfae75dc-9ca4-427d-9e86-70c88d6c731c
https://grok.com/imagine/templates/00c46336-1b3f-439a-b576-769d6be7e240
https://grok.com/imagine/templates/ae96e752-f84d-4d0b-b88d-b03c84463e64
https://grok.com/imagine/templates/a603a8a1-9c5b-4db4-ac06-15d56fccd16b
https://grok.com/imagine/templates/72679232-01b9-4f9f-b9de-ea96c51bb7a2
https://grok.com/imagine/templates/d7cf15f8-e9f1-4d46-87c0-c82c6b63980f
https://grok.com/imagine/templates/3a859751-c493-462e-bd0e-8abc497cd24e
https://grok.com/imagine/templates/388c064d-3f02-44a0-a37f-a264342d3420
https://grok.com/imagine/templates/1b13ccf9-c4ac-4217-a075-15db6e668ca6
https://grok.com/imagine/templates/543c760d-7ce2-4048-9dcc-25c62f58c62c
https://grok.com/imagine/templates/e5cd3dc4-c82d-4430-af51-e47f604b35db
https://grok.com/imagine/templates/d44a3ebd-b53c-45e0-b597-2ac9896b91b0
https://grok.com/imagine/templates/a883150e-2781-42e0-a68c-8d9a59fa9264
https://grok.com/imagine/templates/540c3f46-6baf-4deb-8393-5efb1e8aff3e
https://grok.com/imagine/templates/e9d126ad-061d-4be8-bdb9-1376684c7375
https://grok.com/imagine/templates/d98cabfd-a619-4a5c-8895-d61229cffc8c
https://grok.com/imagine/templates/b02d051e-5a3d-45cf-8e0d-1d3bca928239
""".strip().splitlines()

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"


def load_existing() -> list:
    raw = DATA_FILE.read_text()
    m = re.search(r"const visualTemplates = (\[[\s\S]*\]);", raw)
    if not m:
        raise SystemExit("Could not parse visualTemplates array")
    return json.loads(m.group(1))


def write_all(items: list) -> None:
    body = json.dumps(items, indent=2, ensure_ascii=False)
    body = body.replace("    ", "  ")
    DATA_FILE.write_text(
        "// Auto-generated from Grok Imagine template pages\n"
        f"const visualTemplates = {body};\n"
    )


def fetch_meta(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=ssl.create_default_context(), timeout=30) as resp:
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

    return {"img": img or "", "name": title or "Mock up Template"}


def unique_urls(urls):
    seen = set()
    out = []
    for u in urls:
        u = u.strip()
        if not u or u in seen:
            continue
        seen.add(u)
        out.append(u)
    return out


def main():
    urls = unique_urls(URLS)
    print(f"Fetching {len(urls)} unique templates…")

    existing = [t for t in load_existing() if t.get("cat") != CAT]
    new_entries = []

    for i, url in enumerate(urls, start=1):
        try:
            meta = fetch_meta(url)
            new_entries.append(
                {
                    "code": f"MU-{i}",
                    "cat": CAT,
                    "name": meta["name"],
                    "link": url,
                    "img": meta["img"],
                }
            )
            print(f"  [{i}/{len(urls)}] {meta['name'][:60]}")
        except Exception as e:
            print(f"  [{i}] ERROR {url}: {e}")
            new_entries.append(
                {
                    "code": f"MU-{i}",
                    "cat": CAT,
                    "name": f"Mock up {i}",
                    "link": url,
                    "img": "",
                }
            )
        time.sleep(0.3)

    write_all(existing + new_entries)
    print(f"Done. Total templates: {len(existing) + len(new_entries)}")


if __name__ == "__main__":
    main()