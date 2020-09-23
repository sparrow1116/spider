const cheerio = require("cheerio");
const download = require("../lib/selfDownload").download;
const Spider = require("../lib/spiderD");
const {guid} = require('../util/tool')

const fs = require('fs')

async function spideHtml(data){
    let url = data.detailUrl
    console.log("come in detail url::" + url);

    let detailObj = {
        myId:data.myId,
        title: '',
        contentArr:[]
    }

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);
    let $ = cheerio.load(htmlStr);

    detailObj.title = $('.logbox h1').text()

    let listObj = $('.logcon').children()
    let imgArr=[],nameArr = []
    for(let i = 0; i<listObj.length -1; i++){
        let obj = {}
        if(listObj[i].tagName === 'p'){
            if($(listObj[i]).find('img').length > 0){
                obj.type = 'img';
                let img = $(listObj[i]).find('img').attr('data-original')
                let imgName = guid() + '.png'
                imgArr.push(img)
                nameArr.push(imgName);
                obj.data = imgName
            }else{
                obj.type = 'text'
                obj.data = $(listObj[i]).text()
            }
        }
        detailObj.contentArr.push(obj);
    }
    console.log('这条详情下载：' + imgArr.length + ' 张图片')
    let in10 = true;
    while(in10){
        if(imgArr.length > 10){
            let front10Aderess = imgArr.splice(0,10);
            let front10Name = nameArr.splice(0,10);
            let result = await download(front10Aderess,'detailPic',front10Name)
            console.log(result)
        }else{
            let result = await download(imgArr,'detailPic',nameArr)
            in10 = false
            console.log(result)
        }
    }

    return detailObj

}

async function spiderDetail(dataArr){
    let detailArr = []
    for(let i = 0; i<dataArr.length; i++){
        let detailData = await spideHtml(dataArr[i])
        detailArr.push(detailData)
    }
    fs.writeFileSync('./butaolu/detailArr.json',JSON.stringify(detailArr),"utf8")
}

module.exports = spiderDetail