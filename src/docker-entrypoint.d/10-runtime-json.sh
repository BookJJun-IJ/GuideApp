#!/bin/sh
# Emit /usr/share/nginx/html/config/runtime.json from env vars at boot.
# Consumed by the frontend at startup to get environment-specific URLs:
# the Maison dashboard that store deep links and /launch links point at.
# CASAOS_URL is the older name of the same setting, still read for composes
# that predate the rename.
set -eu

CFG_DIR=/usr/share/nginx/html/config
mkdir -p "$CFG_DIR"

MAISON_URL="${MAISON_URL:-${CASAOS_URL:-}}"

cat > "$CFG_DIR/runtime.json" <<JSON
{
  "maisonUrl": "${MAISON_URL%/}"
}
JSON
