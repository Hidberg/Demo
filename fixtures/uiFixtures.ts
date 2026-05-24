import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuPage } from '../pages/SideMenuPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const test = base.extend<{
    loginPage: LoginPage;
    sideMenuPage: SideMenuPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    sideMenuPage: async ({ page }, use) => {
        const sideMenuPage = new SideMenuPage(page);
        await use(sideMenuPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

});
