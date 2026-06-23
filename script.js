/* =============================================
   ASLAM STUDIOZ — script.js
   ============================================= */

const CLOUD_NAME = 'dsq9sjpe0';

/* ---- Theme ---- */
const themeBtn = document.getElementById('themeToggle');
let manualTheme = localStorage.getItem('asTheme') || 'auto';

function applyTheme(theme) {
  if (theme === 'auto') {
    const hr = new Date().getHours();
    // 21:00 (9PM) to 06:00 = dark; rest = light
    const isDark = hr >= 21 || hr < 6;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

applyTheme(manualTheme);
setInterval(() => { if (manualTheme === 'auto') applyTheme('auto'); }, 60000);

themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  manualTheme = next;
  localStorage.setItem('asTheme', next);
  applyTheme(next);
});

/* ---- Navbar toggle (mobile) ---- */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

/* ---- Default Services ---- */
const DEFAULT_SERVICES = [
  { icon: '💒', name: 'Wedding Photography', desc: 'Full-day coverage of your special day.', price: 'Contact for price', cat: 'wedding' },
  { icon: '🤳', name: 'Portrait Photography', desc: 'Professional portraits for individuals & families.', price: 'Contact for price', cat: 'portrait' },
  { icon: '👶', name: 'Newborn Photography', desc: 'Tender moments captured in the first days.', price: 'Contact for price', cat: 'newborn' },
  { icon: '📦', name: 'Product Photography', desc: 'High-quality images for your business.', price: 'Contact for price', cat: 'product' },
  { icon: '🌿', name: 'Nature Photography', desc: 'Landscapes, wildlife & outdoor beauty.', price: 'Contact for price', cat: 'nature' },
  { icon: '🎉', name: 'Events Photography', desc: 'Corporate, social & cultural events.', price: 'Contact for price', cat: 'events' }
];

function loadServices() {
  const saved = localStorage.getItem('asServices');
  const services = saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = '';
  services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-icon">${s.icon}</div>
      <h3 class="service-name">${s.name}</h3>
      <p class="service-desc">${s.desc}</p>
      <p class="service-price">${s.price}</p>
    `;
    grid.appendChild(card);
  });
}

loadServices();

/* ---- Gallery ---- */
function loadGallery(filter = 'all') {
  const saved = localStorage.getItem('asPhotos');
  const photos = saved ? JSON.parse(saved) : [];
  const gallery = document.getElementById('gallery');
  const empty = document.getElementById('galleryEmpty');

  const filtered = filter === 'all' ? photos : photos.filter(p => p.cat === filter);

  gallery.innerHTML = '';
  if (filtered.length === 0) {
    gallery.appendChild(empty || createEmpty());
    return;
  }

  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${p.url}" alt="${p.caption || p.cat}" loading="lazy" />
      <div class="overlay">
        <span class="overlay-text">${p.caption || p.cat}</span>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(p.url, p.caption || p.cat));
    gallery.appendChild(item);
  });
}

function createEmpty() {
  const d = document.createElement('div');
  d.className = 'gallery-empty';
  d.innerHTML = `<p>📷 Photos coming soon!</p><small>Check back after upload via admin panel.</small>`;
  return d;
}

loadGallery();

/* ---- Filter Buttons ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadGallery(btn.dataset.cat);
  });
});

/* ---- Lightbox ---- */
function openLightbox(url, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightboxCaption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---- Contact Form ---- */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✅ Message sent! We will contact you soon.';
  e.target.reset();
  setTimeout(() => note.textContent = '', 5000);
});
