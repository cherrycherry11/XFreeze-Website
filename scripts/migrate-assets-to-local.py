#!/usr/bin/env python3
"""Copy external media into project and rewrite file:// paths to relative URLs."""

from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS_TEMPLATES = Path("/Users/jeevan/Downloads/Profile Website/Grok Imagine Templates")
DESKTOP_TEMPLATES = Path("/Users/jeevan/Desktop/Profile website New/Grok Imagine Templates")
DESKTOP_ROOT = Path("/Users/jeevan/Desktop/Profile website New")
DOWNLOADS_IMAGINE = Path("/Users/jeevan/Downloads/Profile Website/Imagine")
DESKTOP_IMAGINE = DESKTOP_ROOT / "Imagine"
BA_VIDEOS = DESKTOP_ROOT / "Web videos before and after" / "B and A videos"

GROK = ROOT / "grok-templates"
ASSETS = ROOT / "assets"
VIDEOS = ASSETS / "videos"
IMAGINE = ASSETS / "imagine"

TEMPLATE_MAP = {
    "Product": "product",
    "make-up": "make-up",
    "Filters": "filters",
    "style edit": "style-edit",
    "common uses": "common-uses",
}

VIDEO_COPY = [
    (DESKTOP_ROOT / "hero.mp4", VIDEOS / "hero.mp4"),
    (DESKTOP_ROOT / "Hero Night.mp4", VIDEOS / "hero-night.mp4"),
    (BA_VIDEOS / "style 1.mp4", VIDEOS / "style-1.mp4"),
    (BA_VIDEOS / "style edit 2.mp4", VIDEOS / "style-edit-2.mp4"),
    (BA_VIDEOS / "beauty 1.mp4", VIDEOS / "beauty-1.mp4"),
    (BA_VIDEOS / "beaty2.mp4", VIDEOS / "beaty2.mp4"),
    (BA_VIDEOS / "beaty3.mp4", VIDEOS / "beaty3.mp4"),
    (BA_VIDEOS / "beaty4.mp4", VIDEOS / "beaty4.mp4"),
    (BA_VIDEOS / "beaty5.mp4", VIDEOS / "beaty5.mp4"),
    (BA_VIDEOS / "product add 1.mp4", VIDEOS / "product-add-1.mp4"),
    (BA_VIDEOS / "product add 2.mp4", VIDEOS / "product-add-2.mp4"),
    (BA_VIDEOS / "product add 3.mp4", VIDEOS / "product-add-3.mp4"),
    (BA_VIDEOS / "product add 4.mp4", VIDEOS / "product-add-4.mp4"),
]

IMAGINE_SUBDIRS = ["Ads", "beauty", "style", "Fun", "Filter styles"]

FILES_TO_PATCH = [
    ROOT / "xfreeze-prototype-v2.html",
    ROOT / "xfreeze-contact.html",
    ROOT / "xfreeze-visual-templates-data.js",
]


def ensure_dirs() -> None:
    for d in [GROK / "product", GROK / "make-up", GROK / "filters", GROK / "style-edit", GROK / "common-uses", VIDEOS, IMAGINE]:
        d.mkdir(parents=True, exist_ok=True)
    for sub in IMAGINE_SUBDIRS:
        (IMAGINE / sub.lower().replace(" ", "-")).mkdir(parents=True, exist_ok=True)


def copy_if_exists(src: Path, dest: Path) -> bool:
    if not src.exists():
        print(f"  skip missing: {src}")
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size == src.stat().st_size:
        return True
    shutil.copy2(src, dest)
    return True


def copy_templates() -> None:
    print("Copying template images...")
    for folder_name, dest_name in TEMPLATE_MAP.items():
        dest_dir = GROK / dest_name
        dest_dir.mkdir(parents=True, exist_ok=True)
        for base in (DESKTOP_TEMPLATES, DOWNLOADS_TEMPLATES):
            src_dir = base / folder_name
            if not src_dir.is_dir():
                continue
            for f in src_dir.iterdir():
                if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
                    continue
                copy_if_exists(f, dest_dir / f.name)


def copy_imagine() -> None:
    print("Copying imagine gallery images...")
    mapping = {
        "Ads": "ads",
        "beauty": "beauty",
        "style": "style",
        "Fun": "fun",
        "Filter styles": "filter-styles",
    }
    for src_root in (DOWNLOADS_IMAGINE, DESKTOP_IMAGINE):
        if not src_root.is_dir():
            continue
        for sub, dest_sub in mapping.items():
            src_dir = src_root / sub
            if not src_dir.is_dir():
                continue
            for f in src_dir.iterdir():
                if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
                    continue
                copy_if_exists(f, IMAGINE / dest_sub / f.name)


def copy_videos() -> None:
    print("Copying videos...")
    for src, dest in VIDEO_COPY:
        copy_if_exists(src, dest)


def patch_file(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    original = text

    # Template data: file:// Downloads paths -> grok-templates
    def repl_template(m: re.Match) -> str:
        raw = m.group(1).replace("%20", " ")
        if "/" not in raw:
            return m.group(0)
        folder, fname = raw.split("/", 1)
        dest_folder = TEMPLATE_MAP.get(folder, folder.lower().replace(" ", "-"))
        return f'"img": "grok-templates/{dest_folder}/{fname}"'

    text = re.sub(
        r'"img": "file:///Users/jeevan/Downloads/Profile%20Website/Grok%20Imagine%20Templates/([^"]+)"',
        repl_template,
        text,
    )

    # Hero videos in head script and HERO_VIDEOS
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/Hero%20Night.mp4",
        "assets/videos/hero-night.mp4",
    )
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/hero.mp4",
        "assets/videos/hero.mp4",
    )

    # Section video sources (inline)
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/Web%20videos%20before%20and%20after/B%20and%20A%20videos/style%201.mp4",
        "assets/videos/style-1.mp4",
    )
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/Web%20videos%20before%20and%20after/B%20and%20A%20videos/style%20edit%202.mp4",
        "assets/videos/style-edit-2.mp4",
    )
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/Web%20videos%20before%20and%20after/B%20and%20A%20videos/product%20add%201.mp4",
        "assets/videos/product-add-1.mp4",
    )
    text = text.replace(
        "file:///Users/jeevan/Desktop/Profile%20website%20New/Web%20videos%20before%20and%20after/B%20and%20A%20videos/product%20add%202.mp4",
        "assets/videos/product-add-2.mp4",
    )

    # BA video cycling base + pool (prototype-v2 only)
    text = text.replace(
        "const BA_VIDEOS_BASE = 'file:///Users/jeevan/Desktop/Profile%20website%20New/Web%20videos%20before%20and%20after/B%20and%20A%20videos/';",
        "const BA_VIDEOS_BASE = 'assets/videos/';",
    )
    text = text.replace("'style%201.mp4'", "'style-1.mp4'")
    text = text.replace("'style%20edit%202.mp4'", "'style-edit-2.mp4'")
    text = text.replace("'beauty%201.mp4'", "'beauty-1.mp4'")
    text = text.replace("'product%20add%201.mp4'", "'product-add-1.mp4'")
    text = text.replace("'product%20add%202.mp4'", "'product-add-2.mp4'")
    text = text.replace("'product%20add%203.mp4'", "'product-add-3.mp4'")
    text = text.replace("'product%20add%204.mp4'", "'product-add-4.mp4'")

    # Imagine images - Downloads paths
    imagine_folder_map = {
        "Ads": "ads",
        "beauty": "beauty",
        "style": "style",
        "Fun": "fun",
        "Filter styles": "filter-styles",
    }

    def repl_imagine_downloads(m: re.Match) -> str:
        folder = m.group(1).replace("%20", " ")
        sub = imagine_folder_map.get(folder, folder.lower().replace(" ", "-"))
        fname = m.group(2)
        return f"assets/imagine/{sub}/{fname}"

    text = re.sub(
        r"file:///Users/jeevan/Downloads/Profile%20Website/Imagine/([^/]+)/([^\"']+)",
        repl_imagine_downloads,
        text,
    )

    # Imagine images - Desktop paths
    text = re.sub(
        r"file:///Users/jeevan/Desktop/Profile%20website%20New/Imagine/([^/]+)/([^\"']+)",
        repl_imagine_downloads,
        text,
    )

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"Patched {path.name}")
    else:
        print(f"No changes in {path.name}")


def main() -> None:
    ensure_dirs()
    copy_videos()
    copy_templates()
    copy_imagine()
    for f in FILES_TO_PATCH:
        if f.exists():
            patch_file(f)
    print("Done.")


if __name__ == "__main__":
    main()