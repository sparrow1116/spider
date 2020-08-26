/**
 * Created by zyj on 2020/8/10.
 */

const haoyangmao8 = require("./haoyangmao8/frontPage");


async function main(){
    await haoyangmao8();
} 
main();

// const {Builder, By, Key, until} = require('selenium-webdriver');
//
// (async function example() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     try {
// 	await driver.get('https://www.haoyangmao8.com/');
// 	let listObj = await driver.findElements(By.css('.list .firstreed'));
// 	console.log("len::" + listObj.length)
//         let nextIcon = await driver.findElement(By.css('.fenyetiao a:nth-last-child(2)'))
//
//         for(let i =0; i<listObj.length; i++){
// 	    let titleObj = await listObj[i].findElement(By.css('h2 a'));
// 	    let title = await titleObj.getText();
//
// 	    console.log("title::" + title);
// 	    let xx = await listObj[i].findElement(By.css('.meta-bottom img'));
// 	    // let xxN = await xx;
// 	    let xxstr = await xx.getText()
// 	    console.log(xxstr);
// 	    // if(i == 9){
// 	    //     for(let key in xx){
// 	    //         console.log("key::" + key + "  value::" + xx[key]);
// 	    //         if(key == 'driver_'){
// 	    //             for(let bb in xx[key]){
// 	    //                 console.log("bb::" + bb + " value::" + xx[key][bb]);
//              //            }
//              //        }
// 	    //
//              //    }
// 	    // }
//         }
//
//
//         // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
// 	// await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     } finally {
// 	// await driver.quit();
//     }
// })();


