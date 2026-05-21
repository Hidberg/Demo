import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click();
    }

    async isItemInCart(itemName: string): Promise<boolean> {
        return await this.page.locator(`.cart_item:has-text("${itemName}")`).isVisible();
    }
}
