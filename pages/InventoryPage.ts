import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('.inventory_item');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async addItemToCart(itemName: string) {
        await this.page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`).click();
    }

    async removeItemFromCart(itemName: string) {
        await this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`).click();
    }

    async getCartCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            return parseInt(await this.cartBadge.textContent() || '0');
        }
        return 0;
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        const value = {
            az: 'az',
            za: 'za',
            lohi: 'lohi',
            hilo: 'hilo',
        }[option];
        await this.sortDropdown.selectOption(value);
    }

    async getPrices(): Promise<number[]> {
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}
