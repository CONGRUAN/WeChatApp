// pages/mainpage/mainpage.js
var order = ['red', 'yellow', 'blue', 'green', 'red']
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
    toView: 'red',
    scrollTop: 100,

    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]

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