/**
 * Created by zyj on 2020/9/14.
 */
const fetch = require('node-fetch');
const BaseUrl = require('../config').serverUrl
const fs = require('fs')

var data=fs.readFileSync('../wankahaoyangmao/detailArr.json',"utf8")
console.log('readfs data::')
fetch(BaseUrl+'/api/saveBankDetailList',{
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