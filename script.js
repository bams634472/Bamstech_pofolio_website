// ============ contact details — edit these two lines ============
const WHATSAPP_NUMBER = '2347065698140'; // digits only, country code first, no + or spaces
const EMAIL_ADDRESS = 'sambamidele371@gmail.com';

const whatsappMessage = encodeURIComponent("Hi Chayim, I'd like a cleaning quote.");
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

['whatsappFloat', 'whatsappLink'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = whatsappHref;
});

const emailLink = document.getElementById('emailLink');
if (emailLink) {
  emailLink.href = `mailto:${EMAIL_ADDRESS}`;
  emailLink.textContent = EMAIL_ADDRESS;
}

// ============ mobile nav ============
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ wipe-to-clean hero demo ============
const wipePanel = document.getElementById('wipePanel');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (wipePanel && !prefersReducedMotion) {
  const setWipe = (clientX, clientY) => {
    const rect = wipePanel.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    wipePanel.style.setProperty('--wipe-x', `${x}%`);
    wipePanel.style.setProperty('--wipe-y', `${y}%`);
  };

  wipePanel.addEventListener('mousemove', (e) => setWipe(e.clientX, e.clientY));

  wipePanel.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    if (touch) setWipe(touch.clientX, touch.clientY);
  }, { passive: true });

  // Gentle idle sweep so the effect is visible before any interaction,
  // and on devices without hover. Pauses once the user engages directly.
  let idle = true;
  let start = null;

  const idleSweep = (timestamp) => {
    if (!idle) return;
    if (start === null) start = timestamp;
    const elapsed = (timestamp - start) / 1000;
    const x = 50 + Math.sin(elapsed * 0.6) * 38;
    const y = 50 + Math.cos(elapsed * 0.4) * 22;
    wipePanel.style.setProperty('--wipe-x', `${x}%`);
    wipePanel.style.setProperty('--wipe-y', `${y}%`);
    requestAnimationFrame(idleSweep);
  };
  requestAnimationFrame(idleSweep);

  const stopIdle = () => { idle = false; };
  wipePanel.addEventListener('mouseenter', stopIdle);
  wipePanel.addEventListener('touchstart', stopIdle, { passive: true });
  wipePanel.addEventListener('focus', () => {
    stopIdle();
    wipePanel.style.setProperty('--wipe-x', '50%');
    wipePanel.style.setProperty('--wipe-y', '50%');
  });
}

// ============ contact form ============
const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (quoteForm && formStatus) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!quoteForm.checkValidity()) {
      formStatus.textContent = 'Please fill in the required fields before sending.';
      formStatus.style.color = '#B5562E';
      return;
    }

    const name = document.getElementById('name').value.trim();
    formStatus.style.color = '#1C4632';
    formStatus.textContent = `Thanks, ${name.split(' ')[0]} — we'll be in touch shortly. (Hook this form up to your email or booking backend to go live.)`;
    quoteForm.reset();
  });
}

// ============ footer year ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();