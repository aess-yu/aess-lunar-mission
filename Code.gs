/** AESS YU Lunar Mission public read-only data API.
 * Paste into Extensions > Apps Script in a NEW spreadsheet containing public data only.
 * Run setupDatabase once, then Deploy > New deployment > Web app.
 */
const AESS_TABS = ['Settings','Team','Landing_Sites','Simulation_Data','Comparison','Report'];
const AESS_HEADERS = {
  Settings:['key','value'],
  Team:['name','role'],
  Landing_Sites:['id','name','latitude','longitude','description','sun_elevation','earth_elevation','power_window','dte_window','terrain','suitability','model_url'],
  Simulation_Data:['site_id','timestamp_utc','sun_elevation_deg','sun_azimuth_deg','earth_elevation_deg','earth_azimuth_deg','solar_visible','earth_visible','source'],
  Comparison:['metric','site_alpha','site_beta','site_gamma','units','source'],
  Report:['section','content']
};
function setupDatabase() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  AESS_TABS.forEach(name=>{
    let sheet=ss.getSheetByName(name);
    if(!sheet) sheet=ss.insertSheet(name);
    if(sheet.getLastRow()===0) {
      const headers=AESS_HEADERS[name];
      sheet.getRange(1,1,1,headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#0a4256').setFontColor('#ffffff');
      sheet.autoResizeColumns(1,headers.length);
    }
  });
  return 'Database tabs ready. Import CSV templates to populate public demo data.';
}
function readTable_(sheet) {
  if (!sheet || sheet.getLastRow()<2) return [];
  const values=sheet.getDataRange().getDisplayValues();
  const headers=values.shift().map(h=>h.trim());
  return values.filter(row=>row.some(cell=>cell!==''))
    .map(row=>Object.fromEntries(headers.map((h,i)=>[h,row[i]||''])));
}
function readAll_() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const out={};
  AESS_TABS.forEach(name=>out[name]=readTable_(ss.getSheetByName(name)));
  return out;
}
function doGet(e) {
  const params=(e&&e.parameter)||{};
  const callback=String(params.callback||'');
  const response=readAll_();
  // A script-tag JSONP endpoint works with a static GitHub Pages frontend.
  // The dataset is PUBLIC. Never store credentials or private user data here.
  if(callback) {
    if(!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(callback)) {
      return ContentService.createTextOutput('/* invalid callback */')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(callback+'('+JSON.stringify(response)+');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
function testDatabase() {
  const result=readAll_();
  Logger.log(JSON.stringify(Object.fromEntries(
    Object.entries(result).map(([k,v])=>[k,v.length]))));
}
