// listtest/listtest.js
var WXGrid = require('../wxgrid/wxgrid.js')
var app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
// var WXGrid = require('../../js/wxgrid.js')
var wxgrid = new WXGrid;
// wxgrid.init(99, 10);
// wxgrid.setRowsHeight(50,2)
var img = "http://pic.qqtn.com/up/2016-9/20169281936395677.png";
var classifies = new Array()
var id;
var index =1;

var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}

Page({
  data: {
    classifiesdata:[],
    wxgrid,
    size: classifies.length,
    loadmore:'查看更多>'
  },

  onUnload:function(){
    // classifies.length = 0;
    index=1
  },

  onLoad: function (option) {
    id = option.Id
    console.log('-----------',id)
    this.getdata(false)
  },
  onShow:function(){
   
  },
  loadmore: function () {
    index++
    this.getdata(true)
    this.setData({
      loadmore:'加载中...'
    })

  }, getdata: function (loadmore) {
    var templist = this.data.classifiesdata
    var _this = this
    var bodyjson={
      token:wx.getStorageSync('token'),
      openId:wx.getStorageSync('openId'),
      index:index,
      id:id
    }
    httputil.commonrequest(app.globalData.getjoinUserHeadImg, bodyjson, function (res) {
      ResPonse = res

      var temp = {
        imageurl: img
      }
      for (var i = 0; i < ResPonse.Data.length; i++) {
        temp={
          imageurl: ResPonse.Data[i].HeadImgUrl
        }
        templist.push(temp)
    
      }

      // classifies.push(ResPonse.Data)
      // console.log('headimg', ResPonse.Data)
      // console.log(JSON.stringify(ResPonse.Data))
      wxgrid.init(templist.length / 10, 10)
      wxgrid.data.add("classifies", templist);
      _this.setData({
        classifiesdata:templist,
        wxgrid,
        size: templist.length
      })
      if(loadmore){
        _this.setData({
          loadmore:'查看更多>'
        })
      }

    }, function (res) {

    })


   
    
  }


})






























// var wxgrid = new WXGrid;
// wxgrid.init(2, 3);
// // wxgrid.setRowsHeight(100, 2);
// // wxgrid.setColsWidth(100, 2);
// var app = getApp()


// var classifies = [
//   { name: "领聘1" },
//   { name: "领聘2" },
//   { name: "领聘3" },
//   { name: "领聘4" },
//   { name: "领聘5" },
//   { name: "领聘6" }]
// wxgrid.data.add("classifies", classifies);   //将一维数组转换为二维数组
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     wxgrid,

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     // var arrays = new Array();
//     // for(var i = 0;i<100;i++){
//     //   var temp = {
//     //     'message':i
//     //   }
//     //   arrays[i] = temp
//     // }
//     // this.setData({
//     //   array : arrays
//     // })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })