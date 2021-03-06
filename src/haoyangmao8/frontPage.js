/**
 * Created by zyj on 2020/8/11.
 */
const cheerio = require("cheerio");
const fs = require('fs')
const {downArr} = require('./download')
const Spider = require("../lib/spiderD");


const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.haoyangmao8Url;
const lastDay = config.haoyangmao8Date;
let dataInfo = [], lastDate = new Date(lastDay).valueOf();


// main();

async function main(){
    let dataList = await spiderHtml(startUrl);
    let newList = [];
    // console.log(lastDate);
    for(let i = 0; i<dataList.length; i++){
        // console.log(dataList[i].time)
        if(dataList[i].time >= lastDate){
            newList.push(dataList[i])
        }
    }
    fs.writeFileSync('./haoyangmao8/list.json',JSON.stringify(newList),"utf8")
    console.log('这次爬取了：' + newList.length + '条数据')
    // await spiderDetail();

    return newList
}


// async function spiderDetail(){
//     for(let i = 0; i<dataInfo.length; i++){
//         if(dataInfo[i].time >= lastDate){
        
//             let dd = await detail(dataInfo[i].detailUrl);
//             // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//             // console.log(dd);
//             dataInfo[i].detail = dd;
//         }
//     }
// }

// if()


async function spiderHtml(url){


    console.log("url::: " + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
        let listObj = $(".list .firstreed");


        let imgArr = [], nameArr = [];
        for(let i = 0; i<listObj.length;i++){
            let data = {};
            //标题
            let title = $(listObj[i]).find("h2 a").text();
            data.title = title;

            //发布时间
            let timeStr = $(listObj[i]).find(".meta-bottom").text().split("/>")[1];
            let tmpStr = timeStr.replace("年","-").replace("月","-").replace("日"," 00:00:00");
            let time = new Date(tmpStr).valueOf();
            data.time = time;
            // console.log(">>>time>>::" + tmpStr);
            //缩略图
            let img = $(listObj[i]).find("#zhaiyaotu img").attr("data-cfsrc");
            let guidName = guid()+ '.png'
            imgArr.push(img);
            nameArr.push(guidName)
            data.headImg = guidName;
           
            data.myId = guid();

            //详情页面链接
            let detailUrl = $(listObj[i]).find(".read-more a").attr("href")
            // console.log("url::>>>  " + detailUrl);
            data.detailUrl = detailUrl;
           
            dataInfo.push(data);
            
        }
        console.log('列表页需要下载：' + imgArr.length + '张图片')
    // 下载缩略图
    await downArr(imgArr,'dest',nameArr)
    //最后一条是否在我们搜索的时期后。
    if(dataInfo[dataInfo.length -1].time >= lastDate){
        
        let urlArr = url.split(".com/");
        // console.log(">>>len: " + urlArr.length);
        // console.log(">>>0:" + urlArr[0]);
        // console.log(">>>1:" + urlArr[1]);
        if(!urlArr[1]){
            
            let newUrl = url + "page_2.html"
            console.log("come in newUrl:: " + newUrl);
            await spiderHtml(newUrl);
        }else{
            
            let name = urlArr[urlArr.length -1].split(".html")[0];
            let index = name.split("_")[1];
            let newUrl = startUrl + "page_" + ++index + ".html";

            console.log("come in else url: " + newUrl);

            await spiderHtml(newUrl);
        }
        
    }
    return dataInfo

}
module.exports = main;
