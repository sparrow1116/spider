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

    let dataArr = []

    let len = list.length -5;//开头4个，结尾5个不考虑
    for(let i = 4; i<len; i++){
        let dataObj = {}
        if($($(list[i]).children()).children().length > 1){
            let items = $($(list[i]).children()).children();
            let title = $(items[0]).text()//TT 标题

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
                        console.log("title:: " + title);
                        console.log("date:: " + date);
                        console.log("tmpStr: " + tmpStr);
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

    console.log(dataArr);

    // let items = $($(list[5]).children()).children()
    // let itemL = items.length;
    // let itemB = $(items[itemL-1]).children();//第一层section
    // let itemBL = itemB.length;
    // let itemC = itemB[itemBL-1]         //第二层section
    // let itemArr = $(itemC).children();

    // for(let j = 0; j<itemArr.length;j++){
    //     console.log($(itemArr[j]).text());
    //     if(j == itemArr.length-1){
    //         console.log($(itemArr[j]).find("a").attr("href"))
    //     }

    // }

    // console.log($(items[0]).text());

    // console.log($($(list[5]).children()).children().length);


}
main();
