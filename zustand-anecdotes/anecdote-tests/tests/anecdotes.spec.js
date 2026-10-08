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

