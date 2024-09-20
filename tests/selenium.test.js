const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

async function exampleTest() {
    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments('headless');
    chromeOptions.addArguments('disable-gpu');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    try {
        await driver.get('http://localhost:3001');

        // Verify that the h1 element contains 'Hello, World!'
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
