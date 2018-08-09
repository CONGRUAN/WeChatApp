// pages/createactivity/createactivity.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var itemlist = []
var prizeTypelist = []

var imageBase64 = ''
var typeindex = 0;
var connditionIndex = 0;
var prizeName=''
var prizeNum =''
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}
Page({
  onTabItemTap: function(item) {
    console.log(5432)
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  /**
   * 页面的初始数据
   */

  data: {
    inputdetailenable:true,
    hasUserInfo: false,
    canIUse: app.globalData.canIUse,
    lottery_way: [itemlist[0]],
    prize_type: prizeTypelist[0],
    lottery_flag: 0,
    imagepath: app.globalData.imageurl,
    prizename: '',

    prizeamount: 0,
    lottery_time: '',
    lottery_detail_title:'开奖时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
  that.getLottery_way(1)
    that.getLottery_way(0)
    
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
    // that.setData({
    //   imagepath: app.globalData.imageurl,

    // })
    temp = app.globalData.imageurl
    console.log(temp)
    // var reader = Base64.CusBASE64.encoder(temp)
    // console.log("base64:" + reader)
    // var base64 = 'data:image/png;base64,' + reader

    wx.request({
      url: temp,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function(res) {
        var base64 = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(res.data);
        imageBase64 = base64
        console.log(base64)
        that.setData({
          imagepath: base64
        })

      }
    })
    // wx.hideTabBar({

    // })
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

  },
  /**
   * 选择开奖方式
   */
  change_lottery_way: function(event) {
    // console.log(event.target.dataset)
    var flag = event.target.dataset.hi
    // console.log(123);
    var tt = this;
    if(flag==1){
      wx.showActionSheet({

        itemList: tt.getArrayFromobj(1,itemlist),
        success: function (res) {

          console.log(itemlist[res.tapIndex]);
          // itemlist[res.tapIndex]
          tt.setData({
            prize_type:itemlist[res.tapIndex]
          })
          typeindex = res.tapIndex
        },
        fail: function (res) {
          console.log('fail');

        }
      })
    }else{
      wx.showActionSheet({

        itemList: tt.getArrayFromobj(2, prizeTypelist),
        success: function (res) {

          console.log(itemlist[res.tapIndex]);
          // itemlist[res.tapIndex]
          tt.setData({
            lottery_way
            : prizeTypelist[res.tapIndex]
          })
          connditionIndex = res.tapIndex

          var title = tt.data.lottery_way.Name
          var isinputenable = title.indexOf('人数') == -1 ? true : false
          console.log(title+":"+isinputenable)
          tt.setData({
            lottery_detail_title: title,
            inputdetailenable: isinputenable,
          })


        },
        fail: function (res) {
          console.log('fail');

        }
      })
    }

    

  },
  /**
   * 修改奖品图片
   */
  changeimage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function(res) {
        // wx.getImageInfo({
        //   src: res.tempFilePaths[0],
        //   success: function (res) {
        //     //console.log(res.width);
        //     //console.log(res.height);
        //     console.log('选择图片成功')
        //   
        //   },fail:function(res){
        // console.log('选择图片失败')
        //   }
        // })
        console.log('发送路径' + res.tempFilePaths[0])
        wx.navigateTo({
          url: '../chooseimage/chooseimage?image=' + res.tempFilePaths[0],
        })

      },
      fail: function() {
        console.log('选择图片失败')
      }
    })
  },
  //获取开奖方案
  getLottery_way: function(flag) {
    var that = this
    var bodymap
    if (flag == 1) {
      bodymap = {
        token: wx.getStorageSync('token'),
        type: 'Type'
      }

    } else {
      bodymap = {
        token: wx.getStorageSync('token'),
        type: 'Conditions'
      }
    }

    httputil.commonrequest(app.globalData.getprizeAndlottery,bodymap,function(res){
      console.log('getprizeAndlottery:'+res)
      ResPonse = res
      var list = ResPonse.Data
     if(flag==1){
       itemlist = list
       that.setData({
         prize_type:list[0]
       })
     }else{
       prizeTypelist = list
       that.setData({
         lottery_way: list[0]
       })
     }

    },function(error){
      console.log('getprizeAndlottery:' + error)

    })


  },
  createaction: function(e) {
    if (app.globalData.hasUserInfo) {
      console.log('存在用户信息')
      this.luncheraction()

    } else {
      console.log('不存在用户信息')
      app.getUserInfo(e)
      wx.setStorageSync('userinfo', e.detail.rawData)
    }
  },
  luncheraction: function() {
    var bodyjson = {
      token: wx.getStorageSync('token'),
      launcher: 'client',
      openId: wx.getStorageSync('openId'),
      prizeName: prizeName,
      prizeImgBase64Str: imageBase64,
      prizeNum: prizeNum,
      type: itemlist[connditionIndex].Id,
      condition: prizeTypelist[typeindex].Id,
      joinUserNum: '123',
      startTime: '2018-02-21'


    }


    httputil.commonrequest(app.globalData.createactivity, bodyjson, function(res) {
      // console.log("回调成功"+JSON.stringify(res))
      // var jsonO = eval(res.data);
      ResPonse = res
      var list = ResPonse.Data
// 
      if (ResPonse.Code==8888){
        wx.showToast({
          title: '发起成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: '发起失败',
          icon: 'success',
          duration: 2000
        })
      }

    
    }, function(res) {
      
      console.log("回调失败" + res)

    })

    console.log('发起活动')

  },getArrayFromobj:function(flag,obj){
    
    var res = new Array(obj.length)
    if(flag==1){
      for (var i=0; i < obj.length; i++) {
        res[i] = obj[i].Name
      }
      console.log("itemlist" + res)
      return res
    }else{
      for (var i=0; i < obj.length; i++) {
        res[i] = obj[i].Name
      }
      console.log("itemlist"+res)
      return res
    }
    
  },
  prizeNameInput:function(e){
      prizeName = e.detail.value
  },
  prizeNumInput:function(e){
    prizeNum = e.detail.value
  }, lottery_click:function(){
    console.log('lottery_click')
  }



})