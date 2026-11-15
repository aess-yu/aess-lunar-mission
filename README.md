# AESS YU — Lunar Mission Browser

## Quick start
1. Upload all files and the `assets` folder to a public GitHub repository. Settings → Pages → Deploy from branch → main → root.
2. The site works immediately with `data.json` (example content, no invented science).
3. To edit locally, change `data.json`, then commit it. Site data updates on next page load.
4. For Google Sheets editing: create tabs `Settings`, `Team`, `Landing_Sites`, `Simulation_Data`, `Comparison`, `Report` and paste the corresponding CSVs from `sheet-templates/` into each tab (File → Import, or copy/paste).
5. In Google Sheets open Extensions → Apps Script; paste `Code.gs`. Deploy → New deployment → Web app → Execute as me → Who has access: Anyone. Authorize, copy the URL ending in `/exec`.
6. Put that URL in `config.js` as `SHEETS_API_URL`. Commit `config.js`. Reload the website. The status badge shows Google Sheets when connected.
7. Do not store secrets, credentials or private member data in these sheets. The API is publicly readable.

## Add the simulation
- Easiest: host your simulation as a separate HTML page and set `SIMULATION_URL` in `config.js`; it appears as an iframe in Mission Control.
- For direct Cesium integration, replace the contents of `#cesiumContainer` in `index.html` and load CesiumJS there. See `INTEGRATION.md`.
- The selected site is exposed as `window.aessSelectedSite` and triggers a `aess:sitechange` event with `event.detail` containing the selected site object.

## Add 3D site models
- Put GLB files in `assets/models/` (create the folder), and enter relative paths like `assets/models/site-alpha.glb` in each site's `model_url` field (or Sheet column).
- The gallery uses Google's `<model-viewer>` web component from CDN for GLB files. Requires internet. Without a model, it shows an explicit placeholder.

## Audio
- Add a licensed audio clip to `assets/armstrong.mp3`. Browsers require the user to click Play. Do not assume the slogan is a historical recording.

## Notes
- Chat is a clearly marked scripted demo, NOT a connected AI model.
- Scientific metrics are blank until populated with validated values and timestamps.
- GitHub Pages is static hosting. Do not put API keys in the frontend.
- The local edit panel is only a convenience: it downloads a new `data.json` for you to upload; it does not write to GitHub or Google Sheets.
