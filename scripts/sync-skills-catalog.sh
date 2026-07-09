#!/usr/bin/env bash
# Copy latest catalog from grok-skill-library into the website data folder
set -euo pipefail
SRC="${HOME}/grok-skill-library/catalog.json"
DEST="$(cd "$(dirname "$0")/.." && pwd)/data/skills-catalog.json"
if [[ ! -f "$SRC" ]]; then
  echo "Run publish first: python3 ~/grok-skill-library/scripts/publish.py"
  exit 1
fi
cp "$SRC" "$DEST"
echo "Synced catalog → $DEST"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if command -v node >/dev/null; then
  node "$SCRIPT_DIR/sync-skills-browse-data.js"
else
  echo "Skip browse-data sync (node not found)"
fi