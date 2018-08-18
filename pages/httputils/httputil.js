var app = getApp()
var commonurl = app.globalData.commonurl

//获取首页活动列表 和 广告信
var ResPonse={
  Code:'0000',
  Msg:'',
  Data:null
}


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
      var code = res.data.Code
      ResPonse.Code = res.data.Code
      ResPonse.Msg = res.data.Msg
      ResPonse.Data = res.data.Data
      console.log('======',res)
      console.log("请求成功:code:" + code + "=Data:" + res.data.Data + "=Msg:" + res.data.Msg)

      if(code==8888){
        successed(ResPonse)
      }else{
        wx.showToast({
          title: '错误码：'+code,
        })
      }
      
    }, fail: function (res) {
      // ResPonse.Code = res.data.Code
      // ResPonse.Msg = res.data.Msg
      // ResPonse.Data = res.data.Data
      // console.log("请求失败:code:" + code + "=Data:" + res.data.Data + "=Msg:" + res.data.Msg)
      console.log(res)
      fault(ResPonse)
      wx.showToast({
        title: '服务器繁忙，请稍候再试',
      })
    }
  })
}
module.exports ={
  getactionlist: getactionlist,
  commonrequest: commonrequest,
} 