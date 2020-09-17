const request = require("request");
const fs = require("fs");

function isFileExisted(path_way) {
    return new Promise((resolve, reject) => {
        fs.access(path_way, (err) => {
            if (err) {
                fs.mkdir(path_way, (err) => {
                    if (err) {
                        rej(false)
                        // return console.log('该文件不存在，重新创建失败！')
                    }
                    // console.log("文件不存在，已新创建");
                    resolve(true)
                });
                // reject(false);
            } else {
                resolve(true);
            }
        })
    })
};
 
  async function downImg(opts = {}, path = '') {
    return new Promise((resolve, reject) => {
      request
        .get(opts)
        .on('response', (response) => {
        //   console.log("img type:", response.headers['content-type'])
        })
        .pipe(fs.createWriteStream(path))
        .on("error", (e) => {
          console.log("pipe error", e)
          resolve(false);
        })
        .on("finish", () => {
        //   console.log("finish");
          resolve(true);
        })
        .on("close", () => {
        //   console.log("close");
        })
 
    })
  };

  async function downArr (urlArr,dest,nameArr){
    let destPath = dest?dest:"dest"; 
    await isFileExisted(destPath)
      let pArr = []
    for(let i = 0; i<urlArr.length; i++){
        let opt = {
            url:urlArr[i],
            headers: {
                'Referer': 'https://www.haoyangmao8.com/',
            }
        }
        let p = downImg(opt,dest + '/' + nameArr[i])
    }
    return Promise.all(pArr);
  }
 

module.exports = {downArr}