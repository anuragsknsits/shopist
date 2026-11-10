# Shopist UI knowledge graph

```mermaid
flowchart LR
    Vite["Vite + index.html"] -->|loads| Boot
    Boot["main.jsx"] -->|starts| Store["Redux Toolkit store + RTK Query middleware"]
    Boot -->|mounts| App["App + React Router"]
    App -->|renders| Public["Home, about, contact, login, signup, password reset"]
    App -->|checks session and role via ProtectedRoute| Private["Dashboard, profile, password change, clients"]
    Public -->|uses auth and chat hooks| Store
    Private -->|uses auth and profile hooks| Store
    Store -->|runs| API["RTK Query endpoints for auth, roles, profile and chat"]
    API -->|uses| HTTP["Credentialed fetchBaseQuery with CSRF bootstrap"]
    API -->|updates| State["RTK Query cache, auth and chat slices"]
    State -->|provides session and role| App
    HTTP -->|GET /csrf-token before writes| Gateway["gateway-service · 8080"]
    HTTP -->|/auth/** with browser cookies| Gateway
    Gateway -->|resolves service| Eureka["eureka-server · 8761"]
    Gateway -->|forwards /auth/**| Auth["auth-service · 8081"]
    Auth -->|registers| Eureka
    Auth -->|stores users and roles| DB[(MySQL)]
    Gateway -.->|configured /cart route| Cart["cart-service · source unavailable"]
    HTTP -.->|/chat/send with no matching route| Chat["Chat backend · unresolved"]
    Product["Shopikart product fixtures · /api/allProduct"]
```

## Code and API edges

| UI node | Dependency or API |
| --- | --- |
| [Entry point](src/main.jsx) → [Redux store](src/redux/store.js) | Provides the store to React Redux and initiates session verification. |
| [Login](src/components/auth/Login.jsx) → [RTK Query API](src/api/shopApi.js) | `POST /auth/login`, then `GET /auth/verifyToken` to confirm the cookie. The same verification endpoint restores the session on page load. |
| [Signup](src/components/auth/SignUp.jsx), [password reset](src/components/auth/ForgetPassword.jsx), [password change](src/components/auth/ChangePassword.jsx) and [app shell](src/App.jsx) → RTK Query mutations | `POST /auth/register`, `POST /auth/forgot-password`, `POST /auth/change-password` and `POST /auth/logout`. |
| [Profile](src/pages/Profile.jsx) → RTK Query profile endpoints | `GET /auth/profile` and `PUT /auth/profile`. A successful write invalidates the cached profile. |
| RTK Query roles endpoint | `GET /auth/roles`. |
| [Home](src/pages/Home.jsx) → [chatbot](src/components/Chatbot.jsx) → RTK Query chat mutation | `POST /chat/send`. No matching gateway route was found. |
| [Auth slice](src/redux/store.js) → [route guard](src/components/ProtectedRoute.jsx) | Waits for session verification, then gates access using authentication and, for `/clients`, the `CLIENT` role. API authorization belongs to the backend. |

## First request and cookie lifecycle

1. On load, the UI checks `GET /auth/verifyToken`. The login form and protected routes wait for that check to settle.
2. Before login and every other write, the [RTK Query base query](src/api/shopApi.js) waits for `GET /csrf-token` at the gateway root. The browser accepts the server-issued cookie and the client sends the returned masked token as `X-XSRF-TOKEN`. Concurrent writes can share an in-flight token request. A failed token request stops the write.
3. The auth service sets the `HttpOnly; Secure; SameSite=Strict` authentication cookie. The UI verifies the cookie with `GET /auth/verifyToken` before reporting login success. Logout clears the UI session and API cache after the server confirms it. A later write obtains the currently valid CSRF token again.

## Deployment and backend controls

- [Quality workflow](.github/workflows/quality.yml) builds the runtime image and rejects sizes over 200,000,000 bytes after the existing UI checks.

- [Dockerfile](Dockerfile): cached Node 22 Alpine dependencies → Vite build → unprivileged Nginx Alpine production image. Only `dist/` and Nginx configuration enter the runtime; health check uses `/healthz`.
- [compose.yaml](compose.yaml): `shopist:production` on `127.0.0.1:3000`, configurable with `UI_PORT`. Defaults to the Docker Desktop host gateway at `host.docker.internal:8080`; override `GATEWAY_HOST` and `GATEWAY_PORT` for other deployments.
- [Nginx template](deploy/nginx.conf): entrypoint substitutes gateway environment variables; `/auth`, `/cart`, `/chat` and `/csrf-token` proxy without shared caching, other routes use the SPA fallback. Runtime defaults to `gateway-service:8080` outside Compose. TLS terminates at the production ingress. See [deployment instructions](docs/DEPLOYMENT.md).

- Development defaults to `http://localhost:8080`. Use the same host name for the UI and gateway. Production defaults to same-origin HTTPS. Route `/csrf-token` and `/auth/**` to the gateway before applying the SPA fallback. Set `VITE_GATEWAY_URL` at build time for a separate gateway origin and keep both origins on the same site for the existing Strict cookie policy.
- The gateway currently allows credentialed CORS for any origin. Before production exposure, restrict this to explicit trusted origins, or remove cross-origin access for a same-origin deployment. Keep auth and CSRF responses out of shared caches.
- Gateway public-route checks use substring matching. Use exact method and path matchers. The auth service ignores several public paths at the filter-chain level and returns `401` for access denial. Keep public routes in the security chain, explicitly require authentication for protected routes, and return `403` for CSRF or authorization failures.
- Enable server-side method security for role and profile checks, verify user-level resource ownership, and keep internal services private. Verify that both Spring CSRF filters accept the same masked header and cookie pair, including after login and logout.
- Verify in a fresh browser profile that a single login submission succeeds, a reload restores the session, logout clears it, and the first write after logout obtains a fresh token. Confirm denied access in the server-side authorization tests.

Backend source and existing project graphs are under [Finworkspace](../KNOWLEDGE_GRAPH.md). See [Spring Security WebFlux CSRF](https://docs.spring.io/spring-security/reference/reactive/exploits/csrf.html) and the [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
