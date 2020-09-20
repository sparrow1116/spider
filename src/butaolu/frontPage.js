const cheerio = require("cheerio");
const fs = require('fs')
const download = require("../lib/selfDownload").download;
const Spider = require("../lib/spiderD");


const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.butaoluUrl;
const lastDay = config.butaoluDate;
let dataInfo = [], lastDate = new Date(lastDay).valueOf();

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
    let listObj = $('#contentleft .loglist li');

    let imgArr = [], nameArr = [], listData = []
    for(let i = 0; i<listObj.length; i++){
        let obj = {
            myId: guid(),
            title: '',
            detailUrl: '',
            headImg: '',
            desciption: '',
            time: 0,
            tags: []
        }
        let img = $(listObj[i]).find('.pic img').attr('data-original');
        let imgName = guid() + '.png'
        imgArr.push(img);
        nameArr.push(imgName);
        obj.headImg = imgName;

        obj.title = $(listObj[i]).find('.des h4 a').text();
        obj.detailUrl = $(listObj[i]).find('.des h4 a').attr('href')
        // console.log('obj.detailUrl')
        // console.log(obj.detailUrl)

        obj.desciption = $(listObj[i]).find('.des .text').text();

        let list = $(listObj[i]).find('.des .attr').children()
        let timeStr = $(list[0]).text().replace('月', '-').replace('日', '')
        // console.log(timeStr)
        timeStr = config.butaoluYear + '-' + timeStr + ' 00:00:00'
        obj.time = new Date(timeStr).valueOf();

        let tag = $(listObj[i]).find('.des .attr .tags a').text()
        obj.tags.push(tag);

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