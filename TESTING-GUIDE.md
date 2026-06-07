# Phase 3 Testing Guide

## Manual Testing Instructions

### 1. Gold Rates Ticker Testing

**What to Test:**
- Ticker displays at the top of all pages
- Shows "24K: ₹7,460/g | 22K: ₹6,842/g" format
- Updates timestamp shows "Updated HH:MM"
- Ticker appears above navigation bar

**Desktop Testing:**
```
Open: index.html
Look for: "Live Gold Rates 24K ₹7,460/g | 22K ₹6,842/g Updated 14:32"
Result: Should be visible with gold gradient background
```

**Mobile Testing (480px width):**
```
Resize browser to 480px
Expected: Label hidden, only rates and time shown
Result: Compact display, no layout shift
```

**Theme Testing:**
```
Click theme toggle (🌙/☀️) in navbar
Expected: Ticker colors update with theme
Result: Works on both dark and light themes
```

---

### 2. Live News Feed Testing

**What to Test:**
- 6 news articles display in grid format
- Hover effects work on cards
- Click cards trigger toast notification
- Responsive grid changes on mobile

**Desktop Testing (1200px+):**
```
Open: index.html#gold-news
Scroll to "Gold News & Market Feed" section
Expected: 2-column grid with 3 rows
Result: Cards aligned properly with hover effects
```

**Hover Testing:**
```
Hover over any news card
Expected: Card lifts up, border highlights
Result: Smooth animation, shadow effect visible
```

**Click Testing:**
```
Click on a news card
Expected: Toast notification appears bottom-right
Result: Message shows "Opening full article..."
Toast disappears after 2.5 seconds
```

**Mobile Testing (768px width):**
```
Resize to 768px
Expected: Grid changes to 1 column
Result: Cards stack vertically, no overflow
```

---

### 3. Animated Steps Flow Testing

**What to Test:**
- 5 steps animate in sequence when scrolled into view
- Staggered animations with 100ms delay
- Hover effects work on step containers
- Circle animation appears on number

**Initial Load:**
```
Open: index.html
Scroll to "How GoldBazaar Works" section
Expected: Step numbers 1-5 not visible initially
Result: Page loads without animation until scroll
```

**Scroll to View:**
```
Scroll to the steps section
Expected: Steps fade in left/right alternately
Result: 
  Step 1: Slides from left
  Step 2: Slides from right
  Step 3: Slides from left
  Step 4: Slides from right
  Step 5: Slides from left
With 100ms delay between each
```

**Hover on Step:**
```
Hover over any step number
Expected: Scale up (1.08x), shadow increase
Result: Smooth transform, golden glow effect
```

**Animation Timing:**
```
Watch animation duration
Expected: ~0.6 seconds per step
Result: Smooth without jerking
```

---

### 4. Vendor Spotlight Carousel Testing

**What to Test:**
- Carousel auto-scrolls every 4 seconds
- Manual arrow buttons work
- Pause on hover
- 8 vendor cards visible
- Responsive behavior

**Auto-scroll Testing:**
```
Open: index.html
Find "Vendor Spotlight" section
Wait and observe
Expected: Cards scroll horizontally every 4 seconds
Result: Smooth scroll-behavior animation
```

**Manual Navigation:**
```
Click right arrow (›)
Expected: Scroll forward by 320px
Result: Smooth animation to next card

Click left arrow (‹)
Expected: Scroll backward by 320px
Result: Smooth animation to previous card
```

**Pause on Hover:**
```
Move mouse over carousel
Expected: Auto-scroll pauses
Result: No movement until mouse leaves

Move mouse away
Expected: Auto-scroll resumes
Result: Continues after ~1 second
```

**Card Content Testing:**
```
Scroll through and verify each card shows:
✓ Vendor logo (emoji)
✓ Vendor name
✓ Service category
✓ Offer name
✓ Offer description
✓ Rate/special offer
✓ Action button (View Scheme, Apply Now, etc.)
```

**Vendor Verification:**
```
All 8 vendors should appear:
1. Muthoot Finance 🏦
2. Tanishq 💎
3. Malabar Gold 🔄
4. IIFL Finance 🏛️
5. Manappuram 🌟
6. Kalyan Jewellers 🏆
7. Federal Bank 💰
8. Axis Bank 📊
```

**Mobile Testing (480px):**
```
Resize to 480px width
Expected: Full-width cards (280px min)
Result: One card visible at a time
Arrow buttons hidden or disabled
Swipe support enabled (native)
```

---

### 5. Vendor Logos Testing

**Header Banner:**
```
Open: index.html
Find "Trusted by 500+ Verified Partners" banner
Expected: 8 vendor logos in grid layout
Result: Logos hover with scale effect
```

**Footer Section:**
```
Scroll to footer
Find "Our Partners & Vendors"
Expected: 8 vendor logos in horizontal row
Result: Consistent styling with header
```

**Carousel Cards:**
```
In Vendor Spotlight carousel
Expected: Logo at top-left of each card
Result: 48x48px gradient boxes with emoji
```

**Hover Effects:**
```
Hover over any vendor logo
Expected: Background color changes
Result: Scale animation (1.08x)
Border color highlights gold
```

---

### 6. Theme Toggle Testing

**Dark Theme (Default):**
```
Page loads
Expected: Dark background (#000), white text
Result: All Phase 3 elements use dark colors
```

**Switch to Light:**
```
Click theme toggle (🌙 → ☀️)
Expected: Background becomes white
Result: All new elements transition smoothly
```

**Persistence:**
```
Switch to light theme
Refresh page (F5)
Expected: Light theme remains
Result: localStorage persisted the choice
```

**All Elements:**
```
Verify these update with theme:
✓ Gold ticker background
✓ News cards background
✓ Carousel cards background
✓ Vendor logo containers
✓ Footer partners section
✓ Text colors inverted
```

---

### 7. Responsive Design Testing

**Desktop (1200px+):**
```
Open DevTools, full screen
Expected: 
  - News grid: 2 columns
  - Carousel: Auto-scroll visible
  - Logo grids: 4 columns (adjusted)
  - All features enabled
Result: Full feature set visible
```

**Tablet (768px - 1199px):**
```
Resize to 900px
Expected:
  - News grid: 1 column
  - Carousel: Full cards with arrows
  - Logo grids: 2 columns
  - Touch-friendly buttons
Result: Readable without horizontal scroll
```

**Mobile (480px - 767px):**
```
Resize to 500px
Expected:
  - Gold ticker: Compact
  - News: Single column
  - Carousel: Full-width cards
  - Buttons: Large touch targets
  - No horizontal overflow
Result: Mobile-optimized layout
```

**Small Mobile (<480px):**
```
Resize to 360px
Expected:
  - All content readable
  - No horizontal scroll
  - Touch targets: 32px+
  - Compact spacing
Result: Fully functional on small screens
```

---

### 8. Accessibility Testing

**Keyboard Navigation:**
```
Tab through page
Expected:
  - All buttons focusable
  - Focus indicators visible
  - Enter/Space activates buttons
Result: Full keyboard support
```

**Screen Reader:**
```
Use NVDA or JAWS
Expected:
  - Buttons have aria-labels
  - Headings properly nested
  - Form labels associated
  - Images have alt text
Result: Accessible content structure
```

**Color Contrast:**
```
Check with WebAIM Contrast Checker
Expected: WCAG AA (4.5:1 minimum)
Result:
  - Gold on dark: ✓ Pass
  - White on dark: ✓ Pass
  - Gold on light: ✓ Pass
```

---

### 9. Performance Testing

**Load Time:**
```
Open DevTools → Network tab
Reload page
Expected: DOMContentLoaded < 2s
Result: Fast initial render
```

**Animation Performance:**
```
Open DevTools → Performance tab
Scroll through steps
Record: ~30fps minimum (60fps ideal)
Expected: No jank or stuttering
Result: Smooth 60fps animations
```

**Memory Usage:**
```
Open DevTools → Memory tab
Scroll carousel several times
Expected: No memory leak
Result: Stable memory usage
```

**CSS Animations:**
```
Open page with DevTools open
Expected: 0 external animation libraries
Result: Pure CSS + JavaScript
```

---

### 10. Cross-Browser Testing

**Chrome/Edge (Latest):**
```
✓ All features working
✓ Smooth animations
✓ Theme toggle smooth
✓ Responsive design
```

**Firefox (Latest):**
```
✓ Scrollbar styling works
✓ Flex layout correct
✓ Gradients render
✓ No rendering issues
```

**Safari (macOS/iOS):**
```
✓ Webkit prefixes applied
✓ Smooth scroll enabled
✓ Touch events work
✓ Mobile gestures responsive
```

**Mobile Browsers:**
```
Chrome Mobile: ✓ Full support
Safari iOS: ✓ Full support
Firefox Mobile: ✓ Full support
Samsung Internet: ✓ Full support
```

---

## Automated Testing (Optional)

### JavaScript Console Tests

```javascript
// Test 1: Gold Ticker Manager
console.log('Testing GoldRateManager...');
GoldRateManager.fetchRates().then(rates => {
  console.log('Rates:', rates);
  console.assert(rates['24K'] > 0, 'Missing 24K rate');
  console.assert(rates['22K'] > 0, 'Missing 22K rate');
});

// Test 2: Carousel Manager
console.log('Testing CarouselManager...');
console.assert(CarouselManager.track !== null, 'Carousel not initialized');
console.assert(CarouselManager.autoScrollInterval !== null, 'Auto-scroll not running');

// Test 3: Steps Animator
console.log('Testing StepsAnimator...');
const steps = document.querySelectorAll('.step');
console.assert(steps.length === 5, 'Steps count mismatch');
console.log('Steps found:', steps.length);

// Test 4: Theme Manager
console.log('Testing ThemeManager...');
const currentTheme = ThemeManager.get();
console.assert(['dark', 'light'].includes(currentTheme), 'Invalid theme');
console.log('Current theme:', currentTheme);
```

---

## Testing Checklist

### Feature Completeness
- [ ] Gold ticker displays on all 4 pages
- [ ] News feed shows 6 articles
- [ ] Steps animate properly
- [ ] Carousel has 8 vendors
- [ ] Vendor logos display correctly
- [ ] Footer partners section visible

### Functionality
- [ ] Ticker updates every 5 minutes
- [ ] News cards are clickable
- [ ] Steps animate on scroll
- [ ] Carousel auto-scrolls
- [ ] Arrow buttons work
- [ ] Pause on hover works
- [ ] Theme toggle works
- [ ] All links functional

### Responsiveness
- [ ] Desktop layout correct (1200px+)
- [ ] Tablet layout correct (768px)
- [ ] Mobile layout correct (480px)
- [ ] Small mobile works (<480px)
- [ ] No horizontal overflow
- [ ] Touch targets adequate (32px+)

### Visual Quality
- [ ] Gold gradients visible
- [ ] Smooth animations (no jank)
- [ ] Proper spacing/alignment
- [ ] Hover effects working
- [ ] Theme switching smooth
- [ ] No layout shift (CLS)

### Performance
- [ ] Page loads quickly (<2s)
- [ ] Animations run at 60fps
- [ ] No memory leaks
- [ ] No unused JavaScript
- [ ] Optimized CSS

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast WCAG AA
- [ ] Screen reader compatible
- [ ] Focus indicators visible

### Browser Support
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] iOS Safari
- [ ] Android Chrome

---

## Troubleshooting

### Gold Ticker Not Showing
**Problem:** Ticker div not visible
**Solution:** Check if `#gold-ticker` element exists in HTML
**Code:** `document.getElementById('gold-ticker')`

### Carousel Not Auto-scrolling
**Problem:** Carousel not moving
**Solution:** Check `CarouselManager.isAutoScrolling` is true
**Code:** `CarouselManager.isAutoScrolling`

### Steps Not Animating
**Problem:** Steps appear instantly
**Solution:** Check if scrolled into view, verify `.step.in` class added
**Code:** `document.querySelector('.step').classList`

### Theme Not Persisting
**Problem:** Theme resets on refresh
**Solution:** Check localStorage enabled
**Code:** `localStorage.getItem('gb-theme-preference')`

### Carousel Buttons Not Working
**Problem:** Arrow buttons don't scroll
**Solution:** Check `scrollCarousel()` function defined
**Code:** `typeof scrollCarousel === 'function'`

---

## Success Criteria

**All tests passing = Phase 3 Ready for Production**

- [ ] No console errors
- [ ] All features functional
- [ ] Responsive on all devices
- [ ] Accessible to all users
- [ ] Performance targets met
- [ ] Cross-browser compatible
- [ ] Theme system working
- [ ] No layout shifts

---

## Sign-Off

**Date Tested:** _______________
**Tester Name:** _______________
**Browser/Device:** _______________
**Status:** ☑ PASS ☐ FAIL

**Notes:**
_________________________________
_________________________________
_________________________________

---

*For questions or issues, refer to PHASE-3-IMPLEMENTATION.md*
