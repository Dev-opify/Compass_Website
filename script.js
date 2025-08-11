document.addEventListener('DOMContentLoaded', () => {
  // Enhanced mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const topNav = document.getElementById('topNav');
  const menuIcon = mobileMenuBtn.querySelector('.material-icons');
  
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = topNav.classList.contains('open');
    topNav.classList.toggle('open');
    menuIcon.textContent = isOpen ? 'menu' : 'close';
    
    // Animate button
    mobileMenuBtn.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  });
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!topNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      topNav.classList.remove('open');
      menuIcon.textContent = 'menu';
      mobileMenuBtn.style.transform = 'rotate(0deg)';
    }
  });
  // Close menu when clicking nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      topNav.classList.remove('open');
      menuIcon.textContent = 'menu';
      mobileMenuBtn.style.transform = 'rotate(0deg)';
    });
  });
  // Mock events for the phone preview
  const mockEvents = [
    { title: "GDG Info Session", time: "To Be Announced", host: "IILM GDG" },
    { title: "GDG Workshop: Flutter Basics", time: "To Be Announced", host: "IILM GDG" },
    { title: "Hackathon Kickoff", time: "To Be Announced", host: "IILM GDG" },
  ];
  const eventsContainer = document.getElementById('mockEvents');
  if (eventsContainer) {
    mockEvents.forEach((ev, idx) => {
      const el = document.createElement('div');
      el.className = 'event';
      el.innerHTML = `
        <div class="avatar">${ev.title.split(' ').slice(0,2).map(s => s[0]).join('')}</div>
        <div style="flex:1">
          <div style="font-weight:700">${ev.title}</div>
          <div style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:6px">${ev.time} • ${ev.host}</div>
        </div>
        <div style="align-self:center;color:var(--muted);font-size:13px">RSVP</div>
      `;
      // Enhanced staggered fade-in with more dynamic animation
      el.style.opacity = 0;
      el.style.transform = "translateY(20px) scale(0.95)";
      eventsContainer.appendChild(el);
      setTimeout(() => {
        el.style.transition = "all .6s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.opacity = 1;
        el.style.transform = "translateY(0) scale(1)";
      }, 300 + (200 * idx));
    });
  }
  // Enhanced clock with smooth updates
  const mockTime = document.getElementById('mockTime');
  function updateMockTime(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    if (mockTime) {
      mockTime.style.transition = 'opacity 0.3s ease';
      mockTime.style.opacity = '0.7';
      setTimeout(() => {
        mockTime.textContent = `${hh}:${mm}`;
        mockTime.style.opacity = '1';
      }, 150);
    }
  }
  updateMockTime();
  setInterval(updateMockTime, 60_000);
  // Enhanced smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  // Enhanced demo interaction
  const tryDemo = document.getElementById('tryDemo');
  const phoneMock = document.getElementById('phoneMock');
  if (tryDemo && phoneMock) {
    tryDemo.addEventListener('click', () => {
      // Enhanced phone animation
      phoneMock.animate([
        { transform: 'translateY(0) rotate(0deg) scale(1)' },
        { transform: 'translateY(-20px) rotate(-3deg) scale(1.05)' },
        { transform: 'translateY(-10px) rotate(1deg) scale(1.02)' },
        { transform: 'translateY(0) rotate(0deg) scale(1)' }
      ], { duration: 1200, easing: 'cubic-bezier(.2,.9,.3,1)' });
      
      // Enhanced event highlighting with ripple effect
      const evs = document.querySelectorAll('#mockEvents .event');
      evs.forEach((el, i) => {
        setTimeout(() => {
          // Create ripple effect
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: rgba(26,115,232,0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
          `;
          el.style.position = 'relative';
          el.appendChild(ripple);
          
          // Animate ripple
          ripple.animate([
            { width: '4px', height: '4px', opacity: 1 },
            { width: '100px', height: '100px', opacity: 0 }
          ], { duration: 800, easing: 'ease-out' });
          
          // Remove ripple after animation
          setTimeout(() => ripple.remove(), 800);
          
          // Enhanced glow effect
          el.animate([
            {
              boxShadow: '0 0 0 0 rgba(26,115,232,0)',
              background: 'rgba(255,255,255,0.01)'
            },
            {
              boxShadow: '0 12px 32px rgba(26,115,232,0.15), 0 0 20px rgba(26,115,232,0.1)',
              background: 'rgba(26,115,232,0.05)'
            },
            {
              boxShadow: '0 0 0 0 rgba(26,115,232,0)',
              background: 'rgba(255,255,255,0.01)'
            }
          ], { duration: 1400, easing: 'ease-in-out' });
        }, i * 200);
      });
      
      // Add success feedback
      showToast('✨ Demo activated! Check out the interactive elements.', 3000);
    });
  }
  // Enhanced toast system with better animations
  function showToast(msg, ms = 2500) {
    const t = document.getElementById('toast');
    if (!t) return;
    
    t.textContent = msg;
    t.hidden = false;
    t.classList.add('show');
    
    // Add entrance animation
    t.animate([
      { transform: 'translateY(100px) scale(0.8)', opacity: 0 },
      { transform: 'translateY(0) scale(1)', opacity: 1 }
    ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
    
    setTimeout(() => {
      // Exit animation
      t.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(100px) scale(0.8)', opacity: 0 }
      ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }).addEventListener('finish', () => {
        t.classList.remove('show');
        t.hidden = true;
      });
    }, ms);
  }
  // Enhanced download button interactions
  const downloadBtns = document.querySelectorAll('#downloadBtn, #downloadBtnFooter');
  downloadBtns.forEach(b => {
    b.addEventListener('click', (ev) => {
      // Add download animation
      const icon = b.querySelector('.material-icons');
      if (icon) {
        icon.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(4px)' },
          { transform: 'translateY(0)' }
        ], { duration: 600, easing: 'ease-in-out' });
      }
      
      // Enhanced success message
      showToast('🚀 Download starting! Install the APK on your Android device.', 3500);
    });
  });
  // Enhanced accessibility: keyboard navigation for phone mock
  if (phoneMock) {
    phoneMock.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tryDemo.click();
      }
    });
    
    phoneMock.addEventListener('focus', () => {
      phoneMock.animate([
        { transform: 'translateY(0) scale(1)' }, 
        { transform: 'translateY(-8px) scale(1.02)' }, 
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 600, easing: 'ease-out' });
    });
  }
  // Enhanced scroll-triggered animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Add staggered animation for feature cards
        if (target.classList.contains('feature-card')) {
          const index = Array.from(document.querySelectorAll('.feature-card')).indexOf(target);
          setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }, index * 100);
        } else {
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  // Observe elements for scroll animations
  document.querySelectorAll('.feature-card, .how, .cta-strip').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
  // Enhanced parallax effect for hero section
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-right, .brand');
    
    parallaxElements.forEach((el, index) => {
      const speed = index === 0 ? 0.5 : 0.3;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  // Only apply parallax on larger screens
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestTick);
  }
  // Dynamic header background based on scroll
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      header.style.background = 'rgba(7, 18, 38, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(2, 6, 23, 0.3)';
    } else {
      header.style.background = 'rgba(7, 18, 38, 0.8)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = scrollY;
  });
  // Add loading states to buttons
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="material-icons">hourglass_top</span> Preparing...';
      this.style.pointerEvents = 'none';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';
      }, 2000);
    });
  });
  // Add micro-interactions to feature cards
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  // Performance optimization: Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
  }
  // Add Easter egg for developers
  console.log('%c🚀 Compass GDG App', 'color: #1a73e8; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with ❤️ for developers & learners', 'color: #34a853; font-size: 14px;');
  console.log('%cPress Ctrl+Shift+I to explore the code!', 'color: #fbbc05; font-size: 12px;');
});