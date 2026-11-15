# Simulation handoff
The mission-control visualization lives inside `<div id="cesiumContainer">` in `index.html`.

Option A: use a separate hosted simulation URL in `config.js`:
`window.AESS_CONFIG = {SHEETS_API_URL:'...', SIMULATION_URL:'https://example.org/simulation/'};`

Option B: embed Cesium in the existing page and replace the placeholder markup with your Cesium canvas.
Listen for site changes:
```js
window.addEventListener('aess:sitechange', event => {
  const {name, latitude, longitude} = event.detail;
  console.log('Move your Cesium camera to', name, latitude, longitude);
});
```
Coordinate conventions: lunar lat/lon in degrees, consistent longitude direction and reference frame. Do not assume Earth terrain or Earth geocoding applies to the Moon.

3D Gallery: store GLB paths in `Landing_Sites.model_url` and the gallery will render them with model-viewer (internet required).

The Google Sheet's `Simulation_Data` and `Comparison` tabs are provided for your pipeline; scientific computations must be performed and validated separately.
