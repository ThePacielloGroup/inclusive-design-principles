(function() {

  var translations = {
    en: {
      EXPAND: "expand all",
      COLLAPSE: "collapse all"
    },
    es: {
      EXPAND: "muestra todo",
      COLLAPSE: "esconde todos"
    }
  };
  var pageLang = document.querySelector('html').getAttribute('lang');
  var strings = translations[pageLang] || translations['en'];

  function collapse(toggle, target) {
    toggle.setAttribute('aria-expanded', 'false');
    target.hidden = true;
  }

  function expand(toggle, target) {
    toggle.setAttribute('aria-expanded', 'true');
    target.hidden = false;
  }

  var toggles = document.querySelectorAll('[data-expands]');
  [].forEach.call(toggles, function(toggle) {
    toggle.hidden = false;
    toggle.setAttribute('aria-expanded', 'false');
    var target = document.getElementById(toggle.getAttribute('data-expands'));
    if (target) {
      target.hidden = true;
      toggle.addEventListener('click', function() {
        var expanded = (this.getAttribute('aria-expanded') === 'true');
        if (expanded) {
          collapse(this, target);
        } else {
          expand(this, target);
        }
      });
    }
  });

  var expandAll = document.querySelector('[data-expandAll]');
  expandAll.hidden = false;
  expandAll.textContent = strings.EXPAND;
  expandAll.addEventListener('click', function() {
    var expanded = this.textContent === strings.EXPAND ? false : true;
    if (expanded) {
      [].forEach.call(toggles, function(toggle) {
        var target = document.getElementById(toggle.getAttribute('data-expands'));
        collapse(toggle, target);
      });
      this.textContent = strings.EXPAND;
    } else {
      [].forEach.call(toggles, function(toggle) {
        var target = document.getElementById(toggle.getAttribute('data-expands'));
        expand(toggle, target);
      });
      this.textContent = strings.COLLAPSE;
    }
  });

  function openSection() {
    var hash = window.location.hash || false;
    if (hash) {
      var id = hash.substring(1);
      var sectionToggle = document.querySelector('[data-expands='+id+'-content]') || false;
      if (sectionToggle) {
        if (sectionToggle.getAttribute('aria-expanded') === 'false') {
          sectionToggle.click();
        }
      }
    }
  }

  window.onload = openSection;
  window.onhashchange = openSection;

})();
