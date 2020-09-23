const frontPage = require("./frontPage");

const spiderDetail = require("./detailPage");
const fs = require('fs')

async function main(){
    let listData = await frontPage();

    let dataArr = JSON.parse(fs.readFileSync("./butaolu/list.json",'utf8'));

    await spiderDetail(dataArr)
} 
// main();

module.exports = main