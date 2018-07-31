// pages/mainpage/mainpage.js
var app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var order = ['red', 'yellow', 'blue', 'green', 'red']
var falsedata = [{id:1,prizename:'iponeX',prizenum:10,starttime:'2018-09-08 10:00:00',sponsors:'大鸡吧',imageurl:''},{id:2,prizename:'iponeY',prizenum:11,starttime:'2018-09-08 10:00:00',sponsors:'大鸡吧1',imageurl:''}]

var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}

Page({
  onTabItemTap(item) {
    console.log(5432)
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },

  /**
   * 页面的初始数据
   */
  data: {
    //banner
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,


    actionlist:[],
    toView: 'red',
    scrollTop: 100,



   
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  
  listitem_click:function(e){
    console.log('点了')
    var $item = e.currentTarget.dataset.item; //打印可以看到，此处已获取到了对应的id 
    console.log($item)
    // console.log(item)   
    var data = JSON.stringify($item)

    wx.navigateTo({
      url: '../activitydetail/activitydetail?data=' + data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("没有拥有userInfo")
          wx.authorize({
            scope: 'scope.userInfo' ,
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
              wx.getUserInfo({
                
              })
              console.log("授权成功")
            },fail(){
              console.log("授权失败")
            }
          })
        }else{
          console.log("拥有userInfo")
        }
      }
    })


    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync('userinfo', res.userInfo);
            }
          })
        }else{
            console.log("需要授权")
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var body={
      a:'123'
    }
    // httputil.getactionlist(body);
    this.getactionList();
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
  console.log('赢藏')
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
  onTabItemTap(item) {
    console.log(item)
    console.log(9999)

  },
  shareaction:function(){
    wx.canIUse(string)
    console.log('页面分享')
    this.onShareAppMessage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('自己的分享')
    return {
      title: '91dj8',
      desc: '推荐个有趣的小程序给你!',
      path: '/page/user?id=123'
    }

  },

getactionList:function(){
  var that = this;
  var bodyjson={
    token: wx.getStorageSync("token"),
    openId: wx.getStorageSync('openId')
  }
  
  httputil.commonrequest(app.globalData.actionlisturl, bodyjson,function(res){
    // console.log("回调成功"+JSON.stringify(res))
    // var jsonO = eval(res.data);
    ResPonse = res
    var list = ResPonse.Data

    // console.log("ss" + list[0].PrizeName)

    that.setData({
      actionlist:list
    })
  },function(res){
    console.log("回调失败"+res)

  })
},
 

tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }

})