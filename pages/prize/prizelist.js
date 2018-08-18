// pages/prize/prizelist.js



var Type1 = 'all'
var app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
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
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Type1 = options.type
    console.log(options)
    this.getlist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

getlist:function(){
  var bodyjson={
    token: wx.getStorageSync('token'),
    openId: wx.getStorageSync('openId'),
    type:Type1
  }
  var that = this
  httputil.commonrequest(app.globalData.mylist, bodyjson, function (res) {
    console.log("回调成功" + JSON.stringify(res.data))
    ResPonse = res



    that.setData({
      array: ResPonse.Data
    })
  }, function (res) {
    console.log("回调失败" + res)

  })
},
itemclick:function(e){
  var item = e.currentTarget.dataset.hi;
  if (item.IsClient){
      wx.navigateTo({
        url: '../mycreatdetail/mycreatdetail?Id='+item.Id,
      })
  }else{
    wx.navigateTo({
      url: '../activitydetail/activitydetail?Id=' + item.Id,
    })
  }
}

})