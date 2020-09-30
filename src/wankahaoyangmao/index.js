const fs = require('fs')

let getFrontPageJson = require('./frontPage');
let dealWithDate  = require("./dealwithData");
let getDetailPage = require('./detailPage')
async function main(){
    let baseData = await getFrontPageJson("frontPage.json");//frontPage.json
    let newData = await dealWithDate();//result.json

    let dataArr = JSON.parse(fs.readFileSync("./result.json",'utf8'));
    await getDetailPage(dataArr);
}

main();
