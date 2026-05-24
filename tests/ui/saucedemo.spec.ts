import { expect } from '@playwright/test';
import { test } from '../../fixtures/uiFixtures';
import { uiUsersConfig } from '../../config/env';

test.describe('UI Tests - SauceDemo', () => {

    test('@UI Login with standard_user - redirect to inventory', async ({ loginPage, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.login(uiUsersConfig.standard.login, uiUsersConfig.standard.password);
        await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });

    test('@UI Login with locked_out_user - error message', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(uiUsersConfig.locked.login, uiUsersConfig.standard.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    test('@UI Add item to cart - badge counter increments, remove - decrements', async ({ loginByStandardUser, inventoryPage }) => {
        const itemName = 'Sauce Labs Backpack';
        await inventoryPage.addItemToCart(itemName);
        let count = await inventoryPage.getCartCount();
        expect(count).toBe(1);
        await inventoryPage.removeItemFromCart(itemName);
        count = await inventoryPage.getCartCount();
        expect(count).toBe(0);
    });

    test('@UI Sort by price low to high', async ({ loginByStandardUser, inventoryPage }) => {
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    test('@UI Full E2E order flow', async ({ loginByStandardUser, inventoryPage, cartPage, checkoutPage }) => {
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

    test('@UI Logout redirects to login page', async ({ loginByStandardUser, sideMenuPage }) => {
        await sideMenuPage.openSideMenu();
        await sideMenuPage.logout();
        expect(loginByStandardUser.loginButton).toBeVisible();
    });
});