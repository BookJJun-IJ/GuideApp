#!/bin/sh
# Emit /usr/share/nginx/html/config/runtime.json from env vars at boot.
# Consumed by the frontend at startup to get environment-specific URLs
# (e.g. the CasaOS dashboard the install tutorial links to).
set -eu

CFG_DIR=/usr/share/nginx/html/config
mkdir -p "$CFG_DIR"

: "${CASAOS_URL:=}"

cat > "$CFG_DIR/runtime.json" <<EOF
{
  "casaosUrl": "${CASAOS_URL}"
}
EOF
