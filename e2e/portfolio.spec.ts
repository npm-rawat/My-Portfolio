import { expect, test } from '@playwright/test';

test('opens the work section and demo on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Anupam\s*Rawat/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try the Angular demo' })).toBeInViewport();
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeInViewport();
  await page.getByRole('link', { name: 'Read case study: Stock Count Workbench' }).click();
  await expect(page.getByRole('heading', { name: 'Stock Count Workbench', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Technical decisions' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole('link', { name: 'Try the Angular demo' }).click();
  await expect(page.getByRole('heading', { name: 'Zone B cycle count' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('lists work, keeps a case study on reload, and restores the work index on back', async ({ page }) => {
  await page.goto('/#/work');
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(6);
  await page.getByRole('link', { name: 'Broadband Network Maintenance Platform', exact: true }).click();
  await expect(page).toHaveURL(/#\/work\/bnmp$/);
  await expect(page).toHaveTitle('Broadband Network Maintenance Platform | Anupam Rawat');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'My contribution' })).toBeVisible();
  await expect(page.getByText('Assistant message lifecycle')).toBeVisible();
  await expect(page.getByText('Synthetic example', { exact: true })).toBeVisible();
  await expect(page.getByText('WebSocket chunks', { exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Work', level: 1 })).toBeVisible();
  await page.goto('/#/work/missing-project');
  await expect(page.getByRole('heading', { name: 'Project not found' })).toBeVisible();
  await page.getByRole('link', { name: 'Browse all projects' }).click();
  await expect(page).toHaveURL(/#\/work$/);
});

test('redirects the previous explore link to selected work', async ({ page }) => {
  await page.goto('/#/#explore');
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeInViewport();
});

test('keeps the portfolio static for returning desktop visitors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => localStorage.setItem('ar-portfolio-motion-off', 'false'));
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Anupam Rawat', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Motion', exact: true })).toHaveCount(0);
  await expect(page.locator('.portrait-frame img')).toHaveCSS('transform', 'none');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeInViewport();
  await expect(page.locator('.section-rule').first()).toHaveCSS('transform', 'none');
});

test('opens engineering details with the keyboard and keeps case-study links usable', async ({ page }) => {
  await page.goto('/');
  const section = page.getByRole('region', { name: 'How I engineer' });
  const integration = section.locator('summary').filter({ hasText: 'Real-time integration' });
  const story = section.getByRole('link', { name: 'Read the assistant streaming case study' });
  await expect(story).toBeHidden();
  await integration.focus();
  await page.keyboard.press('Enter');
  await expect(story).toBeVisible();
  await expect(section.getByText('REST APIs, WebSockets')).toBeVisible();
  await expect(section.getByRole('link', { name: 'Read the stock count case study' })).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(story).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/work\/bnmp$/);
});

test('slides the active section to the left and follows browser history', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const active = nav.locator('[aria-current="location"]');
  await expect(active).toHaveText('Home');

  await nav.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(active).toHaveText('Work');
  await expect(nav.getByRole('link').first()).toHaveText('Work');
  await expect(page.getByRole('heading', { name: 'Work', level: 1 })).toBeVisible();

  await nav.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(active).toHaveText('Experience');
  await expect(page).toHaveURL(/#\/#experience$/);
  await page.goBack();
  await expect(active).toHaveText('Work');

  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(active).toHaveText('Contact');
  await page.reload();
  await expect(nav.getByRole('link').first()).toHaveText('Contact');

  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(active).toHaveText('Home');
});

test('reorders the links without animation on a narrow screen with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/work/bnmp');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link').first()).toHaveText('Work');
  await nav.getByRole('link', { name: 'Home', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(nav.getByRole('link').first()).toHaveText('Home');
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toBeFocused();
  expect(await nav.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
