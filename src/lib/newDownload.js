const request = require("request");
const fs = require("fs");
 

  /**
	 * 下载网络图片
	 * @param {object} opts 
	 */
  async function downImg(opts = {}, path = '') {
    return new Promise((resolve, reject) => {
      request
        .get(opts)
        .on('response', (response) => {
          console.log("img type:", response.headers['content-type'])
        })
        .pipe(fs.createWriteStream(path))
        .on("error", (e) => {
          console.log("pipe error", e)
          resolve('');
        })
        .on("finish", () => {
          console.log("finish");
          resolve("ok");
        })
        .on("close", () => {
          console.log("close");
        })
 
    })
  };

 
  async function main () {

     let opt = {
         url: 'https://cdn.haoyangmao8.com/zb_users/upload/2020/09/20200916093042_44026.jpg',
         headers: {
            'Referer': 'https://www.haoyangmao8.com/',
          }
        //  url:'https://img.alicdn.com/tps/i4/https://img.alicdn.com/tps/i4//TB1ySjSSNv1gK0jSZFFSuv0sXXa.jpg_240x240q90.jpg'
     }
     
    let path = "./1.jpg"
    let dd = await downImg(opt,path)
    console.log(dd)
  }

  main()

//   let r1 = await Ut.downImg(opts, path);