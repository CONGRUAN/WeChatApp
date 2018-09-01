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
        fault(res)
        if(code==2222){
          wx.showToast({
            title: code+"数据处理失败",
          })
        }
        if (code == 3000) {

          
          wx.showToast({
            title: code + "token过期",
          })
        }
        if (code == 3001) {
          wx.showToast({
            title: code + "token无效",
          })
        }
        if (code == 3001) {
          wx.showToast({
            title: code + "token为空",
          })
        }
        if (code == 4000) {
          wx.showToast({
            title: code + "已参与抽奖",
          })
        }
        if (code == 4444) {
          wx.showToast({
            title: code + "数据达上限",
          })
        }
        if (code == 5000) {
          wx.showToast({
            title: code + "活动结束",
          })
        }
       
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