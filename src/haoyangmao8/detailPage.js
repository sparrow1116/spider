const cheerio = require("cheerio");
// const download = require("../lib/download").download;
const Spider = require("../lib/spiderD");
const {guid} = require('../util/tool')
const {downArr} = require('./download')
const fs = require('fs')

async function spideHtml(data){
    let url = data.detailUrl
    console.log("come in detail url::" + url);

    let detailObj = {
        myId:data.myId,
        title: data.title,
        contentArr:[]
    }

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);
    let $ = cheerio.load(htmlStr);
    let listObj = $(".neirong .reed .kan p");

    let imgArr=[],imgNameArr = []
    for(let i = 0; i<listObj.length; i++){
        let content = {}
        let a  = $(listObj[i]).text();
        if(a.indexOf("<img") >= 0){
            let img = $(listObj[i]).find("span").attr("lg-data-src");
            let imgName = guid() + '.png';
            imgArr.push(img);
            imgNameArr.push(imgName)
            content.type = 'img',
            content.data = imgName;
            detailObj.contentArr.push(content)
        }else{
            // detailArr.push(a)
            let content = {
                type:'text',
                data:a
            }
            detailObj.contentArr.push(content)
        }
    }
    // console.log(detailArr);
    // download(imgArr).then(()=>{console.log("download ok");})
    console.log('这条详情下载：' + imgArr.length + ' 张图片')
    await downArr(imgArr,'detailPic',imgNameArr)
    return detailObj;
    
}

// spideHtml("https://www.haoyangmao8.com/post/4006.html");

async function spiderDetail(dataArr){
    let detailArr = []
    for(let i = 0; i<dataArr.length; i++){
        let detailData = await spideHtml(dataArr[i])
        detailArr.push(detailData)
    }
    // console.log('detailArr')
    fs.writeFileSync('detailArr.json',JSON.stringify(detailArr),"utf8")
}

module.exports = spiderDetail