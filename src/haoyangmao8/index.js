const haoyangmao8 = require("./frontPage");

const spiderDetail = require("./detailPage");
const fs = require('fs')

async function main(){
    let listData = await haoyangmao8();

    let dataArr = JSON.parse(fs.readFileSync("./list.json",'utf8'));

    spiderDetail(dataArr)
} 
main();