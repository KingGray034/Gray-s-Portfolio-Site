/* ─── Cursor glow ─────────────────────────────────────────────── */
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
} else if (glow) {
  glow.style.display = 'none';
}

/* ─── Nav scroll ──────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Fade-in on scroll ───────────────────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

/* ─── Active nav highlight ────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => {
          const active = a.getAttribute('href') === '#' + e.target.id;
          a.style.color = active ? 'var(--gold)' : '';
        });
      }
    });
  },
  { threshold: 0.45 }
);
document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));

/* ─── Contact form ────────────────────────────────────────────── */
// Note: wire up a real email service like EmailJS or Formspree
// to make this actually send. Replace the submit handler body below.
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-btn');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // ── Replace this with your EmailJS / Formspree call ──
    await new Promise((r) => setTimeout(r, 1200));
    // ─────────────────────────────────────────────────────

    btn.textContent = 'Sent ✓';
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 3500);
  });
}