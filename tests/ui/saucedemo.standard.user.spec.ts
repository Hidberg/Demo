import { expect } from '@playwright/test';
import { test } from '../../fixtures/uiFixtures';
import { uiUsersConfig } from '../../config/env';

test.describe('UI Tests - SauceDemo', () => {

    test.describe('Standard user', () => {

        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto();
            await loginPage.login(uiUsersConfig.standard.login, uiUsersConfig.standard.password);
        });

        test('@UI Login with standard_user - redirect to inventory', async ({ inventoryPage }) => {
            await expect(inventoryPage.inventoryItems).toHaveCount(6);
        });

        test('@UI Add item to cart - badge counter increments, remove - decrements', async ({ inventoryPage }) => {
            const itemName = 'Sauce Labs Backpack';
            await inventoryPage.addItemToCart(itemName);
            let count = await inventoryPage.getCartCount();
            expect(count).toBe(1);
            await inventoryPage.removeItemFromCart(itemName);
            count = await inventoryPage.getCartCount();
            expect(count).toBe(0);
        });

        test('@UI Sort by price low to high', async ({ inventoryPage }) => {
            await inventoryPage.sortBy('lohi');
            const prices = await inventoryPage.getPrices();
            const sorted = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sorted);
        });

        test('@UI Full E2E order flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
            await inventoryPage.addItemToCart('Sauce Labs Backpack');
            await inventoryPage.goToCart();
            await cartPage.checkout();
            await checkoutPage.fillInformation('Test', 'User', '12345');
            await checkoutPage.finishOrder();
            const title = await checkoutPage.getTitle();
            expect(title).toBe('Checkout: Complete!');
            const completeHeader = await checkoutPage.getCompleteHeader();
            expect(completeHeader).toBe('Thank you for your order!');
        });

        test('@UI Logout redirects to login page', async ({ loginPage, sideMenuPage }) => {
            await sideMenuPage.openSideMenu();
            await sideMenuPage.logout();
            expect(loginPage.loginButton).toBeVisible();
        });

    });
});