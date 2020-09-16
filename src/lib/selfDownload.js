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
                        return console.log('该文件不存在，重新创建失败！')
                    }
                    console.log("文件不存在，已新创建");
                });
                reject(false);
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
function downLoad(urlList,dest,newNameList){

}

function downLoadOne(url,dest,newName){
    return new Promise( (res,rej)=>{
        isFileExisted(dest)
            .then(()=>{
                console.log('shit')
            })
        // var writeStream = fs.createWriteStream(dest + newName);
        // var readStream = request(url)
        // readStream.pipe(writeStream);
        // readStream.on('end', function() {
        //     console.log('文件下载成功');
        // });
        // readStream.on('error', function() {
        //     console.log("错误信息:" + err)
        // })
        // writeStream.on("finish", function() {
        //     console.log("文件写入成功");
        //     writeStream.end();
        // });

        // request(url).pipe(fs.createWriteStream(dest+newName))
    })
}


downLoadOne('https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg','xx','/me.png')

