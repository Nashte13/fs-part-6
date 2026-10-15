import { test, expect } from '@playwright/test';

const seed = [
    { id: '1', content: 'Premature optimazation is the root of all evil.', votes: 2 },
    { id: '2', content: 'If it hurts, do it more often.', votes: 0 },
    { id: '3', content: 'Adding manpower to a late project makes it later.', votes: 5 },
]