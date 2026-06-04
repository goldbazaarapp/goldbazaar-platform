# GoldBazaar — Project Setup Guide

## Step 1: Place Your Video Files

The landing page (`index.html`) expects videos at:
```
GoldBazaar/
└── videos/
    ├── GB_1.mp4   → Scene 1: Bharat Gold Network
    ├── GB_2.mp4   → Scene 2: Golden Universe
    ├── GB_3.mp4   → Scene 3: Marketplace Intelligence City
    └── GB_4.mp4   → Scene 4: GoldBazaar Reveal
```

**Action:** Create a `videos/` folder inside the `GoldBazaar` project folder, then copy your 4 uploaded MP4 files into it, named exactly as above.

## Step 2: View the Landing Page

Open `index.html` in any modern browser. For best video performance, serve it via a local web server:

```bash
# Option A — Python (no install needed)
cd GoldBazaar
python -m http.server 3000
# Open: http://localhost:3000

# Option B — Node.js
npx serve .
```

## Step 3: Next.js Project Setup

```bash
# Create monorepo
mkdir goldbazaar && cd goldbazaar
npx create-next-app@latest apps/web --typescript --tailwind --app --src-dir
cd apps/web

# Install dependencies
npm install @tanstack/react-query zustand gsap
npm install @radix-ui/react-dialog @radix-ui/react-select lucide-react
npm install class-variance-authority clsx tailwind-merge

# Copy videos to public folder
mkdir public/videos
cp /path/to/GB_*.mp4 public/videos/
```

## Step 4: Backend Setup

```bash
mkdir apps/api && cd apps/api
nest new . --package-manager npm

npm install @nestjs/jwt @nestjs/passport passport-jwt
npm install @prisma/client prisma
npm install @nestjs/bull bull ioredis
npm install class-validator class-transformer

npx prisma init
# Paste schema from ARCHITECTURE.md → prisma/schema.prisma
npx prisma migrate dev --name init
```

## Step 5: Environment Variables

```env
# apps/api/.env
DATABASE_URL="postgresql://user:pass@localhost:5432/goldbazaar"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-key-min-32-chars"
JWT_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="30d"
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_FROM_NUMBER=""
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET="goldbazaar-media"
AWS_REGION="ap-south-1"
MCX_API_KEY=""
NODE_ENV="development"
PORT=4000
```

```env
# apps/web/.env.local
NEXT_PUBLIC_API_URL="http://localhost:4000/v1"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
NEXT_PUBLIC_GOOGLE_MAPS_KEY=""
```

## Deliverables Summary

| File | Description |
|------|-------------|
| `index.html` | Production-ready landing page (all 14 sections) |
| `ARCHITECTURE.md` | Complete enterprise architecture spec |
| `PORTAL_UX_FLOWS.md` | All 4 portal UX flows & screen designs |
| `SETUP.md` | This file |

## Architecture Deliverables Included

✅ Information Architecture  
✅ Sitemap (complete)  
✅ User Journeys (3 primary flows)  
✅ Navigation Structure (all 4 portals)  
✅ UX Wireframes (text spec for all screens)  
✅ Design System (colors, type, tokens)  
✅ Database Schema (complete Prisma schema)  
✅ API Specifications (all endpoints)  
✅ RBAC Matrix (full permission table)  
✅ Folder Structure (monorepo)  
✅ Frontend Architecture (Next.js 15 + React Query + Zustand)  
✅ Backend Architecture (NestJS modules + key services)  
✅ Deployment Architecture (AWS EKS)  
✅ Security Implementation (auth, encryption, rate limiting)  
✅ Observability (logging, metrics, alerting)  
✅ MVP Roadmap (Phase 1 — 4 months)  
✅ Phase 2 Growth Roadmap (Months 5–9)  
✅ Phase 3 AI Roadmap (Months 10–18)  
