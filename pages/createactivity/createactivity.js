// pages/createactivity/createactivity.js
var itemlist = new Array('按时间自动开奖','按人数自动开奖','手动开奖','现场开奖')

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
    lottery_way:[itemlist[0]],
    lottery_flag:0,
    imagepath:'',
    prizename:'',
    prizeamount:0,
    lottery_time:'',
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
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            //console.log(res.width);
            //console.log(res.height);
            var str = res.width / res.height;
            if (str > 1) {//横版图片

            } else {//竖版图片

            }
          }
        })
      }
    })
  }
})