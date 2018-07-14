var app = getApp()
var commonurl = app.globalData.commonurl

//获取首页活动列表 和 广告信

function getactionlist(bodyjson){
  wx.request({
    header: {
      // 'content-type': 'application/json'
      'Content-Type': 'json'
    },
    url:commonurl +app.globalData.actionlisturl,
    method:'POST',
    data:bodyjson,
    success:function(res){
      
    console.log(res)
    },fail:function(res){
      console.log(res)

    }
  })

}


function commonrequest(url,bodyjson,successed,fault){
  
  console.log(commonurl + url + JSON.stringify(bodyjson))
  wx.request({
    header: {
      // 'content-type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: commonurl + url,
    method: 'POST',
    data:bodyjson,
  
    success: function (res) {
      console.log("请求成功"+res.data)
      successed(res)
    }, fail: function (res) {
      console.log("请求失败")
      fault(res)

    }
  })
}
module.exports ={
  getactionlist: getactionlist,
  commonrequest: commonrequest,
} 