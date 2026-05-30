/**
 * cursor.js
 * Custom magnetic cursor with ring follower.
 * Expands on hoverable elements. Disabled on touch devices.
 */

(function () {
  'use strict';

  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isHovering = false;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    const ease = 0.12;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover detection
  const hoverables = 'a, button, .project-card, .skill-card, .achievement-card, .stat-card, .cmd-item, .tilt-card, .nav-link, .social-link, .contact-social, .copy-btn, .btn-project-detail, .btn-project-gh, .form-submit, .skill-tab';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.add('hovering');
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.remove('hovering');
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();