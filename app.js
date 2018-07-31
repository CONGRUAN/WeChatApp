//app.js

App({

  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    this.gettoken()
    console.log(wx.getStorageSync('openId') == '')
    // 登录
    if (wx.getStorageSync('openId') == '') {
      console.log("不存在openId")
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("登录" + res)

          this.getopenid(res.code)
        }
      })
    } else {
      console.log("存在openId")
    }
    // this.getopenid()


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
  gettoken: function() {
    wx.request({
      header: {
        // 'content-type': 'application/json'
        'Content-Type': 'json'
      },
      url: this.globalData.commonurl + this.globalData.gettokenurl,
      method: 'POST',
      data: '',
      success: function(res) {


        var token = res.data.Data
        console.log("token:" + token)
        wx.setStorageSync("token", token)
      },
      fail: function(res) {
        console.log(res)

      }
    })
  },

  getopenid: function(code) {
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
        if (8888 == res.data.Code) {
          console.log("保存openId" + res.data.Data.openId)
          wx.setStorageSync('openId', res.data.Data.openId)
          // console.log("openid:" + res.data.Data.openId)
        }
      },
      fail: function(res) {
        console.log(res.data)
      }


    })
  },

  globalData: {
    imageurl:'/images/222.png',
    userInfo: null,
    commonurl: 'https://91dj8.cn/WeChatApp',
    actionlisturl: '/CoreRun/GetLuckyDrawList',
    gettokenurl: '/Token/GetToken',
    getopenidurl: '/WeChat/GetOpenId',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')


  },
//获取用户信息，需要多处调用询问
  getUserInfo: function (e) {
    console.log(e)
    console.log('22')
  
    this.globalData.userInfo = e.detail.userInfo
    this.globalData.hasUserInfo = true
  }
})