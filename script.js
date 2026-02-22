/* ================================================
   PANKAJ KARAMCHANDANI — PORTFOLIO SCRIPT
   Clean | Minimal | High Performance
================================================ */

'use strict';

/* ------------------------------------------------
   1. PAGE LOADER
------------------------------------------------ */
const loader = document.createElement('div');
loader.className = 'page-loader';
loader.innerHTML = `
  <div class="loader-logo">
    PK<span>.</span>
  </div>
`;
document.body.prepend(loader);

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }, 600);
});

/* ------------------------------------------------
   2. NAVBAR — SCROLL BEHAVIOUR
------------------------------------------------ */
const navbar  = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

// Shrink navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}, { passive: true });

/* ------------------------------------------------
   3. MOBILE MENU TOGGLE
------------------------------------------------ */

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

// Close menu when overlay is clicked
overlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ------------------------------------------------
   4. ACTIVE NAV LINK ON SCROLL
------------------------------------------------ */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentSection = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentSection = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ------------------------------------------------
   5. SMOOTH SCROLL FOR ALL ANCHOR LINKS
------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetPosition = target.offsetTop - navHeight - 16;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

/* ------------------------------------------------
   6. SCROLL REVEAL ANIMATION
------------------------------------------------ */
const revealElements = document.querySelectorAll(`
  .about-text,
  .about-card,
  .skill-category,
  .project-card,
  .timeline-item,
  .edu-card,
  .recommendation-item,
  .contact-card,
  .npm-card,
  .section-header
`);

// Add reveal class to all target elements
revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay for grouped elements
        const delay = (index % 4) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ------------------------------------------------
   7. ANIMATED COUNTER — HERO STATS
------------------------------------------------ */
function animateCounter(element, target, duration = 1800) {
  let start = 0;
  const startTime = performance.now();

  // Determine if we need decimal precision
  const isDecimal = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    element.textContent = isDecimal
      ? current.toFixed(1)
      : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Observe hero stats section
const heroStats = document.querySelector('.hero-stats');

if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            animateCounter(counter, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(heroStats);
}

/* ------------------------------------------------
   8. SKILL TAGS — HOVER RIPPLE EFFECT
------------------------------------------------ */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

/* ------------------------------------------------
   9. PROJECT CARDS — TILT EFFECT (Desktop only)
------------------------------------------------ */
function initTiltEffect() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      this.style.transform = `
        translateY(-6px)
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
      this.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.1s ease';
    });
  });
}

initTiltEffect();

/* ------------------------------------------------
   10. TYPING EFFECT — HERO TITLE
------------------------------------------------ */
function initTypingEffect() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const text = titleEl.textContent.trim();
  titleEl.textContent = '';
  titleEl.style.opacity = '1';

  let charIndex = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = `
    color: var(--primary);
    animation: blink 1s step-end infinite;
    font-weight: 300;
  `;

  // Add blink keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  titleEl.appendChild(cursor);

  // Wait for page load animation then type
  setTimeout(() => {
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        titleEl.insertBefore(
          document.createTextNode(text[charIndex]),
          cursor
        );
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after 3 seconds
        setTimeout(() => {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
          setTimeout(() => cursor.remove(), 500);
        }, 3000);
      }
    }, 40);
  }, 1000);
}

initTypingEffect();

/* ------------------------------------------------
   11. COPY EMAIL ON CLICK
------------------------------------------------ */
function addCopyToClipboard() {
  const emailLinks = document.querySelectorAll(
    'a[href^="mailto:"]'
  );

  emailLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const email = this.href.replace('mailto:', '');

      // Show toast notification
      showToast(`Opening email to ${email}`);
    });
  });
}

/* ------------------------------------------------
   12. TOAST NOTIFICATION
------------------------------------------------ */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    color: var(--text-primary);
    padding: 12px 24px;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    border-left: 3px solid var(--primary);
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Animate out
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

addCopyToClipboard();

/* ------------------------------------------------
   13. TIMELINE PROGRESS INDICATOR
------------------------------------------------ */
function initTimelineProgress() {
  const timelineLine = document.querySelector('.timeline::before');
  if (!timelineLine) return;

  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1
      );

      timeline.style.setProperty('--progress', `${progress * 100}%`);
    }
  }, { passive: true });
}

initTimelineProgress();

/* ------------------------------------------------
   14. PARTICLE BACKGROUND (Subtle, Hero Only)
------------------------------------------------ */
function initParticles() {
  if (window.innerWidth < 768) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Create particles
  const PARTICLE_COUNT = 50;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${
            0.08 * (1 - dist / 120)
          })`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    animFrame = requestAnimationFrame(drawParticles);
  }

  drawParticles();

  // Stop animation when hero is out of view
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(animFrame);
        } else {
          drawParticles();
        }
      });
    },
    { threshold: 0 }
  );

  heroObserver.observe(hero);
}

initParticles();

/* ------------------------------------------------
   16. RECOMMENDATIONS CAROUSEL
------------------------------------------------ */
function initRecommendationsCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track?.children || []);
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = Array.from(indicatorsContainer.children);

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);

  // Auto-play
  let autoplayInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

initRecommendationsCarousel();

/* ------------------------------------------------
   17. BACK TO TOP BUTTON
------------------------------------------------ */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ------------------------------------------------
   18. WINDOW RESIZE HANDLER
------------------------------------------------ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-init tilt on resize
    if (window.innerWidth >= 768) {
      initTiltEffect();
    }
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  }, 250);
}, { passive: true });

/* ------------------------------------------------
   19. CONSOLE EASTER EGG
------------------------------------------------ */
console.log(
  '%c PK. %c Pankaj Karamchandani ',
  'background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; font-size: 18px; font-weight: 900; padding: 8px 12px; border-radius: 6px 0 0 6px;',
  'background: #1a1a25; color: #818cf8; font-size: 14px; font-weight: 600; padding: 8px 12px; border-radius: 0 6px 6px 0;'
);
console.log(
  '%c 👋 Hey recruiter! Thanks for digging into the code.',
  'color: #94a3b8; font-size: 13px; padding: 4px 0;'
);
console.log(
  '%c 📧 pankajkaram9@gmail.com',
  'color: #6366f1; font-size: 13px; font-weight: 600;'
);
console.log(
  '%c 💼 linkedin.com/in/pankaj-karamchandani/',
  'color: #06b6d4; font-size: 13px; font-weight: 600;'
);