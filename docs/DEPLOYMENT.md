# Deployment and CDN

From `C:\finworkspace\shopist`, run:

```powershell
docker compose up -d --build
docker compose ps
docker image inspect shopist:production --format '{{.Size}}'
```

Open http://localhost:3000. Compose forwards API requests to the existing gateway published on port 8080 through `host.docker.internal`. Start the gateway, Eureka, auth service and its database for working authentication. `/chat` still requires a backend route that is not currently configured.

The Dockerfile has three stages: cached Node 22 Alpine dependencies (`npm ci`), Vite compilation, and unprivileged Nginx Alpine runtime. Only compiled `dist/` assets and server configuration enter the final image; Node, npm, source and node_modules stay in build stages. BuildKit caches package downloads and reuses the dependency layer until the lockfile changes. The runtime image target is less than 200,000,000 bytes; inspect `.Size` above for the actual local image size, not the builder cache or compressed download size.

Compose binds only to loopback, defaults to UI port 3000, and drops Linux capabilities. Override `UI_PORT`, `GATEWAY_HOST` and `GATEWAY_PORT` via shell environment or an untracked `.env` file. These gateway settings are runtime Nginx configuration, so backend address changes require container recreation, not a UI rebuild. The browser always calls its own origin.

For production, use `shopist:production` behind an HTTPS ingress. Attach it to the gateway's Docker network and set `GATEWAY_HOST` to the gateway service DNS name (image default: `gateway-service`) and `GATEWAY_PORT` (default: `8080`). The gateway hostname must resolve at startup. Nginx proxies `/auth`, `/cart`, `/chat` and `/csrf-token`, preserves cookies and CSRF headers, and disables caching for API responses. Unknown frontend routes fall back to `index.html`; missing hashed assets return 404. `/healthz` checks static server health, independently of backend availability.

Terminate HTTPS at the production ingress; secure authentication cookies require HTTPS in deployed environments. Set HSTS at that ingress after validating TLS. This internal HTTP container does not emit HSTS. No production deployment or TLS endpoint is provisioned by Compose.

Stop the local UI with `docker compose down`.

Local validation on 2026-11-10: the production image measured **60,518,121 bytes (60.5 MB)**. Container health and `nginx -t` passed; runtime UID is 101 and Node/npm are absent. `/`, `/login`, `/healthz` returned 200; a missing asset returned 404. Gateway proxying returned 200 for `/csrf-token` and 503 for `/auth/verifyToken` while auth-service was not running. Full login still needs the auth backend and database. Image size can change as base image tags update; CI enforces the 200 MB limit.

For CDN acceleration, put the public UI hostname behind a CDN and keep the same-origin gateway routes uncached. Cache only fingerprinted `/assets/*` for one year with `immutable`. Revalidate HTML and non-fingerprinted public files. Retain old hashed assets during deployments so existing browser tabs can still load deferred routes. Enable Brotli at the edge; Nginx provides gzip. Do not cache personalized responses or responses carrying Set-Cookie. Deploy HTML atomically after assets.

The bundled strict CSP assumes same-origin scripts, styles and API calls. For separate `VITE_GATEWAY_URL` hosting, explicitly allow that HTTPS origin in `connect-src` and configure credentialed CORS on the gateway. Environment variables prefixed `VITE_` are public bundle values, never secrets. Avoid a runtime CSS/React CDN dependency; host the versioned build artifacts through your CDN instead.

No CDN account or production deployment was configured by this change. Validate response headers, HTTPS, deep links, API routing and cache behavior on the actual host. See [Vite build guidance](https://vite.dev/guide/build) and [OWASP HTTP headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).
