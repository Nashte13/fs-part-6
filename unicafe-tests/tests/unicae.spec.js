import {test, expect} from '@playwright/test';

test('feedback buttons are visible', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByText('give feedback')).toBeVisible()
    await expect(page.getByRole('button', { name: 'good' })).toBeVisible()
    await expect(page.getByRole('botton', { name: 'neutral' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'bad' })).toBeVisible()
})

