// pages/activitydetail/activitydetail.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
/**
 * toast提示框
 */
var toast = require('../../utils/toast/toast.js');

var bodyjson
var isshare = 0
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
    IsJoin:false,
    containclass: 1,
    data:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemId = options.Id
    if(options.isshare==1){
      isshare=1
    }
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
    var tt = this
    if(ResPonse.Data.IsJoin){
      toast.showToastDefault(tt, '你已参与，分享给好友吧')
      return
    }
    
    var info = wx.getStorageSync('userinfo')
    var formid = res.detail.formId
    console.log(res.detail.formId);
    var jiontype='join'
    if (ResPonse.Data.Type=='team'&& isshare==1){
      jiontype = 'create'
    }

    var bodyjson =  {
      token:wx.getStorageSync('token'),
      luckyDrawId:ResPonse.Data.Id,
      openId:wx.getStorageSync('openId'),
      formId: formid,
      nickname:info.nickname,
      headImgUrl: info.avatarUrl,
      joinType: jiontype//ResPonse.Data.Type
    }
    // var info = wx.getStorageSync('userinfo')
    if (app.globalData.hasUserInfo){
      console.log('存在用户信息')
      httputil.commonrequest(app.globalData.joinactivity,bodyjson,function(res){
        ResPonse = res
        if(res.Code==8888){
            tt.setData({
              IsJoin:true
            })
          toast.showToastDefault(tt, '参与成功')
        }else{
          toast.showToastDefault(tt, '参与失败:'+res.Code)
        }
      },function(res){
        toast.showToastDefault(tt, '参与失败:' + res)
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
          var isjoin = res.Data.IsJoin
          that.setData({
            data:ResPonse.Data,
            IsJoin: isjoin
          })
        console.log(JSON.stringify(ResPonse.Data))

     
    },function(res){

    })
  },
  joindetail:function(){
    // var tt = this
    // console.log('========', tt.data.data.Id)

    // console.log('========', this.data.Id)
    wx.navigateTo({
      url: '../joinlist/joinlist?Id='+this.data.data.Id
    })
  }
})