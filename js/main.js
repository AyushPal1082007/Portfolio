/**
 * main.js
 * - Loader
 * - Navbar scroll behavior + active section tracking
 * - Typing effect
 * - Mobile menu
 * - Scroll progress bar
 * - Command palette
 * - Project modals
 * - Contact form
 * - Copy email
 * - Toast notifications
 * - Easter egg
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     LOADER
  ────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderText = document.getElementById('loaderText');

  const loadingSteps = [
    'Initializing systems...',
    'Loading AI modules...',
    'Connecting blockchain...',
    'Compiling portfolio...',
    'Ready.',
  ];

  let step = 0;
  const totalSteps = loadingSteps.length;

  function advanceLoader() {
    if (step >= totalSteps) {
      hideLoader();
      return;
    }
    loaderText.textContent = loadingSteps[step];
    loaderBar.style.width = ((step + 1) / totalSteps * 100) + '%';
    step++;
    setTimeout(advanceLoader, step === totalSteps ? 200 : 380);
  }

  function hideLoader() {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero reveals after loader
      document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
        el.classList.add('visible');
      });
    }, 300);
  }

  document.body.style.overflow = 'hidden';
  setTimeout(advanceLoader, 300);

  /* ──────────────────────────────────────────
     SCROLL PROGRESS BAR
  ────────────────────────────────────────── */
  const progressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ──────────────────────────────────────────
     NAVBAR — SCROLL + ACTIVE SECTION
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ──────────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────────
     TYPING EFFECT
  ────────────────────────────────────────── */
  const typingEl = document.getElementById('typingText');
  const roles = [
    'AI Systems',
    'Web3 DApps',
    'IoT Solutions',
    'Full Stack Apps',
    'Smart Contracts',
    'LLM Pipelines',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function type() {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 60 : 110;

    if (!isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, 1800);
        return;
      }
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingTimeout = setTimeout(type, 400);
        return;
      }
    }

    typingTimeout = setTimeout(type, speed);
  }

  // Start typing after loader
  setTimeout(type, 2200);

  /* ──────────────────────────────────────────
     SMOOTH SCROLL (for older browsers)
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     COMMAND PALETTE
  ────────────────────────────────────────── */
  const cmdOverlay = document.getElementById('cmdOverlay');
  const cmdInput = document.getElementById('cmdInput');
  const cmdList = document.getElementById('cmdList');
  const cmdTrigger = document.getElementById('cmdTrigger');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmd() {
    cmdOverlay.classList.add('open');
    setTimeout(() => cmdInput.focus(), 100);
  }

  function closeCmd() {
    cmdOverlay.classList.remove('open');
    cmdInput.value = '';
    cmdItems.forEach(i => i.style.display = '');
  }

  cmdTrigger.addEventListener('click', openCmd);

  cmdOverlay.addEventListener('click', (e) => {
    if (e.target === cmdOverlay) closeCmd();
  });

  // Ctrl+K / Cmd+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      cmdOverlay.classList.contains('open') ? closeCmd() : openCmd();
    }
    if (e.key === 'Escape') closeCmd();
  });

  // Filter command items
  cmdInput.addEventListener('input', () => {
    const query = cmdInput.value.toLowerCase();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });

  // Execute commands
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      const action = item.dataset.action;

      if (section) {
        const target = document.getElementById(section);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }

      if (action === 'email') {
        navigator.clipboard.writeText('ap87659161@gmail.com');
        showToast('✉️ Email copied to clipboard!');
      }

      if (action === 'github') {
        window.open('https://github.com/AyushPal1082007', '_blank');
      }

      if (action === 'linkedin') {
        window.open('https://linkedin.com/in/ayush-pal-404295381', '_blank');
      }

      closeCmd();
    });
  });

  /* ──────────────────────────────────────────
     PROJECT MODALS
  ────────────────────────────────────────── */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  const projectData = {
    carebot: {
      title: 'CareBot',
      subtitle: 'AI-Powered Elderly Care Robot',
      badge: '🏆 Hardware Track Winner — Vihaan 9.0 (DTU)',
      desc: 'Built an AI-powered carebot robot for elderly care, winning the Hardware Track at Vihaan 9.0 at Delhi Technological University (DTU). Competed against hardware teams from colleges across India.',
      highlights: [
        'Integrated Gemini Vision API for real-time food detection and macro-estimation',
        'FastAPI backend handling sensor data, AI inference, and health logging',
        'IoT sensor integration for real-time health monitoring (vitals, motion)',
        'Designed for accessibility — voice interaction and automated alerts',
        'Winner of Hardware Track at Vihaan 9.0 — one of India\'s biggest hackathons',
      ],
      tech: ['Python', 'FastAPI', 'Gemini Vision API', 'IoT', 'Hardware Integration'],
      year: '2024–2025',
    },
    ecosentinel: {
      title: 'Eco-Sentinel',
      subtitle: 'GenAI Agricultural Intelligence Platform',
      badge: '🌱 10-Page Full Stack AI Platform',
      desc: 'A comprehensive GenAI agricultural intelligence platform built to help Indian farmers with crop health monitoring, disease diagnosis, market prices, and financial tools.',
      highlights: [
        'Built 10-page platform covering crop health, disease, finance & market tools',
        'Integrated Bhashini API for 22-language voice AI support',
        'Integrated Agrimarknet for live mandi (market) crop prices',
        'Dual AI pipeline: Gemini 1.5 Flash (vision) + Groq LLaMA 3.3-70B (text)',
        '8 Indian government APIs integrated total',
        'Deployed on Vercel (frontend) + Render (backend)',
      ],
      tech: ['Node.js', 'Express.js', 'Gemini 1.5 Flash', 'Groq LLaMA 3.3-70B', 'Bhashini', 'Agrimarknet', 'Vercel', 'Render'],
      year: '2024',
    },
    aitracker: {
      title: 'AI Activity Tracker',
      subtitle: 'Decentralized Full-Stack DApp',
      badge: '🏆 Top Performer — LOCKIN Blockchain + AI Bootcamp',
      desc: 'A decentralized application (DApp) that classifies user activities using AI and stores the results immutably on the Ethereum blockchain — creating a tamper-proof activity ledger.',
      highlights: [
        'AI classifies activities (running, walking, cycling, etc.) with high accuracy',
        'Results stored on-chain via a Solidity smart contract on Sepolia Testnet',
        'MetaMask wallet integration for user authentication and transaction signing',
        'React.js frontend with real-time blockchain read/write operations',
        'Node.js backend handling AI inference and blockchain interactions',
        'Fully deployed: frontend (Vercel) + backend (Render)',
        'Won Top Performer at LOCKIN Blockchain + AI Bootcamp at KIET',
      ],
      tech: ['React.js', 'Node.js', 'Solidity', 'Ethers.js', 'MetaMask', 'Sepolia Testnet', 'Vercel', 'Render'],
      year: '2024',
    },
    commute: {
      title: 'One Button Commute',
      subtitle: 'Smart Commute Optimization Platform',
      badge: '🚌 Design Thinking Implementation',
      desc: 'A smart commute platform that helps users find the optimal route by comparing options live, showing crowd indicators, and sending smart alerts — all with a single button.',
      highlights: [
        'Live route comparison across multiple commute modes',
        'Crowd density indicators with real-time-style updates',
        'Smart alerts for delays, route changes, and optimal timing',
        'Applied full Design Thinking process: Empathize → Define → Ideate → Prototype → Test',
        'Created user personas, empathy maps, and journey maps',
        'Designed for accessibility and low-data environments',
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Design Thinking', 'UX Research'],
      year: '2024',
    },
  };

  document.querySelectorAll('.btn-project-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.project;
      const data = projectData[key];
      if (!data) return;

      modalContent.innerHTML = `
        <span class="modal-sub">${data.badge}</span>
        <h2>${data.title}</h2>
        <p class="modal-sub">${data.subtitle} — ${data.year}</p>
        <p>${data.desc}</p>
        <h4>// Key Features</h4>
        <ul>${data.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        <h4>// Tech Stack</h4>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
          ${data.tech.map(t => `<span style="font-size:0.72rem;font-family:var(--font-mono);background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.15);padding:4px 12px;border-radius:4px;color:var(--cyan);">${t}</span>`).join('')}
        </div>
      `;

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ──────────────────────────────────────────
     CONTACT FORM
  ────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitText = document.getElementById('submitText');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill all required fields.');
        return;
      }

      // Simulate submit (replace with real endpoint if needed)
      submitText.textContent = 'Sending...';

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        showToast('✅ Message sent successfully!');
      }, 1200);
    });
  }

  /* ──────────────────────────────────────────
     COPY EMAIL BUTTON
  ────────────────────────────────────────── */
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.copy;
      navigator.clipboard.writeText(email).then(() => {
        showToast('✉️ Email copied to clipboard!');
        copyEmailBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          copyEmailBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
        }, 2000);
      });
    });
  }

  /* ──────────────────────────────────────────
     TOAST NOTIFICATION
  ────────────────────────────────────────── */
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Expose globally
  window.showToast = showToast;

  /* ──────────────────────────────────────────
     EASTER EGG — Konami Code
  ────────────────────────────────────────── */
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        triggerEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerEasterEgg() {
    showToast('🎮 You found the easter egg! Ayush appreciates your curiosity 🚀');

    // Briefly make all blobs go wild
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach(blob => {
      blob.style.transition = 'transform 0.3s ease';
      blob.style.filter = 'blur(40px) hue-rotate(180deg)';
    });

    // Matrix-style brief overlay
    const matrix = document.createElement('div');
    matrix.style.cssText = `
      position:fixed;inset:0;z-index:99997;pointer-events:none;
      background:radial-gradient(circle at center, rgba(6,182,212,0.08) 0%, transparent 70%);
      animation: none;
    `;
    document.body.appendChild(matrix);

    setTimeout(() => {
      blobs.forEach(blob => {
        blob.style.filter = 'blur(80px)';
      });
      matrix.remove();
    }, 2000);
  }

  /* ──────────────────────────────────────────
     SECTION BACKGROUND ALTERNATION FIX
  ────────────────────────────────────────── */
  // Override nth-child logic for explicitly colored sections
  const bgMap = {
    hero: 'var(--bg-primary)',
    about: 'var(--bg-secondary)',
    skills: 'var(--bg-primary)',
    projects: 'var(--bg-secondary)',
    achievements: 'var(--bg-primary)',
    journey: 'var(--bg-secondary)',
    contact: 'var(--bg-primary)',
  };

  Object.keys(bgMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.background = bgMap[id];
  });

})();