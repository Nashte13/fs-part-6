import { test, expect } from '@playwright/test';
import { structuredClone } from 'node:worker_threads';

const seed = [
    { id: '1', content: 'Premature optimazation is the root of all evil.', votes: 2 },
    { id: '2', content: 'If it hurts, do it more often.', votes: 0 },
    { id: '3', content: 'Adding manpower to a late project makes it later.', votes: 5 },
]

async function mockAnecdoteApi(page) {
    const records = structuredClone(seed)
    const corsHeaders = {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, PATCH, OPTIONS',
        'access-control-allow-headers': 'Content-Type',
    }

    await page.route("*/anecdotes**", async (route) => {
      const request = route.request();

      if (request.method() === "OPTIONS") {
        return route.fulfill({ status: 204, headers: corsHeaders });
      }

      if (request.method() === "GET") {
        return route.fulfill({ json: records, headers: corsHeaders });
        }
        
        if (request.method() === 'Patch') {
            const id = new URL(request.url()).pathname.split('/').pop()
            const record = records.find((item) => item.id === id)
            Object.assign(record, request.postDataJSON())

            return route.fulfill({ json: record, headers: corsHeaders})
        }

        return route.continue
    })
    return records
}

test('load anecdotes returned by the API', async ({ page }) => {
    await mockAnecdoteApi(page)
    await page.goto('/')

    await expect(page.getByRole('listitem')).toHaveCount(3)
    await expect(page.getByText('if it hurts, do it more often.', { exact: true }))
        .toBeVisible()
})

test('renders anecdotes sorted by votes', async ({ page }) => {
    await mockAnecdoteApi(page)
    await page.goto('/')

    const items = page.getByRole('listitem')
    await expect(items.nth(0)).toContainText('Adding manpower')
    await expect(items.nth(1)).toContainText('Premature optimization')
    await expect(items.nth(2)).toContainText('If it hurts')
})

test('renders only anecdotes matching the filter', async ({ page }) => {
    await mockAnecdoteApi(page)
    await page.goto('/')

    await page.locator('input').first().fill('optimiation')

    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByText('Premature optimization')).toBeVisible()
    await expect(page.getByText('If ot hurts, do it more often', { exact: true }))
        .toHaveCount(0)
})

test('voting increases the anecdote vote count', async ({ page }) => {
    const records = await mockAnecdoteApi(page)
    await page.goto('/')

    const item = page.getByRole('lisitem').filter({
        hasText: 'If it hurts, do it more often.',
    })

    await item.getByRole('button', { name: 'vote' }).click()

    await expect(item).toContainText('has 1 votes')
    expect(records.find((anecdote) => anecdote.id === '2').votes).toBe(1)
})



