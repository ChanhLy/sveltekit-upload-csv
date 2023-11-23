import { expect, test } from '@playwright/test';
import { join, resolve } from 'path';

// test('home page has content', async ({ page }) => {
// 	await page.goto('/');
// 	await expect(page.getByText('Username')).toBeVisible();
// });

test('can upload csv file', async ({ page }) => {
	await page.goto('/users/test');
	const fileChooserPromise = page.waitForEvent('filechooser');
	await page.getByText('Upload your file').click();
	const fileChooser = await fileChooserPromise;
	const fileLocation = join(resolve(), '/tests/test-data.csv');
	await fileChooser.setFiles(fileLocation);
	await page.getByText('Submit').click();
	await expect(page.getByText('test-data.csv')).toBeVisible();
});

test('can not upload png file', async ({ page }) => {
	await page.goto('/users/test');
	const fileChooserPromise = page.waitForEvent('filechooser');
	await page.getByText('Upload your file').click();
	const fileChooser = await fileChooserPromise;
	const fileLocation = join(resolve(), '/tests/favicon.png');
	await fileChooser.setFiles(fileLocation);
	await page.getByText('Submit').click();
	await expect(page.getByText('favicon.png')).toBeHidden();
});
