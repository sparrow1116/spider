
let getFrontPageJson = require('./frontPage');
let dealWithDate  = require("./dealwithData")
async function main(){
    await getFrontPageJson("frontPage.json");
    await dealWithDate();
}

main();