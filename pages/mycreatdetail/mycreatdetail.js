// pages/createactivity/createactivity.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
/**
 * toast提示框
 */
var toast = require('../../utils/toast/toast.js');

var ResPonse = {
  Code: '0000',
  Msg: '',
  data: null
}
var bodyjson
Page({

  /**
   * 页面的初始数据
   */

  data: {
    data:null,
    IsJoin:false,
    imagepath:'../../images/222.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // id ac89b870 - 59ff - 4417 - 9618 - 3cd3aa173e56
    var itemId = options.Id
    // var itemId = 'ac89b870-59ff-4417-9618-3cd3aa173e56'
    bodyjson = {
      token: wx.getStorageSync('token'),
      Id: itemId,
      openId: wx.getStorageSync('openId')
    }
    this.getdata(bodyjson)
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
    var temp
    var that = this



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
    // wx.showTabBar({

    // })
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
    return {
      title: '惊喜一刻',
      desc: '领福利啦!',
      path: '/page/mycreatdetail/mycreatdetail?Id='+ResPonse.data.Id
    }
  },


  getdata: function(bodyjson) {
    var that = this
    httputil.commonrequest(app.globalData.getactivitydetail, bodyjson, function(res) {
      ResPonse = res
      var url = ResPonse.Data.ImageUrl
      if(url!=null){
        that.setData({
          imagepath:url
        })
      }
      that.setData({
        data: ResPonse.Data,
        IsJoin: ResPonse.Data.IsJoin,
      })
      console.log(JSON.stringify(ResPonse.Data))


    }, function(res) {

    })
  }, submit: function (res) {

    var tt = this
    if (tt.data.IsJoin){
      //全屏可点击 默认1500ms 类似android toast
      toast.showToastDefault(tt, '你已参与，分享给好友吧')
      return
    }
    var info = wx.getStorageSync('userinfo')
    var formid = res.detail.formId
    console.log(res.detail.formId);
    var bodyjson = {
      token: wx.getStorageSync('token'),
      luckyDrawId: ResPonse.Data.Id,
      openId: wx.getStorageSync('openId'),
      formId: formid,
      nickname: info.nickName,
      headImgUrl: info.avatarUrl,
      joinType: 'join'
    }
    // var info = wx.getStorageSync('userinfo')
    if (app.globalData.hasUserInfo) {
      console.log('存在用户信息')
      httputil.commonrequest(app.globalData.joinactivity, bodyjson, function (res) {
        ResPonse = res
        console.log(ResPonse.Data)
        toast.showToastDefault(tt, '参与成功')
        tt.setData({
          IsJoin:true
        })
      }, function (res) {
        toast.showToastDefault(tt, '参与失败：'+res.Data.Msg)
      })

    } else {

      app.getUserInfo(res)
      wx.setStorageSync('userinfo', res.detail.rawData)

      console.log('不存在用户信息')
    }


  },
  
  /**
   * 发起活动点击事件
   */
  createaction(e) {
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
  joindetail: function () {
    wx.navigateTo({
      url: '../joinlist/joinlist?Id=' + this.data.data.Id
    })
  }
})