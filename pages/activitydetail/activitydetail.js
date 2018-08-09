// pages/activitydetail/activitydetail.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var bodyjson
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    containclass: 1,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemId = options.Id
    bodyjson = {
      token:wx.getStorageSync('token'),
      Id:itemId,
      openId:wx.getStorageSync('openId')
    }
   this.getdata(bodyjson)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onTabItemTap(item){
    console.log(item) 
     console.log(9999)

  },
  /**
   * 发起活动点击事件
   */
  createaction(e){
    console.log(e)
    console.log(123)
    wx.switchTab({
      url: '../createactivity/createactivity',
    })
  // wx.navigateTo({
  //   // url: '../createactivity/createactivity',
  //   success: function(res) {},
  //   fail: function(res) { console.log(res)},
  //   complete: function(res) {},
  // })
  },
  submit:function(res){
    var info = wx.getStorageSync('userinfo')
    var formid = res.detail.formId
    console.log(res.detail.formId);
    var bodyjson =  {
      token:wx.getStorageSync('token'),
      luckyDrawId:ResPonse.Data.Id,
      openId:wx.getStorageSync('openId'),
      formId: formid,
      headImgUrl: info.avatarUrl,
      joinType:'join'
    }
    // var info = wx.getStorageSync('userinfo')
    if (app.globalData.hasUserInfo){
      console.log('存在用户信息')
      httputil.commonrequest(app.globalData.joinactivity,bodyjson,function(res){
        ResPonse = res
        console.log(ResPonse.Data)
      },function(res){

      })

    }else{
      
      app.getUserInfo(res)
      wx.setStorageSync('userinfo', res.detail.rawData)
      
      console.log('不存在用户信息')
    }

    
  },
  getdata:function(bodyjson){
    var that =  this
    httputil.commonrequest(app.globalData.getactivitydetail,bodyjson,function(res){
          ResPonse  = res
          that.setData({
            data:ResPonse.Data
          })
        console.log(JSON.stringify(ResPonse.Data))

     
    },function(res){

    })
  }
})