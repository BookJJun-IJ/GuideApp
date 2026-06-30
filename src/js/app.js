(function () {
  'use strict';

  var DOCS_BASE = 'https://raw.githubusercontent.com/BookJJun-IJ/GuideApp/main/docs';
  var currentLevel = 'beginner';
  var allGoals = [];
  var showingAll = false;

  // ========== Index Page ==========
  function initIndex() {
    var container = document.getElementById('goals-container');
    if (!container) return;

    // Audience toggle
    var toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentLevel = btn.getAttribute('data-level');
        renderGoals(container);
        updateBanner();
      });
    });

    // Search
    var searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var q = this.value.toLowerCase();
        filterGoals(q);
      });
    }

    // Banner CTA
    var bannerCta = document.getElementById('banner-cta');
    if (bannerCta) {
      bannerCta.addEventListener('click', function () {
        var photosGoal = allGoals.find(function (g) { return g.id === 'photos'; });
        if (photosGoal) openSheet(photosGoal);
      });
    }

    // Sheet close
    document.getElementById('sheet-close').addEventListener('click', closeSheet);
    document.getElementById('sheet-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeSheet();
    });

    // Show more
    document.getElementById('show-more-btn').addEventListener('click', function () {
      showingAll = true;
      renderGoals(container);
    });

    // Fetch data
    fetch(DOCS_BASE + '/index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        allGoals = data.goals;
        renderGoals(container);
      })
      .catch(function () {
        container.innerHTML = '<p class="error">Could not load. Please check your internet connection.</p>';
      });
  }

  function renderGoals(container) {
    var grid = document.createElement('div');
    grid.className = 'goals-grid';

    var featured = allGoals.filter(function (g) { return g.featured; });
    var extra = allGoals.filter(function (g) { return !g.featured; });
    var toShow = showingAll ? allGoals : featured;

    toShow.forEach(function (goal) {
      var card = document.createElement('div');
      card.className = 'goal-card';
      card.setAttribute('data-id', goal.id);
      card.setAttribute('data-search',
        (goal.title.beginner + ' ' + goal.title.intermediate + ' ' + goal.title.developer + ' ' + goal.replaces).toLowerCase()
      );

      card.innerHTML =
        '<div class="goal-header">' +
          '<div class="goal-icon">' + goal.icon + '</div>' +
          '<div class="goal-title">' + goal.title[currentLevel] + '</div>' +
        '</div>' +
        '<div class="goal-replaces">Replaces ' + goal.replaces + '</div>';

      card.addEventListener('click', function () { openSheet(goal); });
      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);

    // Show more button
    var wrap = document.getElementById('show-more-wrap');
    if (showingAll || extra.length === 0) {
      wrap.classList.add('hidden');
    } else {
      wrap.classList.remove('hidden');
    }
  }

  function filterGoals(query) {
    var cards = document.querySelectorAll('.goal-card');
    var hasVisible = false;
    cards.forEach(function (card) {
      var text = card.getAttribute('data-search') || '';
      if (query === '' || text.indexOf(query) !== -1) {
        card.classList.remove('hidden');
        hasVisible = true;
      } else {
        card.classList.add('hidden');
      }
    });

    // If searching, show all goals and hide show-more
    if (query !== '' && !showingAll) {
      showingAll = true;
      renderGoals(document.getElementById('goals-container'));
      // Re-apply filter after re-render
      var cards2 = document.querySelectorAll('.goal-card');
      cards2.forEach(function (card) {
        var text = card.getAttribute('data-search') || '';
        if (text.indexOf(query) === -1) {
          card.classList.add('hidden');
        }
      });
    }
  }

  function updateBanner() {
    var banner = document.getElementById('first-time-banner');
    if (!banner) return;
    if (currentLevel === 'beginner') {
      banner.classList.remove('hidden');
    } else {
      banner.classList.add('hidden');
    }
  }

  function openSheet(goal) {
    document.getElementById('sheet-replaces').textContent = 'Replaces ' + goal.replaces;
    document.getElementById('sheet-title').textContent = goal.title[currentLevel];
    document.getElementById('sheet-reward').textContent = goal.reward;
    document.getElementById('badge-time').textContent = 'about ' + goal.time;

    // Access line: hide for beginners
    var accessEl = document.getElementById('sheet-access');
    if (currentLevel === 'beginner') {
      accessEl.textContent = "You'll open it in your web browser, just like any website.";
    } else {
      accessEl.textContent = "Access via your nsl.sh URL (HTTPS) or sslip.io for large uploads.";
    }

    // Steps
    var stepsList = document.getElementById('sheet-steps');
    var steps = goal.steps[currentLevel];
    stepsList.innerHTML = '';
    steps.forEach(function (step) {
      var li = document.createElement('li');
      li.textContent = step;
      stepsList.appendChild(li);
    });

    // Learn more link
    var learnMore = document.getElementById('sheet-learn-more');
    if (goal.doc) {
      learnMore.href = 'guide.html?doc=' + encodeURIComponent(goal.doc);
      learnMore.style.display = '';
    } else {
      learnMore.style.display = 'none';
    }

    document.getElementById('sheet-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    document.getElementById('sheet-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }

  // ========== Guide Page ==========
  function initGuide() {
    var content = document.getElementById('content');
    if (!content) return;

    var params = new URLSearchParams(window.location.search);
    var doc = params.get('doc');

    if (!doc) {
      content.innerHTML = '<p class="error">No guide specified.</p>';
      return;
    }

    var url = DOCS_BASE + '/' + doc;
    if (!url.endsWith('.md')) url += '.md';

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (md) {
        content.innerHTML = marked.parse(md);
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

    var html = '';
    headings.forEach(function (h, i) {
      var id = 'heading-' + i;
      h.id = id;
      var cls = h.tagName === 'H3' ? ' class="toc-h3"' : '';
      html += '<a href="#' + id + '"' + cls + '>' + h.textContent + '</a>';
    });
    toc.innerHTML = html;
  }

  function updateTitle() {
    var h1 = document.querySelector('.guide-content h1');
    if (h1) {
      document.title = h1.textContent + ' — Help';
    }
  }

  // ========== Init ==========
  if (document.getElementById('goals-container')) {
    initIndex();
  } else if (document.getElementById('content')) {
    initGuide();
  }
})();
