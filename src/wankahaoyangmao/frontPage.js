const cheerio = require("cheerio");
const download = require("../lib/download").download;
const Spider = require("../lib/spiderD");

// const detail = require("./detailPage");
const config = require("../config");


let startUrl = config.wankahaoyangmao;

// const lastDay = config.haoyangmao8Url;

// let dataInfo = [], lastDate = new Date(lastDay).valueOf();

async function main(){
    await spideHtml(startUrl);
}

async function spideHtml(url){
    console.log("url::: " + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
    let list = $("#js_content").children();
    console.log(list.length);

    let len = list.length;
    // for(let i = 0; i<len; i++){

    // }



    console.log($($(list[5]).children()).children().length);


}
main();