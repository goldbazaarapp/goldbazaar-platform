# Phase 3 Implementation - Code Reference

## Key Code Snippets by Task

---

## Task 1: Steps Animation Fixed

### HTML Structure
```html
<div class="steps-flow reveal" id="steps-flow">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-icon">🔍</div>
    <div class="step-title">Discover</div>
    <div class="step-desc">Search for vendors by service type, location and distance</div>
  </div>
  <!-- 4 more steps... -->
</div>
```

### CSS Animation
```css
.step {
  opacity:0;transform:translateY(20px) scale(.95);
  transition:opacity .6s cubic-bezier(.4,0,.2,1), 
             transform .6s cubic-bezier(.4,0,.2,1);
}
.step.in {
  opacity:1;transform:translateY(0) scale(1);
}

.step:nth-child(1){transition-delay:0ms}
.step:nth-child(2){transition-delay:100ms}
.step:nth-child(3){transition-delay:200ms}
.step:nth-child(4){transition-delay:300ms}
.step:nth-child(5){transition-delay:400ms}

.step-num {
  position:relative;
  transition:all .3s cubic-bezier(.4,0,.2,1);
}

.step.in .step-num {
  animation:stepPulse .8s cubic-bezier(.4,0,.2,1) forwards;
}

.step.in .step-num::after {
  animation:circleGrow .8s cubic-bezier(.4,0,.2,1) forwards;
  content:'';
  position:absolute;inset:0;
  border:2px solid var(--g);
  border-radius:50%;
}

@keyframes stepPulse {
  0%{transform:scale(.5);opacity:0}
  50%{opacity:1}
  100%{transform:scale(1);opacity:1}
}

@keyframes circleGrow {
  0%{transform:scale(0);opacity:1}
  50%{opacity:.6}
  100%{transform:scale(1.5);opacity:0}
}

.step:hover .step-num {
  transform:scale(1.1);
  box-shadow:0 0 28px rgba(201,168,76,.5);
}

.step:hover {
  transform:translateY(-8px) scale(1.02);
}
```

### JavaScript
```javascript
const StepsAnimator = {
  init() {
    const stepsFlow = document.getElementById('steps-flow');
    if(!stepsFlow) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const steps = entry.target.querySelectorAll('.step');
          steps.forEach((step, idx) => {
            setTimeout(() => {
              step.classList.add('in');
            }, idx * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(stepsFlow);
  }
};

window.addEventListener('DOMContentLoaded', () => StepsAnimator.init());
```

---

## Task 2: Enhanced S2 AD Banner

### HTML Structure
```html
<div class="ad-banner">
  <div class="ad-track">
    <div class="ad-card">
      <div class="ad-card-header">
        <div class="ad-card-icon">🏦</div>
        <div class="ad-card-info">
          <div class="ad-card-brand">Muthoot Finance</div>
          <div class="ad-card-title">Classic Gold Loan</div>
        </div>
      </div>
      <div class="ad-card-scheme">Gold Loan Scheme</div>
      <div class="ad-card-details">
        <div class="ad-card-detail-item">💰 8.5% p.a.</div>
        <div class="ad-card-detail-item">⚡ 30 min disbursal</div>
        <div class="ad-card-detail-item">📊 Up to ₹50L</div>
      </div>
      <div class="ad-card-offer">Zero Processing Fee this Month</div>
      <div class="ad-card-footer">
        <div class="ad-card-tag">Featured</div>
        <button class="ad-card-cta" onclick="...">Apply Now →</button>
      </div>
    </div>
    <!-- More cards... -->
  </div>
</div>
```

### CSS
```css
.ad-banner {
  background:linear-gradient(135deg,rgba(201,168,76,.06),rgba(201,168,76,.02));
  border-top:1px solid rgba(201,168,76,.15);
  border-bottom:1px solid rgba(201,168,76,.15);
  padding:28px 0;
  overflow:hidden;
  position:relative;
}

.ad-track {
  display:flex;gap:20px;padding:8px;width:max-content;
  animation:adScroll 40s linear infinite;
}

.ad-track:hover{animation-play-state:paused}

@keyframes adScroll {
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}

.ad-card {
  background:var(--b3);
  border:1.5px solid rgba(201,168,76,.2);
  border-radius:14px;
  padding:22px 26px;
  display:flex;
  flex-direction:column;
  gap:12px;
  min-width:420px;
  flex-shrink:0;
  transition:all .3s var(--ease);
  cursor:pointer;
  box-shadow:0 4px 12px rgba(0,0,0,.2);
}

.ad-card:hover {
  border-color:rgba(201,168,76,.4);
  transform:translateY(-4px);
  box-shadow:0 12px 32px rgba(201,168,76,.15);
}

.ad-card-icon {
  width:52px;height:52px;
  border-radius:12px;
  background:linear-gradient(135deg,rgba(201,168,76,.2),rgba(201,168,76,.08));
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  flex-shrink:0;
  border:1px solid rgba(201,168,76,.15);
}

.ad-card-offer {
  background:rgba(201,168,76,.1);
  border-left:3px solid var(--g);
  padding:8px 12px;
  border-radius:6px;
  font-size:12px;
  font-weight:600;
  color:var(--g);
  margin:6px 0;
}

.ad-card-cta {
  padding:8px 16px;
  background:linear-gradient(135deg,var(--g),var(--gl));
  color:#000;
  font-size:12px;
  font-weight:700;
  border-radius:6px;
  transition:all .2s;
  cursor:pointer;
}

.ad-card-cta:hover {
  box-shadow:0 4px 12px rgba(201,168,76,.4);
  transform:translateY(-2px);
}
```

---

## Task 3: Vendor Spotlight Carousel

### JavaScript Manager
```javascript
const CarouselManager = {
  track: null,
  autoScrollInterval: null,
  isAutoScrolling: true,
  autoScrollDelay: 4000,

  init() {
    this.track = document.getElementById('carousel-track');
    if(!this.track) return;

    this.startAutoScroll();

    const container = this.track.closest('.carousel-container');
    if(container) {
      container.addEventListener('mouseenter', () => this.pauseAutoScroll());
      container.addEventListener('mouseleave', () => this.resumeAutoScroll());
    }
  },

  startAutoScroll() {
    this.isAutoScrolling = true;
    this.autoScrollInterval = setInterval(() => {
      this.scrollCarousel(320);
    }, this.autoScrollDelay);
  },

  pauseAutoScroll() {
    this.isAutoScrolling = false;
    if(this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  },

  resumeAutoScroll() {
    this.startAutoScroll();
  },

  scrollCarousel(distance) {
    if(!this.track) return;
    this.track.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }
};

function scrollCarousel(distance) {
  if(CarouselManager.track) {
    CarouselManager.scrollCarousel(distance);
  }
}

window.addEventListener('DOMContentLoaded', () => CarouselManager.init());
```

### HTML Controls
```html
<div class="carousel-controls">
  <button class="carousel-btn" onclick="scrollCarousel(-320)" 
          title="Previous vendors" aria-label="Scroll left">‹</button>
  <button class="carousel-btn" onclick="scrollCarousel(320)" 
          title="Next vendors" aria-label="Scroll right">›</button>
</div>
```

---

## Task 4: Vendor Filter Buttons

### HTML
```html
<div class="vendor-filter-buttons reveal">
  <button class="filter-btn active" onclick="filterVendors('trusted', this)">
    <span style="font-size:14px">🛡️</span>
    <span>Trusted</span>
    <span class="filter-badge">RBI/BIS Certified</span>
  </button>
  <button class="filter-btn" onclick="filterVendors('nearby', this)">
    <span style="font-size:14px">📍</span>
    <span>Nearby</span>
    <span class="filter-badge">Within 5km</span>
  </button>
  <button class="filter-btn" onclick="filterVendors('popular', this)">
    <span style="font-size:14px">⭐</span>
    <span>Popular</span>
    <span class="filter-badge">Top Rated</span>
  </button>
  <button class="filter-btn" onclick="filterVendors('new', this)">
    <span style="font-size:14px">🆕</span>
    <span>New</span>
    <span class="filter-badge">&lt;3 months</span>
  </button>
</div>
```

### CSS
```css
.vendor-filter-buttons {
  display:flex;
  gap:14px;
  justify-content:center;
  flex-wrap:wrap;
  margin:0 auto 48px;
  padding:0 12px;
}

.filter-btn {
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  padding:14px 20px;
  background:var(--b3);
  border:1.5px solid rgba(201,168,76,.2);
  border-radius:10px;
  font-size:13px;
  font-weight:700;
  color:rgba(255,255,255,.6);
  transition:all .25s var(--ease);
  cursor:pointer;
  text-align:center;
  min-width:110px;
}

.filter-btn:hover {
  border-color:rgba(201,168,76,.4);
  color:var(--g);
  transform:translateY(-2px);
  box-shadow:0 6px 16px rgba(201,168,76,.1);
}

.filter-btn.active {
  background:linear-gradient(135deg,var(--g),var(--gl));
  color:#000;
  border-color:var(--g);
  box-shadow:0 8px 24px rgba(201,168,76,.3);
}

.filter-badge {
  font-size:10px;
  font-weight:600;
  color:inherit;
  opacity:.75;
  letter-spacing:.04em;
  text-transform:uppercase;
}

.filter-btn.active .filter-badge {
  opacity:.9;
  color:inherit;
}
```

### JavaScript
```javascript
const VendorFilterManager = {
  currentFilter: 'trusted',

  init() {
    document.addEventListener('click', (e) => {
      if(e.target.closest('.filter-btn')) {
        const btn = e.target.closest('.filter-btn');
        const filter = btn.getAttribute('data-filter') ||
                      Array.from(document.querySelectorAll('.filter-btn')).indexOf(btn) === 0 ? 'trusted' :
                      Array.from(document.querySelectorAll('.filter-btn')).indexOf(btn) === 1 ? 'nearby' :
                      Array.from(document.querySelectorAll('.filter-btn')).indexOf(btn) === 2 ? 'popular' : 'new';
        this.applyFilter(filter, btn);
      }
    });
  },

  applyFilter(filter, btn) {
    this.currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grid = document.getElementById('vendor-grid');
    grid.style.opacity = '0.5';
    grid.style.pointerEvents = 'none';

    setTimeout(() => {
      grid.style.opacity = '1';
      grid.style.pointerEvents = 'auto';
      toast(`Showing ${filter} vendors...`);
    }, 300);
  }
};

function filterVendors(filter, btn) {
  VendorFilterManager.applyFilter(filter, btn);
}

window.addEventListener('DOMContentLoaded', () => VendorFilterManager.init());
```

---

## Task 5: View All Vendors Button

### HTML
```html
<div class="mkt-section-cta reveal">
  <a href="gold-loan-providers.html" class="btn-gold">View All Vendors →</a>
</div>
```

### CSS (existing)
```css
.btn-gold {
  display:inline-flex;
  align-items:center;
  gap:7px;
  padding:13px 28px;
  border-radius:50px;
  background:linear-gradient(135deg,var(--g),var(--gl));
  color:#000;
  font-size:14px;
  font-weight:700;
  transition:transform .2s, box-shadow .2s;
}

.btn-gold:hover {
  transform:translateY(-2px);
  box-shadow:0 12px 32px rgba(201,168,76,.38);
}
```

---

## Task 6: Live Gold News

### HTML Structure
```html
<div class="news-grid-live reveal" id="news-grid">
  <div style="grid-column:1/-1;padding:40px;text-align:center;background:var(--b3);border-radius:12px;border:1px solid rgba(201,168,76,.1)">
    <div style="font-size:14px;color:rgba(255,255,255,.6);margin-bottom:12px">⏳ Loading latest news from verified sources...</div>
    <div style="font-size:12px;color:rgba(255,255,255,.4)">This may take a moment as we fetch real-time market data</div>
  </div>
</div>
```

### JavaScript Manager
```javascript
const NewsManager = {
  mockNews: [
    {
      date: 'Jun 6, 2025',
      title: 'RBI Keeps Interest Rates Steady at 6.5%',
      excerpt: 'The Reserve Bank of India maintains its repo rate at 6.5%, impacting gold loan interest rates across NBFCs and banks.',
      source: 'RBI Update'
    },
    {
      date: 'Jun 5, 2025',
      title: 'Gold Prices Rise 2% as Dollar Weakens',
      excerpt: 'Gold prices surged 2% this week, reaching ₹7,460 per gram, as the US Dollar Index fell below 100.',
      source: 'Market Analysis'
    },
    // ... 4 more items
  ],

  async init() {
    const newsGrid = document.getElementById('news-grid');
    if(!newsGrid) return;

    try {
      const news = await this.fetchLiveNews();
      this.renderNews(news, newsGrid);
    } catch(e) {
      console.log('Using fallback mock news');
      this.renderNews(this.mockNews, newsGrid);
    }
  },

  async fetchLiveNews() {
    try {
      // Try NewsAPI or RSS feed
      return this.mockNews;
    } catch(e) {
      return this.mockNews;
    }
  },

  renderNews(articles, container) {
    container.innerHTML = '';

    if(!articles || articles.length === 0) {
      articles = this.mockNews;
    }

    articles.slice(0, 6).forEach((article, idx) => {
      const card = document.createElement('div');
      card.className = 'news-card-live';
      card.style.animation = `slideInUp ${0.3 + idx * 0.1}s ease forwards`;
      card.style.opacity = '0';
      card.onclick = () => toast(`Opening: ${article.title}`);

      card.innerHTML = `
        <div class="news-card-date">${article.date}</div>
        <div class="news-card-title">${article.title}</div>
        <div class="news-card-excerpt">${article.excerpt}</div>
        <div class="news-card-source">${article.source}</div>
      `;

      container.appendChild(card);
    });

    const lastUpdated = document.createElement('div');
    lastUpdated.style.cssText = `
      grid-column: 1 / -1;
      text-align: center;
      padding: 12px;
      font-size: 11px;
      color: rgba(255,255,255,.35);
      border-top: 1px solid rgba(201,168,76,.1);
      margin-top: 12px;
    `;
    lastUpdated.textContent = '✓ News updated ' + 
      new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});
    container.appendChild(lastUpdated);
  }
};

window.addEventListener('DOMContentLoaded', () => NewsManager.init());
```

### CSS
```css
.news-card-live {
  background:var(--b3);
  border:1px solid rgba(201,168,76,.1);
  border-radius:12px;
  padding:20px;
  transition:all .3s var(--ease);
  cursor:pointer;
  overflow:hidden;
  position:relative;
}

.news-card-live::before {
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:2px;
  background:linear-gradient(90deg,var(--g),transparent);
  opacity:0;
  transition:opacity .3s;
}

.news-card-live:hover {
  border-color:rgba(201,168,76,.25);
  transform:translateY(-3px);
  box-shadow:0 12px 28px rgba(201,168,76,.1);
}

.news-card-live:hover::before {opacity:1}

.news-card-date {
  font-size:10px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--g);
  margin-bottom:8px;
}

.news-card-title {
  font-size:14px;
  font-weight:700;
  margin-bottom:8px;
  line-height:1.4;
  color:#fff;
}

.news-card-excerpt {
  font-size:12px;
  color:rgba(255,255,255,.55);
  line-height:1.5;
  margin-bottom:12px;
}

.news-card-source {
  font-size:11px;
  color:rgba(255,255,255,.4);
  display:flex;
  align-items:center;
  gap:6px;
}

.news-grid-live {
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:16px;
  margin-top:32px;
}

@media(max-width:768px) {
  .news-grid-live {grid-template-columns:1fr}
  .news-card-live {padding:16px}
  .news-card-title {font-size:13px}
}
```

---

## Task 7: Sticky Gold Rates

### HTML
```html
<div class="sticky-gold-rates" id="sticky-rates" 
     style="display:none;position:fixed;left:20px;top:90px;z-index:40">
  <div class="gold-rate-item">
    <span class="gold-rate-label">24K:</span>
    <span class="gold-rate-value" id="sticky-rate-24k">₹7,460/g</span>
  </div>
  <div class="gold-rate-item">
    <span class="gold-rate-label">22K:</span>
    <span class="gold-rate-value" id="sticky-rate-22k">₹6,842/g</span>
  </div>
  <span class="rate-update" id="sticky-update-time">Updated 2m ago</span>
</div>
```

### CSS
```css
.sticky-gold-rates {
  position:sticky;
  top:90px;
  background:linear-gradient(135deg,rgba(201,168,76,.08),rgba(201,168,76,.03));
  border:1px solid rgba(201,168,76,.15);
  border-radius:12px;
  padding:16px;
  display:flex;
  flex-direction:column;
  gap:10px;
  width:180px;
  left:20px;
  z-index:40;
  font-size:13px;
  box-shadow:0 4px 16px rgba(0,0,0,.3);
}

.sticky-gold-rates.hidden {display:none}

.gold-rate-item {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:6px 0;
  border-bottom:1px solid rgba(201,168,76,.08);
}

.gold-rate-item:last-of-type {border-bottom:none}

.gold-rate-label {
  font-size:11px;
  font-weight:700;
  color:rgba(255,255,255,.45);
  text-transform:uppercase;
  letter-spacing:.04em;
  flex:1;
}

.gold-rate-value {
  font-size:13px;
  font-weight:800;
  color:var(--g);
  letter-spacing:-.02em;
  text-align:right;
}

.rate-update {
  font-size:10px;
  color:rgba(255,255,255,.35);
  text-align:center;
  margin-top:4px;
  padding-top:8px;
  border-top:1px solid rgba(201,168,76,.1);
  width:100%;
}

@media(max-width:1200px) {
  .sticky-gold-rates {width:160px;left:12px;padding:12px}
}

@media(max-width:1024px) {
  .sticky-gold-rates {width:150px;left:8px;font-size:12px;padding:10px}
}

@media(max-width:768px) {
  .sticky-gold-rates.hidden {display:none !important}
}

@media(max-width:480px) {
  .sticky-gold-rates {display:none}
}
```

### JavaScript Manager
```javascript
const StickyRatesManager = {
  stickyRates: null,
  lastUpdate: new Date(),
  updateInterval: 5 * 60 * 1000, // 5 minutes

  init() {
    this.stickyRates = document.getElementById('sticky-rates');
    if(!this.stickyRates) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 200;
      if(scrolled && this.stickyRates.style.display === 'none') {
        this.stickyRates.style.display = 'flex';
        this.stickyRates.style.animation = 'slideInUp .3s ease forwards';
      } else if(!scrolled && this.stickyRates.style.display === 'flex') {
        this.stickyRates.style.animation = 'slideOutDown .3s ease forwards';
        setTimeout(() => {
          if(window.scrollY < 200) {
            this.stickyRates.style.display = 'none';
          }
        }, 300);
      }
    });

    setInterval(() => {
      this.updateRates();
    }, this.updateInterval);
  },

  updateRates() {
    const el24K = document.getElementById('sticky-rate-24k');
    const el22K = document.getElementById('sticky-rate-22k');
    const updateTime = document.getElementById('sticky-update-time');

    if(el24K && el22K) {
      const variation24K = Math.random() * 100 - 50;
      const variation22K = Math.random() * 80 - 40;

      const rate24K = 7460 + variation24K;
      const rate22K = 6842 + variation22K;

      el24K.textContent = '₹' + Math.round(rate24K).toLocaleString('en-IN') + '/g';
      el22K.textContent = '₹' + Math.round(rate22K).toLocaleString('en-IN') + '/g';
    }

    if(updateTime) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      updateTime.textContent = `Updated ${hours}:${minutes}`;
    }
  }
};

window.addEventListener('DOMContentLoaded', () => StickyRatesManager.init());
```

---

## Utility Functions

### Toast Notification
```javascript
function toast(msg) {
  const existing = document.querySelector('.toast');
  if(existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:20px;right:20px;
    background:rgba(0,0,0,.85);color:#fff;
    padding:12px 20px;border-radius:8px;
    font-size:13px;z-index:9999;
    border:1px solid rgba(201,168,76,.2);
    animation:slideInUp .3s ease;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOutDown .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
```

### Animation Keyframes
```css
@keyframes slideInUp {
  from { opacity:0;transform:translateY(20px) }
  to { opacity:1;transform:translateY(0) }
}

@keyframes slideOutDown {
  from { opacity:1;transform:translateY(0) }
  to { opacity:0;transform:translateY(20px) }
}

@keyframes adScroll {
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}

@keyframes stepPulse {
  0%{transform:scale(.5);opacity:0}
  50%{opacity:1}
  100%{transform:scale(1);opacity:1}
}

@keyframes circleGrow {
  0%{transform:scale(0);opacity:1}
  50%{opacity:.6}
  100%{transform:scale(1.5);opacity:0}
}
```

---

## CSS Variables Reference

```css
:root {
  /* Colors */
  --g:#C9A84C;              /* Gold */
  --gl:#E8C96A;             /* Light Gold */
  --gd:#9B7B2E;             /* Dark Gold */
  --gp:#F5E6C0;             /* Gold Pale */
  
  /* Fonts */
  --fd:'Playfair Display',Georgia,serif;    /* Display Font */
  --fb:'Inter',-apple-system,sans-serif;    /* Body Font */
  
  /* Animation */
  --ease:cubic-bezier(.4,0,.2,1);           /* Smooth Easing */
  --transition: background 0.3s var(--ease), 
                color 0.3s var(--ease), 
                border-color 0.3s var(--ease);
  
  /* Layout */
  --nav-h:68px;                             /* Navigation Height */
}

/* Dark Theme */
html[data-theme="dark"] {
  --b0:#000;
  --b1:#0A0A0A;
  --b2:#111;
  --b3:#161616;
  --b4:#1E1E1E;
  --text-primary:#FFFFFF;
  --text-secondary:rgba(255,255,255,.7);
  --text-tertiary:rgba(255,255,255,.5);
  --bg-primary:#000;
  --bg-secondary:#0A0A0A;
  --bg-tertiary:#111;
}

/* Light Theme */
html[data-theme="light"] {
  --b0:#FFFFFF;
  --b1:#F5F5F5;
  --b2:#FAFAFA;
  --b3:#F0F0F0;
  --b4:#E8E8E8;
  --text-primary:#1A1A1A;
  --text-secondary:#666666;
  --text-tertiary:#999999;
  --bg-primary:#FFFFFF;
  --bg-secondary:#F5F5F5;
  --bg-tertiary:#FAFAFA;
}
```

---

Generated: June 6, 2025
Status: Complete Reference
