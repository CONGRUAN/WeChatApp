// pages/activitydetail/activitydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containclass: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  btn_join_click(res){
    this.setData({
      containclass:2
    })
    // var box = res.currentTarget.id;

    // console.log(res)
    // box.style.left = 100 + "px";
    // box.style.top = 0 + "px";
    // box.style.transitionTimingFunction = "ease";
  },
})