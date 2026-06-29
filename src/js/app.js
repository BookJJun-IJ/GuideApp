(function () {
  'use strict';

  var DOCS_BASE = 'https://raw.githubusercontent.com/Yundera/AppStore/main/Apps/Guide/docs';

  // ========== Index Page ==========
  function initIndex() {
    var container = document.getElementById('cards-container');
    var searchInput = document.getElementById('search');
    if (!container) return;

    fetch(DOCS_BASE + '/index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        renderCards(container, data.categories);
        if (searchInput) {
          searchInput.addEventListener('input', function () {
            filterCards(this.value.toLowerCase());
          });
        }
      })
      .catch(function () {
        container.innerHTML = '<p class="error">Could not load guides. Please check your internet connection.</p>';
      });
  }

  function renderCards(container, categories) {
    container.innerHTML = '';
    categories.forEach(function (cat) {
      var section = document.createElement('section');
      section.className = 'category';
      section.setAttribute('data-category', cat.name);

      var title = document.createElement('h2');
      title.className = 'category-title';
      title.textContent = cat.name;
      section.appendChild(title);

      var grid = document.createElement('div');
      grid.className = 'cards-grid';

      cat.items.forEach(function (item) {
        var card = document.createElement('a');
        card.className = 'card';
        card.href = 'guide.html?doc=' + encodeURIComponent(item.file);
        card.setAttribute('data-search', (item.title + ' ' + item.description).toLowerCase());

        card.innerHTML =
          '<div class="card-icon">' + item.icon + '</div>' +
          '<div class="card-body">' +
            '<div class="card-title">' + item.title + '</div>' +
            '<div class="card-desc">' + item.description + '</div>' +
          '</div>';

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function filterCards(query) {
    var cards = document.querySelectorAll('.card');
    var categories = document.querySelectorAll('.category');

    cards.forEach(function (card) {
      var text = card.getAttribute('data-search') || '';
      if (query === '' || text.indexOf(query) !== -1) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide empty categories
    categories.forEach(function (cat) {
      var visible = cat.querySelectorAll('.card:not(.hidden)');
      cat.style.display = visible.length === 0 ? 'none' : '';
    });
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
      document.querySelector('.guide-sidebar').style.display = 'none';
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
      document.title = h1.textContent + ' — PCS Guide';
    }
  }

  // ========== Init ==========
  if (document.getElementById('cards-container')) {
    initIndex();
  } else if (document.getElementById('content')) {
    initGuide();
  }
})();
