// pages/prize/prizelist.js
var Type1 = 'all'
var app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}
// var flag = '0'
// var indexgoing = 1;
// var indexfinish = 1;
// var arraygoing = [];
// var arrayfinish = [];
Page({

  /**
   * 页面的初始数据
   */

  data: {
    flag :'0',
    indexgoing : 1,
    indexfinish : 1,
    arraygoing: [],
    arrayfinish: [],
    going: 'going',
    finish: 'finish',
    showgoing: true,
    isLuck: false,
    TotalPage: 0,
    TotalPagefinish: 0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Type1 = options.type
    console.log(options)
    var title = ''
    if (Type1 == 'all') {
      title = "全部抽奖"
    }
    if (Type1 == 'create') {
      title = "我发起的"
    }
    if (Type1 == 'lucky') {
      title = "中奖纪录"
      this.setData({
        isLuck: true
      })
    }
    wx.setNavigationBarTitle({
      title: title,
    })
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

  getlist: function() {
    var indexgoing = this.data.indexgoing
    var indexfinish = this.data.indexfinish
    var flag = this.data.flag
    var index = '0' == flag ? indexgoing : indexfinish
    var bodyjson = {
      token: wx.getStorageSync('token'),
      openId: wx.getStorageSync('openId'),
      type: Type1,
      flag: flag,
      index: index
    }
    var that = this
    httputil.commonrequest(app.globalData.mylist, bodyjson, function(res) {
      console.log("回调成功" + JSON.stringify(res.data))
      var temp = new Array()
      
      ResPonse = res
      if ('0' == flag) {
        temp = that.data.arraygoing
        for (var i = 0; i < res.Data.length; i++) {
          temp.push(res.Data[i])
          if (that.data.indexgoing == 1&&i==0) {
            that.setData({
              TotalPage: res.Data[0].TotalPage
            })
          }
        }

        that.setData({
          arraygoing: temp
        })
      } else {
        temp = that.data.arrayfinish
        for (var i = 0; i < res.Data.length; i++) {
          temp.push(res.Data[i])
          if (that.data.indexfinish==1){
            if (that.data.indexfinish == 1 && i == 0){
           that.setData({
             TotalPagefinish: res.Data[0].TotalPage
           })
         }
        }
        }
        console.log("TotalPagefinish:",that.data.TotalPagefinish)
        console.log("TotalPagefinish:", temp)

        that.setData({
          arrayfinish: temp
        })
      }



    }, function(res) {
      console.log("回调失败" + res)

    })
  },
  itemclick: function(e) {
    var item = e.currentTarget.dataset.hi;
    if (item.IsClient) {
      wx.navigateTo({
        url: '../mycreatdetail/mycreatdetail?Id=' + item.Id,
      })
    } else {
      wx.navigateTo({
        url: '../activitydetail/activitydetail?Id=' + item.Id,
      })
    }
  },
  loadmore: function() {
    if ('0' == this.data.flag) {
      // console.log('indexgoing', this.data.indexgoing)
      // this.data.indexgoing++
      // indexgoing++
      // console.log('indexgoing', this.data.indexgoing)
      var tempindex = this.data.indexgoing+1
      this.setData({
        indexgoing: tempindex
      })
      this.getlist()
    } else {
      // console.log('indexfinish', this.data.indexfinish)
      // this.data.indexfinish++
      this.setData({
        indexfinish: this.data.indexfinish + 1
      })
      // console.log('indexfinish', this.data.indexfinish)
      this.getlist()
    }


  },
  going: function() {
    this.setData({
      finish: 'finish',
      going: 'going',
      showgoing: true
    })
    this.data.flag = '0'
   if(this.data.arraygoing.length==0){
     this.getlist()
   }
  },
  finish: function() {

    this.setData({
      finish: 'going',
      going: 'finish',
      showgoing: false
    })
    this.data.flag = '1'
    if (this.data.arrayfinish.length == 0) {
      this.getlist()
    }
  }
})