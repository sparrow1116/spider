const cheerio = require("cheerio");
const fs = require('fs')
const download = require("../lib/selfDownload").download;
const Spider = require("../lib/spiderD");


const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.jiuaiyangmaoUrl;
const lastDay = config.jiuaiyangmaoDate;
let dataInfo = [], lastDate = new Date(lastDay).valueOf();
// console.log(lastDate)

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
    fs.writeFileSync('list.json',JSON.stringify(newList),"utf8")
    console.log('这次爬取了：' + newList.length + '条数据')

    return newList
}


async function spiderHtml(url){

    console.log("url::: " + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
    let listObj = $('.content article');

    let imgArr = [], nameArr = [], listData = []
    for(let i = 0; i<listObj.length; i++){
        let obj = {
            myId:guid(),
            title:'',
            detailUrl:'',
            headImg:'',
            time:''
        }
        obj.title = $(listObj[i]).find('header h2 a').text()
        obj.detailUrl = $(listObj[i]).find('header h2 a').attr('href')
        let timeStr = $($(listObj[i]).find('.muted')[1]).text().trim()
        timeStr = config.jiuaiyangmaoYear + '-' + timeStr + ' 00:00:00';
        // console.log(timeStr)
        let time = new Date(timeStr).valueOf();
        obj.time = time;
        
        let img = $(listObj[i]).find('.focus a img').attr('src')
        let imgName = guid() + '.png';
        imgArr.push(img);
        nameArr.push(imgName);
        obj.headImg = imgName

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
    return listData
}

module.exports = main