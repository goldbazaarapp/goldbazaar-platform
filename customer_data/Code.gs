function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById('1Lz3DoJsxCubkkgR07uor6Jj6w4wJqEu1Hd9XOI5A10M');
    const p  = e.parameter;

    if (p.sheet === 'contact') {
      let ws = ss.getSheetByName('Contact Enquiries');
      if (!ws) {
        ws = ss.insertSheet('Contact Enquiries');
        ws.appendRow(['#', 'Submitted At', 'Full Name', 'Mobile', 'Type', 'City', 'Message']);
        ws.getRange(1,1,1,7).setFontWeight('bold').setBackground('#C9A84C').setFontColor('#000000');
        ws.setFrozenRows(1);
        ws.setColumnWidths(1, 7, [40, 160, 160, 120, 220, 120, 300]);
        ws.getRange('D:D').setNumberFormat('@'); // Mobile as plain text
      }
      const newRow = ws.getLastRow() + 1;
      ws.getRange(newRow, 1, 1, 7).setValues([[
        ws.getLastRow(),
        new Date().toLocaleString('en-IN'),
        p.name || '', p.mobile || '', p.type || '', p.city || '', p.message || ''
      ]]);
      ws.getRange(newRow, 4).setNumberFormat('@'); // Force mobile cell as text
      return ContentService.createTextOutput('ok | saved contact: ' + p.name + ' / ' + p.mobile);
    }

    if (p.sheet === 'vendor') {
      let ws = ss.getSheetByName('Vendor Signups');
      if (!ws) {
        ws = ss.insertSheet('Vendor Signups');
        ws.appendRow(['#','Registered At','Mobile','Business Name','Owner Name','Category','Services','City','State','Pincode','Status']);
        ws.getRange(1,1,1,11).setFontWeight('bold').setBackground('#C9A84C').setFontColor('#000000');
        ws.setFrozenRows(1);
        ws.setColumnWidths(1,11,[40,160,120,180,150,180,250,120,120,80,140]);
        ws.getRange('C:C').setNumberFormat('@'); // Mobile as plain text
      }
      const newRow = ws.getLastRow() + 1;
      ws.getRange(newRow, 1, 1, 11).setValues([[
        ws.getLastRow(),
        new Date().toLocaleString('en-IN'),
        p.mobile||'', p.businessName||'', p.ownerName||'',
        p.category||'', p.services||'', p.city||'',
        p.state||'', p.pincode||'', p.status||''
      ]]);
      ws.getRange(newRow, 3).setNumberFormat('@'); // Force mobile cell as text
      return ContentService.createTextOutput('ok | saved vendor: ' + p.mobile);
    }

    return ContentService.createTextOutput('no-match | received params: ' + JSON.stringify(p));

  } catch(err) {
    return ContentService.createTextOutput('ERROR: ' + err.message);
  }
}
