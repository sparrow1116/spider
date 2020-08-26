/**
 * Created by zyj on 2020/8/10.
 */
console.log("shit");
 import {Builder, By, Key, until} from 'selenium-webdriver';


 // console.log(By);

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.baidu.com');
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        // await driver.quit();
    }
})();