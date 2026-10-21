(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : darkQuery.matches;
  }

  function sync() {
    var dark = isDark();
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#000000' : '#ffffff');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  // Follow the device setting until the visitor picks a theme themselves.
  var onSystemChange = function () {
    if (!root.getAttribute('data-theme')) sync();
  };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
  else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  sync();
})();
