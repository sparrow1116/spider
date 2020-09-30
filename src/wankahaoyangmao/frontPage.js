const cheerio = require("cheerio");
const download = require("../lib/download").download;
const Spider = require("../lib/spiderD");
var fs = require('fs');
const tool = require("../util/tool")

// const detail = require("./detailPage");
const config = require("../config");


let startUrl = config.wankahaoyangmao;

// const lastDay = config.haoyangmao8Url;

// let dataInfo = [], lastDate = new Date(lastDay).valueOf();

let jsonFile = 'json'

async function getFrontPageJson(fileName){
    jsonFile = fileName;
    return await spideHtml(startUrl);
}

async function spideHtml(url){
    console.log("url::: " + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
    let list = $("#js_content").children();
    // console.log(list.length);

    let dataArr = [], bankUrlArr =[];

    let len = list.length -6;//开头4个，结尾5个不考虑
    for(let i = 4; i<len; i++){
        let dataObj = {}
        if($($(list[i]).children()).children().length > 1){

            let items = $($(list[i]).children()).children();
            let title = $(items[0]).text()//TT 标题

            //TODO 前期收集银行图片
            let bankUrl = $(items[0]).find("img").attr("data-src")
            // console.log(">>> bankUrl:" + bankUrl);
            if(bankUrl){
                bankUrlArr.push(bankUrl);
            }
            

            let itemL = items.length;
            let itemB = $(items[itemL-1]).children();//第一层section
            let itemBL = itemB.length;
            let itemC = itemB[itemBL-1]         //第二层section
            let itemArr = $(itemC).children();

            let itemLength = itemArr.length;

            let description = [];                   //TT 描述
            let detailUrl = "";                     //TT 详情链接
            let router = "";                        //TT 活动路径
            let time = null;                          //TT 时间戳
            let lastData = ""

            for(let j = 0; j<itemLength; j++){
                let text = $(itemArr[j]).text();
                if(text.indexOf("活动细则点击") >= 0){
                    detailUrl = $(itemArr[j]).find("a").attr("href");
                    lastData = text;
                    let date = lastData.split("（")[1].split("截止")[0];
                    if(date){
                        let tmpStr = config.year + "-" + date.replace("月","-").replace("日"," 00:00:00");
                        // console.log("title:: " + title);
                        // console.log("date:: " + date);
                        // console.log("tmpStr: " + tmpStr);
                        time = new Date(tmpStr).valueOf();  //TT 时间戳
                    }
                    
                }else if(text.indexOf("活动入口") >=0 || text.indexOf("抢兑路径")>=0
                    || text.indexOf("活动商户入口")>=0){
                        router = text;
                }else{
                    description.push(text);
                }
            }


            // if(itemLength == 4){
            //     router = $(itemArr[1]).text();
            //     company = $(itemArr[2]).text();
            //     detailUrl = $(itemArr[3]).find("a").attr("href");
            //     lastData = $(itemArr[3]).text();
            // }else if(itemLength == 2){
            //     detailUrl = $(itemArr[1]).find("a").attr("href");
            //     lastData = $(itemArr[1]).text();
            //     if(lastData.indexOf("活动入口") >=0 || lastData.indexOf("抢兑路径")>=0){
            //         router = lastData;
            //         lastData = "";
            //     }

            // }else{
            //     router = $(itemArr[1]).text();
            //     detailUrl = $(itemArr[2]).find("a").attr("href");
            //     lastData = $(itemArr[2]).text();
            // }
            // console.log("titel:: " + title);
            // console.log("lastData:: " + lastData);
            // if(lastData){
            //     let date = lastData.split("（")[1].split("截止")[0];
            //     let tmpStr = config.year + date.replace("月","-").replace("日"," 00:00:00");
            //     time = new Date(tmpStr).valueOf();  //TT 时间戳
            // }
            

            dataObj.title = title;
            dataObj.description = description;
            dataObj.detailUrl = detailUrl;
            dataObj.router = router;
            dataObj.time = time;
        }else{//这个是标题：0点活动

        }
        dataArr.push(dataObj)
    }


    let block = $($($(list[list.length-4]).children()[0]).children()[0]).children()[0]

    let pArr = $(block).children()

    let title = ""
    for(let a = 0; a<pArr.length-2;a++){
        let text = $(pArr[a]).text();
        if(text.indexOf("细则") >=0){
            let obj = {};
            obj.description = [];
            obj.title = title;
            let detail = text.split("🔍")[0];
            obj.description.push(detail);
            
            obj.detailUrl = $(pArr[a]).find('a').attr("href");
            dataArr.push(obj);
        }else{
            title = text;
        }
    }

    
    console.log('今天共抓取了' + dataArr.length + '条数据')
    //初始数据存文件
    fs.writeFileSync(jsonFile,JSON.stringify(dataArr),"utf8")

    return dataArr;

    //下载银行icon
    // let newNameArr = []
    // for(let i =0; i<bankUrlArr.length; i++){
    //     let name = tool.guid() + ".png";
    //     newNameArr.push(name);
    // }

}
// getFrontPageJson("tt.json");

module.exports = getFrontPageJson;
