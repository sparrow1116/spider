const frontPage = require("./frontPage");

// const spiderDetail = require("./detailPage");
const fs = require('fs')

async function main(){
    let listData = await frontPage();

    // let dataArr = JSON.parse(fs.readFileSync("./list.json",'utf8'));

    // spiderDetail(dataArr)
} 
main();