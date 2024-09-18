const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function exampleTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome')).Options().headless())
        .build();

    try {
        // Go to the React app running on localhost:3000
        await driver.get('http://localhost:3000');

        // Example: Check if the h1 tag contains 'Hello, World!'
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
