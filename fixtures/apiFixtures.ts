import { test as base } from '@playwright/test';
import { ReqresClient } from '../api/reqresClient';
import { config } from '../config/env';

export const test = base.extend<{
    reqresClient: ReqresClient;
}>({
    reqresClient: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL: config.api.baseURL,
            extraHTTPHeaders: {
                'x-api-key': config.api.xApiKey,
            },
        });
        const client = new ReqresClient(apiContext);
        await use(client);
        apiContext.dispose();
    },
});