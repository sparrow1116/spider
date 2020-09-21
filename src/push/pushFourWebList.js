const fetch = require('node-fetch');
const BaseUrl = require('../config').serverUrl
const fs = require('fs')

var butaolu = fs.readFileSync('../butaolu/list.json',"utf8")
var haoyangmao8 = fs.readFileSync('../haoyangmao8/list.json',"utf8")
var jiuaiyangmao = fs.readFileSync('../jiuaiyangmao/list.json',"utf8")
var yangmaoduo = fs.readFileSync('../yangmaoduo/list.json',"utf8")

console.log('readfs data::')

butaolu = JSON.parse(butaolu)
haoyangmao8 = JSON.parse(haoyangmao8)
jiuaiyangmao = JSON.parse(jiuaiyangmao)
yangmaoduo = JSON.parse(yangmaoduo)


let data = butaolu.concat(haoyangmao8,jiuaiyangmao,yangmaoduo)

data = JSON.stringify(data)

fetch(BaseUrl+'/api/fourweborginal/saveWebList',{
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    body: data,

}).then(function(response) {

    return response.json();
}).then(
    function(myBlob){
        console.log(myBlob);
    }
).catch(
    function(error){
        console.log(error)
    }
)