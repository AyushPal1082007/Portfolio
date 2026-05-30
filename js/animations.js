/**
 * animations.js
 * - IntersectionObserver reveal animations
 * - Skill bar animations
 * - Animated counters
 * - Tilt card effect
 * - Magnetic button effect
 * - Spotlight mouse tracking
 * - Parallax effects
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. INTERSECTION OBSERVER — REVEAL
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after trigger for performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     2. SKILL BARS
  ────────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width || '0';
          // Delay slightly so reveal animation completes
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ──────────────────────────────────────────
     3. ANIMATED COUNTERS
  ────────────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(c => counterObserver.observe(c));

  /* ──────────────────────────────────────────
     4. TILT CARD EFFECT
  ────────────────────────────────────────── */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxTilt = 8;
      const rotX = (-dy / (rect.height / 2)) * maxTilt;
      const rotY = (dx / (rect.width / 2)) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ──────────────────────────────────────────
     5. MAGNETIC BUTTONS
  ────────────────────────────────────────── */
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  if (window.matchMedia('(hover: hover)').matches) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease';
      });
    });
  }

  /* ──────────────────────────────────────────
     6. SPOTLIGHT EFFECT (hero section)
  ────────────────────────────────────────── */
  const spotlight = document.getElementById('spotlight');
  const hero = document.querySelector('.hero');

  if (spotlight && hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      spotlight.style.left = (e.clientX - rect.left) + 'px';
      spotlight.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  /* ──────────────────────────────────────────
     7. PARALLAX — HERO BLOBS
  ────────────────────────────────────────── */
  const blobs = document.querySelectorAll('.blob');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    blobs.forEach((blob, i) => {
      const speed = 0.08 + i * 0.04;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ──────────────────────────────────────────
     8. SKILL FILTER TABS
  ────────────────────────────────────────── */
  const tabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;

      skillCards.forEach(card => {
        if (cat === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          const cardCats = card.dataset.cat || '';
          if (cardCats.includes(cat)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        }
      });

      // Re-trigger skill bars for visible cards
      setTimeout(() => {
        document.querySelectorAll('.skill-card:not([style*="display: none"]) .skill-bar').forEach(bar => {
          bar.style.width = (bar.dataset.width || '0') + '%';
        });
      }, 300);
    });
  });

  // Initialize skill card transitions
  skillCards.forEach(card => {
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease, border-color 0.3s, box-shadow 0.3s';
  });

})();