// tests/dashboard.spec.ts
import { test, expect, Page } from '@playwright/test';

// The MainPage class can be simplified or removed if its login-specific methods are no longer needed
// However, if it contains other navigation/verification methods useful for the dashboard, keep it.
// For this example, we'll keep a minimal MainPage class.

class MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyLoginSuccess() {
        console.log('Verifying dashboard elements after successful login (via global setup)...');
        // We expect to already be on the dashboard page because of storageState.
        // But explicitly navigating to '/' can ensure we're at the root of the logged-in site.
        await this.page.goto('https://robinhood.com/', { waitUntil: 'domcontentloaded' });

        // 1. Verify that the URL is exactly 'https://robinhood.com/'
        await expect(this.page).toHaveURL('https://robinhood.com/', { timeout: 10000 });
        console.log('Verified URL is https://robinhood.com/.');

        // 2. Verify an element that is only visible after login, e.g., the "Account" link.
        //await expect(this.page.getByRole('link', { name: 'Account' })).toBeVisible({ timeout: 15000 });
        //console.log('Verified "Account" link is visible.');

        // Add more assertions here to verify dashboard readiness and content
        await expect(this.page.getByText('Investing', { exact: true })).toBeVisible();
        console.log('Verified "Investing" text is visible on the dashboard.');

        console.log('Dashboard verification steps completed successfully!');
    }
}

// Now, your test directly interacts with the logged-in state.
test('Verify post-login dashboard elements', async ({ page }) => {
    const mainPage = new MainPage(page);

    console.log('Starting dashboard elements verification...');

    // Since storageState is used, 'page' starts already logged in.
    // We just need to verify the state.
    await mainPage.verifyLoginSuccess();

    console.log('Dashboard elements test completed successfully!');
});