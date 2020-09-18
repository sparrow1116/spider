var request = require('request')
var fs = require('fs')
var path = require('path')


// request('https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg').pipe(fs.createWriteStream('hh.png'))

function isFileExisted(path_way) {
    return new Promise((resolve, reject) => {
        fs.access(path_way, (err) => {
            if (err) {
                fs.mkdir(path_way, (err) => {
                    if (err) {
                        rej(false)
                        return console.log('该文件不存在，重新创建失败！')
                    }
                    console.log("文件不存在，已新创建");
                    resolve(true)
                });
                // reject(false);
            } else {
                resolve(true);
            }
        })
    })
};
// isFileExisted('jj')
//     .then((a)=>{
//         console.log('fuck')
//     })
async function download(urlList,dest,newNameList){
    let destPath = dest?dest:"dest"; 
    await isFileExisted(destPath)
    let pAll = []
    for(let i = 0; i<urlList.length;i++){
        let p = downloadOne(urlList[i],destPath,newNameList?newNameList[i]:'')
        pAll.push(p);
    }
    return Promise.all(pAll)
}

function downloadOne(url,dest,newName){
    if(!newName){
        let a = url.split('/')
        newName = a[a.length-1]
    }
    return new Promise( async(res,rej)=>{
        var writeStream = fs.createWriteStream(dest +'/' + newName);
        var readStream = request({url})
        readStream.pipe(writeStream);
        readStream.on('end', function() {
            // console.log('文件下载成功');
        });
        readStream.on('error', function(err) {
            rej(false)
            console.log('error url:  ' + url)
            console.log("错误信息:" + err)
        })
        writeStream.on("finish", function() {
            // console.log("文件写入成功");
            writeStream.end();
            res(true);
        });

        // request(url).pipe(fs.createWriteStream(dest+newName))
    })
}


module.exports = {download}

// downLoadOne('https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg','xx','/me.png')

