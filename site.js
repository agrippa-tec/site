/* Agrippa Tec — progressive enhancement, no external dependencies. */
(() => {
  'use strict';
  const root = document.documentElement;
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobile = window.matchMedia('(max-width: 820px)');

  if (nav && toggle) {
    const setMenu = (open, restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
      nav.dataset.open = String(open);
      nav.inert = mobile.matches && !open;
      if (restoreFocus) toggle.focus();
    };
    setMenu(false);
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    nav.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (link && link.getAttribute('href').includes('#')) setMenu(false);
    });
    document.addEventListener('pointerdown', event => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('header')) setMenu(false);
    });
    mobile.addEventListener('change', () => setMenu(false));
    root.classList.add('js');
  }

  // Header shadow once the page scrolls, plus a thin scroll-progress
  // line across the top of the page.
  const header = document.querySelector('header');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Keep the existing anti-scraping contact scheme. Without JS the
  // links reach the readable, obfuscated contact already on the page.
  document.querySelectorAll('a.mail').forEach(link => {
    const address = link.dataset.u + '@' + link.dataset.d;
    link.href = 'mailto:' + address;
    if ('txt' in link.dataset) link.textContent = address;
  });

  // Content is visible by default. Only enable reveal motion if the
  // browser supports it, the user permits it, and setup succeeds.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
      root.classList.add('motion-ready');
    } catch (_) {
      root.classList.remove('motion-ready');
    }
  }
})();
