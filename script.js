/* script.js - handles nav toggle, carousels, and contact form validation */

/* Utility: set year in footers */
document.addEventListener('DOMContentLoaded', function () {
  const y = new Date().getFullYear();
  ['year','year-2','year-3'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });
});

/* NAV toggle (works for all pages) */
function wireNav(toggleId, navId) {
  const togg = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  if(!togg || !nav) return;
  togg.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}
wireNav('nav-toggle','main-nav');
wireNav('nav-toggle-2','main-nav-2');
wireNav('nav-toggle-3','main-nav-3');

/* CAROUSEL logic
   Each .carousel element has a data-images attribute (JSON array).
   Prev/Next buttons cycle through images.
*/
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(c => {
    let images;
    try {
      images = JSON.parse(c.getAttribute('data-images'));
      if(!Array.isArray(images) || images.length === 0) throw new Error('No images');
    } catch (e) {
      // fallback: use the current image only
      images = [c.querySelector('img')?.src].filter(Boolean);
    }
    let idx = 0;
    const imgEl = c.querySelector('.carousel-image');
    const prev = c.querySelector('.carousel-btn.prev');
    const next = c.querySelector('.carousel-btn.next');

    function show(i) {
      idx = (i + images.length) % images.length;
      imgEl.src = images[idx];
      imgEl.alt = imgEl.alt || `Image ${idx + 1}`;
    }

    if(prev) prev.addEventListener('click', () => show(idx - 1));
    if(next) next.addEventListener('click', () => show(idx + 1));

    // Enable keyboard left/right when focused
    c.tabIndex = 0;
    c.addEventListener('keydown', (ev) => {
      if(ev.key === 'ArrowLeft') show(idx - 1);
      if(ev.key === 'ArrowRight') show(idx + 1);
    });

    // show first
    show(0);
  });
});

/* Contact form validation & simulated send */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if(!form) return;
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    // basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    if(!name.value.trim()){ valid = false; name.focus(); alert('Please provide your name.'); return; }
    if(!emailPattern.test(email.value.trim())){ valid = false; email.focus(); alert('Please provide a valid email.'); return; }
    if(!message.value.trim()){ valid = false; message.focus(); alert('Please write a message.'); return; }

    // Simulate success (no backend). Show success block and reset form.
    form.reset();
    form.style.display = 'none';
    if(success) success.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
