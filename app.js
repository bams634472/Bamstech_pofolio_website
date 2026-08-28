
  // Custom cursor
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {mx = e.clientX; my = e.clientY; });

    (function animCursor() {
        cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  })();

  document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%,-50%) scale(2)';
            ring.style.opacity = '0.8';
            ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
        });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity     = '0.4';
    ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    });
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting)
                setTimeout(() => e.target.classList.add('visible'), i * 80);
        });
  }, {threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Skill bar animation
  const barObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.stack-item').forEach((item, i) => {
                const fill = item.dataset.fill || '70';
                setTimeout(() => {
                    const bar = item.querySelector('.bar-fill');
                    if (bar) bar.style.width = fill + '%';
                }, i * 80);
            });
        });
  }, {threshold: 0.3 });
  document.querySelectorAll('.stack-cat').forEach(el => barObs.observe(el));

    // Contact form feedback
    function handleSend() {
    const btn = document.querySelector('#contact .btn-primary');
    btn.textContent = '✓ Message Sent';
    btn.style.background = 'var(--green-dim)';
    setTimeout(() => {
        btn.textContent = '→ Send Message';
    btn.style.background = '';
    }, 3000);
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
  });

  // ============ footer year ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

