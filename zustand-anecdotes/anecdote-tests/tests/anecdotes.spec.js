import { test, expect } from '@playwright/test';

//function to fetch backend data
async function fetchAnecdotes() {
    const res = await fetch('http://localhost:3001/anecdotes')
    return res.json()
}

test('Initial loads shows seeded anecdote', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByAltText('If it hurts, do it more often')).toBeVisible()
})

test('Filter  works correctly', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('textbox', { name: /filter/i }).fill('optimization')
    await expect(page.getByText('Premature optimization is the root of all evil')).toBeVisible()
    await expect(page.getByText('if it hurts do it more often')).toHaveCount(0)
})

test('Create adds new anecdote and persists', async ({ page }) => {
    await page.goto('/')
    const newText = 'Testing anecdotes with Playwright
    await page.fill('Input[name="anecdote]', newText)
    await page.click('button[type="submit"]')
    await expect(page.getByText(newText)).toBeVisible()

    const anecdotes = await fetchAnecdotes()
    expect(anecdotes.some(a => a.content === newText)).toBeTruthy()
})

