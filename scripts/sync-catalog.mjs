#!/usr/bin/env node
/**
 * sync-catalog.mjs — build-time AppStore → catalog.json
 *
 * Reads a local clone of the Yundera/AppStore repo, extracts each app's
 * store metadata (x-compose-app, which Maison reads; x-casaos as fallback for
 * older listings), merges our editorial overlay (tags + setup links),
 * validates tags against the canonical vocabulary, and emits catalog.json
 * baked into the Guide image. Store icons are copied next to it under
 * icons/, since the store lists them as paths relative to the app folder.
 * No runtime network dependency.
 *
 * Usage:
 *   node scripts/sync-catalog.mjs \
 *     --store ./appstore \
 *     --overlay config/apps-overlay.json \
 *     --tags config/tags.json \
 *     --out public/catalog.json
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import yaml from 'js-yaml';

/* ---- args -------------------------------------------------------------- */
function arg(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
const STORE = arg('store', './appstore');
const OVERLAY = arg('overlay', 'config/apps-overlay.json');
const TAGS = arg('tags', 'config/tags.json');
const OUT = arg('out', 'public/catalog.json');
const DOCS = arg('docs', 'docs');

/* ---- helpers ----------------------------------------------------------- */
const LOCALES = { en_us: 'en', fr_fr: 'fr', ko_kr: 'ko' };

/** Normalize an x-casaos i18n map (en_us/fr_fr/...) to our en/fr/ko keys. */
function i18n(node) {
  if (node == null) return undefined;
  if (typeof node === 'string') return { en: node };
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    out[LOCALES[k.toLowerCase()] || k.split('_')[0]] = v;
  }
  return out;
}

function readJSON(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

/* ---- load inputs ------------------------------------------------------- */
const appsDir = join(STORE, 'Apps');
if (!existsSync(appsDir)) {
  console.error(`✖ AppStore clone not found at ${appsDir}. Clone Yundera/AppStore first.`);
  process.exit(1);
}

const overlay = existsSync(OVERLAY) ? readJSON(OVERLAY) : {};
const tagVocab = existsSync(TAGS) ? readJSON(TAGS) : { audience: [], interest: [] };
const validTags = new Set(
  [...(tagVocab.audience || []), ...(tagVocab.interest || [])].map((t) => t.id)
);

const appDocs = new Set();
const appsDocsDir = join(DOCS, 'apps');
if (existsSync(appsDocsDir)) {
  for (const f of readdirSync(appsDocsDir)) {
    if (f.endsWith('.md')) appDocs.add(f.slice(0, -3).toLowerCase());
  }
}

const catList = existsSync(join(STORE, 'category-list.json'))
  ? readJSON(join(STORE, 'category-list.json'))
  : [];
const recommend = existsSync(join(STORE, 'recommend-list.json'))
  ? readJSON(join(STORE, 'recommend-list.json')).map((r) => (r.appid || '').toLowerCase())
  : [];
const recommendSet = new Set(recommend);

/* ---- build catalog ----------------------------------------------------- */
const apps = [];
const warnings = [];
let tagged = 0;

for (const folder of readdirSync(appsDir).sort()) {
  const compose = join(appsDir, folder, 'docker-compose.yml');
  if (!existsSync(compose)) continue;

  let doc;
  try {
    doc = yaml.load(readFileSync(compose, 'utf8'));
  } catch (e) {
    warnings.push(`${folder}: YAML parse failed — ${e.message}`);
    continue;
  }
  const xc = (doc && doc['x-casaos']) || {};
  const xa = (doc && doc['x-compose-app']) || {};
  if (!doc || (!doc['x-casaos'] && !doc['x-compose-app'])) {
    warnings.push(`${folder}: no x-compose-app or x-casaos block, skipped`);
    continue;
  }
  // Maison reads x-compose-app; x-casaos only fills what an older listing lacks.
  const x = { ...xc, ...xa };

  const id = (xc.store_app_id || xa.id || folder).toLowerCase();
  const ov = overlay[id] || {};

  // Maison names an installed app after the compose `name:`, else the folder
  // lowercased with anything but [a-z0-9_-] dropped. /launch?app= takes this.
  const project = String(doc.name || folder).toLowerCase().replace(/[^a-z0-9_-]/g, '');

  // Store icons are relative to the app folder: copy them into the image.
  let icon = x.icon || null;
  if (icon && !/^https?:\/\//.test(icon)) {
    const src = join(appsDir, folder, icon);
    if (existsSync(src)) {
      const name = `${id}${extname(icon) || '.png'}`;
      mkdirSync(join(dirname(OUT), 'icons'), { recursive: true });
      copyFileSync(src, join(dirname(OUT), 'icons', name));
      icon = `icons/${name}`;
    } else {
      warnings.push(`${folder}: icon ${icon} not found`);
      icon = null;
    }
  }

  // effective tags = store tags UNION overlay tags
  const storeTags = Array.isArray(x.tags) ? x.tags : [];
  const tags = [...new Set([...storeTags, ...(ov.tags || [])])];
  for (const t of tags) {
    if (!validTags.has(t)) warnings.push(`${id}: unknown tag "${t}" (not in tags.json)`);
  }
  if (tags.length) tagged++;

  apps.push({
    id,
    folder,
    project,
    category: x.category || null,
    tags,
    title: i18n(x.title) || { en: folder },
    tagline: i18n(x.tagline),
    description: i18n(x.description),
    icon,
    thumbnail: x.thumbnail || null,
    screenshots: x.screenshots || x.screenshot_link || [],
    author: x.author || null,
    developer: x.developer || null,
    setup: ov.setup || null,
    docPath: appDocs.has(id) ? `apps/${id}` : null,
    recommended: recommendSet.has(id),
  });
}

const catalog = {
  generatedFrom: 'Yundera/AppStore',
  categories: catList,
  recommended: recommend,
  count: apps.length,
  taggedCount: tagged,
  apps,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n');

/* ---- report ------------------------------------------------------------ */
console.log(`✔ catalog.json → ${OUT}`);
console.log(`  apps: ${apps.length}  |  tagged: ${tagged}  |  recommended: ${recommend.length}`);
if (warnings.length) {
  console.log(`  ⚠ ${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 20)) console.log(`    - ${w}`);
}
