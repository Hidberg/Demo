import { expect } from '@playwright/test';
import { test } from '../../fixtures/apiFixtures';

test.describe.configure({ mode: 'serial' });

// Correct tests, now don't work on mocked api
test.describe.skip('API Tests - SauceDemo', () => {

    test.describe('Create, update, delete', () => {

        let userId: number;

        test('@API POST user - 201 + id', async ({ reqresClient }) => {
            const name = 'John';
            const job = 'leader';

            let response = await reqresClient.createUser({ name: name, job: job });
            expect(response.status()).toBe(201);

            let body = await response.json();
            expect(body).toHaveProperty('id');
            expect(body.id).toBeTruthy();
            userId = parseInt(body.id);

            response = await reqresClient.getUser(userId);
            expect(response.status()).toBe(200);
            body = await response.json();
            expect(body.data).toHaveProperty('id', userId);
            expect(body.data).toHaveProperty('name', name);
            expect(body.data).toHaveProperty('job', job);
        });

        test('@API PUT user - 200 + updatedAt', async ({ reqresClient }) => {
            const name = 'Jane';
            const job = 'engineer';

            let response = await reqresClient.updateUser(userId, { name: name, job: job });
            expect(response.status()).toBe(200);
            let body = await response.json();
            expect(body).toHaveProperty('updatedAt');

            response = await reqresClient.getUser(userId);
            expect(response.status()).toBe(200);
            body = await response.json();
            expect(body.data).toHaveProperty('name', name);
            expect(body.data).toHaveProperty('job', job);
        });

        test('@API DELETE user - 204', async ({ reqresClient }) => {
            let response = await reqresClient.deleteUser(userId);
            expect(response.status()).toBe(204);
            expect(await response.text()).toBe('');

            response = await reqresClient.getUser(userId);
            expect(response.status()).toBe(404);
        });

    });

});

