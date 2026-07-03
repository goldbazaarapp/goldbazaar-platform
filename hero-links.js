/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         GOLDBAZAAR — HERO IMAGE LINK MAPPING               ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Edit via: goldbazaar.app/admin-content-manager.html        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const HERO_LINKS = {

  /* ── LANDING PAGE (index.html) — images/hero-{n}.webp */
  'landing': {
    1: 'https://www.praveenjewels.com/',
    2: 'https://www.praveenjewels.com/',
    3: 'https://www.praveenjewels.com/',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: ''
  },

  /* ── GOLD LOAN PAGE (gold-loan-providers.html) — images/gold-loan/hero-{n}.webp */
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

  /* ── SELL GOLD PAGE (gold-buyers.html) — images/gold-buyers/hero-{n}.webp */
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

  /* ── JEWELLERY PAGE (jewellery.html) — images/jewellery/hero-{n}.webp */
  'jewellery': {
    1: '',
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

  /* ── VENDOR ONBOARDING (vendor-onboarding-complete.html) — images/onboarding-hero/slide-{n}.webp */
  'vendor-onboarding': {
    1: 'https://www.kalyanjewellers.net',
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

function getHeroLink(page,index){
  return(HERO_LINKS[page]&&HERO_LINKS[page][index])||'';
}
