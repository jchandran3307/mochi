/* =========================================================
   MOCHI — Interactions & Animations
   Smooth, calm, 60fps
   ========================================================= */

(function () {
  'use strict';

  // ---------- Navigation scroll effect ----------
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---------- Mobile menu toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // ---------- Floating particles ----------
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 18;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.width = p.style.height = (4 + Math.random() * 6) + 'px';
    p.style.opacity = 0.2 + Math.random() * 0.3;
    particlesContainer.appendChild(p);
  }

  // ---------- Scroll reveal (IntersectionObserver) ----------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Mouse parallax on hero image ----------
  const heroImage = document.getElementById('heroImage');
  if (heroImage) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX = ((e.clientX - cx) / cx) * 15;
      mouseY = ((e.clientY - cy) / cy) * 15;
    });

    const animateParallax = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      heroImage.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateParallax);
    };
    animateParallax();
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Button ripple effect ----------
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = this.querySelector('.btn-ripple');
      if (!ripple) return;
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.opacity = '1';
      setTimeout(() => { ripple.style.opacity = '0'; }, 400);
    });
  });

  // ---------- Animated counters (for pricing badge) ----------
  // Subtle entrance animation for pricing amount
  const pricingAmount = document.querySelector('.pricing-amount');
  if (pricingAmount) {
    const priceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pricingAmount.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            pricingAmount.style.transform = 'scale(1)';
            pricingAmount.style.opacity = '1';
            priceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    pricingAmount.style.transform = 'scale(0.5)';
    pricingAmount.style.opacity = '0';
    priceObserver.observe(pricingAmount);
  }

  // ---------- Gallery card tilt on hover ----------
  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---------- FAQ open/close animation ----------
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      // Native <details> handles it, but we ensure smooth feel
    });
  });

  // ---------- Hero title word reveal ----------
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    window.addEventListener('load', () => {
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 200);
    });
  }

  // ---------- Subtle cursor glow following ----------
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(247,169,74,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ---------- Performance: reduce motion for users who prefer it ----------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    document.querySelectorAll('.blob, .particle, .hero-image-wrap, .about-image').forEach((el) => {
      el.style.animation = 'none';
    });
  }
})();