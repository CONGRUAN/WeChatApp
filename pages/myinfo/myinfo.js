//index.js
//获取应用实例
const app = getApp()
const httputil = require("../../pages/httputils/httputil.js")

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    this.getMyInfo()
  },

  address:function(e){
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },

  toRecommendation:function(e){
    wx.navigateTo({
      url: '../recommendation/recommendation',
    })
  },

  tolist:function(e){
    console.log(11)
    wx.navigateTo({
      url: '../prize/prizelist',
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getMyInfo:function(){
    var that = this;
    var bodyjson = {
      token: app.globalData.token,
    }

    httputil.commonrequest(app.globalData.myInfo, bodyjson, function (res) {
      console.log("回调成功" + JSON.stringify(res.data))
      // var jsonO = eval(res.data);
      var list = res.data
      console.log("ss" + list[0].PrizeName)

      that.setData({
        actionlist: list
      })
    }, function (res) {
      console.log("回调失败" + res)

    })
  }
})
