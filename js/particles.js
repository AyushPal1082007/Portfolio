/**
 * particles.js
 * Lightweight canvas particle system for the hero section.
 * Draws floating nodes with connecting lines — cyberpunk network aesthetic.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;
  let W, H;

  /* ── CONFIG ── */
  const CONFIG = {
    count: 60,
    maxDistance: 130,
    speed: 0.35,
    size: { min: 1, max: 2.5 },
    colors: ['rgba(6,182,212,', 'rgba(139,92,246,', 'rgba(99,102,241,'],
    lineOpacity: 0.12,
  };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    const colorBase = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      vx: randomBetween(-CONFIG.speed, CONFIG.speed),
      vy: randomBetween(-CONFIG.speed, CONFIG.speed),
      r: randomBetween(CONFIG.size.min, CONFIG.size.max),
      color: colorBase,
      opacity: randomBetween(0.3, 0.9),
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDistance) {
          const alpha = (1 - dist / CONFIG.maxDistance) * CONFIG.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color + '0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    animFrame = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    init();
    draw();
  }

  function stop() {
    cancelAnimationFrame(animFrame);
  }

  // Pause when tab hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      draw();
    }
  });

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  start();
})();