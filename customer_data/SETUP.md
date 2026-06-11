# GoldBazaar — Google Sheet Setup (One-Time, ~5 minutes)

All form submissions (Get in Touch + Vendor Onboarding) save directly
to a Google Sheet. No server. Works when opened locally AND on GitHub Pages.

---

## Step 1 — Open your Google Sheet

Go to: https://docs.google.com/spreadsheets/d/1Lz3DoJsxCubkkgR07uor6Jj6w4wJqEu1Hd9XOI5A10M/edit

Click **Extensions → Apps Script**

---

## Step 2 — Replace the Script

1. Delete everything in the Apps Script editor
2. Open `customer_data/Code.gs` from this folder
3. Copy all contents → paste into Apps Script
4. Click **Save** (floppy disk icon or Ctrl+S)

---

## Step 3 — Deploy as Web App

1. Click **Deploy → New deployment** (or Manage deployments → New version)
2. Click the gear ⚙ → **Web app**
3. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy** → copy the Web app URL

---

## Step 4 — Update FORM_ENDPOINT

Both HTML files already have the correct URL from the last deployment:

```
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxUihDEpvh7YYCmzudluPM0F3v3HEYDJNmosc1-D3ajGQYhEfvEX4GVJrt4Rx_1E1l1Bw/exec';
```

If you deployed a new version, replace this URL in both:
- `index.html`
- `vendor-onboarding-complete.html`

---

## Step 5 — Test Locally

Open `index.html` → fill "Get in Touch" → click Send.
Check your Google Sheet — a new row should appear instantly in **Contact Enquiries**.

---

## Notes

- The script uses `doGet` (not `doPost`) — this is what makes it work from a local file.
- Two sheet tabs are auto-created on first submission: **Contact Enquiries** and **Vendor Signups**.
- No server needed. Works by opening index.html directly.
