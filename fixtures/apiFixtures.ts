import { test as base } from '@playwright/test';
import { ReqresClient } from '../api/reqresClient';

export const test = base.extend<{
    reqresClient: ReqresClient;
}>({
    reqresClient: async ({ request }, use) => {
        const client = new ReqresClient(request);
        await use(client);
    },
});