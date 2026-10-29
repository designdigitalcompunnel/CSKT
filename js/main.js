/* ==========================================================================
   CSKT Water Compact Implementation — main.js
   Shared behaviour: mobile menu · header hide/show · scroll progress ·
   reveal on scroll · parallax · on-page search.
   Loaded in <head> (no defer) so the `js` class is set before first paint.
   ========================================================================== */
document.documentElement.classList.add('js');

/* Non-hero photography is sourced from Unsplash and requires an internet connection. */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---- 1. mobile menu ---- */
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  function setMenu(open, returnFocus) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
    if (!open && returnFocus) toggle.focus();
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'), false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false, true);
    });
  }


  /* Navigation links remain stable while scrolling; no automatic section-switch highlighting. */

  /* ---- 7. footer word mark: fit "CSKT WATER" to the full content width of the grid ---- */
  var footWord = document.querySelector('.foot-word');
  function fitFootWord() {
    if (!footWord) return;
    var box = footWord.parentElement;
    var cs = getComputedStyle(box);
    var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    footWord.style.fontSize = '100px';
    var range = document.createRange(); range.selectNodeContents(footWord);
    var natural = range.getBoundingClientRect().width;
    if (natural > 0) footWord.style.fontSize = (100 * avail / natural).toFixed(2) + 'px';
  }
  fitFootWord();
  window.addEventListener('resize', fitFootWord);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitFootWord);

  /* ---- 2. header: hide on scroll down, show on scroll up; progress bar ---- */
  var header = document.getElementById('site-header');
  var progress = document.getElementById('progress');
  var searchForm = document.getElementById('site-search');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (header) {
        header.classList.toggle('scrolled', y > 24);
        /* Keep the floating header stable and visible; don't hide/switch it on scroll. */
        header.classList.remove('hide');
      }
      if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      updateParallax();
      lastY = y;
      ticking = false;
    });
  }

  /* ---- 3. parallax: any element with data-parallax="0.1" drifts slowly ---- */
  var pxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  function updateParallax() {
    if (reduce) return;
    var vh = window.innerHeight;
    pxEls.forEach(function (el) {
      var box = (el.parentElement || el).getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) return;
      var delta = (box.top + box.height / 2) - vh / 2;
      var f = parseFloat(el.dataset.parallax) || 0.1;
      el.style.setProperty('--py', (-delta * f).toFixed(1) + 'px');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateParallax);
  onScroll();

  /* ---- 4. reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (hasIO && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 5. header search (searches this page's visible text) ---- */
  var searchToggle = document.getElementById('search-toggle');
  var searchInput = document.getElementById('site-search-input');
  if (searchToggle && searchForm && searchInput) {
    searchToggle.addEventListener('click', function () {
      var opening = searchForm.hidden;
      searchForm.hidden = !opening;
      searchToggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
      if (opening) searchInput.focus();
    });
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var term = searchInput.value.trim().toLowerCase();
      if (!term) { searchInput.focus(); return; }
      var targets = Array.prototype.slice.call(document.querySelectorAll('main h1, main h2, main h3, main p, main a, main li'));
      var match = targets.find(function (el) { return el.textContent.toLowerCase().indexOf(term) !== -1; });
      if (match) {
        match.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        match.setAttribute('tabindex', '-1');
        match.focus({ preventScroll: true });
      } else {
        searchInput.setCustomValidity('No matching content found on this page.');
        searchInput.reportValidity();
        searchInput.setCustomValidity('');
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !searchForm.hidden) {
        searchForm.hidden = true;
        searchToggle.setAttribute('aria-expanded', 'false');
        searchToggle.focus();
      }
    });
  }
});
