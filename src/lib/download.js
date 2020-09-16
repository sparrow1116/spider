/**
 * Created by zyj on 2020/8/12.
 */
const download = require("download");

function downloadImgArr(urlArr,dest,newName){
    let destPath = dest?dest:"dest";

    return Promise.all(urlArr.map((x,index)=>{
        // console.log("x>>>>index:: " + index)
        if(newName){
            return download(x,destPath,{filename:newName[index]});
        }else{
            return download(x,destPath);
        }

    }))
};

module.exports = {
    download:downloadImgArr
}
