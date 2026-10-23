# WellnessCompass frontend

Requires Node 24.22.1 (see the repository .node-version). React 18 application, built with Vite; Create React App was replaced to remove its unsupported vulnerable build chain.

```sh
npm ci
npm start       # http://localhost:3000; same origin expected by the existing backend
npm test        # local tests with mocked API/graphics; no production backend needed
npm run build  # static output in build/, matching the previous deployment directory
```

Serve `build/` with SPA fallback to `index.html` for direct route navigation. Keep public assets in `public/`; index.html is the Vite entry point. JSX files use .jsx; extensionless imports continue to work.

The API URL remains the existing http://localhost:3500. Production hosting and API configuration have not been identified; source/build verification is not a deployment. No credentials or real health records are needed for tests.

Security maintenance: React Router 7.18.4 fixes advisories affecting the old v6 line while retaining the declarative React 18 APIs used here. Plotly 4.1.2 includes the MapLibre sanitizer security fix; chart titles/layouts use its current schema. Tests exercise all chart toggles using synthetic data and mock graphics/API access.

For the real chart renderer smoke check, run `npm start` and open http://localhost:3000/test/chart-smoke.html. It renders bar, line and pie charts from synthetic constants and checks their SVG output/title without contacting the API. The test page is not part of the production build.
