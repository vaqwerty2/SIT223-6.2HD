const { Builder, By } = require('selenium-webdriver');
require('chromedriver');

async function testHomePage() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your local development server
        await driver.get('http://localhost:3000'); // Change this URL if your environment is different

        // Check for the 'Hello, World!' header
        const header = await driver.findElement(By.tagName('h1')).getText();
        if (header !== 'Hello, World!') {
            throw new Error('Test Failed: Incorrect header');
        }

        // Check for the 'Testing Jenkins' sub-header
        const subHeader = await driver.findElement(By.tagName('h2')).getText();
        if (subHeader !== 'Testing Jenkins') {
            throw new Error('Test Failed: Incorrect sub-header');
        }

        console.log('Test Passed: Page contains the correct texts.');
    } finally {
        await driver.quit();
    }
}

testHomePage();
