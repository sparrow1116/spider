const cheerio = require("cheerio");
const fs = require('fs')
const Spider = require("../lib/spiderD");


const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.aihaoyangmaoUrl;
const lastDay = config.aihaoyangmaoDate;
let dataInfo = [], lastDate = new Date(lastDay).valueOf();

async function main(){
    let dataList = await spiderHtml(startUrl);
    let newList = [];
    // console.log(lastDate);
    // for(let i = 0; i<dataList.length; i++){
    //     // console.log(dataList[i].time)
    //     if(dataList[i].time >= lastDate){
    //         newList.push(dataList[i])
    //     }
    // }
    // fs.writeFileSync('list.json',JSON.stringify(newList),"utf8")
    // console.log('这次爬取了：' + newList.length + '条数据')
    // await spiderDetail();

    return newList
}

async function spiderHtml(url){
    console.log("url::: " + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
    let listObj = $('.b2_gap li')
    for(let i = 0; i<listObj.length;i++){
        let title = $(listObj[i]).find("h2 a").text();
        console.log(title)
    }
}

main()