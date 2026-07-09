document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initStatsCounters();
  initCoachPhotoSwitcher();
  initBeforeAfterSliders();
  initPricingSwitcher();
  initFaqAccordion();
  initContactForm();
});

/* ---------------------------------------------------
   1. Floating Header Scroll Animation
--------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ---------------------------------------------------
   2. Mobile Drawer Navigation Panel
--------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const navPanel = document.querySelector('.mobile-nav-panel');
  const navLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-panel .btn-primary');

  if (!toggleBtn || !navPanel) return;

  toggleBtn.addEventListener('click', () => {
    navPanel.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closePanel = () => {
    navPanel.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  navLinks.forEach(link => {
    link.addEventListener('click', closePanel);
  });
}

/* ---------------------------------------------------
   3. Numerical Increments Stats Counters
--------------------------------------------------- */
function initStatsCounters() {
  const stats = document.querySelectorAll('.stat-num');
  
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseFloat(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 2000; // ms
        const increment = target / (duration / 16); // ~60fps
        
        const updateCount = () => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + suffix;
          } else {
            stat.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCount);
          }
        };
        
        updateCount();
        observer.unobserve(stat);
      }
    });
  };

  const observer = new IntersectionObserver(animateStats, {
    threshold: 0.5
  });

  stats.forEach(stat => observer.observe(stat));
}

/* ---------------------------------------------------
   4. Coach Vijay Active Photo Switcher
--------------------------------------------------- */
function initCoachPhotoSwitcher() {
  const mainImg = document.getElementById('coach-active-img');
  const thumbs = document.querySelectorAll('.coach-thumbnails .thumb-btn');

  if (!mainImg || thumbs.length === 0) return;

  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const newImgPath = btn.getAttribute('data-img');
      if (!newImgPath) return;

      // Remove active states
      thumbs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Fade transition effect
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.setAttribute('src', newImgPath);
        mainImg.style.opacity = '1';
      }, 200);
    });
  });
}

/* ---------------------------------------------------
   5. Before/After Swipe Slider Logic
--------------------------------------------------- */
function initBeforeAfterSliders() {
  const cards = document.querySelectorAll('.transformation-card');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentIdx = 0;

  if (cards.length === 0) return;

  // Initialize vertical divider swiping inputs
  const bindSliderInput = (card) => {
    const input = card.querySelector('.slider-input');
    const container = card.querySelector('.ba-slider-container');
    if (!input || !container) return;

    const updateSliderPos = () => {
      container.style.setProperty('--slider-pos', `${input.value}%`);
    };

    input.addEventListener('input', updateSliderPos);
    // Set initial layout
    updateSliderPos();
  };

  cards.forEach(bindSliderInput);

  // Generate Navigation Dots
  cards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });

  const dots = document.querySelectorAll('.slider-dot');

  const showSlide = (idx) => {
    cards[currentIdx].classList.remove('active');
    dots[currentIdx].classList.remove('active');

    currentIdx = idx;
    if (currentIdx < 0) currentIdx = cards.length - 1;
    if (currentIdx >= cards.length) currentIdx = 0;

    cards[currentIdx].classList.add('active');
    dots[currentIdx].classList.add('active');
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIdx + 1);
    });
  }
}

/* ---------------------------------------------------
   6. Custom Pricing Durations Switcher
--------------------------------------------------- */
function initPricingSwitcher() {
  const tabs = document.querySelectorAll('.pricing-tabs .tab-btn');
  const planTitle = document.getElementById('pricing-plan-title');
  const planDesc = document.getElementById('pricing-plan-desc');
  const origPriceVal = document.getElementById('original-price-val');
  const currPriceVal = document.getElementById('current-price-val');
  const durationText = document.getElementById('price-duration-text');
  
  if (tabs.length === 0) return;

  const planDatabase = {
    '3': {
      title: 'Reconstruction Coaching',
      desc: 'Personalized training + nutrition guidance for a 3 month transformation.',
      original: 'Rs. 18,000',
      current: 'Rs. 14,400',
      duration: 'for 3 Months'
    },
    '6': {
      title: 'Evolution Coaching',
      desc: 'Sustained physique recomposition program with advanced sports nutrition tracking.',
      original: 'Rs. 32,000',
      current: 'Rs. 24,000',
      duration: 'for 6 Months'
    },
    '12': {
      title: 'Mastery Coaching',
      desc: 'Complete year-long metabolic lifestyle design, structural adjustments, and hypertrophy guides.',
      original: 'Rs. 58,000',
      current: 'Rs. 42,000',
      duration: 'for 12 Months'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const months = tab.getAttribute('data-duration');
      const data = planDatabase[months];
      if (!data) return;

      planTitle.textContent = data.title;
      planDesc.textContent = data.desc;
      origPriceVal.textContent = data.original;
      currPriceVal.textContent = data.current;
      durationText.textContent = data.duration;
    });
  });
}

/* ---------------------------------------------------
   7. FAQ Accordion Expanding Blocks
--------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      }
    });
  });
}

/* ---------------------------------------------------
   8. Contact Form Glassmorphic Success Overlay
--------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const modal = document.querySelector('.success-modal-overlay');
  const modalClose = document.querySelector('.btn-success-close');

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate successful API transmission
    modal.classList.add('active');
    form.reset();
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close when clicking overlay backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
