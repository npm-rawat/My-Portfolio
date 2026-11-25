import { expect, test } from '@playwright/test';

test('filters the list and validates a variance before saving', async ({ page }) => {
  await page.goto('/#/workbench');
  await page.getByLabel('Search', { exact: true }).fill('3812');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.getByRole('button', { name: /Shielded sensor cable/ })).toBeVisible();
  await page.getByRole('combobox', { name: 'Bin', exact: true }).selectOption('B-03');
  await expect(page.getByText('No items match these filters.')).toBeVisible();
  await page.getByRole('combobox', { name: 'Bin', exact: true }).selectOption('B-02');
  await page.getByLabel('Counted quantity', { exact: true }).fill('31');
  await page.getByRole('button', { name: 'Save count' }).click();
  await expect(page.getByRole('alert')).toContainText('Enter a reason');
  await page.getByLabel('Variance reason').fill('Four units set aside for inspection.');
  await page.getByRole('button', { name: 'Save count' }).click();
  await expect(page.getByRole('row', { name: /Shielded sensor cable/ })).toContainText('-4');
  await page.reload();
  await expect(page.getByLabel('Variance reason')).toHaveValue('Four units set aside for inspection.');
  await expect(page.getByRole('listitem').filter({ hasText: 'EL-3812 counted at 31' })).toBeVisible();
});

test('checks all items, returns a submission, then approves and locks the count', async ({ page }) => {
  await page.goto('/#/workbench');
  const submit = page.getByRole('button', { name: 'Submit for review' });
  await expect(submit).toBeDisabled();
  const fixtures = [
    ['Shielded sensor cable', '35'], ['Panel mount fuse holder', '62'],
    ['M12 proximity sensor', '24'], ['Industrial relay module', '18'],
  ];
  for (const [name, quantity] of fixtures) {
    await page.getByRole('button', { name: new RegExp(name) }).click();
    await page.getByLabel('Counted quantity', { exact: true }).fill(quantity);
    await page.getByRole('button', { name: 'Save count' }).click();
  }
  await submit.click();
  await expect(page.getByRole('status')).toHaveText('In review');
  await page.getByRole('button', { name: 'Return for recount' }).click();
  await expect(page.getByRole('status')).toHaveText('In progress');
  await submit.click();
  await page.getByRole('button', { name: 'Approve count' }).click();
  await expect(page.getByRole('status')).toHaveText('Approved');
  await expect(page.getByRole('button', { name: 'Save count' })).toHaveCount(0);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  expect((await download).suggestedFilename()).toBe('zone-b-cycle-count.csv');
  await page.reload();
  await expect(page.getByRole('status')).toHaveText('Approved');
});
