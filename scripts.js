// JavaScript for Antigravity Fitness - Premium Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBeforeAfterSlider();
  initStatsCounters();
  initTransformationsCarousel();
  initPricingSwitcher();
  initContactForm();
  initFaqAccordion();
  initCoachPhotoSwitcher();
});

/* ---------------------------------------------------
   1. Mobile Slide-over Menu Navigation
--------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navPanel = document.querySelector('.mobile-nav-panel');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!toggleBtn || !navPanel) return;

  const openMenu = () => {
    navPanel.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling main page
  };

  const closeMenu = () => {
    navPanel.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close when clicking outside content (on overlay backdrop)
  navPanel.addEventListener('click', (e) => {
    if (e.target === navPanel) {
      closeMenu();
    }
  });

  // Close when clicking any menu link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------------------------------------------------
   2. Before/After Comparison Sliders
--------------------------------------------------- */
function initBeforeAfterSlider() {
  const sliderContainers = document.querySelectorAll('.ba-slider-container');

  sliderContainers.forEach(container => {
    const input = container.querySelector('.slider-input');
    
    if (!input) return;

    // Listen to range input adjustments and update CSS variable
    input.addEventListener('input', (e) => {
      const position = e.target.value;
      container.style.setProperty('--slider-pos', `${position}%`);
    });
  });
}

/* ---------------------------------------------------
   3. Scroll-Triggered Animated Counters
--------------------------------------------------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) return;

  const countUp = (el) => {
    const targetText = el.getAttribute('data-target');
    const targetVal = parseFloat(targetText);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * targetVal;

      if (targetVal % 1 === 0) {
        el.textContent = Math.floor(currentVal) + suffix;
      } else {
        el.textContent = currentVal.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = targetText + suffix;
      }
    };

    requestAnimationFrame(animate);
  };

  // Intersection Observer to start counters only when scrolled into view
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // trigger animation only once
      }
    });
  }, observerOptions);

  statNumbers.forEach(number => observer.observe(number));
}

/* ---------------------------------------------------
   4. Client Transformations Carousel
--------------------------------------------------- */
function initTransformationsCarousel() {
  const cards = document.querySelectorAll('.transformation-card');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (cards.length === 0) return;

  let activeIndex = 0;

  // Create dot indicators dynamically based on number of cards
  dotsContainer.innerHTML = '';
  cards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => showSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  const showSlide = (index) => {
    // Wrap around boundaries
    if (index >= cards.length) index = 0;
    if (index < 0) index = cards.length - 1;

    activeIndex = index;

    // Toggle active state for slides and dots
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.style.display = 'grid';
        card.classList.add('active');
      } else {
        card.style.display = 'none';
        card.classList.remove('active');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(activeIndex + 1));
}

/* ---------------------------------------------------
   5. Dynamic Pricing Plan Tier Switcher
--------------------------------------------------- */
function initPricingSwitcher() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cardTitle = document.getElementById('pricing-plan-title');
  const cardDesc = document.getElementById('pricing-plan-desc');
  const origPriceVal = document.getElementById('original-price-val');
  const currPriceVal = document.getElementById('current-price-val');
  const priceDurationText = document.getElementById('price-duration-text');
  const featuresContainer = document.getElementById('price-features-list');

  if (tabs.length === 0 || !cardTitle) return;

  // Plan Data Definition
  const planData = {
    '3': {
      title: 'Transformation Coaching',
      description: 'Personalized training + nutrition guidance for a 3 month transformation.',
      originalPrice: 'Rs. 18,000',
      currentPrice: 'Rs. 14,400',
      duration: 'for 3 Months',
      features: [
        'Fat Loss Program',
        'Muscle Gain System',
        'Body Recomposition plan',
        'Diet Customization',
        'Supplement Guidance',
        'Workout Customization',
        'Weekly Progress Audits',
        'Weekly 1-on-1 Strategy Call',
        'Form corrections (video review)',
        '24/7 WhatsApp chat support'
      ]
    },
    '6': {
      title: 'Elite Athletic Builder',
      description: 'Deeper habit building, conditioning, and long-term athletic physique transformation.',
      originalPrice: 'Rs. 32,000',
      currentPrice: 'Rs. 25,600',
      duration: 'for 6 Months',
      features: [
        'Advanced body composition strategy',
        'Periodized progression cycles',
        'Complete metabolic rebuilding',
        'Diet Customization & adjustments',
        'Supplement optimization plan',
        'Custom biomechanics & form coaching',
        'Bi-weekly video consultations',
        'Priority WhatsApp support',
        'Detailed monthly blood report analysis',
        'Mobile App tracking dashboard access'
      ]
    },
    '12': {
      title: 'Olympian Lifestyle Blueprint',
      description: 'The ultimate year-long lifestyle makeover. Build the ultimate aesthetic physique and sustain it forever.',
      originalPrice: 'Rs. 60,000',
      currentPrice: 'Rs. 45,000',
      duration: 'for 12 Months',
      features: [
        'Continuous periodized year-long training',
        'Phase transitions (Bulking, Shredding, Maintaining)',
        'Advanced lifestyle & recovery protocols',
        'Personal nutrition coach access',
        'Custom supplement stack design',
        'All app modules unlocked & custom routines',
        'Weekly 15-min strategy call & checkin',
        'Direct call support access with head coach',
        'Full health metrics & biomarker tracking',
        'Personal photoshoot preparation advice'
      ]
    }
  };

  const updatePricingCard = (duration) => {
    const data = planData[duration];
    if (!data) return;

    // Add a quick fade out transition effect via class toggles
    const priceCard = document.querySelector('.price-card');
    priceCard.style.opacity = '0.3';
    priceCard.style.transform = 'translateY(5px)';

    setTimeout(() => {
      // Set new text values
      cardTitle.textContent = data.title;
      cardDesc.textContent = data.description;
      origPriceVal.textContent = data.originalPrice;
      currPriceVal.textContent = data.currentPrice;
      priceDurationText.textContent = data.duration;

      // Populate features list
      featuresContainer.innerHTML = '';
      data.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          ${feature}
        `;
        featuresContainer.appendChild(li);
      });

      // Fade back in
      priceCard.style.opacity = '1';
      priceCard.style.transform = 'translateY(0)';
    }, 200);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states on tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update card content
      const duration = tab.getAttribute('data-duration');
      updatePricingCard(duration);
    });
  });
}

/* ---------------------------------------------------
   6. Contact Form validation and simulated Submission
--------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const successModal = document.querySelector('.success-modal-overlay');
  const modalCloseBtn = document.querySelector('.btn-success-close');

  if (!form || !successModal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual page reload submission

    // Basic Input Validations
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const msg = form.querySelector('#message').value.trim();

    if (!name || !email || !service || !msg) {
      alert('Please fill out all the fields before submitting.');
      return;
    }

    // Submit Simulation (Loading visual indicator)
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enrolling...';

    setTimeout(() => {
      // Trigger modal view
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Restore form button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;

      // Reset fields
      form.reset();
    }, 1200);
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modal when clicking on background overlay
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---------------------------------------------------
   7. FAQ Accordion Handler
--------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other FAQs for clean single-expanded view
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle active state and animate scroll height
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------------------------------------------
   8. Coach Photo Switcher Interactivity
--------------------------------------------------- */
function initCoachPhotoSwitcher() {
  const activeImg = document.getElementById('coach-active-img');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  if (!activeImg || thumbBtns.length === 0) return;

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on thumbnails
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Transition fade swap
      const newSrc = btn.getAttribute('data-img');
      activeImg.style.opacity = '0.2';
      
      setTimeout(() => {
        activeImg.src = newSrc;
        activeImg.style.opacity = '1';
      }, 150);
    });
  });
}
