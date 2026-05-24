import { expect } from '@playwright/test';
import { test } from '../../fixtures/uiFixtures';
import { uiUsersConfig } from '../../config/env';

test.describe('UI Tests - SauceDemo', () => {

    test.describe('Locked user', () => {

        test('@UI Login with locked_out_user - error message', async ({ loginPage }) => {
            await loginPage.goto();
            await loginPage.login(uiUsersConfig.locked.login, uiUsersConfig.standard.password);
            const error = await loginPage.getErrorMessage();
            expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
        });

    });
});