/* Vermora — minimal interactions (no framework, no dependencies). */
(function () {
  'use strict';

  // Mobile drawer
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  if (toggle && drawer) {
    const open = function () {
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const close = function () {
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close();
    });
  }

  // Reveal on scroll
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reduced) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Booking card — graceful inert submit (the demo template has no backend)
  const bookingForm = document.querySelector('.booking-card form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sent — Lucía will be in touch';
      setTimeout(function () { btn.disabled = false; btn.textContent = original; bookingForm.reset(); }, 3200);
    });
  }
})();
