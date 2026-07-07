/* ===================================================================
   Start Here — onboarding wizard + AppStore-sourced catalog
   Index page (index.html) and Guide page (guide.html) share this file.
   =================================================================== */
(function () {
'use strict';

var DOCS_BASE = 'docs';

/* ---- shared i18n ---------------------------------------------------- */
var LANGS = ['en', 'fr', 'ko'];
var lang = localStorage.getItem('guide.lang');
if (LANGS.indexOf(lang) < 0) {
  lang = (navigator.language || 'en').slice(0, 2);
  if (LANGS.indexOf(lang) < 0) lang = 'en';
}
document.documentElement.lang = lang;
function tr(o, fb) { return o ? (o[lang] || o.en || fb || '') : (fb || ''); }

/* ---- inline SVG icons ---------------------------------------------- */
var IC = {
  x: '<svg viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  reddit: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a2.1 2.1 0 0 0-3.5-1.5 10.3 10.3 0 0 0-5.3-1.7l.9-4.2 2.9.6a1.5 1.5 0 1 0 .2-1l-3.3-.7a.5.5 0 0 0-.6.4l-1 4.6a10.3 10.3 0 0 0-5.4 1.7A2.1 2.1 0 1 0 3.6 14a4 4 0 0 0-.1.8c0 2.9 3.4 5.2 7.5 5.2s7.5-2.3 7.5-5.2a4 4 0 0 0-.1-.8A2.1 2.1 0 0 0 22 12ZM8 13.5a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0Zm7.3 3.4a4.6 4.6 0 0 1-3.3 1 4.6 4.6 0 0 1-3.3-1 .4.4 0 0 1 .6-.6 3.9 3.9 0 0 0 2.7.8 3.9 3.9 0 0 0 2.7-.8.4.4 0 1 1 .6.6Zm-.6-2.1a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4.4A19 19 0 0 0 15.3 3l-.2.5a17.6 17.6 0 0 1 4.1 1.3 15.9 15.9 0 0 0-13.4 0A17.6 17.6 0 0 1 9.9 3.5L9.7 3A19 19 0 0 0 5 4.4C2 8.9 1.2 13.3 1.6 17.6A19.2 19.2 0 0 0 7.4 21l.4-.6a13.9 13.9 0 0 1-2.2-1.1l.5-.4a13.6 13.6 0 0 0 11.6 0l.5.4a13.9 13.9 0 0 1-2.2 1.1l.4.6a19.2 19.2 0 0 0 5.8-3.4c.5-5-.8-9.4-3.2-13.2ZM8.6 15c-1 0-1.9-1-1.9-2.1S7.5 10.7 8.6 10.7s1.9 1 1.9 2.1S9.7 15 8.6 15Zm6.8 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.28V21H3.3V8.4Zm5.5 0h3.14v1.72h.05a3.44 3.44 0 0 1 3.1-1.7c3.31 0 3.92 2.18 3.92 5V21h-3.27v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.64V21H8.8V8.4Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>'
};

/* ===================================================================
   INDEX PAGE — onboarding + catalog
   =================================================================== */
if (document.getElementById('wizard')) {
  indexApp();
}

function indexApp() {
  var $ = function (s) { return document.querySelector(s); };
  var STORE = 'guide.onboarding';
  var cfg, tags, site, catalog, tutorial, runtime;
  var answers = load();     // {audience, level, interests[], _audiencetags[]} | null
  var draft, step = 0, browseMode = false;
  var tutIndex = 0, tutApp = null;

  Promise.all([
    fetchJSON('config/onboarding.json'),
    fetchJSON('config/tags.json'),
    fetchJSON('config/site.json'),
    fetchJSON('catalog.json'),
    fetchJSON('config/install-tutorial.json').catch(function () { return { slides: [], cta: {} }; }),
    fetchJSON('config/runtime.json').catch(function () { return {}; })
  ]).then(function (r) {
    cfg = r[0]; tags = r[1]; site = r[2]; catalog = r[3]; tutorial = r[4]; runtime = r[5];
    bindStatic();
    setLangButtons();
    if (answers) showResults(); else startWizard();
  }).catch(function (e) {
    console.error(e);
    var w = $('#wizard');
    w.hidden = false;
    w.innerHTML = '<div class="wiz-inner"><p class="error">Could not load app data. Please refresh.</p></div>';
  });

  function fetchJSON(u) {
    return fetch(u).then(function (r) { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); });
  }
  function ui(k) { return tr(cfg.ui[k]); }

  /* Options for a question. For dynamic sources (tags.interest), resolved
     each render so audience-scoped filtering can react to a Back-and-change. */
  function optionsFor(q) {
    if (q.options) return q.options;
    if (q.source === 'tags.interest') {
      var aud = draft && draft.audience;
      return tags.interest
        .filter(function (t) { return !t.audiences || !aud || t.audiences.indexOf(aud) >= 0; })
        .map(function (t) { return { id: t.id, tags: [t.id], emoji: t.emoji, label: t.label }; });
    }
    return [];
  }
  function qById(id) { return cfg.questions.filter(function (q) { return q.id === id; })[0]; }

  /* ---- persistence ------------------------------------------------- */
  function load() { try { return JSON.parse(localStorage.getItem(STORE)); } catch (e) { return null; } }
  function persist(a) { localStorage.setItem(STORE, JSON.stringify(a)); }

  /* ---- wizard ------------------------------------------------------ */
  function startWizard() {
    draft = { audience: null, level: null, interests: [], _audiencetags: [] };
    step = 0;
    $('#results').hidden = true;
    $('#redoBtn').hidden = true;
    $('#wizard').hidden = false;
    renderStep();
  }

  function renderStep() {
    var q = cfg.questions[step];
    $('#wizProgress').innerHTML = cfg.questions.map(function (_, i) {
      return '<span class="wiz-dot ' + (i < step ? 'done' : i === step ? 'on' : '') + '"></span>';
    }).join('');
    $('#wizTitle').textContent = tr(q.title);
    $('#wizSub').textContent = tr(q.subtitle);

    var opts = $('#wizOpts');
    opts.className = 'wiz-opts' + (q.type === 'multi' ? ' multi' : '');
    opts.innerHTML = '';
    var cur = q.id === 'interests' ? draft.interests : draft[q.id];
    var options = optionsFor(q);
    options.forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'wiz-opt';
      var sel = q.type === 'multi' ? cur.indexOf(o.id) >= 0 : cur === o.id;
      if (sel) b.classList.add('sel');
      var em = document.createElement('span'); em.className = 'emoji'; em.textContent = o.emoji || '';
      var lb = document.createElement('span'); lb.className = 'lbl'; lb.textContent = tr(o.label);
      b.appendChild(em); b.appendChild(lb);
      b.addEventListener('click', function () { choose(q, o); });
      opts.appendChild(b);
    });

    $('#wizBack').textContent = ui('back');
    $('#wizBack').hidden = step === 0;
    $('#wizSkip').textContent = ui('skip');
    var isLast = step === cfg.questions.length - 1;
    var nx = $('#wizNext');
    nx.textContent = isLast ? ui('done') : ui('next');
    nx.hidden = q.type !== 'multi';   // single-choice auto-advances; multi needs explicit Next
  }

  function choose(q, o) {
    if (q.type === 'multi') {
      var i = draft.interests.indexOf(o.id);
      if (i >= 0) draft.interests.splice(i, 1); else draft.interests.push(o.id);
      renderStep();
    } else {
      draft[q.id] = o.id;
      if (q.id === 'audience') {
        draft._audiencetags = o.tags || [o.id];
        var validIds = optionsFor(qById('interests')).map(function (x) { return x.id; });
        draft.interests = draft.interests.filter(function (id) { return validIds.indexOf(id) >= 0; });
      }
      renderStep();
      setTimeout(next, 190);          // auto-advance
    }
  }
  function next() {
    if (step < cfg.questions.length - 1) { step++; renderStep(); }
    else finish();
  }
  function finish() { answers = draft; persist(answers); showResults(); }

  /* ---- results ----------------------------------------------------- */
  function showResults() {
    $('#wizard').hidden = true;
    $('#results').hidden = false;
    $('#redoBtn').hidden = false;
    $('#redoBtn').textContent = ui('redo');
    $('#resTitle').textContent = ui('resultsTitle');
    $('#resSub').textContent = ui('resultsSub');
    $('#q').placeholder = ui('searchPh');
    browseMode = false;
    renderCommunity();
    renderGrid();
  }

  function audienceTags() { return (answers && answers._audiencetags) || (answers && answers.audience ? [answers.audience] : []); }
  function interests() { return (answers && answers.interests) || []; }

  function score(a) {
    var s = 0;
    audienceTags().forEach(function (t) { if (a.tags.indexOf(t) >= 0) s += 3; });
    interests().forEach(function (t) { if (a.tags.indexOf(t) >= 0) s += 2; });
    if (answers.level === 'dev' && (a.tags.indexOf('developer') >= 0 || a.tags.indexOf('ai') >= 0)) s += 1;
    if (a.recommended) s += 0.5;
    return s;
  }

  function picked() {
    var tagged = catalog.apps.filter(function (a) { return a.tags && a.tags.length; }); // hide until tagged
    var ints = interests();
    var list = ints.length
      ? tagged.filter(function (a) { return ints.some(function (t) { return a.tags.indexOf(t) >= 0; }); })
      : tagged.slice();
    return list.sort(function (x, y) { return score(y) - score(x); });
  }

  function searchText(a) {
    return (a.id + ' ' + tr(a.title) + ' ' + tr(a.tagline) + ' ' + (a.category || '') + ' ' + a.tags.join(' ')).toLowerCase();
  }

  function renderGrid() {
    var term = $('#q').value.trim().toLowerCase();
    var list = browseMode ? catalog.apps.slice() : picked();
    if (term) list = catalog.apps.filter(function (a) { return searchText(a).indexOf(term) >= 0; });

    var grid = $('#grid');
    grid.innerHTML = '';
    list.forEach(function (a) { grid.appendChild(card(a)); });

    var empty = $('#empty');
    empty.textContent = tr(cfg.results.empty);
    empty.classList.toggle('show', list.length === 0);

    var bb = $('#browseBtn');
    bb.textContent = browseMode ? ('← ' + ui('resultsTitle')) : tr(cfg.results.browseAll);
    $('#browseWrap').classList.remove('hide');
  }

  function card(a) {
    var t = document.createElement('button');
    t.className = 'tile';
    if (a.recommended && !browseMode) {
      var rec = document.createElement('span'); rec.className = 'badge-rec'; rec.textContent = ui('recommended');
      t.appendChild(rec);
    }
    if (a.icon) {
      var img = document.createElement('img');
      img.className = 'app-ic'; img.src = a.icon; img.alt = ''; img.loading = 'lazy';
      img.onerror = function () { var fb = document.createElement('div'); fb.className = 'app-ic-fb'; fb.textContent = '📦'; img.replaceWith(fb); };
      t.appendChild(img);
    } else {
      var fb = document.createElement('div'); fb.className = 'app-ic-fb'; fb.textContent = '📦'; t.appendChild(fb);
    }
    var cat = document.createElement('div'); cat.className = 'cat'; cat.textContent = a.category || ''; t.appendChild(cat);
    var h = document.createElement('h3'); h.textContent = tr(a.title, a.id); t.appendChild(h);
    var tl = document.createElement('div'); tl.className = 'tagline'; tl.textContent = tr(a.tagline); t.appendChild(tl);
    t.addEventListener('click', function () { openSheet(a); });
    return t;
  }

  /* ---- app detail sheet ------------------------------------------- */
  function firstPara(md) {
    if (!md) return '';
    var s = md.split(/\n\s*\n/).slice(0, 2).join('\n\n');
    s = s.replace(/[*#>`]/g, '').trim();
    return s.length > 420 ? s.slice(0, 420).trim() + '…' : s;
  }

  function openSheet(a) {
    var sheet = $('#sheet');
    sheet.className = 'sheet';
    sheet.innerHTML = '';

    sheet.appendChild(el('div', 'grab'));
    var close = el('button', 'm-close'); close.setAttribute('aria-label', ui('close')); close.innerHTML = IC.x;
    close.addEventListener('click', closeSheet);
    sheet.appendChild(close);

    var head = el('div', 'm-head');
    if (a.icon) {
      var img = document.createElement('img'); img.className = 'app-ic'; img.style.width = '60px'; img.style.height = '60px'; img.src = a.icon; img.alt = '';
      img.onerror = function () { var f = el('div', 'app-ic-fb'); f.style.width = '60px'; f.style.height = '60px'; f.textContent = '📦'; img.replaceWith(f); };
      head.appendChild(img);
    } else { var f = el('div', 'app-ic-fb'); f.style.width = '60px'; f.style.height = '60px'; f.textContent = '📦'; head.appendChild(f); }
    var htxt = el('div');
    htxt.appendChild(el('h2', null, tr(a.title, a.id)));
    var tagRow = el('div', 'm-tags'); tagRow.appendChild(el('span', 'cat', a.category || ''));
    htxt.appendChild(tagRow);
    head.appendChild(htxt);
    sheet.appendChild(head);

    if (tr(a.tagline)) sheet.appendChild(el('div', 'm-payoff', tr(a.tagline)));
    var desc = firstPara(tr(a.description));
    if (desc) sheet.appendChild(el('div', 'm-desc', desc));

    var setup = a.setup || {};
    if (setup.youtube || setup.blog || a.docPath) {
      var links = el('div', 'm-setup');
      if (setup.youtube) links.appendChild(snLink('setup-link yt', ui('watch'), setup.youtube, IC.yt));
      if (a.docPath) links.appendChild(snLink('setup-link', ui('read'), 'guide.html?doc=' + encodeURIComponent(a.docPath), IC.doc));
      else if (setup.blog) links.appendChild(snLink('setup-link', ui('read'), setup.blog, IC.doc));
      sheet.appendChild(links);
    }

    var cta = el('div', 'm-cta');
    var install = document.createElement('button');
    install.type = 'button';
    install.className = 'btn btn-solid';
    install.textContent = ui('install');
    install.addEventListener('click', function () { openTutorial(a); });
    cta.appendChild(install);
    sheet.appendChild(cta);

    $('#ovl').setAttribute('aria-label', ui('appDetails'));
    $('#ovl').classList.add('show');
    document.body.classList.add('sheet-open');
    close.focus();
  }
  function closeSheet() {
    $('#ovl').classList.remove('show');
    document.body.classList.remove('sheet-open');
  }

  /* ---- install tutorial slider ----------------------------------- */
  function renderBold(dest, text) {
    var parts = String(text || '').split(/\*\*([^*]+)\*\*/);
    parts.forEach(function (p, i) {
      if (i % 2 === 1) {
        var b = document.createElement('strong');
        b.textContent = p;
        dest.appendChild(b);
      } else if (p) {
        dest.appendChild(document.createTextNode(p));
      }
    });
  }
  function openTutorial(a) {
    tutApp = a;
    tutIndex = 0;
    renderTutorial();
    $('#ovl').setAttribute('aria-label', tr(a.title, a.id));
    $('#ovl').classList.add('show');
    document.body.classList.add('sheet-open');
  }
  function renderTutorial() {
    var slides = (tutorial && tutorial.slides) || [];
    var sheet = $('#sheet');
    sheet.className = 'sheet tutorial';
    sheet.innerHTML = '';

    var top = el('div', 'tut-top');
    var back = el('button', 'tut-back');
    back.type = 'button';
    back.setAttribute('aria-label', ui('back'));
    back.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="m15 18-6-6 6-6"/></svg>';
    back.addEventListener('click', function () { openSheet(tutApp); });
    top.appendChild(back);

    var close = el('button', 'm-close');
    close.type = 'button';
    close.setAttribute('aria-label', ui('close'));
    close.innerHTML = IC.x;
    close.addEventListener('click', closeSheet);
    top.appendChild(close);
    sheet.appendChild(top);

    if (slides.length === 0) {
      sheet.appendChild(el('div', 'tut-empty', ui('tutorialEmpty') || 'Tutorial coming soon.'));
      return;
    }

    var stage = el('div', 'tut-stage');
    var slide = slides[tutIndex] || slides[0];
    var img = document.createElement('img');
    img.className = 'tut-img';
    img.alt = '';
    img.src = slide.image;
    img.onerror = function () {
      var ph = el('div', 'tut-ph');
      ph.textContent = '📷';
      img.replaceWith(ph);
    };
    stage.appendChild(img);
    sheet.appendChild(stage);

    var cap = el('div', 'tut-caption');
    renderBold(cap, tr(slide.caption));
    sheet.appendChild(cap);

    var dots = el('div', 'tut-dots');
    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'tut-dot' + (i === tutIndex ? ' on' : '');
      d.setAttribute('aria-label', String(i + 1));
      d.addEventListener('click', function () { tutIndex = i; renderTutorial(); });
      dots.appendChild(d);
    });
    sheet.appendChild(dots);

    var nav = el('div', 'tut-nav');
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'btn btn-ghost';
    prev.textContent = ui('back');
    prev.disabled = tutIndex === 0;
    prev.addEventListener('click', function () { if (tutIndex > 0) { tutIndex--; renderTutorial(); } });
    nav.appendChild(prev);

    var isLast = tutIndex === slides.length - 1;
    if (isLast) {
      var casaosUrl = runtime && runtime.casaosUrl;
      if (casaosUrl) {
        var open = document.createElement('a');
        open.className = 'btn btn-solid';
        open.textContent = tr(tutorial.cta) || ui('install');
        open.href = casaosUrl;
        open.target = '_blank';
        open.rel = 'noopener';
        nav.appendChild(open);
      } else {
        var done = document.createElement('button');
        done.type = 'button';
        done.className = 'btn btn-solid';
        done.textContent = ui('close');
        done.addEventListener('click', closeSheet);
        nav.appendChild(done);
      }
    } else {
      var next = document.createElement('button');
      next.type = 'button';
      next.className = 'btn btn-solid';
      next.textContent = ui('next');
      next.addEventListener('click', function () { tutIndex++; renderTutorial(); });
      nav.appendChild(next);
    }
    sheet.appendChild(nav);
  }

  /* ---- community --------------------------------------------------- */
  var SN = {
    discord:  { label: 'Discord',  icon: IC.discord },
    reddit:   { label: 'Reddit',   icon: IC.reddit },
    youtube:  { label: 'YouTube',  icon: IC.yt },
    linkedin: { label: 'LinkedIn', icon: IC.linkedin },
    github:   { label: 'GitHub',   icon: IC.github }
  };
  var SN_ORDER = ['discord', 'reddit', 'youtube', 'linkedin', 'github'];

  function renderCommunity() {
    var c = (site && site.community) || {};
    var present = SN_ORDER.filter(function (k) { return c[k]; });
    if (!present.length) { $('#community').hidden = true; return; }
    $('#community').hidden = false;
    $('#commT').textContent = ui('community');
    $('#commP').textContent = ui('communitySub');
    var acts = $('#commActs'); acts.innerHTML = '';
    present.forEach(function (k) {
      acts.appendChild(snLink('sn-btn ' + k, SN[k].label, c[k], SN[k].icon));
    });
  }

  /* ---- helpers ----------------------------------------------------- */
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function snLink(cls, label, href, icon) {
    var a = document.createElement('a');
    a.className = cls; a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = icon; a.appendChild(document.createTextNode(label));
    return a;
  }
  function setLangButtons() {
    document.querySelectorAll('#lang button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === lang); });
  }

  /* ---- one-time bindings ------------------------------------------- */
  function bindStatic() {
    $('#wizBack').addEventListener('click', function () { if (step > 0) { step--; renderStep(); } });
    $('#wizNext').addEventListener('click', next);
    $('#wizSkip').addEventListener('click', finish);
    $('#redoBtn').addEventListener('click', startWizard);
    $('#q').addEventListener('input', renderGrid);
    $('#browseBtn').addEventListener('click', function () {
      browseMode = !browseMode; $('#q').value = ''; renderGrid();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    $('#lang').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      lang = b.dataset.l; localStorage.setItem('guide.lang', lang);
      document.documentElement.lang = lang;
      setLangButtons(); closeSheet();
      if ($('#wizard').hidden) showResults(); else renderStep();
    });
    $('#ovl').addEventListener('click', function (e) { if (e.target.id === 'ovl') closeSheet(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
  }
}

/* ===================================================================
   GUIDE PAGE — markdown viewer (guide.html)
   =================================================================== */
if (document.getElementById('content')) {

  var content = document.getElementById('content');
  var params = new URLSearchParams(window.location.search);
  var doc = params.get('doc');

  var VALID_DOC = /^[a-zA-Z0-9][a-zA-Z0-9\-\/]*$/;

  if (!doc) {
    content.innerHTML = '<p class="error">No guide specified.</p>';
  } else if (!VALID_DOC.test(doc) || doc.indexOf('..') !== -1) {
    content.innerHTML = '<p class="error">Invalid guide path.</p>';
  } else {
    var url = DOCS_BASE + '/' + doc;
    if (!url.endsWith('.md')) url += '.md';

    var markedOpts = { breaks: true };
    if (typeof marked.setOptions === 'function') {
      markedOpts.renderer = new marked.Renderer();
    }

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (md) {
        var html = marked.parse(md, markedOpts);
        content.innerHTML = '';
        sanitizeInto(html, content);
        buildTOC();
        updateTitle();
      })
      .catch(function () {
        content.innerHTML = '<p class="error">Could not load this guide. The page may not exist or you may be offline.</p>';
      });
  }

  function buildTOC() {
    var toc = document.getElementById('toc');
    if (!toc) return;
    var headings = document.querySelectorAll('.guide-content h2, .guide-content h3');
    if (headings.length === 0) {
      var sidebar = document.querySelector('.guide-sidebar');
      if (sidebar) sidebar.style.display = 'none';
      return;
    }
    toc.textContent = '';
    var seen = Object.create(null);
    headings.forEach(function (h) {
      var base = slugify(h.textContent) || 'section';
      var id = base, n = 2;
      while (seen[id]) { id = base + '-' + (n++); }
      seen[id] = true;
      h.id = id;
      var a = document.createElement('a');
      a.href = '#' + id;
      if (h.tagName === 'H3') a.className = 'toc-h3';
      a.textContent = h.textContent;
      toc.appendChild(a);
    });
  }
  var ALLOWED_TAGS = {
    A:1, ABBR:1, B:1, BLOCKQUOTE:1, BR:1, CODE:1, DEL:1, DIV:1, EM:1,
    H1:1, H2:1, H3:1, H4:1, H5:1, H6:1, HR:1, I:1, IMG:1, KBD:1, LI:1,
    OL:1, P:1, PRE:1, S:1, SPAN:1, STRONG:1, SUB:1, SUP:1,
    TABLE:1, TBODY:1, TD:1, TFOOT:1, TH:1, THEAD:1, TR:1, UL:1
  };
  var ALLOWED_ATTRS = {
    href:1, src:1, alt:1, title:1, colspan:1, rowspan:1, align:1,
    'class':1, id:1, name:1, target:1, rel:1
  };
  var URL_ATTRS = { href:1, src:1 };
  var DROP_TAGS = { SCRIPT:1, STYLE:1, IFRAME:1, OBJECT:1, EMBED:1, FORM:1, INPUT:1, TEXTAREA:1, META:1, LINK:1 };
  function safeUrl(v) {
    var s = String(v || '').trim();
    if (!s) return '';
    if (/^\s*(javascript|data|vbscript):/i.test(s)) return '';
    return s;
  }
  function sanitizeInto(html, dest) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    var frag = tpl.content;
    var walker = document.createTreeWalker(frag, NodeFilter.SHOW_ELEMENT, null);
    var toDrop = [], toRemove = [];
    var el;
    while ((el = walker.nextNode())) {
      var tag = el.tagName;
      if (DROP_TAGS[tag]) { toRemove.push(el); continue; }
      if (!ALLOWED_TAGS[tag]) { toDrop.push(el); continue; }
      for (var i = el.attributes.length - 1; i >= 0; i--) {
        var a = el.attributes[i];
        var n = a.name.toLowerCase();
        if (n.indexOf('on') === 0 || !ALLOWED_ATTRS[n]) {
          el.removeAttribute(a.name);
        } else if (URL_ATTRS[n]) {
          var clean = safeUrl(a.value);
          if (!clean) el.removeAttribute(a.name);
          else el.setAttribute(a.name, clean);
        }
      }
      if (tag === 'A' && el.getAttribute('target') === '_blank' && !el.getAttribute('rel')) {
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
    toRemove.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    toDrop.forEach(function (n) {
      var parent = n.parentNode; if (!parent) return;
      while (n.firstChild) parent.insertBefore(n.firstChild, n);
      parent.removeChild(n);
    });
    dest.appendChild(frag);
  }
  function slugify(s) {
    return String(s).toLowerCase()
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function updateTitle() {
    var h1 = document.querySelector('.guide-content h1');
    if (h1) document.title = h1.textContent + ' — Start Here';
  }

}

})();
