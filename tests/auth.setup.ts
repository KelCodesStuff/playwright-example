// tests/auth.setup.ts
import { chromium, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Define an interface for our credentials structure
interface Credentials {
    email: string;
    password: string;
}

// Function to load credentials from the JSON file
function loadCredentials(): Credentials {
    const credentialsPath = path.join(process.cwd(), 'test-credentials.json');
    try {
        const data = fs.readFileSync(credentialsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(
            `Error reading or parsing credentials file at ${credentialsPath}:`,
            error,
        );
        throw new Error(
            'Could not load credentials. Make sure test-credentials.json exists in your project root and is valid JSON.',
        );
    }
}

// Define the path where the authentication state will be saved.
// Playwright recommends saving it inside the 'playwright' directory.
const authFile = 'playwright/.auth/user.json';

// Export a default async function for Playwright global setup
export default async function globalSetup() {
    const { email, password } = loadCredentials();

    console.log('Starting authentication setup...');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // 1. Navigate to the Robinhood login page
    await page.goto('https://robinhood.com/login');
    await page.waitForSelector('input[name="username"]');
    console.log('Navigated to Robinhood login page.');

    // 2. Enter email and password
    await page.fill('input[name="username"]', email);
    await page.fill('input[name="password"]', password);
    console.log('Entered email and password.');

    // 3. Click the login button
    await page.click('button[type="submit"]');
    console.log('Clicked login button.');

    // 4. Handle 2FA prompt (if applicable)
    const twoFactorPromptSelector = 'button:has-text("Resend notification")';
    try {
        await page.waitForSelector(twoFactorPromptSelector, { timeout: 10000 });
        console.log('2FA prompt detected. Pausing for 10 seconds to approve notification on device.');
        await page.waitForTimeout(10000);
        console.log('Test resumed after 10 seconds. Assuming 2FA was handled manually.');
    } catch (error) {
        console.warn('2FA "Resend notification" button not detected within timeout. If 2FA was expected, something might be wrong with the selector or the flow.');
    }

    // 5. Verify successful login
    await expect(page).toHaveURL('https://robinhood.com/', { timeout: 20000 });
    console.log('Verified URL is https://robinhood.com/. Login successful!');

    // 6. Save the authentication state
    await page.context().storageState({ path: authFile });
    console.log(`Authentication state saved to ${authFile}`);

    await browser.close();
}