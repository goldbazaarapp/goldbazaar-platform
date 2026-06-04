# GoldBazaar — Portal UX Flows & Screen Specifications
**Version:** 1.0 | **All portals: Black + Gold design system**

---

## DESIGN SYSTEM

### Color Palette
```
Primary Gold:     #C9A84C   (CTAs, highlights, active states)
Gold Light:       #E8C96A   (hover states, gradients)
Gold Pale:        #F5E6C0   (text accents)
Black Base:       #000000
Black Rich:       #0A0A0A   (page backgrounds)
Black Card:       #141414   (card backgrounds)
Black Border:     #1E1E1E   (dividers, outlines)
White Primary:    #FFFFFF
White Dim:        rgba(255,255,255,0.70)
White Faint:      rgba(255,255,255,0.10)
Success:          #22C55E
Warning:          #F59E0B
Error:            #EF4444
Info:             #3B82F6
```

### Typography
```
Display:  Playfair Display — headings, hero text
Body:     Inter — all UI, labels, body copy
Mono:     JetBrains Mono — rates, numbers, codes

Scale (rem):
  xs: 0.75   sm: 0.875   base: 1.0   lg: 1.125
  xl: 1.25   2xl: 1.5    3xl: 1.875  4xl: 2.25
  5xl: 3.0   6xl: 3.75   7xl: 4.5
```

### Component Tokens
```
Border Radius:  sm=8px  md=12px  lg=16px  xl=24px  full=9999px
Spacing:        Base grid = 4px
Shadow Gold:    0 8px 24px rgba(201,168,76,0.25)
Shadow Dark:    0 20px 40px rgba(0,0,0,0.5)
Transition:     cubic-bezier(0.4, 0, 0.2, 1) 200ms
```

---

## PORTAL 1 — CUSTOMER PORTAL

### Screen 1.1: Customer Dashboard
```
Layout: Single column, max-width 1200px

Header bar (sticky):
  [GoldBazaar logo]  [Search bar — "Find vendors near you"]  [🔔 Notifs]  [Avatar]

Hero greeting card:
  "Good morning, Rajesh 👋"
  Subtitle: "Live gold rate today: ₹6,842/gram (+0.8%)"
  [Quick CTA row]: [Get Gold Loan] [Sell Gold] [Find Jeweller] [Savings Scheme]

Section: My Active Enquiries (last 3)
  Each card shows:
    - Vendor name + logo
    - Service type badge (gold pill: "Gold Loan")
    - Status badge (NEW/CONTACTED/NEGOTIATING)
    - Last message preview
    - Time ago
    - [View Details →]

Section: Saved Vendors (horizontal scroll)
  Vendor cards showing: logo, name, city, rating, trust badge

Section: Gold Rate Widget
  24-hour sparkline chart
  22K / 24K current rates
  +/- change indicator

Section: Discover Schemes (horizontal scroll)
  Scheme cards: vendor name, duration, min instalment, bonus info

Section: Gold News (3 cards)
  Headline, excerpt, source, date, read time

Footer: My Saved Schemes | Calculator | Gold News | Settings
```

### Screen 1.2: Vendor Search & Filter
```
Layout: 2-column (filter sidebar 280px + results)

Top bar:
  [← Back]  "Find Gold Vendors"
  Search input: "Search by vendor name or city…"

Filter sidebar (left):
  Service Type (checkbox group):
    □ Gold Loan  □ Gold Sell  □ Gold Exchange
    □ Jewellery  □ Savings Scheme
  
  Location:
    [City dropdown] + [Detect location button]
    Radius slider: 5km — 50km
  
  Vendor Type:
    □ Jeweller  □ NBFC/Bank  □ Hallmark Centre
  
  Rating: ★★★★+ ★★★+
  
  Verified only: [Toggle]
  
  Sort: [Most Relevant ▾]
        Options: Nearest | Highest Rated | Trust Score | Recently Added
  
  [Apply Filters] [Clear All]

Results panel (right):
  Results count: "142 vendors near Chennai"
  
  Map toggle: [List View] [Map View]
  
  Vendor Card (list item):
    [Logo 64px] 
    Vendor Name (bold, 18px)
    Type badge • City • X km away
    Services: [Gold Loan] [Gold Sell] (pills)
    Rating: ★4.8 (124 reviews)
    Trust badge: [✓ BIS Verified] [✓ RBI Licenced]
    Preview text (description snippet)
    [View Profile]  [Compare +]  [Save ♡]
  
  Pagination: Load more (infinite scroll)
```

### Screen 1.3: Vendor Profile Page
```
Layout: Full-width hero + 2-column content

Hero section (320px tall):
  Cover image / gradient
  Vendor logo (96px circle, elevated)
  Business name (H1)
  Type badge + City
  Rating stars + review count
  Trust badges row: [✓ BIS Hallmarked] [✓ RBI Licenced] [✓ KYC Verified]

Content area:
  Left column (8 col):
    Tab bar: [Overview] [Services] [Schemes] [Reviews] [Branches]
    
    OVERVIEW TAB:
      About section (description)
      Key stats: Years in business | Monthly customers | Avg response time
      Services offered (cards)
      Gold rates (if they display own rates)
    
    SERVICES TAB:
      Per service accordion:
        Gold Loan: Interest rate range, LTV ratio, processing fee, tenure
        Gold Sell: Rate vs MCX, payment modes, settlement time
      
    SCHEMES TAB:
      Scheme cards:
        Name, duration, min instalment
        Features list (checkmarks)
        [Save Scheme] [Get Details]
    
    REVIEWS TAB:
      Rating breakdown: ★5 (72%) ★4 (18%) ★3 (6%) ★2 (3%) ★1 (1%)
      Review cards: Author initials, rating, date, comment
      [Load more reviews]
    
    BRANCHES TAB:
      Branch list with address, phone, map pin
      Map embed (Leaflet.js)

  Right column (4 col, sticky):
    Enquiry Card (elevated, gold border):
      "Get a Free Callback"
      [Select service dropdown]
      [Your mobile number]  
      [Your requirement (optional)]
      [Send OTP & Submit]
      
      Privacy note: "🔒 Your number stays private"
    
    Quick stats:
      Response rate: 94% | Avg reply: 2 hours
      On GoldBazaar since: Jan 2023
    
    Share: [Copy Link] [WhatsApp Share]
```

### Screen 1.4: Vendor Comparison
```
Layout: Full width, horizontal scroll on mobile

Comparison header:
  "Comparing 3 Vendors" [+ Add vendor]

Comparison table:
  Row headers (left col):
    Basic Info
    Trust Score
    Gold Loan: Interest Rate
    Gold Loan: LTV Ratio
    Gold Loan: Processing Fee
    Gold Loan: Max Loan Amount
    Gold Sell: Rate vs MCX
    Ratings
    Response Time
    Hallmark Status
  
  Vendor columns (max 4):
    Header: Logo, Name, [Remove ×]
    Cells: Value with highlight if best (gold background)
    Footer: [Get Enquiry] button per vendor

Mobile: horizontal scroll with fixed left header
```

### Screen 1.5: Enquiry Tracking
```
Layout: List + Detail split (desktop), tabs (mobile)

Left panel: Enquiry list
  Filter: [All] [Active] [Completed] [Archived]
  
  Each item:
    Vendor logo + name
    Service type badge
    Status indicator (colour-coded dot)
    Last message preview (1 line)
    Time since last activity

Right panel: Enquiry thread
  Header: Vendor name + status badge
  
  Message thread (WhatsApp-style bubbles):
    Customer messages: right-aligned, gold bubble
    Vendor messages: left-aligned, dark card
    System messages: centered, grey (e.g., "Vendor viewed your enquiry")
  
  Input area (if vendor has responded):
    [Type a message…] [Send]
  
  Actions: [Mark Converted ✓] [Close Enquiry] [Report Issue]
```

---

## PORTAL 2 — VENDOR PORTAL

### Screen 2.1: Vendor Dashboard
```
Layout: Left sidebar (240px) + Main content

Sidebar:
  [GoldBazaar Vendor logo]
  Business name
  Plan badge: [PREMIUM]
  Trust Score: ●●●●○ 82/100
  
  Navigation:
    📊 Dashboard
    👤 Profile
    🏢 Branches
    📥 Leads
    🖼 Banners
    📋 Schemes
    📢 Advertisements
    📈 Analytics
    💰 ROI Dashboard
    💳 Subscription
    🔔 Notifications
    🎧 Support

Main content:

  Top stat bar (4 cards):
    New Leads Today: [12] (+3 vs yesterday)
    This Month Leads: [89]
    Conversion Rate: [23%]
    Subscription: [28 days remaining]

  Chart section (2 columns):
    Left: "Lead Trend — Last 30 days" (line chart)
    Right: "Lead by Service Type" (donut chart)

  Recent Leads table:
    Cols: Time | Customer (masked: "Raj*** K.") | Service | AI Score | Status | Action
    Rows: 10 latest, [View All →]

  Performance cards:
    Trust Score Breakdown (progress bars per factor)
    Response Rate alert (if < 80%: warning card)
    
  Quick actions:
    [+ Add Branch] [+ Create Scheme] [+ Create Ad] [View ROI →]
```

### Screen 2.2: Lead Inbox
```
Layout: 3-column (filters | list | detail)

Filter column (200px):
  Status filter: [All] [New] [Viewed] [Contacted] [Negotiating] [Converted] [Lost]
  Service filter: All / per service type
  Date range picker
  Sort: Newest | AI Score ↓ | Urgency

Lead list column (340px):
  Search: "Search by customer city…"
  
  Lead card:
    AI Score badge (colour: green>70, amber 40-70, red<40)
    "New Lead" / "2 hours ago"
    Service type icon + label
    Customer city + distance ("3.2km away")
    Requirement snippet
    Status tag
  
  Colour left border coding:
    NEW: gold | CONTACTED: blue | CONVERTED: green | LOST: red

Detail column:
  Lead header:
    Lead ID: #GB-20250612-0089
    Received: 12 Jun 2025, 10:34 AM
    AI Conversion Score: 78/100 (high intent)
    AI Score factors: "Gold weight mentioned ✓  | Urgency signals ✓"
  
  Customer intent:
    Service: Gold Loan
    City: Adyar, Chennai
    Requirement: "Need gold loan of ₹2-3 lakh against 50g gold jewellery, want doorstep service"
    Estimated gold value: ~₹3.4 lakh
  
  Contact section:
    [Reveal Mobile Number] (deducts 1 lead credit)
    After reveal: "+91 98765 43210" + [Call] [WhatsApp]
  
  Lead actions:
    [Mark Contacted] [Mark Converted] [Mark Lost]
    Notes field (internal)
    [Save Note]
  
  Message thread (if customer has messaged)
```

### Screen 2.3: Analytics Dashboard
```
Date range selector: [Today] [7 Days] [30 Days] [90 Days] [Custom]

Row 1 — KPI cards (6 cards):
  Total Leads | Leads Viewed | Leads Contacted | Conversions | Conversion Rate | Revenue Generated

Row 2 — Charts:
  Left (8 col): Lead Volume Over Time (bar chart, daily)
  Right (4 col): Leads by Service Type (donut)

Row 3 — Charts:
  Left (6 col): Conversion Funnel (horizontal funnel: Received → Viewed → Contacted → Converted)
  Right (6 col): Lead Source Distribution (where leads came from: Search / Ad / Direct / Scheme)

Row 4 — Table:
  "Lead Activity by Branch" (if multi-branch)
  Cols: Branch | Leads | Converted | Rate | Revenue

Row 5 — Competitor Benchmarking:
  "Your Performance vs Platform Average"
  Metrics: Response Rate | Rating | Trust Score | Conversion Rate
  (Bar comparison, vendor bar in gold, platform average in grey)
```

### Screen 2.4: ROI Dashboard
```
ROI Summary card (prominent):
  Subscription Cost This Month: ₹4,999
  Estimated Revenue from Leads: ₹2,34,000
  ROI: 46.8x  (huge gold number)
  
  Sub-metrics:
    Avg deal size: ₹12,300 | Avg conversion cost: ₹217 per customer

ROI Trend chart: 12 months rolling

Subscription Value Breakdown:
  Leads received: 89 | Lead value at market rate: ₹1,335
  Conversions: 21 | Avg deal: ₹12,300 | Total revenue: ₹2,58,300
  Platform fee: ₹4,999 | Net gain: ₹2,53,301

Ad Performance ROI (if running ads):
  Ad spend: ₹2,000 | Leads from ads: 34 | Conversions: 8 | Revenue: ₹98,400
  Ad ROI: 49.2x

Export: [Download PDF Report] [Share Report]
```

---

## PORTAL 3 — ADMIN PORTAL

### Screen 3.1: Admin Dashboard
```
Top alert bar: "5 vendors pending approval · 3 ads pending review · 2 fraud alerts"

KPI Row (5 cards):
  Platform Vendors | Active Today | New Leads Today | Platform Revenue MTD | Pending Approvals

Charts row:
  Left: Platform Lead Volume (30 days, line chart)
  Right: Revenue by Subscription Plan (stacked bar)

Below charts:
  Left (6 col): Vendor Approval Queue (table: name, type, city, submitted, [Review])
  Right (6 col): Fraud Alerts (table: type, vendor, severity, [Investigate])

Bottom: Support Tickets Overview
  Open | In Progress | Resolved (counts)
  Last 5 tickets table
```

### Screen 3.2: Vendor Approval Detail
```
Layout: 2-column review

Left column: Vendor information
  Business details: name, type, city, registration date
  Services applied for
  Subscription plan selected
  Payment status

Document review section:
  Document list with inline preview:
    [GST Certificate — Preview | Download | ✓ Valid / ✗ Invalid]
    [BIS Licence — Preview | Download]
    [PAN Card — Preview | Download]
    [Address Proof — Preview | Download]
  
  Verification checks:
    Auto-check result: "BIS Number BIS123456 — ✓ Found in database"
    Auto-check result: "GST 33XXXXX — ✓ Active"
    Manual check needed: "NBFC Licence — Pending manual verification"

Right column: Decision panel
  Internal notes (text area):
  
  Checklist:
    □ Business registration verified
    □ Documents authentic
    □ Address verified
    □ Service types appropriate
    □ No conflict of interest
  
  Decision:
    [✓ Approve Vendor] (green button)
    [✗ Reject — Select reason] (red button)
    [⟳ Request More Documents] (amber button)
  
  Rejection reasons dropdown:
    Incomplete documents | Unverifiable licence | Duplicate account | Policy violation | Other

Audit trail (bottom):
  Timeline of all actions taken on this application
```

### Screen 3.3: Fraud Monitoring
```
Alert feed (real-time):
  Alert cards:
    Severity badge [HIGH/MEDIUM/LOW]
    Alert type: "Suspicious Lead Pattern" / "Multiple OTPs from same IP" / "Vendor Review Manipulation"
    Details: affected entity, timestamp, frequency
    [Investigate] [Dismiss] [Escalate]

Analytics panel:
  Daily fraud rate chart
  Top fraud types breakdown
  Geographic heatmap of fraud attempts

IP Blocklist management:
  Active blocks table + [Add Block] + [Remove Block]

Vendor risk scores table:
  Vendors sorted by risk score (high risk at top)
  Drill into vendor for full activity log
```

---

## PORTAL 4 — SUPER ADMIN PORTAL

### Screen 4.1: Platform Configuration
```
Sections:

Lead Settings:
  Default lead radius (km): [10]
  Max leads per vendor per day: [50]
  Lead cooling period (hours): [2]
  AI scoring: [Enabled ✓]

Subscription Plans:
  Plan editor (table):
    Plan Name | Monthly Price | Annual Price | Leads/Month | Branches | Ad Credits | [Edit]
  [+ Add Plan]

Gold Rate Settings:
  Rate source: [MCX API ▾]
  Update frequency: [Every 15 minutes ▾]
  Rate margin (%): [0.5]

Notification Settings:
  OTP provider: [Twilio ▾]
  Email provider: [AWS SES ▾]
  WhatsApp: [Gupshup ▾]

Platform Toggles:
  Maintenance mode: [OFF]
  New vendor registrations: [ON]
  Customer signups: [ON]
  Ad platform: [ON]
```

### Screen 4.2: Feature Flags
```
Flag list:
  Flag name | Description | Status | Rollout % | Updated by | [Edit]
  
  ai_lead_scoring        | AI-powered lead scoring     | ✓ ON  | 100% | super@gb.in
  digital_gold_vertical  | Digital gold product        | ✗ OFF | 0%   | super@gb.in
  vendor_comparison_v2   | New comparison UI           | ✓ ON  | 25%  | super@gb.in
  whatsapp_notifications | WhatsApp lead notifications | ✓ ON  | 100% | super@gb.in
  gold_insurance_vertical| Insurance product           | ✗ OFF | 0%   | super@gb.in

Edit flag modal:
  Name, Description
  Status toggle
  Rollout % slider (0–100)
  Target: All users / Specific role / City
  JSON config (for complex flags)
  [Save] [Cancel]
```

### Screen 4.3: Audit Logs
```
Filter bar:
  User search | Action type | Entity type | Date range | [Filter]

Log table:
  Timestamp | User | Role | Action | Entity | Entity ID | IP | [Details]
  
  Example rows:
  12 Jun 10:34  admin@gb.in   ADMIN  vendor.approved  Vendor  v_123abc  192.168.1.1
  12 Jun 10:22  super@gb.in   SUPER_ADMIN  flag.updated  FeatureFlag  ff_ai  10.0.0.1
  12 Jun 09:15  vendor@jewels VENDOR  scheme.created  GoldScheme  gs_456  103.x.x.x

Details panel (slide-in):
  Full diff view: oldValue JSON vs newValue JSON
  Request headers
  Session info
```

---

## NAVIGATION STRUCTURE SUMMARY

### Customer Navigation (mobile bottom tabs + desktop top bar)
```
🏠 Home  🔍 Search  📋 Enquiries  💾 Saved  👤 Profile
```

### Vendor Navigation (left sidebar, collapsible)
```
📊 Dashboard
📥 Leads (badge: new count)
👤 Profile
🏢 Branches
📋 Schemes
🖼 Banners
📢 Advertisements
📈 Analytics
💰 ROI
💳 Subscription
🔔 Notifications
🎧 Support
```

### Admin Navigation (left sidebar)
```
📊 Dashboard
✅ Approvals (badge)
🏢 Vendors
👥 Customers
📥 Leads
📢 Advertisements (badge)
📈 Analytics
🎧 Support
🚨 Fraud
📋 Compliance
```

### Super Admin Navigation
```
📊 Dashboard
⚙️ Platform Config
👥 Roles & Permissions
💳 Subscriptions
🚩 Feature Flags
📋 Audit Logs
🏛️ Governance
```
