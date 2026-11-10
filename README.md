# Shopist

Shopist is a React client portal. Vite serves and builds the app. React Redux connects it to Redux Toolkit, and RTK Query manages requests to the Finworkspace gateway.

## Local development

Use Node.js 22 LTS (22.12 or newer) or Node.js 20.19 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The development build uses `http://localhost:8080` as the gateway. Start the gateway, Eureka and auth service from the Finworkspace checkout to exercise login and profile features. Use the same hostname for the UI and gateway so the browser can send the backend's SameSite cookies.

If the browser console shows `bundle.js`, `__webpack_require__`, or `hot-update.js`, the tab is still running an old Create React App bundle. Stop any old CRA server, run `npm run dev` from this checkout, and open the page in a fresh tab or hard-refresh it with Ctrl+Shift+R. For a built preview, run `npm run build` and then `npm run preview` to serve `dist/`.

## Commands

| Command | Result |
| --- | --- |
| `npm run dev` or `npm start` | Run the Vite development server on port 3000. |
| `npm test` | Run the Vitest suite once. |
| `npm run build` | Write the production bundle to `dist/`. |
| `npm run preview` | Preview the built assets locally. |

Production uses the UI origin by default. Serve the UI over HTTPS and route `/csrf-token` and `/auth/**` to the gateway before the SPA fallback. To use a separate gateway, set `VITE_GATEWAY_URL` before building and configure credentialed CORS for the UI origin. If migrating an existing environment, rename `REACT_APP_GATEWAY_URL` to `VITE_GATEWAY_URL`. Vite includes this value in the browser bundle.

See the [UI knowledge graph](KNOWLEDGE_GRAPH.md) for route ownership, API endpoints and session behavior.
