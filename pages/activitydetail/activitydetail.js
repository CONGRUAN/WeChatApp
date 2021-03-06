// pages/createactivity/createactivity.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
/**
 * toast提示框
 */
var toast = require('../../utils/toast/toast.js');

var WXGrid = require('../wxgrid/wxgrid.js')
var wxgridteam = new WXGrid;


// var WXGrid = require('../../js/wxgrid.js')
var wxgrid = new WXGrid;
// wxgrid.init(99, 10);
var img = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erpwPOvDPjA7Wnc9kUYw0zmt9UIgsWqLnfCg6GWbX42bQlwm904X7ztBz8bEDxAsLyvYu2PKbvqUg/132";
// var classifies = new Array()

var isShare = false
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null,
  name: '',
  isLuck: '很遗憾，这次没有中奖',
  teamId:''
}
var bodyjsongetdata
Page({

  /**
   * 页面的初始数据
   */

  data: {
    data: null,
    IsJoin: false,
    imagepath: '../../images/222.png',
    wxgrid,
    wxgridteam,
    classifies: [],
    size: 0,
    teamuserarray: [],
    teamId: '',

    sizeteam: 0,
    visible1: false,
    actions1: [
      {
        name: '分享好友',
        openType: 'share'
      },
      // {
      //   name: '分享到朋友圈'
      // },

    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // id ac89b870 - 59ff - 4417 - 9618 - 3cd3aa173e56
    console.log('来源，', options.isShare)
    console.log('options', options)

    console.log('来源，', options.isShare != '')
    if (options.isShare) {
      console.log('来源，', '分享')
      console.log('teamId', options.teamId)
      this.data.teamId = options.teamId
      isShare = true
    } else {
      console.log('来源，', '列表')
      isShare = false
    }
    
    var itemId = options.Id
    // var itemId = 'ac89b870-59ff-4417-9618-3cd3aa173e56'
    bodyjsongetdata = {
      token: wx.getStorageSync('token'),
      Id: itemId,
      openId: wx.getStorageSync('openId')
    }
    this.getdata(bodyjsongetdata)
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
    var tt=  this;
    return {
      title: '惊喜一刻',
      desc: '领福利啦!',
      path: '/pages/activitydetail/activitydetail?Id=' + this.data.data.Id + '&isShare=' + true + '&teamId=' + tt.data.teamId
    }
  },


  getdata: function (bodyjson) {
    var that = this
    httputil.commonrequest(app.globalData.getactivitydetail, bodyjson, function (res) {
      ResPonse = res
      var url = ResPonse.Data.ImageUrl
      if (url != null) {
        that.setData({
          imagepath: url
        })
      }
      var str
      if (ResPonse.Data.IsJoin) {
        str = res.Data.Type == "personal" ? "待开奖" : "组队"
        if (res.Data.Type != "personal") {
          that.data.teamId = res.Data.TeamId
        }
      } else {
        str = '参与'
      }

      that.setData({
        data: ResPonse.Data,
        IsJoin: str,
      })
      if(!ResPonse.Data.IsOver){
        that.getteamer(res.Data)
      }

      console.log(JSON.stringify(ResPonse.Data))
      if (ResPonse.Data.IsOver) {
        that.getdatalucklist()
      } else {
        that.getTenJoinUserImg()
      }

    }, function (res) {

    })
  },
  getteamer: function (team) {
    var tt = this
    if ('team' == team.Type) {
      var bodyjson1 = {
        token: wx.getStorageSync('token'),
        openId: wx.getStorageSync('openId'),
        id: team.Id
      }
      httputil.commonrequest(app.globalData.getteamuser, bodyjson1, function (res) {
        var temp = new Array()
        temp = tt.data.teamuserarray
        for (var i = 0; i < res.Data.length; i++) {
          var temp1 = {
            imageurl: res.Data[i],
          }
          temp.push(temp1)
          // temp.push(temp1)
        }
        // console.log()
        
        wxgridteam.init(temp.length / 5, 5)
        // wxgrid.setRowsHeight(150, 1)

        wxgridteam.data.add("classifies", temp);
        tt.setData({
          teamuserarray: temp,
          sizeteam: temp.length,
          wxgridteam
        })

      }, function (res) {

      })
    } else {

    }
  },
  submit1: function (res) {
    if (''!=wx.getStorageSync('userinfo')) {
      console.log('submit1存在用户信息')
    } else {
      console.log('submit1不存在用户信息')
      app.getUserInfo(res)
      wx.setStorageSync('userinfo', res.detail.rawData)
    }
  },

  submit: function (res) {

    var tt = this
    if (tt.data.data.IsJoin) {
      //全屏可点击 默认1500ms 类似android toast
      if(tt.data.data.Type!='personal'){
        console.log('组团')
        tt.handleOpen1() 
        return
      }else{
        toast.showToastDefault(tt, '你已参与，分享给好友吧')
        return
      }
    }
    var info = wx.getStorageSync('userinfo')
    var formid = res.detail.formId
    console.log(res.detail.formId);
    var jiontype = 'join'
    if (tt.data.data.Type == 'team' && !isShare) {
      jiontype = 'create'
    }
    console.log("11111111app.globalData.nickName", app.globalData.nickName)
    console.log("11111111app.globalData.avatarUrl", app.globalData.avatarUrl)
    var bodyjson = {
      token: wx.getStorageSync('token'),
      luckyDrawId: tt.data.data.Id,
      openId: wx.getStorageSync('openId'),
      formId: formid,
      nickname: app.globalData.nickName,
      headImgUrl: app.globalData.avatarUrl,
      joinType: jiontype,
      teamId: tt.data.teamId
    }
    // var info = wx.getStorageSync('userinfo')
    if (''!=wx.getStorageSync('userinfo')) {
      console.log('存在用户信息')
      httputil.commonrequest(app.globalData.joinactivity, bodyjson, function (res) {
        ResPonse = res
        console.log(ResPonse.Data)
        toast.showToastDefault(tt, '参与成功')

        tt.getdata(bodyjsongetdata)
        var str = tt.data.data.Type=="personal"?"待开奖":"组队"
        tt.data.data.IsJoin = true
        tt.setData({
          IsJoin: str
        })
      }, function (res) {
        toast.showToastDefault(tt, '参与失败：' + res.Data.Msg)
      })

    } else {

      app.getUserInfo(res)
      wx.setStorageSync('userinfo', res.detail.rawData)

      console.log('不存在用户信息')
    }


  },

  /**
   * 发起活动点击事件
   */
  createaction(e) {
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
  joindetail: function () {
    wx.navigateTo({
      url: '../joinlist/joinlist?Id=' + this.data.data.Id
    })
  }, loadmore: function () {
    this.getdatalucklist()

  }, getdatalucklist: function () {
    var tt = this
    var body = {
      token: wx.getStorageSync('token'),
      openId: wx.getStorageSync('openId'),
      id: this.data.data.Id
    }

    httputil.commonrequest(app.globalData.getluckuser, body, function (res) {
      console.log('中奖人：', res)
      var temp = new Array()
      temp = tt.data.classifies
      for (var i = 0; i < res.Data.LuckyUsers.length; i++) {
        var temp1 = {
          imageurl: res.Data.LuckyUsers[i].HeadImgUrl,
          name: res.Data.LuckyUsers[i].Nickname
        }
        temp.push(temp1)
      }
      // console.log()
      tt.setData({
        classifies: temp,
        size: temp.length,
      })
      wxgrid.init(tt.data.classifies.length / 3, 3)
      // wxgrid.setRowsHeight(150, 1)

      wxgrid.data.add("classifies", tt.data.classifies);
      
      var str = res.Data.IsContainsSelf ? "恭喜您中奖了" : '很遗憾，你本次没有中奖'
      if(tt.data.classifies.length==0){
        str='很遗憾，未达到开奖条件。没有开奖！'
      }
      tt.setData({
        wxgrid,
        name: tt.data.data.PrizeName,
        isLuck: str
      })
    }, function (res) {

    })

  },
  getTenJoinUserImg: function () {
    var tt = this
    var body = {
      token: wx.getStorageSync('token'),
      openId: wx.getStorageSync('openId'),
      id: this.data.data.Id
    }

    httputil.commonrequest(app.globalData.getjoinUserHeadImg, body, function (res) {
      console.log('中奖人：', res)
      var temp = new Array()
      for (var i = 0; i < res.Data.length; i++) {
        var temp1 = {
          imageurl: res.Data[i].HeadImgUrl,
          name: res.Data[i].Nickname
        }
        temp.push(temp1)
        if (i >=8) break
      }
      wxgrid.init(1, 9)
      // wxgrid.setRowsHeight(150, 1)
      // console.log()
      wxgrid.data.add("classifies", temp);
      tt.setData({
        wxgrid,
        // classifies: temp,
        size: temp.length,

      })


      // var str = res.Data.IsContainsSelf ? "恭喜您中奖了" : '很遗憾，你本次没有中奖'
      // tt.setData({

      //   name: tt.data.data.PrizeName,
      //   isLuck: str
      // })
    }, function (res) {

    })

  }, handleOpen1() {
    var tt = this
    console.log('handleOpen1')
    this.setData({
      visible1: true
    });
  },
  handleCancel1: function () {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1({ detail }) {
    var tt = this;
    const index = detail.index + 1;
    console.log(index)
    if (index == 2) {
      wx.navigateTo({
        url: '../creatShareImage1/creatShareImage1',
        success: () => {
          console.log("成功")
          tt.setData({
            visible1: false
          })
        }
      })
    }

  },
})





