# Playwright Performance Monitoring

This project uses Playwright to run end-to-end tests that simulate key user flows on the Robinhood website. Its primary goal is to collect front-end performance metrics, enabling the visualization of trends and the identification of performance regressions over time.

## Project Goal

To proactively monitor the front-end performance of critical user flows on Robinhood, ensuring a fast and responsive user experience. This is achieved by:
1.  **Simulating** real user interactions with Playwright.
2.  **Collecting** detailed performance data from the browser.
3.  **Storing** and **analyzing** these metrics to detect slowdowns.

## Core Components

1.  **Playwright Test Scripts**: Automate user flows and gather raw performance data using browser APIs.
2.  **Data Ingestion & Storage**: A mechanism to save collected metrics (e.g., JSON files, a database) for historical analysis.
3.  **Reporting & Visualization**: A dashboard to display performance trends, compare results, and highlight regressions.

## Monitored User Journeys

The following user journeys are simulated to cover critical application functionality:

1.  **Login & Dashboard Load**: Authenticates the user and measures the time to a fully loaded and interactive dashboard.
2.  **Stock Search & Detail View**: Searches for a stock (e.g., AAPL) and measures the time to render its detailed information and charts.
3.  **Simulated Order Placement**: Steps through the "buy" order flow up to the final confirmation screen.
4.  **Account Navigation**: Navigates to key account sections like settings or statements.

## Setup

Before running the tests, you must provide your login credentials.

1.  Create a file named `test-credentials.json` in the root of the project.
2.  Add your credentials in the following format:
    ```json
    {
      "email": "your-email@example.com",
      "password": "your-password"
    }
    ```
    > **Note:** This file is included in `.gitignore` and should never be committed to version control.

## Scripts

### `yarn install`

Installs all the dependencies required for the project.

### `yarn test`

Runs all the test cases using Playwright. This will first trigger the global setup for authentication and then execute the performance monitoring tests.

### `yarn lint`

Checks the code for any linting errors using ESLint.

### `yarn lint:fix`

Automatically fixes the linting errors in the code.


