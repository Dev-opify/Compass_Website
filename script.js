// script.js - interactive bits for the Compass landing page

document.addEventListener('DOMContentLoaded', () => {
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
      // staggered fade-in
      el.style.opacity = 0;
      el.style.transform = "translateY(8px)";
      eventsContainer.appendChild(el);
      setTimeout(() => {
        el.style.transition = "opacity .5s ease, transform .5s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 200 * idx);
    });
  }

  // Update clock mock
  const mockTime = document.getElementById('mockTime');
  function updateMockTime(){
    const d = new Date();
    // keep a consistent time for demo: show the actual time (local)
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    if (mockTime) mockTime.textContent = `${hh}:${mm}`;
  }
  updateMockTime();
  setInterval(updateMockTime, 60_000);

  // Smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Live preview demo button: tilt phone, highlight events
  const tryDemo = document.getElementById('tryDemo');
  const phoneMock = document.getElementById('phoneMock');
  if (tryDemo && phoneMock) {
    tryDemo.addEventListener('click', () => {
      phoneMock.animate([
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: 'translateY(-16px) rotate(-2deg)' },
        { transform: 'translateY(0) rotate(0deg)' }
      ], { duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)' });
      // quick highlight effect on events
      const evs = document.querySelectorAll('#mockEvents .event');
      evs.forEach((el, i) => {
        setTimeout(() => {
          el.animate([{ boxShadow: '0 0 0 0 rgba(26,115,232,0)' }, { boxShadow: '0 8px 28px rgba(26,115,232,0.11)' }, { boxShadow: '0 0 0 0 rgba(26,115,232,0)' }], { duration: 1200 });
        }, i * 150);
      });
    });
  }

  // Download button UX - show a small toast when clicked
  function showToast(msg, ms = 2500) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.hidden = false;
    t.textContent = msg;
    t.style.opacity = 1;
    setTimeout(() => {
      t.style.transition = 'opacity .4s ease';
      t.style.opacity = 0;
      setTimeout(() => {
        t.hidden = true;
      }, 400);
    }, ms);
  }

  const downloadBtns = document.querySelectorAll('#downloadBtn, #downloadBtnFooter');
  downloadBtns.forEach(b => {
    b.addEventListener('click', (ev) => {
      // do not prevent default — actual download should proceed.
      showToast('Your download will start — please confirm installation on your device.');
    });
  });

  // Small accessibility: keyboard focus for phone mock (makes it wiggle)
  phoneMock && phoneMock.setAttribute('tabindex', '0');
  phoneMock && phoneMock.addEventListener('focus', () => {
    phoneMock.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 600 });
  });

  // simple reveal on scroll for feature cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.style.transform = 'translateY(0)';
        ent.target.style.opacity = 1;
        observer.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(12px)';
    observer.observe(el);
  });
});
