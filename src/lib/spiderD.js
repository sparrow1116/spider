const https = require("https");
const http = require("http");

class Spider{
    
    constructor(options){
        // this.url = options.url;
        // this.init();
    }
    getHtml(url){
        this.choseProtocol(url);
        return new Promise((resolve,reject)=>{
            try{
                let req = this.http.request(url,(res)=>{
                    let chunks = [];
                    res.on("data",(c)=>{
                        chunks.push(c);
                    })
                    res.on("end",()=>{
                        let htmlStr = Buffer.concat(chunks).toString("utf-8");
                        resolve(htmlStr);
                    })
                });
                req.end();
            }catch(e){
                reject(e.stack);
            }
            
        });  
    }
    choseProtocol(url){
        if(url.startsWith("https:")){
            this.http = https;
        }else{
            this.http = http;
        }
    }
}

module.exports = Spider;
