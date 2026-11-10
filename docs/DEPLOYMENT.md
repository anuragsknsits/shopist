# Deployment and CDN

`npm run build` emits `dist/`. The Dockerfile builds once and serves static assets from an unprivileged Nginx process on port 8080. It no longer starts Vite's development server. Run `docker build -t shopist .` and `docker run --rm -p 8081:8080 shopist` to check static serving. Terminate HTTPS at the production ingress.

Route `/auth/**`, `/chat/**` and `/csrf-token` to the gateway BEFORE the static UI origin. Nginx deliberately returns 502 for these paths if requests incorrectly reach the UI container. Forward cookies and CSRF headers; never cache these paths. Configure backend secure/HttpOnly/SameSite cookies and authorization. Set HSTS at the HTTPS ingress after verifying HTTPS works for the intended host; this internal HTTP container does not emit HSTS.

For CDN acceleration, put the public UI hostname behind a CDN and keep the same-origin gateway routes uncached. Cache only fingerprinted `/assets/*` for one year with `immutable`. Revalidate HTML and non-fingerprinted public files. Retain old hashed assets during deployments so existing browser tabs can still load deferred routes. Enable Brotli at the edge; Nginx provides gzip. Do not cache personalized responses or responses carrying Set-Cookie. Deploy HTML atomically after assets.

The bundled strict CSP assumes same-origin scripts, styles and API calls. For separate `VITE_GATEWAY_URL` hosting, explicitly allow that HTTPS origin in `connect-src` and configure credentialed CORS on the gateway. Environment variables prefixed `VITE_` are public bundle values, never secrets. Avoid a runtime CSS/React CDN dependency; host the versioned build artifacts through your CDN instead.

No CDN account or production deployment was configured by this change. Validate response headers, HTTPS, deep links, API routing and cache behavior on the actual host. See [Vite build guidance](https://vite.dev/guide/build) and [OWASP HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).
