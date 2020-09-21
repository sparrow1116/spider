const fetch = require('node-fetch');
const BaseUrl = require('../config').serverUrl

// {
//     title: '京东（爱奇艺+京东年卡）',
//     description: [ '118元可开通：京东Plus年卡+爱奇艺年卡' ],
//     detailUrl: 'http://mp.weixin.qq.com/s?__biz=MzIzMDgxODc4Nw==&mid=2247499588&idx=1&sn=17f9069a434430bd0cc860a90d06bd73&chksm=e8af29c8dfd8a0def1dbf9dd42cee28aafa792b90eb2500c0143f367db3537869dd159ac958a&scene=21#wechat_redirect',
//     router: '活动入口：活动细则扫码/本公众号回复“京东年卡”',
//     time: 1599753600000,
//     inputDate: '2020-09-09',
//     ID: 'ca182db1-2dcb-4172-b0c2-4f7700a7bd47',
//     groupArr: [ '平台|代金券', '视频卡' ],
//     commercial: '京东'
//   }

fetch(BaseUrl+'/api/fourweborginal/detailItem',{
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({myId:'43b24024-31a2-4387-88fb-f12bd969e78c'})
    
}).then(function(response) {
    console.log('back')
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