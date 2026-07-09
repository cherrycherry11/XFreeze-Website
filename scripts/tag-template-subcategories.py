#!/usr/bin/env python3
"""Assign subcat to every template using keyword rules + optional overrides."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEBSITE_ROOT = Path("/Users/jeevan/Desktop/XFreeze-Website/website")
DATA_FILES = [
    ROOT / "xfreeze-visual-templates-data.js",
    WEBSITE_ROOT / "data" / "visual-templates-data.js",
]
OVERRIDES = WEBSITE_ROOT / "data" / "template-subcat-overrides.json"

# (subcat, pattern) — first match wins per category
RULES: dict[str, list[tuple[str, str]]] = {
    "Mockup's": [
        ("Fashion & Models", r"\bmodel\b|dress|gown|runway|mannequin|lookbook page|editorial shoot|flat lay to model|fashion doll"),
        ("Outdoor & OOH", r"billboard|bus stop|subway|airport|hoarding|stadium|pole banner|storefront window|lightbox"),
        ("Social & Digital", r"instagram|linkedin|youtube|website hero|app screen|social media|story post|digital presentation|multi-platform"),
        ("Books & Art", r"book cover|art print|framed painting|canvas painting|gallery wall|exhibition poster|collector boxed book|textbook|paperback|hardcover book"),
        ("Print & Stationery", r"business card|brochure|flyer|magazine|newspaper|stationery|envelope|folder|notepad|booklet|catalog cover|notebook cover|invitation card|greeting card|menu card|event pass|id card|employee badge|rolled poster|luxury poster"),
        ("Tech & Devices", r"laptop|tablet|smartphone|headphone|speaker|earbud|smartwatch|gaming accessory|desktop workspace|device mockup|hair dryer"),
        ("Packaging & Beauty", r"packaging|skincare|perfume|serum|cream jar|beauty|facial care|gift box|box set|launch kit"),
        ("Apparel", r"t-shirt|tee|hoodie|sweatshirt|tracksuit|activewear|polo shirt|streetwear|apparel|clothing|garment|jogger|embroidered logo|puff print|all-over print|monogram clothing|hang tag|colorway grid|graphic tee|vintage washed"),
        ("Home & Lifestyle", r"bedsheet|pillow|sofa|towel|candle|tableware|mug|drinkware|lamp|decor|dining chair|home fragrance|bath linen|bedding|cushion"),
        ("Travel & Accessories", r"suitcase|luggage|backpack|wallet|travel pouch|passport|umbrella|tote bag|water bottle|sneaker|cap and hat|sunglasses|scarf|helmet|bicycle|car interior|delivery vehicle"),
        ("Brand & Retail", r"showroom|e-commerce|lookbook campaign|investor presentation|product family|flat lay brand|brand system|retail|shopping bag|brand board|launch bundle|pr box|product board|product listing|retail display|retail counter"),
    ],
    "Product": [
        ("Jewelry & Watches", r"jewelry|watch"),
        ("Food & Beverage", r"steak|sushi|coffee|wine|champagne|gourmet|plating|bottle premium"),
        ("Beauty & Skincare", r"serum|skincare|cleanser|beauty|cosmetic|perfume|hydration|botanical|dew|peony|lotus|cream jar|aura|ritual|ai beauty|cleanser|jelly gel"),
        ("Tech & Futuristic", r"tech|capsule|holographic|cyberpunk|neon|circuit|chrome luxury lab|transparent tech|futuristic|steampunk mechanical"),
        ("Home & Lifestyle", r"home setting|interior|vanity|hotel|workspace|catalog|cozy|living room|minimal home|glasshouse"),
        ("Nature & Scenes", r"jungle|moss|rainforest|garden|forest|desert|mountain|ocean|waterfall|aurora|temple|cliff|safari|firefly|cloud|galaxy|lava|iceberg|cave|oil painting|sunset|enchanted|nature \+|rain\b|pearl water|deep sea|above the clouds"),
        ("Fashion & Textiles", r"silk|fabric|ribbon|fashion editorial|satin|velvet|bow hanging|floating fabric"),
        ("Editorial & Luxury", r"editorial|luxury|marble|premium grade|launch poster|monochrome brand|magazine layout|poster layout|showroom hero|retail window|typographic poster|brand world"),
        ("Product Heroes", r"lifestyle|floating|hero|hand interaction|double product|splash|display|minimal pedestal|orbit|spotlight|stage|product with|product in|product on|wood craft|glass sculpture|light rays|geometric|smoke|water &|ice product|velvet|chrome reflection|portal|tunnel|shield|wave embrace|bubble|flame|shadow|pedestal|arena|mirror stage|ingredient|explosion|motion blur|miniature|scientific molecule|campaign|commercial|studio shot|close-up|close up|glossy|acrylic|pedestal|reflection hero|gift reveal|performance arena|material close"),
    ],
    "Style Edit": [
        ("Vintage & Eras", r"1950s|1970s|1980s|1990s|y2k|golden age|pinup|disco|vintage convert|vintage film|vintage sunglass"),
        ("Fantasy & Characters", r"superhero|pirate|knight|viking|astronaut|samurai|king|hacker|chef|pilot|doctor|trainer|groom|cowboy|rockstar|singer|gamer|elephant|camel|wedding|corporate office|medieval|fitness|noble|fierce|master chef|airline|compassionate|honorable|fearless|classic film noir detective"),
        ("Cinematic & Film", r"noir|chiaroscuro|golden hour|dramatic|horror|neo-noir|low-key|corporate headshot|professional corporate|tennis|baseball|pub|night at"),
        ("Portrait & Beauty", r"headshot|portrait|diverse natural beauty|dress flow|natural beauty"),
        ("Creative Styles", r"claymation|glitch|pixar|oil painting|pastel dreamcore|steampunk|hand-drawn|hyperreal|3d pixar|animation|sci-fi neon|glam"),
        ("Worlds & Scenes", r"giant coffee|cloud surfer|aurora borealis|what year|rainy day reading|rain kiss|stage|court|moon|gym|cockpit|work"),
    ],
    "Filters": [
        ("Mono & B&W", r"black\s*&\s*white|monochrome|mono"),
        ("Portrait & Skin", r"skin|portrait|golden hour skin|smokey eye|rose gold luxury"),
        ("Mood & Drama", r"moody|drama|dramatic|low-key|soft focus dreamy"),
        ("Color Grades", r"grade|color|cinematic color|natural earth|high-contrast|teal|pastel"),
    ],
    "Make-up": [
        ("Skin & Texture", r"photorealistic skin|freckled|skin|texture"),
        ("Glam & Editorial", r"glam|glass skin|glow|makeup glow|flawless"),
        ("Natural & Dewy", r"natural|dewy|fresh morning|no-makeup|random hair"),
    ],
    "Common Uses": [
        ("Cleanup & Fix", r"watermark|colorize|straighten|fix composition"),
        ("Outfit & Style", r"outfit|change outfit"),
        ("Portrait", r"smile|headshot|enhance smile"),
        ("Pro Shots", r"professional|studio shot|instagram shot|cinematic lighting"),
    ],
}

DEFAULT_SUBCAT = "More"


def load_items(path: Path) -> list:
    raw = path.read_text()
    m = re.search(r"const visualTemplates = (\[[\s\S]*\]);", raw)
    if not m:
        raise SystemExit(f"Could not parse {path}")
    return json.loads(m.group(1))


def write_items(path: Path, items: list) -> None:
    body = json.dumps(items, indent=2, ensure_ascii=False).replace("    ", "  ")
    path.write_text(
        "// Auto-generated from Grok Imagine template pages\n"
        f"const visualTemplates = {body};\n"
    )


def load_overrides() -> dict[str, str]:
    if not OVERRIDES.exists():
        return {}
    data = json.loads(OVERRIDES.read_text())
    return {k: v for k, v in data.items() if not k.startswith("_")}


def classify(cat: str, name: str) -> str:
    text = name.lower()
    for subcat, pattern in RULES.get(cat, []):
        if re.search(pattern, text, re.I):
            return subcat
    rules = RULES.get(cat, [])
    if rules:
        return DEFAULT_SUBCAT if cat in ("Mockup's", "Product", "Style Edit") else rules[-1][0]
    return DEFAULT_SUBCAT


def main() -> None:
    overrides = load_overrides()
    data_path = DATA_FILES[1] if DATA_FILES[1].exists() else DATA_FILES[0]
    items = load_items(data_path)

    counts: dict[str, dict[str, int]] = {}
    for t in items:
        code = t.get("code", "")
        cat = t.get("cat", "")
        if code in overrides:
            t["subcat"] = overrides[code]
        else:
            t["subcat"] = classify(cat, t.get("name", ""))
        counts.setdefault(cat, {})
        counts[cat][t["subcat"]] = counts[cat].get(t["subcat"], 0) + 1

    for path in DATA_FILES:
        if path.parent.exists():
            write_items(path, items)
            print(f"Wrote {path}")

    print("\nSubcategory counts:")
    for cat in sorted(counts):
        print(f"  {cat}:")
        for sub, n in sorted(counts[cat].items(), key=lambda x: -x[1]):
            print(f"    {sub}: {n}")


if __name__ == "__main__":
    main()