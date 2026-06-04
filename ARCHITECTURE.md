# GoldBazaar — Enterprise Architecture Specification
**Version:** 1.0 | **Classification:** Confidential | **Date:** June 2025

---

## 1. INFORMATION ARCHITECTURE

### 1.1 Platform Overview

```
GoldBazaar Platform
├── Public Zone (Unauthenticated)
│   ├── Landing Page
│   ├── Vendor Discovery & Search
│   ├── Vendor Public Profiles
│   ├── Gold Calculator
│   ├── Gold Rate Tracker
│   └── Gold News Feed
│
├── Customer Zone (Auth: OTP + JWT, Role: CUSTOMER)
│   ├── Dashboard
│   ├── Vendor Search & Compare
│   ├── Enquiry Tracking
│   ├── Saved Vendors & Schemes
│   ├── Notifications
│   └── Account Settings
│
├── Vendor Zone (Auth: OTP + JWT, Role: VENDOR)
│   ├── Onboarding Flow
│   ├── Dashboard & Analytics
│   ├── Profile & Branch Management
│   ├── Lead Inbox & CRM
│   ├── Banner & Scheme Management
│   ├── Advertisement Management
│   ├── ROI Dashboard
│   └── Subscription & Billing
│
├── Admin Zone (Auth: OTP + JWT + TOTP, Role: ADMIN)
│   ├── Vendor Approval Queue
│   ├── Marketplace Governance
│   ├── Lead Monitoring
│   ├── Advertisement Moderation
│   ├── Analytics Dashboard
│   ├── Support Desk
│   └── Fraud Monitoring
│
└── Super Admin Zone (Auth: OTP + JWT + TOTP + IP Whitelist, Role: SUPER_ADMIN)
    ├── Platform Configuration
    ├── RBAC Management
    ├── Subscriptions & Billing Engine
    ├── Feature Flags
    ├── Audit Logs
    └── Marketplace Governance
```

---

## 2. SITEMAP

```
/ (Landing Page)
├── /about
├── /services
│   ├── /services/gold-loan
│   ├── /services/gold-sell
│   ├── /services/gold-exchange
│   ├── /services/jewellery
│   └── /services/savings-schemes
├── /vendors
│   ├── /vendors/search?city=&service=&radius=
│   ├── /vendors/compare?ids=
│   └── /vendors/[slug]
├── /gold-rate
├── /calculator
├── /news
│   └── /news/[slug]
├── /contact
│
├── /auth
│   ├── /auth/login
│   ├── /auth/otp-verify
│   └── /auth/logout
│
├── /customer (Protected: CUSTOMER)
│   ├── /customer/dashboard
│   ├── /customer/profile
│   ├── /customer/search
│   ├── /customer/compare
│   ├── /customer/enquiries
│   │   └── /customer/enquiries/[id]
│   ├── /customer/saved
│   ├── /customer/notifications
│   └── /customer/settings
│
├── /vendor (Protected: VENDOR)
│   ├── /vendor/onboarding
│   │   ├── /vendor/onboarding/basic-info
│   │   ├── /vendor/onboarding/documents
│   │   ├── /vendor/onboarding/services
│   │   └── /vendor/onboarding/subscription
│   ├── /vendor/dashboard
│   ├── /vendor/profile
│   ├── /vendor/branches
│   │   ├── /vendor/branches/new
│   │   └── /vendor/branches/[id]/edit
│   ├── /vendor/leads
│   │   └── /vendor/leads/[id]
│   ├── /vendor/banners
│   ├── /vendor/schemes
│   │   ├── /vendor/schemes/new
│   │   └── /vendor/schemes/[id]/edit
│   ├── /vendor/advertisements
│   ├── /vendor/analytics
│   ├── /vendor/roi
│   ├── /vendor/subscription
│   ├── /vendor/notifications
│   └── /vendor/support
│
├── /admin (Protected: ADMIN)
│   ├── /admin/dashboard
│   ├── /admin/vendor-approvals
│   │   └── /admin/vendor-approvals/[id]
│   ├── /admin/vendors
│   │   └── /admin/vendors/[id]
│   ├── /admin/customers
│   ├── /admin/leads
│   ├── /admin/advertisements
│   ├── /admin/analytics
│   ├── /admin/support
│   ├── /admin/fraud
│   └── /admin/compliance
│
└── /super-admin (Protected: SUPER_ADMIN + IP Whitelist)
    ├── /super-admin/dashboard
    ├── /super-admin/platform-config
    ├── /super-admin/roles
    ├── /super-admin/permissions
    ├── /super-admin/subscriptions
    ├── /super-admin/billing
    ├── /super-admin/feature-flags
    └── /super-admin/audit-logs
```

---

## 3. USER JOURNEYS

### 3.1 Customer: Gold Loan Enquiry
```
Landing Page
  → Hero CTA "Find Gold Loans"
  → Vendor Search (service=gold-loan, city=auto-detect)
  → Filter & Sort Results
  → View Vendor Profile
  → Click "Get Enquiry" → OTP Modal
  → OTP Verification (mobile)
  → Account Created (if new) / Login
  → Enquiry Submitted → Lead Created in System
  → SMS/WhatsApp confirmation
  → Vendor notified (push + SMS)
  → Customer tracks lead: /customer/enquiries/[id]
  → Vendor responds → Customer gets notification
  → Customer marks as Converted / Not Interested
```

### 3.2 Vendor: Onboarding
```
Landing Page → "Register Your Business"
  → /vendor/onboarding/basic-info
    (Business name, type, mobile OTP)
  → /vendor/onboarding/documents
    (GST cert, BIS/NBFC licence, PAN, Address proof)
  → /vendor/onboarding/services
    (Select service types, add branch locations)
  → /vendor/onboarding/subscription
    (Choose plan: Basic / Growth / Premium)
  → Payment Gateway (Razorpay)
  → Onboarding complete → Status: PENDING_APPROVAL
  → Admin Review (24–48 hrs)
  → Approval Email + SMS
  → Vendor Live → /vendor/dashboard
```

### 3.3 Admin: Vendor Approval
```
/admin/vendor-approvals
  → New application card in queue
  → Open /admin/vendor-approvals/[id]
  → Review documents (inline preview)
  → Cross-check BIS/NBFC database (API call)
  → Approve / Reject / Request More Docs
  → Automated email/SMS sent to vendor
  → Audit log entry created
```

---

## 4. DATABASE SCHEMA (PostgreSQL + Prisma)

```prisma
// ── ENUMS ──────────────────────────────────────────

enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
  SUPER_ADMIN
}

enum VendorType {
  JEWELLER
  NBFC
  BANK
  HALLMARK_CENTRE
  INSURANCE_PROVIDER
  REFINERY
  PAWNBROKER
}

enum VendorStatus {
  PENDING_APPROVAL
  ACTIVE
  SUSPENDED
  REJECTED
  INACTIVE
}

enum ServiceType {
  GOLD_LOAN
  GOLD_SELL
  GOLD_EXCHANGE
  JEWELLERY_PURCHASE
  SAVINGS_SCHEME
  DIGITAL_GOLD
  GOLD_INSURANCE
  GOLD_INVESTMENT
}

enum LeadStatus {
  NEW
  VIEWED
  CONTACTED
  NEGOTIATING
  CONVERTED
  LOST
  SPAM
}

enum SubscriptionPlan {
  BASIC
  GROWTH
  PREMIUM
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  EXPIRED
  CANCELLED
  TRIAL
}

enum AdStatus {
  DRAFT
  PENDING_REVIEW
  ACTIVE
  PAUSED
  REJECTED
  EXPIRED
}

enum NotificationType {
  LEAD_RECEIVED
  LEAD_UPDATED
  VENDOR_APPROVED
  VENDOR_REJECTED
  SUBSCRIPTION_EXPIRY
  PAYMENT_SUCCESS
  SYSTEM_ALERT
}

// ── MODELS ─────────────────────────────────────────

model User {
  id              String    @id @default(cuid())
  mobile          String    @unique
  email           String?   @unique
  name            String?
  role            UserRole  @default(CUSTOMER)
  isActive        Boolean   @default(true)
  isVerified      Boolean   @default(false)
  lastLoginAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  customer        Customer?
  vendor          Vendor?
  sessions        Session[]
  notifications   Notification[]
  auditLogs       AuditLog[]

  @@index([mobile])
  @@index([role])
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  refreshToken String   @unique
  ipAddress    String?
  userAgent    String?
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([token])
}

model OtpCode {
  id          String   @id @default(cuid())
  mobile      String
  code        String
  purpose     String   // login | enquiry | verification
  attempts    Int      @default(0)
  verified    Boolean  @default(false)
  expiresAt   DateTime
  createdAt   DateTime @default(now())

  @@index([mobile, purpose])
}

model Customer {
  id              String    @id @default(cuid())
  userId          String    @unique
  city            String?
  state           String?
  pincode         String?
  preferredRadius Int       @default(10) // km
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  enquiries       Lead[]
  savedVendors    SavedVendor[]
  savedSchemes    SavedScheme[]

  @@index([city, state])
}

model Vendor {
  id                String           @id @default(cuid())
  userId            String           @unique
  businessName      String
  slug              String           @unique
  vendorType        VendorType
  status            VendorStatus     @default(PENDING_APPROVAL)
  description       String?          @db.Text
  tagline           String?
  logoUrl           String?
  coverImageUrl     String?
  
  // Location
  city              String
  state             String
  pincode           String
  fullAddress       String?
  latitude          Float?
  longitude         Float?
  
  // Verification
  gstNumber         String?
  panNumber         String?
  bisLicenceNumber  String?
  nbfcLicenceNumber String?
  verifiedAt        DateTime?
  verifiedBy        String?
  
  // Scores
  trustScore        Float            @default(0)
  rating            Float            @default(0)
  totalReviews      Int              @default(0)
  responseRate      Float            @default(0) // percentage
  avgResponseHours  Float            @default(24)
  
  // Subscription
  subscriptionPlan  SubscriptionPlan @default(BASIC)
  
  // Metadata
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  user              User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  branches          Branch[]
  services          VendorService[]
  leads             Lead[]
  banners           Banner[]
  schemes           GoldScheme[]
  advertisements    Advertisement[]
  reviews           VendorReview[]
  savedBy           SavedVendor[]
  subscription      Subscription?
  analytics         VendorAnalytics?
  documents         VendorDocument[]

  @@index([city, state])
  @@index([vendorType, status])
  @@index([trustScore])
  @@index([slug])
}

model Branch {
  id          String   @id @default(cuid())
  vendorId    String
  name        String
  address     String
  city        String
  state       String
  pincode     String
  latitude    Float?
  longitude   Float?
  phone       String?
  isMain      Boolean  @default(false)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId])
  @@index([city, latitude, longitude])
}

model VendorService {
  id             String      @id @default(cuid())
  vendorId       String
  serviceType    ServiceType
  isActive       Boolean     @default(true)
  
  // Service-specific config (stored as JSON)
  config         Json?
  // e.g., for GOLD_LOAN: { minLoanAmount, maxLoanAmount, interestRateFrom, processingFee }
  // e.g., for SAVINGS_SCHEME: { minInstalment, schemeTypes }

  vendor         Vendor      @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@unique([vendorId, serviceType])
  @@index([serviceType, isActive])
}

model VendorDocument {
  id           String   @id @default(cuid())
  vendorId     String
  documentType String   // gst | pan | bis | nbfc | address | other
  fileUrl      String
  fileName     String
  fileSize     Int
  mimeType     String
  isVerified   Boolean  @default(false)
  verifiedAt   DateTime?
  createdAt    DateTime @default(now())

  vendor       Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId])
}

model Lead {
  id              String     @id @default(cuid())
  leadCode        String     @unique @default(cuid())
  customerId      String
  vendorId        String
  serviceType     ServiceType
  status          LeadStatus @default(NEW)
  
  // Customer intent data
  requirementNote String?    @db.Text
  estimatedGoldWt Float?     // grams
  estimatedValue  Float?     // INR
  
  // AI scoring
  aiScore         Float?     // 0-100 conversion probability
  aiScoreFactors  Json?
  
  // Tracking
  viewedAt        DateTime?
  contactedAt     DateTime?
  resolvedAt      DateTime?
  
  // Metadata
  ipAddress       String?
  sourceUrl       String?
  utmSource       String?
  utmCampaign     String?
  
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  customer        Customer   @relation(fields: [customerId], references: [id])
  vendor          Vendor     @relation(fields: [vendorId], references: [id])
  messages        LeadMessage[]

  @@index([vendorId, status])
  @@index([customerId])
  @@index([createdAt])
  @@index([serviceType])
}

model LeadMessage {
  id        String   @id @default(cuid())
  leadId    String
  senderId  String
  senderRole UserRole
  message   String   @db.Text
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)

  @@index([leadId])
}

model GoldScheme {
  id              String   @id @default(cuid())
  vendorId        String
  name            String
  description     String?  @db.Text
  duration        Int      // months
  minInstalment   Float    // INR
  maxInstalment   Float?
  bonusMonth      Int?     // which month is free
  interestRate    Float?
  features        Json?    // array of feature strings
  terms           String?  @db.Text
  isActive        Boolean  @default(true)
  startDate       DateTime?
  endDate         DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  vendor          Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  savedBy         SavedScheme[]

  @@index([vendorId, isActive])
}

model Banner {
  id          String   @id @default(cuid())
  vendorId    String
  title       String
  imageUrl    String
  linkUrl     String?
  position    String   // hero | sidebar | inline
  isActive    Boolean  @default(true)
  startDate   DateTime?
  endDate     DateTime?
  impressions Int      @default(0)
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())

  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId, isActive])
}

model Advertisement {
  id           String    @id @default(cuid())
  vendorId     String
  title        String
  description  String?
  imageUrl     String?
  targetCity   String?
  targetState  String?
  targetRadius Int?      // km
  targetService ServiceType?
  budget       Float     // INR total budget
  dailyBudget  Float?
  costPerClick Float?
  status       AdStatus  @default(DRAFT)
  reviewedBy   String?
  reviewNote   String?
  impressions  Int       @default(0)
  clicks       Int       @default(0)
  conversions  Int       @default(0)
  spend        Float     @default(0)
  startDate    DateTime?
  endDate      DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  vendor       Vendor    @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@index([vendorId, status])
  @@index([targetCity, targetState])
  @@index([status, startDate, endDate])
}

model VendorReview {
  id         String   @id @default(cuid())
  vendorId   String
  reviewerId String   // userId
  rating     Int      // 1-5
  title      String?
  comment    String?  @db.Text
  isVerified Boolean  @default(false) // verified purchase
  helpfulCount Int    @default(0)
  createdAt  DateTime @default(now())

  vendor     Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@unique([vendorId, reviewerId])
  @@index([vendorId, rating])
}

model Subscription {
  id              String             @id @default(cuid())
  vendorId        String             @unique
  plan            SubscriptionPlan
  status          SubscriptionStatus @default(TRIAL)
  
  // Billing
  amount          Float
  currency        String             @default("INR")
  billingCycle    String             @default("monthly") // monthly | annual
  
  // Period
  trialEndsAt     DateTime?
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  
  // Payment
  razorpaySubId   String?
  razorpayCustomerId String?
  
  // Limits
  leadsPerMonth   Int
  branchLimit     Int
  adCredits       Float
  
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  vendor          Vendor             @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  invoices        Invoice[]
}

model Invoice {
  id             String   @id @default(cuid())
  subscriptionId String
  invoiceNumber  String   @unique
  amount         Float
  gstAmount      Float
  totalAmount    Float
  status         String   // paid | pending | failed
  paidAt         DateTime?
  razorpayPaymentId String?
  invoiceUrl     String?
  createdAt      DateTime @default(now())

  subscription   Subscription @relation(fields: [subscriptionId], references: [id])

  @@index([subscriptionId])
}

model VendorAnalytics {
  id               String   @id @default(cuid())
  vendorId         String   @unique
  totalLeads       Int      @default(0)
  totalConverted   Int      @default(0)
  totalViews       Int      @default(0)
  avgResponseHours Float    @default(0)
  conversionRate   Float    @default(0)
  revenueGenerated Float    @default(0)
  lastCalculatedAt DateTime @default(now())

  vendor           Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
}

model SavedVendor {
  id         String   @id @default(cuid())
  customerId String
  vendorId   String
  createdAt  DateTime @default(now())

  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  vendor     Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  @@unique([customerId, vendorId])
}

model SavedScheme {
  id         String     @id @default(cuid())
  customerId String
  schemeId   String
  createdAt  DateTime   @default(now())

  customer   Customer   @relation(fields: [customerId], references: [id], onDelete: Cascade)
  scheme     GoldScheme @relation(fields: [schemeId], references: [id], onDelete: Cascade)

  @@unique([customerId, schemeId])
}

model GoldRate {
  id        String   @id @default(cuid())
  date      DateTime @unique
  rate22k   Float    // per gram INR
  rate24k   Float
  rateSource String  @default("MCX")
  createdAt DateTime @default(now())

  @@index([date])
}

model Notification {
  id         String           @id @default(cuid())
  userId     String
  type       NotificationType
  title      String
  body       String
  data       Json?
  isRead     Boolean          @default(false)
  readAt     DateTime?
  createdAt  DateTime         @default(now())

  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([createdAt])
}

model AuditLog {
  id         String   @id @default(cuid())
  userId     String?
  action     String
  entity     String
  entityId   String?
  oldValue   Json?
  newValue   Json?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())

  user       User?    @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([entity, entityId])
  @@index([createdAt])
}

model FeatureFlag {
  id          String   @id @default(cuid())
  key         String   @unique
  name        String
  description String?
  isEnabled   Boolean  @default(false)
  rolloutPct  Int      @default(0) // 0-100
  config      Json?
  updatedBy   String?
  updatedAt   DateTime @updatedAt
  createdAt   DateTime @default(now())
}
```

---

## 5. API SPECIFICATIONS

### Base URL: `https://api.goldbazaar.in/v1`

### 5.1 Authentication Endpoints

```
POST   /auth/send-otp          Send OTP to mobile
POST   /auth/verify-otp        Verify OTP → JWT
POST   /auth/refresh            Refresh access token
POST   /auth/logout             Invalidate session
```

### 5.2 Public Endpoints

```
GET    /gold-rates              Get current gold rates (22k, 24k)
GET    /gold-rates/history      Rate history with date range
GET    /vendors                 Search & filter vendors
GET    /vendors/:slug           Vendor public profile
GET    /vendors/:slug/schemes   Vendor's gold schemes
GET    /vendors/:slug/reviews   Vendor reviews (paginated)
GET    /news                    Gold news feed
GET    /news/:slug              Single news article
GET    /calculator/gold-loan    Calculate gold loan amount
GET    /calculator/exchange     Calculate exchange value
```

### 5.3 Customer Endpoints (Auth required, Role: CUSTOMER)

```
GET    /customer/profile        Get customer profile
PUT    /customer/profile        Update profile
GET    /customer/enquiries      List all enquiries
POST   /customer/enquiries      Create new enquiry (lead)
GET    /customer/enquiries/:id  Get enquiry details
GET    /customer/saved/vendors  Saved vendors
POST   /customer/saved/vendors  Save a vendor
DELETE /customer/saved/vendors/:id  Unsave
GET    /customer/saved/schemes  Saved schemes
POST   /customer/saved/schemes  Save a scheme
GET    /customer/notifications  Get notifications
PUT    /customer/notifications/read-all  Mark all read
```

### 5.4 Vendor Endpoints (Auth required, Role: VENDOR)

```
GET    /vendor/profile          Get vendor profile
PUT    /vendor/profile          Update profile
PUT    /vendor/profile/logo     Upload logo
POST   /vendor/branches         Add branch
PUT    /vendor/branches/:id     Update branch
DELETE /vendor/branches/:id     Remove branch
GET    /vendor/leads            List leads (paginated, filtered)
GET    /vendor/leads/:id        Lead detail
PUT    /vendor/leads/:id/status Update lead status
POST   /vendor/leads/:id/reply  Send message to customer
GET    /vendor/banners          List banners
POST   /vendor/banners          Create banner
PUT    /vendor/banners/:id      Update banner
DELETE /vendor/banners/:id      Delete banner
GET    /vendor/schemes          List schemes
POST   /vendor/schemes          Create scheme
PUT    /vendor/schemes/:id      Update scheme
DELETE /vendor/schemes/:id      Delete scheme
GET    /vendor/advertisements   List ads
POST   /vendor/advertisements   Create ad
PUT    /vendor/advertisements/:id  Update ad
GET    /vendor/analytics        Dashboard analytics
GET    /vendor/analytics/roi    ROI metrics
GET    /vendor/subscription     Current plan
POST   /vendor/subscription/upgrade  Upgrade plan
```

### 5.5 Admin Endpoints (Auth required, Role: ADMIN)

```
GET    /admin/approvals         Pending vendor approvals
GET    /admin/approvals/:id     Approval detail
PUT    /admin/approvals/:id/approve   Approve vendor
PUT    /admin/approvals/:id/reject    Reject vendor
GET    /admin/vendors           All vendors (paginated, filtered)
PUT    /admin/vendors/:id/suspend     Suspend vendor
PUT    /admin/vendors/:id/activate    Activate vendor
GET    /admin/leads             All leads with filters
GET    /admin/advertisements/pending  Ads pending review
PUT    /admin/advertisements/:id/approve
PUT    /admin/advertisements/:id/reject
GET    /admin/analytics/platform     Platform-wide analytics
GET    /admin/analytics/revenue
GET    /admin/fraud/flags        Fraud alerts
POST   /admin/fraud/flags/:id/resolve
```

### 5.6 Response Format

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VENDOR_NOT_FOUND",
    "message": "Vendor with this ID does not exist",
    "details": {}
  }
}
```

---

## 6. RBAC MATRIX

| Permission                    | CUSTOMER | VENDOR | ADMIN | SUPER_ADMIN |
|-------------------------------|----------|--------|-------|-------------|
| View public vendor profiles   | ✅       | ✅     | ✅    | ✅          |
| Submit enquiry                | ✅       | ❌     | ❌    | ❌          |
| Save vendors/schemes          | ✅       | ❌     | ❌    | ❌          |
| View own leads                | ✅       | ✅     | ✅    | ✅          |
| Manage vendor profile         | ❌       | ✅     | ❌    | ✅          |
| Manage branches               | ❌       | ✅     | ❌    | ✅          |
| Create/manage schemes         | ❌       | ✅     | ❌    | ✅          |
| Create/manage banners         | ❌       | ✅     | ❌    | ✅          |
| Create/manage advertisements  | ❌       | ✅     | ❌    | ✅          |
| View vendor analytics         | ❌       | ✅     | ✅    | ✅          |
| Approve/reject vendors        | ❌       | ❌     | ✅    | ✅          |
| Approve/reject advertisements | ❌       | ❌     | ✅    | ✅          |
| Suspend/activate vendors      | ❌       | ❌     | ✅    | ✅          |
| View platform analytics       | ❌       | ❌     | ✅    | ✅          |
| Monitor fraud                 | ❌       | ❌     | ✅    | ✅          |
| Manage subscriptions          | ❌       | ❌     | ❌    | ✅          |
| Manage feature flags          | ❌       | ❌     | ❌    | ✅          |
| Manage RBAC roles             | ❌       | ❌     | ❌    | ✅          |
| View audit logs               | ❌       | ❌     | ✅    | ✅          |
| Platform configuration        | ❌       | ❌     | ❌    | ✅          |
| Delete any entity             | ❌       | ❌     | ❌    | ✅          |

---

## 7. FOLDER STRUCTURE

```
goldbazaar/
├── apps/
│   ├── web/                         # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/                 # App Router
│   │   │   │   ├── (public)/        # Route group: unauthenticated
│   │   │   │   │   ├── page.tsx     # Landing page
│   │   │   │   │   ├── vendors/
│   │   │   │   │   ├── gold-rate/
│   │   │   │   │   ├── calculator/
│   │   │   │   │   └── news/
│   │   │   │   ├── (auth)/
│   │   │   │   │   └── auth/
│   │   │   │   ├── customer/        # Route group: CUSTOMER
│   │   │   │   │   ├── layout.tsx   # Auth guard + CUSTOMER check
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── profile/
│   │   │   │   │   ├── search/
│   │   │   │   │   ├── compare/
│   │   │   │   │   ├── enquiries/
│   │   │   │   │   ├── saved/
│   │   │   │   │   └── notifications/
│   │   │   │   ├── vendor/          # Route group: VENDOR
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── onboarding/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── profile/
│   │   │   │   │   ├── branches/
│   │   │   │   │   ├── leads/
│   │   │   │   │   ├── banners/
│   │   │   │   │   ├── schemes/
│   │   │   │   │   ├── advertisements/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   ├── roi/
│   │   │   │   │   └── subscription/
│   │   │   │   ├── admin/           # Route group: ADMIN
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── vendor-approvals/
│   │   │   │   │   ├── vendors/
│   │   │   │   │   ├── leads/
│   │   │   │   │   ├── advertisements/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   └── fraud/
│   │   │   │   └── super-admin/     # Route group: SUPER_ADMIN
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── dashboard/
│   │   │   │       ├── platform-config/
│   │   │   │       ├── roles/
│   │   │   │       ├── subscriptions/
│   │   │   │       ├── feature-flags/
│   │   │   │       └── audit-logs/
│   │   │   ├── components/
│   │   │   │   ├── ui/              # Design system atoms
│   │   │   │   │   ├── Button/
│   │   │   │   │   ├── Input/
│   │   │   │   │   ├── Modal/
│   │   │   │   │   ├── Badge/
│   │   │   │   │   ├── Card/
│   │   │   │   │   ├── Table/
│   │   │   │   │   ├── Toast/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Navbar/
│   │   │   │   │   ├── Footer/
│   │   │   │   │   ├── Sidebar/
│   │   │   │   │   └── PageHeader/
│   │   │   │   ├── vendor/
│   │   │   │   │   ├── VendorCard/
│   │   │   │   │   ├── VendorProfile/
│   │   │   │   │   ├── VendorCompare/
│   │   │   │   │   └── TrustBadge/
│   │   │   │   ├── lead/
│   │   │   │   │   ├── EnquiryForm/
│   │   │   │   │   ├── LeadCard/
│   │   │   │   │   └── LeadThread/
│   │   │   │   └── analytics/
│   │   │   │       ├── MetricCard/
│   │   │   │       ├── LineChart/
│   │   │   │       └── BarChart/
│   │   │   ├── lib/
│   │   │   │   ├── api/             # API client (React Query)
│   │   │   │   ├── auth/            # Auth helpers
│   │   │   │   ├── utils/
│   │   │   │   └── constants/
│   │   │   ├── store/               # Zustand stores
│   │   │   │   ├── auth.store.ts
│   │   │   │   ├── vendor.store.ts
│   │   │   │   └── ui.store.ts
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   └── types/               # TypeScript types
│   │   ├── public/
│   │   │   ├── videos/              # GB_1.mp4 … GB_4.mp4
│   │   │   └── images/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   │
│   └── api/                         # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── jwt.strategy.ts
│       │   │   │   ├── otp.service.ts
│       │   │   │   └── guards/
│       │   │   ├── users/
│       │   │   ├── vendors/
│       │   │   │   ├── vendors.controller.ts
│       │   │   │   ├── vendors.service.ts
│       │   │   │   ├── vendor-approval.service.ts
│       │   │   │   └── trust-score.service.ts
│       │   │   ├── leads/
│       │   │   │   ├── leads.controller.ts
│       │   │   │   ├── leads.service.ts
│       │   │   │   └── lead-routing.service.ts
│       │   │   ├── schemes/
│       │   │   ├── banners/
│       │   │   ├── advertisements/
│       │   │   ├── analytics/
│       │   │   ├── notifications/
│       │   │   ├── subscriptions/
│       │   │   ├── gold-rates/
│       │   │   └── admin/
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   ├── filters/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── pipes/
│       │   │   └── middleware/
│       │   ├── prisma/
│       │   │   ├── prisma.service.ts
│       │   │   └── prisma.module.ts
│       │   ├── config/
│       │   └── app.module.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── tsconfig.json
│
├── packages/
│   ├── shared-types/                # Shared TS types (monorepo)
│   ├── ui-kit/                      # Shared component library
│   └── config/                      # Shared ESLint, TS configs
│
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.api
│   │   └── docker-compose.yml
│   ├── k8s/
│   │   ├── namespace.yaml
│   │   ├── web-deployment.yaml
│   │   ├── api-deployment.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   └── secrets.yaml
│   └── terraform/
│       ├── main.tf
│       ├── vpc.tf
│       ├── eks.tf
│       ├── rds.tf
│       └── elasticache.tf
│
└── docs/
    ├── ARCHITECTURE.md              # This file
    ├── API.md
    ├── CONTRIBUTING.md
    └── RUNBOOK.md
```

---

## 8. FRONTEND ARCHITECTURE

### 8.1 Design System Tokens

```typescript
// tokens.ts
export const tokens = {
  colors: {
    gold: { 50:'#FBF4E0', 100:'#F5E6C0', 500:'#C9A84C', 600:'#B8922A', 900:'#5C4010' },
    black: { DEFAULT:'#000', 50:'#F5F5F5', 900:'#0A0A0A', 950:'#050505' },
  },
  typography: {
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontBody: '"Inter", -apple-system, sans-serif',
  },
  spacing: { /* 4px base grid */ },
  radius: { sm:'8px', md:'12px', lg:'16px', xl:'24px', full:'9999px' },
  shadow: {
    gold: '0 8px 24px rgba(201,168,76,0.25)',
    goldLg: '0 16px 48px rgba(201,168,76,0.35)',
  },
};
```

### 8.2 State Management (Zustand)

```typescript
// store/auth.store.ts
interface AuthState {
  user: User | null;
  accessToken: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}
```

### 8.3 Data Fetching Pattern (React Query)

```typescript
// All API calls via TanStack Query
export const useVendors = (filters: VendorFilters) =>
  useInfiniteQuery({
    queryKey: ['vendors', filters],
    queryFn: ({ pageParam }) => api.vendors.list({ ...filters, page: pageParam }),
    getNextPageParam: (last) => last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined,
    staleTime: 60_000,
  });
```

---

## 9. BACKEND ARCHITECTURE

### 9.1 NestJS Module Structure

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 60 }),
    BullModule.forRoot({ redis: { host, port } }),
    PrismaModule,
    AuthModule,
    UsersModule,
    VendorsModule,
    LeadsModule,
    SchemesModule,
    BannersModule,
    AdvertisementsModule,
    AnalyticsModule,
    NotificationsModule,
    SubscriptionsModule,
    GoldRatesModule,
    AdminModule,
  ],
})
export class AppModule {}
```

### 9.2 Lead Routing Engine

```typescript
@Injectable()
export class LeadRoutingService {
  async routeLead(lead: CreateLeadDto): Promise<Vendor[]> {
    // 1. Find vendors by service type in radius
    const candidates = await this.findCandidates(lead);
    // 2. Apply subscription tier filter (PREMIUM > GROWTH > BASIC)
    // 3. Apply trust score weighting
    // 4. Apply fair-share algorithm (penalise over-served vendors)
    // 5. Apply AI score if available
    // 6. Return top N vendors, create leads for each
    return this.rankAndSelect(candidates, lead);
  }

  private async findCandidates(lead: CreateLeadDto) {
    return this.prisma.$queryRaw`
      SELECT v.*, 
        ST_Distance(
          ST_Point(v.longitude, v.latitude),
          ST_Point(${lead.longitude}, ${lead.latitude})
        ) AS distance_km
      FROM vendors v
      JOIN vendor_services vs ON vs.vendor_id = v.id
      WHERE vs.service_type = ${lead.serviceType}
        AND v.status = 'ACTIVE'
        AND ST_DWithin(
          ST_Point(v.longitude, v.latitude),
          ST_Point(${lead.longitude}, ${lead.latitude}),
          ${lead.radiusKm}
        )
      ORDER BY distance_km ASC
    `;
  }
}
```

### 9.3 Trust Score Engine

```typescript
@Injectable()
export class TrustScoreService {
  async recalculate(vendorId: string): Promise<number> {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id: vendorId },
      include: { reviews: true, leads: true, documents: true },
    });

    const score =
      this.verificationScore(vendor) * 0.30 +     // 30% — docs verified
      this.ratingScore(vendor) * 0.25 +            // 25% — customer ratings
      this.responseScore(vendor) * 0.20 +           // 20% — response rate/time
      this.conversionScore(vendor) * 0.15 +         // 15% — lead conversion
      this.tenureScore(vendor) * 0.10;              // 10% — time on platform

    await this.prisma.vendor.update({
      where: { id: vendorId },
      data: { trustScore: Math.min(100, score) },
    });

    return score;
  }
}
```

---

## 10. DEPLOYMENT ARCHITECTURE (AWS)

```
Internet
  │
  ▼
Route 53 (DNS)
  │
  ▼
CloudFront CDN (Static assets, videos, images)
  │
  ▼
Application Load Balancer (SSL termination)
  │
  ├── /api/* → EKS Cluster (API pods — NestJS)
  └── /*     → EKS Cluster (Web pods — Next.js)

EKS Cluster (Multi-AZ)
  ├── Namespace: goldbazaar-prod
  │   ├── web-deployment     (3 replicas, HPA: 3–10)
  │   ├── api-deployment     (3 replicas, HPA: 3–20)
  │   ├── worker-deployment  (2 replicas — BullMQ workers)
  │   └── scheduler          (1 replica — cron jobs)
  └── Namespace: goldbazaar-infra
      ├── redis (ElastiCache)
      └── monitoring (Prometheus + Grafana)

RDS Aurora PostgreSQL (Multi-AZ, read replicas)
ElastiCache Redis (cluster mode, Multi-AZ)
S3 (media, documents, exports)
SES (transactional email)
SNS + Lambda (push notifications)
CloudWatch (logs, metrics, alarms)
AWS WAF (DDoS, bot protection)
Secrets Manager (credentials, API keys)
```

### 10.1 Environment Configuration

```yaml
# Environment: Production
POSTGRES_URL: aurora-cluster-endpoint
REDIS_URL: elasticache-cluster-endpoint
JWT_SECRET: [Secrets Manager]
JWT_EXPIRY: 15m
REFRESH_TOKEN_EXPIRY: 30d
OTP_EXPIRY_MINUTES: 10
OTP_MAX_ATTEMPTS: 3
RAZORPAY_KEY_ID: [Secrets Manager]
TWILIO_SID: [Secrets Manager]
AWS_S3_BUCKET: goldbazaar-media-prod
MCX_API_KEY: [Secrets Manager]
RATE_LIMIT_TTL: 60
RATE_LIMIT_MAX: 100
```

---

## 11. SECURITY IMPLEMENTATION

### 11.1 Authentication Flow

```
Mobile → POST /auth/send-otp
  → Rate limit: 3 OTPs per 10 min per mobile
  → OTP: 6-digit, expires 10 min
  → Store bcrypt(otp) in Redis with TTL

Mobile → POST /auth/verify-otp
  → Compare hash
  → Max 3 attempts (lockout on 4th)
  → On success: issue JWT (15m) + Refresh Token (30d)
  → Store refresh token hash in DB (Session table)

Subsequent requests → Authorization: Bearer <jwt>
  → JWT guard validates signature + expiry
  → Role guard checks UserRole
  → Resource guard checks ownership
```

### 11.2 Rate Limiting Strategy

```typescript
// Per-endpoint rate limits
@Throttle({ short: { ttl: 1000, limit: 5 } })    // 5 req/sec
@Throttle({ medium: { ttl: 60_000, limit: 100 } }) // 100 req/min
@Throttle({ otp: { ttl: 600_000, limit: 3 } })    // 3 OTPs per 10 min

// IP-based global: 1000 req/15min via WAF
```

### 11.3 Data Encryption

```
At Rest:  RDS encryption (AES-256), S3 SSE-S3
In Transit: TLS 1.3 enforced on all endpoints
PII:      Customer mobile numbers AES-256 encrypted in DB
Documents: S3 pre-signed URLs (expire 1 hour), no public access
```

---

## 12. OBSERVABILITY

### 12.1 Logging (Winston + CloudWatch)

```typescript
// Structured JSON logging
logger.info('lead.created', {
  leadId, vendorId, customerId, serviceType,
  aiScore, routingTimeMs, timestamp
});

// Log levels: error > warn > info > debug
// Retention: error/warn → 90 days, info/debug → 30 days
```

### 12.2 Metrics (Prometheus)

```
goldbazaar_leads_created_total{service_type, city}
goldbazaar_leads_converted_total{vendor_type}
goldbazaar_api_request_duration_seconds{route, method, status}
goldbazaar_active_vendors_total{plan, city}
goldbazaar_otp_verification_rate{result}
```

### 12.3 Alerting

```
CRITICAL: API error rate > 5%       → PagerDuty (immediate)
CRITICAL: DB connection pool > 90%  → PagerDuty (immediate)
WARNING:  Lead routing latency > 2s → Slack (5 min)
WARNING:  Subscription churn > 10%  → Email (daily digest)
INFO:     New vendor approval needed → Slack (business hours)
```

---

## 13. MVP ROADMAP

### Phase 1 — MVP (Months 1–4)

**Month 1–2:**
- Core authentication (OTP + JWT)
- Vendor registration & approval flow
- Basic vendor profile pages
- Customer search & filter (city + service type)
- Enquiry submission (lead creation)
- Admin approval dashboard
- Basic notification system (SMS)

**Month 3–4:**
- Vendor dashboard (leads, analytics basics)
- Gold rate tracker (MCX integration)
- Gold loan calculator
- Subscription & Razorpay payment integration
- Vendor document upload & verification
- Customer enquiry tracking

**MVP Exit Criteria:**
- 100 vendors onboarded in 2 cities
- 500 customer enquiries/month
- Uptime > 99.5%
- < 2s page load (P95)

---

### Phase 2 — Growth (Months 5–9)

- AI lead scoring engine
- Trust Score Engine v1
- Fair lead distribution algorithm
- Advertisement management module
- Advanced vendor analytics & ROI dashboard
- Multi-branch support
- Gold savings scheme management
- Vendor comparison feature
- Customer saved vendors & schemes
- WhatsApp notification integration
- Mobile PWA optimisation
- 50+ city expansion
- Hallmark & NBFC verification API integrations
- Review & rating system

---

### Phase 3 — AI & Scale (Months 10–18)

- AI vendor recommendation engine
- Personalised customer homepage
- Smart advertisement optimisation (ML)
- Predictive gold rate insights
- Digital Gold vertical launch
- Gold Insurance vertical launch
- Multi-language support (Hindi, Tamil, Telugu, Marathi)
- Native mobile apps (React Native)
- Open API for NBFC integrations
- Marketplace analytics B2B product
- Enterprise vendor accounts (franchise chains)
- Gold Investment vertical (ETF, SGB)
- GoldBazaar Score (customer creditworthiness for gold loans)
```
