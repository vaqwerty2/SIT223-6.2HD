const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); // Import chrome options
require('chromedriver'); // Ensure chromedriver is required

async function exampleTest() {
    // Set Chrome options for headless mode
    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments('headless'); // Use 'headless' argument for headless mode
    chromeOptions.addArguments('disable-gpu'); // Recommended for headless mode

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions) // Apply the Chrome options
        .build();

    try {
        // Test the React app running at port 3001
        await driver.get('http://localhost:3001');

        // Example: Verify that the h1 element contains 'Hello, World!'
        await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        let header = await driver.findElement(By.tagName('h1')).getText();
        if (header !== 'Hello, World!') {
            throw new Error('Test Failed: Incorrect header');
        }
        console.log('Test Passed: Correct header found');
    } finally {
        await driver.quit();
    }
}

exampleTest();
