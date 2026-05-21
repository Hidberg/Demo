import { Page, Locator } from '@playwright/test';

export class SideMenuPage {
    readonly page: Page;
    readonly openMenuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    }

    async openSideMenu(): Promise<void> {
        return await this.openMenuButton.click();
    }

    async logout(): Promise<void> {
        return await this.logoutButton.click();
    }

}