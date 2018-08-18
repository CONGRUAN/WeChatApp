// listtest/listtest.js
var WXGrid = require('../wxgrid/wxgrid.js')


// var WXGrid = require('../../js/wxgrid.js')
var wxgrid = new WXGrid;
// wxgrid.init(99, 10);
var img = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erpwPOvDPjA7Wnc9kUYw0zmt9UIgsWqLnfCg6GWbX42bQlwm904X7ztBz8bEDxAsLyvYu2PKbvqUg/132";
var classifies = new Array()
var app = getApp()
Page({
  data: {
    wxgrid,
    size: classifies.length
  },
  onLoad: function () {

    this.getdata()
  }, loadmore: function () {
    this.getdata()

  }, getdata: function () {
    var temp = {
      imageurl: img
    }
    for (var i = 0; i < 1; i++) {
      temp = {
        imageurl: img,
        name:i+"adsas"
      }
      classifies.push(temp)
    }
    // console.log()
    wxgrid.init(classifies.length / 3, 3)
    // wxgrid.setRowsHeight(150, 1)

    wxgrid.data.add("classifies", classifies);
    this.setData({
      wxgrid
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