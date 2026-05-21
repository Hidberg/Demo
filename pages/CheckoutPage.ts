import { Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishOrder() {
        await this.page.locator('[data-test="finish"]').click();
    }

    async getTitle(): Promise<string> {
        return await this.page.locator('[data-test="title"]').textContent() || '';
    }

    async getCompleteHeader(): Promise<string> {
        return await this.page.locator('[data-test="complete-header"]').textContent() || '';
    }
}
