const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function exampleTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome')).Options().headless())
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
