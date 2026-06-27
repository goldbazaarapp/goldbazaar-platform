/**
 * GoldBazaar – Vendor Onboarding Apps Script
 * ============================================
 * Handles GET submissions from vendor-onboarding-complete.html.
 * Saves vendor data to "Vendor Signups" sheet.
 *
 * HOW TO DEPLOY:
 *  1. Open your Google Sheet → Extensions → Apps Script
 *  2. Replace all existing code with this
 *  3. Deploy → Manage Deployments → Edit → New Version → Deploy
 *  4. Same web app URL — no HTML changes needed
 */

function doGet(e) {
  const out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);

  try {
    const p  = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── Route to the correct sheet ──────────────────────────────────────
    if (p.sheet === 'vendor') {
      const ws = getOrCreateVendorSheet(ss);
      // Sheet has auto-# in col A — write data starting from col B (column index 2)
      const lastRow = ws.getLastRow();
      ws.getRange(lastRow + 1, 2, 1, 13).setValues([[
        new Date(),
        p.mobile         || '',
        p.businessName   || '',
        p.ownerName      || '',
        p.category       || '',
        p.services       || '',
        p.city           || '',
        p.state          || '',
        p.pincode        || '',
        p.websiteUrl     || '',
        p.bannerFileName || '',   // ← Banner File Name (col L)
        '',                        // ← Banner Drive URL (col M — filled manually / future)
        p.status         || 'Application Submitted'  // ← col N
      ]]);
    } else if (p.sheet === 'Contact Enquiries') {
      // Sheet has auto-# in col A — write starting from col B (index 2)
      // Columns: B=Submitted At, C=Full Name, D=Phone Number, E=Type, F=City, G=Message, H=Mobile
      const ws = ss.getSheetByName('Contact Enquiries');
      if (!ws) throw new Error('Sheet not found: Contact Enquiries');
      const lastRow = ws.getLastRow();
      ws.getRange(lastRow + 1, 2, 1, 7).setValues([[
        new Date(),
        p.name   || '',
        p.mobile || '',
        p.type   || '',
        p.city   || '',
        p.message || '',
        p.mobile  || ''   // H = Mobile (same number)
      ]]);
    } else {
      // Generic sheet write for other sheets
      const ws = ss.getSheetByName(p.sheet);
      if (!ws) throw new Error('Sheet not found: ' + p.sheet);
      const skip = new Set(['sheet']);
      const row  = [new Date()];
      for (const k of Object.keys(p)) {
        if (!skip.has(k)) row.push(p[k]);
      }
      ws.appendRow(row);
    }

    out.setContent(JSON.stringify({ success: true }));
  } catch (err) {
    out.setContent(JSON.stringify({ success: false, error: err.message }));
  }
  return out;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getOrCreateVendorSheet(ss) {
  const name    = 'Vendor Signups';
  const headers = [
    'Submitted At','Mobile','Business Name','Owner Name','Category',
    'Services','City','State','Pincode','Website URL',
    'Banner File Name','Banner Drive URL','Status'
  ];
  let ws = ss.getSheetByName(name);
  if (!ws) {
    ws = ss.insertSheet(name);
    const hr = ws.getRange(1, 1, 1, headers.length);
    hr.setValues([headers]);
    hr.setFontWeight('bold');
    hr.setBackground('#1a1a1a');
    hr.setFontColor('#C9A84C');
    ws.setFrozenRows(1);
  }
  return ws;
}
