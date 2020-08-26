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

    let len = list.length -5;//开头4个，结尾5个不考虑
    // for(let i = 4; i<len; i++){
    //         if($($(list[5]).children()).children().length > 1){
    //              let items = $($(list[5]).children()).children();
    //              let title = $(items[0]).text()
    //         }else{//这个是标题：0点活动
    //
    //         }
    // }

    let items = $($(list[5]).children()).children()
    let itemL = items.length;
    let itemB = $(items[itemL-1]).children();//第一层section
    let itemBL = itemB.length;
    let itemC = itemB[itemBL-1]         //第二层section
    let itemArr = $(itemC).children();

    for(let j = 0; j<itemArr.length;j++){
        console.log($(itemArr[j]).text());
        if(j == itemArr.length-1){

        }

    }

    console.log($(items[0]).text());

    // console.log($($(list[5]).children()).children().length);


}
main();
