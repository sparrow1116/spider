const cheerio = require("cheerio");
const fs = require('fs')
const Spider = require("../lib/spiderD");

const download = require("../lib/selfDownload").download;
const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.yangmaodaoUrl;
const lastDay = config.yangmaoduoData;
let lastDate = new Date(lastDay).valueOf();




async function main(){
    let dd = await spiderHtml(startUrl)
    let newList = [];
    // console.log(lastDate);
    for(let i = 0; i<dd.length; i++){
        // console.log(dd[i].time)
        if(dd[i].time >= lastDate){
            newList.push(dd[i])
        }
    }
    fs.writeFileSync('./yangmaoduo/list.json',JSON.stringify(newList),"utf8")
    console.log('这次爬取了：' + newList.length + '条数据')
    return newList
}



async function spiderHtml(url){
    console.log("url::: " + url);

    let listData = []

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
    let listObj = $("#lieb dl")

    let imgArr = [], nameArr = [];
    for(let i = 0; i<listObj.length;i++){
        
        let obj = {
            myId:guid(),
            type:'',
            title:'',
            level: 0,
            detailUrl:'',
            headImg:'',
            desciption:'',
            time:0,
            tags:[]
        }
        let dl = listObj[i];
        let dlList = $(dl).children()
        let dt = dlList[0]
        let dd = dlList[1]

        // console.log($(dt).children().length)

        obj.type = $(dt).find('span').text()
        obj.title = $(dt).find('h2').text()
        obj.detailUrl = $(dt).find('h2 a').attr('href')
        if($(dt).children().length > 2){
            obj.level = 1
        }

        let img = $($(dd).children()[0]).find('img').attr('src')

        let guidName = guid()+ '.png'
        imgArr.push(img);
        nameArr.push(guidName)
        obj.headImg = guidName;
           

        obj.desciption = $($(dd).children()[1]).text()

        let timeStr = $(dd).find('.tags').text()
        timeStr = timeStr.split('时间：')[1].split(' ')[0]
        timeStr = timeStr.replace("年","-").replace("月","-").replace("日"," 00:00:00");
        obj.time = new Date(timeStr).valueOf();
        let tagArr = $(dd).find('.tags a')
        
        obj.tags = []
        for(let j = 0; j<tagArr.length; j++){
            obj.tags.push($(tagArr[j]).text())
        }
        listData.push(obj)
    }
    console.log('列表页需要下载：' + imgArr.length + '张图片')


    let in10 = true;
    while(in10){
        if(imgArr.length > 10){
            let front10Aderess = imgArr.splice(0,10);
            let front10Name = nameArr.splice(0,10);
            let result = await download(front10Aderess,'dest',front10Name)
            console.log(result)
        }else{
            let result = await download(imgArr,'dest',nameArr)
            in10 = false
            console.log(result)
        }
    }

    // await download(imgArr,'dest',nameArr)
    return listData
}

// main()

module.exports = main