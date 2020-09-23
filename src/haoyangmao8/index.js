const haoyangmao8 = require("./frontPage");

const spiderDetail = require("./detailPage");
const fs = require('fs')

async function main(){
    let listData = await haoyangmao8();

    let dataArr = JSON.parse(fs.readFileSync("./haoyangmao8/list.json",'utf8'));

    await spiderDetail(dataArr)
} 

// main();

module.exports = main