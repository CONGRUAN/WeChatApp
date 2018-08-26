//app.js

App({

  onLaunch: function() {
    var _this = this
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.showLoading({
      title: '加载中...',
    })
    this.gettoken(function(res) {
      console.log('111111111111')
      var token = res.data.Data
      console.log("token:" + token)
      wx.setStorageSync("token", token)
      wx.hideLoading()

      if (wx.getStorageSync('openId') == '') {
        console.log("不存在openId")

        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log("登录" + res)

            _this.getopenid(res.code, function(res) {
              if (8888 == res.data.Code) {
                console.log("保存openId" + res.data.Data.openId)
                wx.setStorageSync('openId', res.data.Data.openId)
                wx.hideLoading()
                _this.finishcallback('123');
              }

            })
          },
          fail: res => {
            console.log("登录fail" + res)
          }
        })
      } else {
        wx.hideLoading()
        console.log("存在openId")
        _this.globalData.callbackflag = true;
        
      }
    })
    console.log(wx.getStorageSync('openId') == '')
    // 登录
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('用户信息', res.userInfo)
              wx.setStorageSync('userinfo', res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          res.authSetting
          if (!res.authSetting['scope.userInfo']) {
            console.log("没有拥有userInfo")

          }

          console.log('没有授权')

        }
      }
    })
  },

  // 获取后台token
  gettoken: function(callback) {
    wx.request({
      header: {
        // 'content-type': 'application/json'
        'Content-Type': 'json'
      },
      url: this.globalData.commonurl + this.globalData.gettokenurl,
      method: 'POST',
      data: '',
      success: function(res) {
        console.log('isfuncion', typeof callback)
        if (typeof callback == 'function') {
          callback(res)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  getopenid: function(code, callback) {
    var bodymap = {
      token: wx.getStorageSync('token'),
      code: code
    }
    var url = this.globalData.commonurl + this.globalData.getopenidurl
    console.log(url)
    wx.request({
      url: url,
      data: bodymap,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log('getopenidcallbck')
        callback(res)
      },
      fail: function(res) {
        console.log(res.data)
      }
    })
  },
 
  globalData: {
    callbackflag:false,
    imageurl: '/images/222.png',
    userInfo: null,
    commonurl: 'https://91dj8.cn/WeChatApp',
    actionlisturl: '/CoreRun/GetLuckyDrawList',
    gettokenurl: '/Token/GetToken',
    getopenidurl: '/WeChat/GetOpenId',
    createactivity: '/CoreRun/Launch',
    getprizeAndlottery: '/CoreRun/GetLuckyDrawDic',
    getactivitydetail: '/CoreRun/GetLuckyDrawById',
    uploadimage: '/CoreRun/UploadImg',
    joinactivity: '/CoreRun/Join',
    myInfourl: '/CoreRun/GetStatisticCount',
    mylist: '/CoreRun/GetStatistic',
    getjoinUserHeadImg:'/CoreRun/GetJoinUserHeadImg',
    getluckuser:'/CoreRun/GetLuckyUser',
    hasUserInfo: wx.getStorageSync('userinfo') == "" ? false : true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')


  },
  //获取用户信息，需要多处调用询问
  getUserInfo: function(e) {
    console.log(e)
    console.log('22')
    wx.setStorageSync('userinfo', e.detail.rawData)
    console.log('个人信息', e.detail.rawData)
    this.globalData.userInfo = e.detail.rawData
    this.globalData.hasUserInfo = true
  }
})