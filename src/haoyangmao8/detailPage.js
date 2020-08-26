const cheerio = require("cheerio");
const download = require("../lib/download").download;
const Spider = require("../lib/spiderD");


async function spideHtml(url){
    let detailArr = [],imgArr=[];
    console.log("come in detail url::" + url);

    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);
    let $ = cheerio.load(htmlStr);
    let listObj = $(".neirong .reed .kan p");

    for(let i = 0; i<listObj.length; i++){
        let a  = $(listObj[i]).text();
        if(a.indexOf("<img") >= 0){
            let img = $(listObj[i]).find("span").attr("lg-data-src");
            let imgNameArr = img.split("/");
            let imgName = imgNameArr[imgNameArr.length-1];
            imgArr.push(img);
            detailArr.push(imgName);
        }else{
            detailArr.push(a)
        }
    }
    // console.log(detailArr);
    download(imgArr).then(()=>{console.log("download ok");})

    return detailArr;
    
}

// spideHtml("https://www.haoyangmao8.com/post/4006.html");

module.exports = spideHtml