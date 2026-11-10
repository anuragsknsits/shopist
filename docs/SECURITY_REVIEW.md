# Frontend security review — 2026-11-10

## Scope and findings

Reviewed the UI source, dependency tree, authentication flow and proposed static-host configuration. This is not a backend penetration test or a certification of the deployed service.

The initial npm audit reported 12 findings (7 high, 5 moderate). Compatible transitive patches and the React Router 7.18.5 upgrade resolved the reported findings; the follow-up audit reported zero vulnerabilities. The lockfile was already modified before this work; dependency changes build on that existing state. Run the audit again in CI because advisory data changes.

Removed logging of contact form personal data. The contact form still has no backend endpoint and now states that clearly after submission. Removed navigation to unimplemented routes; added a not-found screen. Added production CSP, frame denial, MIME-sniffing protection, referrer restrictions and permissions policy. These headers take effect only when the supplied hosting configuration (or equivalent edge configuration) is deployed.

Existing safeguards retained: cookie-based credentials, CSRF bootstrap before writes, gateway origin checks, fetch redirect rejection, request timeout, no-store session/profile requests, disabled Redux DevTools, React text escaping and logout API-cache reset. Source inspection found no token persistence in browser storage or dangerous HTML injection. Client-side role filtering is a convenience, not authorization.

## Remaining release checks

- Verify server authorization on every protected endpoint, including CLIENT-only routes; preserve current role mapping until business requirements say otherwise.
- Verify Secure/HttpOnly/SameSite cookie attributes, CSRF validation, session expiry and revocation, rate limiting, credentialed CORS, and password policy on the backend.
- Password mutation arguments exist transiently in client memory; never attach action-payload logging or sensitive telemetry.
- Confirm CSP, cache headers, HTTPS/HSTS and API routing on the actual production ingress/CDN. Scan and pin container images by digest in the release pipeline.
- Dashboard/client data and several action buttons are existing placeholders. Contact delivery remains unimplemented; this work does not introduce backend contracts.
- Browser regression tests mock API responses. Full login/logout, profile and password integration require the running gateway and auth service.

References: [OWASP CSP guidance](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html), [React Router migration compatibility](https://api.reactrouter.com/v7/modules/react-router-dom.html).

## Verification results

Eight unit tests passed and the production build passed after the main refactor. Responsive browser tests were added for Chromium/WebKit, but local execution was blocked by memory exhaustion and browser/process launch failures (spawn UNKNOWN); these checks are not verified locally. Docker validation was blocked because the Docker engine was stopped. CDN deployment, response-header verification and live backend integration remain release tasks.

