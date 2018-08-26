//index.js
//获取应用实例
var app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}

Page({
  data: {
    data:null,
    userInfo: null,
    hasUserInfo: false,
    nickName:'',
    imageurl:'../../images/avatar.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    
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

onShow :function(){
  this.getMyInfo()
  console.log('显示')
  // tt = this
  var info = wx.getStorageSync('userinfo')
  console.log('info',info)
  if(''!=info){
    this.setData({
      imageurl: info.avatarUrl,
      nickName:info.nickName
    })
  }
  
},
  toRecommendation:function(e){
    wx.navigateTo({
      url: '../recommendation/recommendation',
    })
  },

  toProblem:function(e){
    wx.navigateTo({
      url: '../common/problem',
    })
  },

  tolist:function(e){
    console.log(11)
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../prize/prizelist?type='+type,
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    this.setData({
      // userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getMyInfo:function(){
    var that = this;
    var bodyjson = {
      token: wx.getStorageSync('token'),
      openId:wx.getStorageSync('openId')
    }

    httputil.commonrequest(app.globalData.myInfourl, bodyjson, function (res) {
      console.log("回调成功" + JSON.stringify(res.data))
      // var jsonO = eval(res.data);
      // var list = res.data
      ResPonse = res

     

      that.setData({
        data: ResPonse.Data
      })
    }, function (res) {
      console.log("回调失败" + res)

    })
  }
})
