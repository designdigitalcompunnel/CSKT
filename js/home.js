/* ==========================================================================
   CSKT Water Compact Implementation — home.js (homepage only)
   Find-information tabs · featured projects rail (arrows, dots, drag) ·
   bento cursor glow.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. "Find information" tabs (keyboard accessible) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- 2. featured projects rail: arrows, dots (right side), drag ---------- */
  var rail = document.getElementById('rail');
  var prev = document.getElementById('rail-prev');
  var next = document.getElementById('rail-next');
  var dotsWrap = document.getElementById('rail-dots');

  if (rail && prev && next && dotsWrap) {
    var cards = Array.prototype.slice.call(rail.querySelectorAll('.card'));
    var dots = [];

    /* one dot per card; each is a button so it can be used by keyboard and screen readers */
    cards.forEach(function (card, i) {
      var title = (card.querySelector('h3') || {}).textContent || ('Project ' + (i + 1));
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rail-dot';
      b.setAttribute('aria-label', 'Show project ' + (i + 1) + ' of ' + cards.length + ': ' + title.trim());
      b.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });

    function step() {
      var card = cards[0];
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 22;
      return card ? card.getBoundingClientRect().width + gap : 360;
    }
    function goTo(index) {
      var target = cards[Math.max(0, Math.min(cards.length - 1, index))];
      if (target) rail.scrollTo({ left: target.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' });
    }
    function currentIndex() {
      var best = 0, bestDist = Infinity;
      cards.forEach(function (card, i) {
        var d = Math.abs(card.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft) - rail.scrollLeft);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }
    function updateControls() {
      var atStart = rail.scrollLeft < 8;
      var atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      prev.disabled = atStart;
      next.disabled = atEnd;
      var idx = atEnd ? cards.length - 1 : currentIndex();
      dots.forEach(function (d, i) {
        if (i === idx) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }

    prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
    rail.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });

    /* mouse drag (touch already scrolls natively) */
    var down = false, startX = 0, startLeft = 0, moved = false;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; rail.classList.add('drag'); }
      if (moved) rail.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      rail.classList.remove('drag');
    });
    /* a drag should not count as a click on a card link */
    rail.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  /* ---------- 3. bento tiles: light follows the cursor (mouse only) ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-glow]').forEach(function (tile) {
      tile.addEventListener('pointermove', function (e) {
        var r = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        tile.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
})();
