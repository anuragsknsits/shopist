# UI architecture and contribution guide

## Boundaries

- `src/app/`: route composition, lazy loading and route error recovery.
- `src/features/auth/`: authentication forms and their local state/validation.
- `src/pages/`: route-level screens; move larger domains into `features/<domain>/` when they grow.
- `src/components/ui/`: domain-independent, accessible building blocks (`Button`, `FormField`, `FormCard`, `ErrorBoundary`).
- `src/components/`: application navigation, session guards and chat.
- `src/api/`: the sole HTTP layer, RTK Query endpoints and cache invalidation.
- `src/redux/`: shared session/chat state. Keep transient form state local.
- `src/index.css`: Tailwind layers and shared visual primitives. Do not redefine Tailwind utilities.
- `deploy/`: production HTTP headers and static hosting configuration.
- `tests/e2e/`: browser regression tests, including narrow layouts.

Use composition rather than inheritance for UI. Keep API calls out of visual primitives, avoid a second server-state store, and add domain abstractions only when multiple real consumers need them. Existing role rules remain unchanged; the server must enforce authorization.

## Adding a form

```jsx
import { useState } from 'react';
import Button from '../../components/ui/Button';
import FormCard from '../../components/ui/FormCard';
import FormField from '../../components/ui/FormField';

export default function ExampleForm() {
  const [email, setEmail] = useState('');
  return <FormCard title="Email preferences">
    <form className="space-y-4" onSubmit={event => event.preventDefault()}>
      <FormField label="Email" name="email" type="email" autoComplete="email"
        required value={email} onChange={event => setEmail(event.target.value)} />
      <Button type="submit">Save</Button>
    </form>
  </FormCard>;
}
```

Replace the example submit handler with a domain mutation. Use native constraints for basic validation; provide inline `error` and `hint` on FormField for domain rules. Use `busy` on Button to prevent duplicate submissions. Use `as="textarea"` or `as="select"` for other controls. Never log submitted values. Backend password policy remains authoritative.

## Styling and accessibility

Tailwind 3 remains the styling framework, compiled locally with unused utilities removed. System fonts avoid remote font latency and privacy exposure. Reuse the `ui-*` styles rather than copying control classes. Use a single column by default, then `sm:`/`md:` breakpoints; give flex children `min-w-0`. Wrap large tables in a named scroll region. Use real labels, visible focus, semantic buttons and links, inline status/error messages, and 44px primary controls. Respect reduced motion. Do not disable browser zoom.

## Performance and release rules

Routes load on demand, with a visible loading state and recoverable chunk failure. Do not eagerly import all feature screens. Avoid new icon libraries and large dependencies for small features. A build's entry-bundle size is not a latency score: measure production LCP, INP and CLS with real devices and representative networks. Browser tests use mocked API responses and do not certify backend integration.

Run `npm run check`, `npm run test:e2e`, and `npm audit --audit-level=moderate` before release. Browser installation: `npx playwright install chromium webkit`. Browser tests exercise 320/390/768/1440px widths; real Android and iOS device checks are still required before a public release.

For an installed Edge fallback on Windows, set PLAYWRIGHT_CHANNEL=msedge before running the Chromium project. Default CI uses downloaded Chromium and WebKit.

