(function () {
  // Theme toggle
  var root = document.documentElement, btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Header: keep the name on one line (shrinking it only as much as needed), then size the
  // photo to the text block beside it (name top to badge bottom) on wide layouts.
  var photo = document.querySelector('.photo'), heroText = document.querySelector('.hero-text'),
      name = document.querySelector('.hero-text h1');
  function fitName() {
    if (!name) return;
    name.style.fontSize = '';
    var size = parseFloat(getComputedStyle(name).fontSize);
    while (name.scrollWidth > name.clientWidth && size > 16) {
      size -= 0.5;
      name.style.fontSize = size + 'px';
    }
  }
  function sizePhoto() {
    if (!photo || !heroText) return;
    fitName();
    if (window.innerWidth <= 560) { photo.style.width = photo.style.height = ''; return; }
    for (var i = 0; i < 3; i++) {   // photo size changes the room for the name, so settle it
      var h = Math.round(heroText.getBoundingClientRect().height);
      photo.style.width = photo.style.height = h + 'px';
      fitName();
    }
  }
  sizePhoto();
  window.addEventListener('resize', sizePhoto);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizePhoto);

  // Back-to-top visibility
  var top = document.getElementById('toTop');
  if (top) window.addEventListener('scroll', function () {
    top.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
})();
