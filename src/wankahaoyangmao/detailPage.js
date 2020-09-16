const cheerio = require("cheerio");
const Spider = require("../lib/spiderD");
const download = require("../lib/selfDownload").download;
const tool = require("../util/tool")
const fs = require('fs')

function findOriginUrl(str){
    let start = str.indexOf('msg_source_url')+14
        let findIt = true, first = -1; second = -1;
        while(findIt){
            // console.log(str[start])
            if(str[start] =='\'' || str[start] == '\"'){
                if(first == -1){
                    first = start;
                }else if(second == -1){
                    second = start
                }
            }
            if(first != -1 && second != -1){
            findIt = false;
            break;
            }
            start++
        }
        return str.substr(first+1,second-first-1)

}


async function getDetailPage(data){
    let detailArr = [];
    for(let i = 0; i<data.length; i++){
        if(data[i].detailUrl){
            console.log("come in " + i);
            let sp = new Spider();
            // console.log(data[i].detailUrl)
            let url = data[i].detailUrl.replace('http','https').split('#wechat_redirect')[0];//跳转了。
            let htmlStr = await sp.getHtml(url);
            let orignalUrl = findOriginUrl(htmlStr)
            // console.log(htmlStr);
            let $ = cheerio.load(htmlStr);
            let container = $("#js_content");
            let storeData = {
                title:'',
                myId:data[i].myId,
                orignalUrl,
                despArr:[],
                picArr:[]
            };
	    storeData.title = $('#activity-name').text().trim();
            let textDArr = $(container).find('fieldset p');
            // console.log(textDArr.length)
            for(let j = 0; j<textDArr.length;j++){
                // console.log($(textDArr[j]).text());
                storeData.despArr.push($(textDArr[j]).text())
            }
            let imgDomArr = $(container).find('img');
            // console.log(imgDomArr.length)
            for(let j= 0; j<imgDomArr.length ;j++){ //最后2个为logo
                if(j == imgDomArr.length - 1 || imgDomArr.length - 2){
                    let url = $(imgDomArr[j]).attr('data-src')
                    if(url == 'https://mmbiz.qpic.cn/mmbiz_jpg/6rbS7jUrljrkqaSNU8sc3cOIoltNL8FclAVxhjhY0Po8kUSGpRR6tGZfE8kWgtKf438Tf41QgFp62xCd7cPklQ/640?wx_fmt=jpeg' ||
                        url == 'https://mmbiz.qpic.cn/mmbiz/h1VV7TJtQucjcTBOveSkhXRIjKuOVTB7MLQ6r4icCHia44WwE3UluuYqqBOfiavUia1z1CPUib1flQT4yIaXwWd5hjg/640?wx_fmt=jpeg'){
                            break;
                        }
                }

                storeData.picArr.push($(imgDomArr[j]).attr('data-src'))
            }
            detailArr.push(storeData);

        }



    }

    let picNameArr = [],picAddressArr = []
    for(let i =0; i<detailArr.length; i++){

        detailArr[i].picArr.map((item,index)=>{
            let uuid = tool.guid()
            picAddressArr.push(detailArr[i].picArr[index]);
            picNameArr.push(uuid + '.png')
            detailArr[i].picArr[index] = uuid + '.png'
        })
    }
    fs.writeFileSync('detailArr.json',JSON.stringify(detailArr),"utf8")

    console.log('all pic Arr>>>  ' + picAddressArr.length)

    let in50 = true;
    while(in50){
        if(picAddressArr.length > 50){
            let front50Aderess = picAddressArr.splice(0,50);
            let front50Name = picNameArr.splice(0,50);
            let result = await download(front50Aderess,'detailPic',front50Name)
            console.log(result)
        }else{
            let result = await download(picAddressArr,'detailPic',picNameArr)
            in50 = false
            console.log(result)
        }
    }
    // download(picAddressArr,'detailPic',picNameArr)
    //     .then((result)=>{
    //         console.log('finisht result:: ' + result)
    //     })



}

// let dd = [{
//     "title": "京东（爱奇艺+京东年卡）",
//     "description": [
//         "118元可开通：京东Plus年卡+爱奇艺年卡"
//     ],
//     "detailUrl": "http://mp.weixin.qq.com/s?__biz=MzIzMDgxODc4Nw==&mid=2247499588&idx=1&sn=17f9069a434430bd0cc860a90d06bd73&chksm=e8af29c8dfd8a0def1dbf9dd42cee28aafa792b90eb2500c0143f367db3537869dd159ac958a&scene=21#wechat_redirect",
//     "router": "活动入口：活动细则扫码/本公众号回复“京东年卡”",
//     "time": 1599753600000,
//     "inputDate": "2020-09-09",
//     "myId": "dfcf6ffa-9082-4ad2-9858-b25e77919fee",
//     "groupArr": [
//         "平台|代金券",
//         "视频卡"
//     ],
//     "commercial": "京东"
// }]

// getDetailPage(dd)

module.exports = getDetailPage;
