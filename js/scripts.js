(function() {

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
  expandAll.addEventListener('click', function() {
    var expanded = this.textContent === 'expand all' ? false : true;
    if (expanded) {
      [].forEach.call(toggles, function(toggle) {
        var target = document.getElementById(toggle.getAttribute('data-expands'));
        collapse(toggle, target);
      });
      this.textContent = 'expand all';
    } else {
      [].forEach.call(toggles, function(toggle) {
        var target = document.getElementById(toggle.getAttribute('data-expands'));
        expand(toggle, target);
      });
      this.textContent = 'collapse all';
    }
  });

})();
