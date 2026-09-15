import {test, expect} from '@playwright/test';

test('feedback buttons are visible', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByText('give feedback')).toBeVisible()
    await expect(page.getByRole('button', { name: 'good' })).toBeVisible()
    await expect(page.getByRole('botton', { name: 'neutral' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'bad' })).toBeVisible()
})

test('statistics show "No feedback given" initially', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByText('No feedback given')).toBeVisible()
})

test('clicking good increases statistics', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'good' }).click()
    await expect(page.getByText('good')).toBeVisible()
    await expect(page.getByText('1')).toBeVisible()
})

test('clicking neutral and bad updates statistics', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'neutral' }).click()
    await page.getByRole('button', { name: 'bad' }).click()
    await expect(page.getByText('neutral')).toBeVisible()
    await expect(page.getByText('bad')).toBeVisible()
})