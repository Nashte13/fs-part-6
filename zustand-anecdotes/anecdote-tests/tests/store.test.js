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



