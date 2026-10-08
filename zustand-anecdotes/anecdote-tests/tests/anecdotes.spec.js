import { test, expect, item } from '@playwright/test';

//function to fetch backend data
async function fetchAnecdotes() {
    const res = await fetch('http://localhost:3001/anecdotes')
    return res.json()
}

test('Initial loads shows seeded anecdote', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('If it hurts, do it more often')).toBeVisible()
})

test('Filter  works correctly', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('textbox', { name: /filter/i }).fill('optimization')
    await expect(page.getByText('Premature optimization is the root of all evil')).toBeVisible()
    await expect(page.getByText('if it hurts do it more often.', {exact: true})).toHaveCount(0)
})

test('Create adds new anecdote and persists', async ({ page }) => {
    await page.goto('/')
    const newText = 'Testing anecdotes with Playwright'
    await page.fill('input[name="anecdote]', newText)
    await page.click('button[type="submit"]')
    await expect(page.getByText(newText)).toBeVisible()

    const anecdotes = await fetchAnecdotes()
    expect(anecdotes.some(a => a.content === newText)).toBeTruthy()
})

test('Vote increases count and persists', async ({ page }) => {
    await page.goto('/')
    const anecdoteText = 'If it hurts, do it more often'
    const voteButton = page.locator('li', { hasText: anecdoteText }).getByRole('button', { name: 'vote' })
    
    //get initial count
    const initialCount = parseInt(await page.locator('li', { hasText: anecdoteText }).getByText(/has \d+/).innerText().then(t => t.match(/\d+/)[0]))

    await voteButton.click()
    await expect(item).toContainText(`has ${initialCount + 1} votes`)
    
    const anecdotes = await fetchAnecdotes()
    const updated = anecdotes.find((a) => a.content === anecdoteText)
    expect(updated.votes).toBe(initialCount + 1)
})

test('Delete only allowed for zero-vote anecdotes', async ({ page }) => {
    await page.goto('/')

    //asume one anecdote has zero votes
    const zeroVoteItem = page.locator('li', { hasText: 'Programming without an extremely heavy use of console.log' })
    await expect(zeroVoteItem.getByRole('button', { name: 'delete' })).toBeVisible()
    
    await zeroVoteItem.getByRole('button', { name: 'delete' }).click()
    await expect(zeroVoteItem).toHaveCount(0)

    const anecdotes = await fetchAnecdotes()
    expect(anecdotes.some(a => a.content.includes('console.log'))).toBeFalsy()
})

test('Notification appears after add or vote', async ({ page }) => {
    await page.goto('/')

    const newText = 'Notificaton test anecdote'
    await page.fill('input[name="anecdote"]', newText)
    await page.click('button[type="submit"]')

    await expect(page.getByRole('alert')).toContainText(`Added ${newText}`)

    //wait 5s and assert disapperance
    await page.waitForTimeout(5000)
    await expect(page.getByRole('alert')).toBeHidden({timeout: 5000})
})


