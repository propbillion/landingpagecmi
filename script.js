/* ===========================================
   CMI Edutech Pvt. Ltd.
   Landing page interactions
   =========================================== */

(() => {
  'use strict';

  // ============ SCROLL REVEAL ============
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ============ NAV SCROLL STATE ============
  const nav = document.getElementById('nav');

  const handleScroll = () => {
    const y = window.scrollY;
    if (y > 24) {
      nav.style.background = 'rgba(255, 255, 255, 0.92)';
      nav.style.borderBottomColor = 'rgba(0,0,0,0.08)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.72)';
      nav.style.borderBottomColor = 'rgba(0,0,0,0.06)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ============ SMOOTH ANCHOR SCROLL ============
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      const menu = document.querySelector('.nav-menu');
      if (menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        menu.removeAttribute('style');
      }
    });
  });

  // ============ MOBILE MENU TOGGLE ============
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');

      if (navMenu.classList.contains('is-open')) {
        Object.assign(navMenu.style, {
          display: 'flex',
          position: 'fixed',
          top: '64px',
          left: '0',
          right: '0',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          flexDirection: 'column',
          padding: '32px 24px',
          gap: '24px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
        });
      } else {
        navMenu.removeAttribute('style');
      }
    });
  }

  // ============ CONTACT FORM ============
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.phone || !data.class) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      const phoneClean = data.phone.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return;
      }

      const waMessage = encodeURIComponent(
        `Hello CMI, I would like to enquire about the classroom programme.\n\n` +
        `Student name: ${data.name}\n` +
        `Contact: ${data.phone}\n` +
        `Class: ${data.class}` +
        (data.message ? `\nMessage: ${data.message}` : '')
      );
      const waUrl = `https://wa.me/919414377277?text=${waMessage}`;

      showFormMessage('Opening WhatsApp...', 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        form.reset();
      }, 600);
    });
  }

  function showFormMessage(text, type) {
    let msg = form.querySelector('.form-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-message';
      Object.assign(msg.style, {
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        marginTop: '8px',
        fontWeight: '500',
        transition: 'all 0.3s ease'
      });
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.background = type === 'error' ? '#fef2f2' : '#f0fdf4';
    msg.style.color = type === 'error' ? '#dc2626' : '#16a34a';
    msg.style.border = `1px solid ${type === 'error' ? '#fecaca' : '#bbf7d0'}`;

    if (type === 'success') {
      setTimeout(() => {
        if (msg.parentNode) msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 300);
      }, 3000);
    }
  }

  // ============ HERO PARALLAX ============
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');

  if (heroBg && heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.4}px) scale(${1 + y * 0.0003})`;
        heroContent.style.transform = `translateY(${y * 0.2}px)`;
        heroContent.style.opacity = Math.max(0, 1 - y / 600);
      }
    }, { passive: true });
  }

})();
