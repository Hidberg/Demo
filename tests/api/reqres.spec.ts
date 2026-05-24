import { expect } from '@playwright/test';
import { test } from '../../fixtures/apiFixtures';
import { apiConfig } from '../../config/env';

test.describe('API Tests - SauceDemo', () => {

    test('@API GET users page 2 - status 200 + schema validation', async ({ reqresClient }) => {
        const response = await reqresClient.getUsersPage(2);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('page', 2);
        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBeTruthy();
    });

    test('@API GET user 2 - validate fields', async ({ reqresClient }) => {
        const response = await reqresClient.getUser(2);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toHaveProperty('id', 2);
        expect(body.data).toHaveProperty('email');
        expect(body.data).toHaveProperty('first_name');
    });

    test('@API GET user 999 - 404', async ({ reqresClient }) => {
        const response = await reqresClient.getUser(999);
        expect(response.status()).toBe(404);
    });

    test('@API POST user - 201 + id field', async ({ reqresClient }) => {
        const response = await reqresClient.createUser({ name: 'John', job: 'leader' });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toHaveProperty('id');
    });

    test('@API PUT user 2 - 200 + updatedAt', async ({ reqresClient }) => {
        const response = await reqresClient.updateUser(2, { name: 'Jane', job: 'engineer' });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('updatedAt');
    });

    test('@API DELETE user 2 - 204', async ({ reqresClient }) => {
        const response = await reqresClient.deleteUser(2);
        expect(response.status()).toBe(204);
        expect(await response.text()).toBe('');
    });

    test('@API Login success - 200 + token', async ({ reqresClient }) => {
        const response = await reqresClient.login(apiConfig.email, apiConfig.password);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body.token).toBeTruthy();
    });

    test('@API Login without password - 400 + error field', async ({ reqresClient }) => {
        const response = await reqresClient.login(apiConfig.email);
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body).toHaveProperty('error');
    });

});

