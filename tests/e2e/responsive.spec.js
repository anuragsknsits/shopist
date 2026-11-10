import { test, expect } from '@playwright/test';
const user = { email: 'a-very-long-client-email-address@example.test', role: 'CLIENT' };
async function mockApi(page, authenticated = false) {
  await page.route('**/auth/**', route => route.fulfill({ status: authenticated ? 200 : 401, contentType: 'application/json', body: JSON.stringify(authenticated ? user : {}) }));
}
for (const width of [320, 390, 768, 1440]) {
  test(`public pages fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await mockApi(page);
    for (const path of ['/', '/login', '/signup', '/forgot-password', '/contact', '/aboutus']) {
      await page.goto(path);
      await expect(page.locator('main h1, main h2').first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    await page.goto('/login');
    await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('autocomplete', 'current-password');
  });
  test(`authenticated pages and navigation fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await mockApi(page, true);
    for (const path of ['/dashboard', '/profile', '/clients', '/change-password']) {
      await page.goto(path);
      await expect(page.locator('main h1, main h2').first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
    if (width < 768) {
      await page.getByRole('button', { name: 'Navigation', exact: true }).click();
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
      await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
    }
    await page.getByRole('button', { name: /^Hi / }).click();
    await expect(page.getByRole('navigation', { name: 'Account' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation', { name: 'Account' })).toBeHidden();
    await expect(page.getByRole('button', { name: /^Hi / })).toBeFocused();
  });
}
test('chat fits a narrow screen and unknown routes have a fallback', async ({page}) => {
  await page.setViewportSize({width:320,height:568});
  await mockApi(page);
  await page.goto('/');
  await page.getByRole('button', {name: /Chat/}).click();
  await expect(page.getByLabel('Chat message')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/missing');
  await expect(page.getByRole('heading', {name:'Page not found'})).toBeVisible();
});
