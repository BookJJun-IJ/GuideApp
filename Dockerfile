# ---------------------------------------------------------------------------
# Stage 1 — build catalog.json from the live Yundera/AppStore
# ---------------------------------------------------------------------------
FROM node:20-alpine AS catalog
WORKDIR /build
RUN apk add --no-cache git
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY scripts ./scripts
COPY config ./config
# Shallow clone the store, then sync → /build/public/catalog.json
RUN git clone --depth 1 https://github.com/Yundera/AppStore appstore \
 && node scripts/sync-catalog.mjs \
      --store ./appstore \
      --overlay config/apps-overlay.json \
      --tags config/tags.json \
      --out public/catalog.json

# ---------------------------------------------------------------------------
# Stage 2 — static site served by nginx (fully self-contained, no runtime net)
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine

COPY src/nginx.conf /etc/nginx/conf.d/default.conf

# Static assets: index.html, guide.html, css/, js/
COPY src/ /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/nginx.conf

# Markdown docs (served locally at /docs)
COPY docs/ /usr/share/nginx/html/docs/

# Runtime config the app fetches (onboarding, tags, site) — overlay is build-only
COPY config/onboarding.json config/tags.json config/site.json /usr/share/nginx/html/config/

# Generated catalog baked in from stage 1
COPY --from=catalog /build/public/catalog.json /usr/share/nginx/html/catalog.json

EXPOSE 80
