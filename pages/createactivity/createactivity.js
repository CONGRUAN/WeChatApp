// pages/createactivity/createactivity.js
const app = getApp()
var Base64 = require("../../utils/base64.js")
var itemlist = ['按时间自动开奖', '按人数自动开奖', '手动开奖', '现场开奖']

Page({
  onTabItemTap:function(item) {
    console.log(5432)
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  /**
   * 页面的初始数据
   */
 
  data: {
      hasUserInfo:false,
      canIUse: app.globalData.canIUse,
    lottery_way:[itemlist[0]],
    lottery_flag:0,
    imagepath: app.globalData.imageurl,
    prizename:'',
    prizeamount:0,
    lottery_time:'',
    imageBase64:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('11'+that.data.imagepath)
    console.log('11' + app.globalData.imageurl)
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
    var temp
    var that = this
    that.setData({
      imagepath: app.globalData.imageurl,
     
    })
    temp = that.data.imagepath
    console.log(temp)
    var reader = Base64.CusBASE64.encoder(temp)
    console.log("base64:"+reader)
    // wx.hideTabBar({
      
    // })
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
  // wx.showTabBar({
    
  // })
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
  /**
   * 选择开奖方式
   */
  change_lottery_way:function(){
  console.log(123);
  var tt = this;
  wx.showActionSheet({
  
    itemList: itemlist,
    success:function(res){
    
      console.log(itemlist[res.tapIndex]);
      // itemlist[res.tapIndex]
      tt.setData({
        lottery_way: itemlist[res.tapIndex]
      })

    },fail:function(res){
      console.log('fail');

    }
  })
  },
  /**
   * 修改奖品图片
   */
  changeimage:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
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
        console.log('发送路径'+res.tempFilePaths[0])
        wx.navigateTo({
          url: '../chooseimage/chooseimage?image='+res.tempFilePaths[0],
          })

      },fail:function(){
        console.log('选择图片失败')
      }
    })
  }
,
//获取开奖方案
getLottery_way:function(){

},
  createaction:function(e){
    if (app.globalData.hasUserInfo){
      console.log('存在用户信息')
      this.luncheraction()

    }else{
      console.log('不存在用户信息')
      app.getUserInfo(e)
    }
  },
  luncheraction:function(){
    
  console.log('发起活动')

  }



})