const fetch = require('node-fetch');
const BaseUrl = require('../config').serverUrl
const fs = require('fs')

var data=fs.readFileSync('../wankahaoyangmao/result.json',"utf8")
console.log('readfs data::')
fetch(BaseUrl+'/api/saveList',{
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