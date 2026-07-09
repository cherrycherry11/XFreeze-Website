#!/usr/bin/env python3
"""Wire motion walkthrough on homepage + script tags."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
HOME = ROOT / "home.html"

SCRIPT_BLOCK = """  <script src="data/motion-prompt-library-data.js"></script>
  <script src="js/home-motion-creative.js" defer></script>"""

# Minimal shell — JS rebuilds the full walkthrough UI
NEW_SECTION = """  <!-- ==================== MOTION PROMPT LIBRARY ==================== -->
  <section id="xf-motion-prompts" class="xf-motion-home bg-white border-t border-[#e5e7eb]" data-scroll-reveal>
    <!-- Rebuilt by js/home-motion-creative.js -->
  </section>
"""


def patch_home(text: str) -> str:
    if "home-motion-creative.js" not in text:
        text = text.replace(
            '<script src="js/home-extras.js"></script>',
            SCRIPT_BLOCK + "\n  <script src=\"js/home-extras.js\"></script>",
        )

    if 'id="xf-motion-prompts"' not in text:
        raise SystemExit("xf-motion-prompts section not found in home.html")

    if "data-xf-motion-home" in text or "xf-motion-home__intro" in text:
        print("Section already uses walkthrough markup")
        return text

    text = re.sub(
        r"  <!-- =+ MOTION PROMPT LIBRARY =+ -->.*?</section>\n",
        NEW_SECTION + "\n",
        text,
        count=1,
        flags=re.DOTALL,
    )
    return text


def main():
    text = HOME.read_text(encoding="utf-8")
    text = patch_home(text)
    HOME.write_text(text, encoding="utf-8")
    print("home.html patched — motion walkthrough wired")


if __name__ == "__main__":
    main()