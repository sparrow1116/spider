var fs = require('fs');
const { isRegExp } = require('util');



let bankArr = JSON.parse(fs.readFileSync("../data/bank.json",'utf8'));
let strucData = JSON.parse(fs.readFileSync("../data/dataAl.json",'utf8'));

let newDataArr = []

async function dealWithDate(){

    let dataArr = JSON.parse(fs.readFileSync("./frontPage.json",'utf8'));
    let dataLen = dataArr.length;
    let bankLen = bankArr.length;
    // console.log("dataLen>>" + dataLen)
    // console.log("bankLen>>" + bankLen)
    for(let i = 0; i<dataLen; i++){
        let len = Object.keys(dataArr[i]).length

        if(len > 0){
            let hasBank = false;
            for(let j = 0; j<bankLen; j++){

                // console.log(dataArr[i].title)
                if(dataArr[i].title){
                    if(dataArr[i].title.indexOf(bankArr[j])>=0){
                        hasBank = true;
                        if(bankArr[j] == "掌上生活"){
                            dataArr[i]["bank"] = "招商"
                        }else if(bankArr[j] == "融e购"){
                            dataArr[i]["bank"] = "工行"
                        }else{
                            dataArr[i]["bank"] = bankArr[j];
                        }
                        // newDataArr.push(dataArr[i]);
                        break;
                    }
                }else{
                    console.error(JSON.stringify(dataArr[i]))
                }
                
            }
            if(!hasBank){
                console.warn("没有找到属于哪个银行:");
                console.log(dataArr[i])
            }

            let dataArrStr = ""
            dataArrStr = dataArr[i].title + dataArr[i].router;
            for(let kk = 0; kk<dataArr[i].description.length;kk++){
                dataArrStr = dataArrStr + dataArr[i].description[kk];
            }
            // console.log("dataArrStr:: " + dataArrStr)

            dataArr[i].groupArr = [];
            for(let key in strucData){
                let struclen = strucData[key].length;
                // console.log("struclen>>>> " + struclen);
                for(let k = 0; k<struclen;k++){
                
                    if(dataArrStr.indexOf(strucData[key][k])>=0){
                        if(!dataArr[i].commercial){
                            dataArr[i].commercial = strucData[key][k];
                        }
                        
                        dataArr[i].groupArr.push(key);
                        break;
                    }
                }

            }
            newDataArr.push(dataArr[i])

        }
    }

    fs.writeFileSync("result.json",JSON.stringify(newDataArr),'utf8');

    let allLen = newDataArr.length;
    console.log("allLen::" + allLen)
    for(let i = 0; i<allLen;i++){
        if(newDataArr[i].groupArr.length ===0 ||  !newDataArr[i].commercial){
            console.log("没找到 商户 或者组：");
            console.log(newDataArr[i]);
        }
    }
}





// dealWithDate();
// console.log(newDataArr)
module.exports = dealWithDate;

