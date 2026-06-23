/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         GOLDBAZAAR — HERO IMAGE LINK MAPPING               ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Edit this file to control where each hero image navigates  ║
 * ║  when a user clicks it.                                     ║
 * ║                                                             ║
 * ║  Rules:                                                     ║
 * ║  • Use a full URL for external sites:  'https://bhima.com'  ║
 * ║  • Use a page name for internal pages: 'gold-loan-providers.html' ║
 * ║  • Leave empty '' to disable click navigation              ║
 * ║                                                             ║
 * ║  Pages:                                                     ║
 * ║  • landing           → index.html hero                     ║
 * ║  • gold-loan         → gold-loan-providers.html hero       ║
 * ║  • sell-gold         → gold-buyers.html hero               ║
 * ║  • vendor-onboarding → vendor-onboarding-complete.html hero ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const HERO_LINKS = {

  /* ── LANDING PAGE (index.html) ─────────────────────────────
     Images: images/hero-1.png … hero-10.png
     Videos: videos/GB_1.mp4  … GB_4.mp4               */
  landing: {
    1: '',   // e.g. 'https://www.bhimagold.com/'
    2: '',
    3: 'https://www.bhimagold.com/',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: ''
  },

  /* ── GOLD LOAN PAGE (gold-loan-providers.html) ─────────────
     Images: images/gold-loan/hero-1.png … hero-10.png  */
  'gold-loan': {
    1: 'https://www.manappuram.com',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: ''
  },

  /* ── SELL GOLD PAGE (gold-buyers.html) ─────────────────────
     Images: images/gold-buyers/hero-1.png … hero-10.png */
  'sell-gold': {
    1: 'https://www.tanishq.co.in',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: ''
  },

  /* ── VENDOR ONBOARDING (vendor-onboarding-complete.html) ───
     Images: images/onboarding-hero/slide-1.jpg … slide-10.jpg */
  'vendor-onboarding': {
    1: 'https://www.kalyanjewellers.net',   // e.g. 'https://www.bhimagold.com/'
    2: 'https://www.bhimagold.com/',
    3: 'https://www.malabargoldanddiamonds.com',
    4: 'https://www.manappuram.com',
    5: 'https://www.tanishq.co.in',
    6: '',
    7: '',
    8: '',
    9: '',
    10: ''
  }

};

/**
 * Helper: get the link for a given page + image index (1-based).
 * Returns '' if not set.
 */
function getHeroLink(page, index) {
  return (HERO_LINKS[page] && HERO_LINKS[page][index]) || '';
}
