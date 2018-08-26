// pages/createactivity/createactivity.js
const app = getApp()
var httputil = require("../../pages/httputils/httputil.js")
var itemlist = []
var prizeTypelist = []

var imageBase64 = ''
var typeindex = 0;
var connditionIndex = 0;
var prizeName = ''
var prizeNum = ''
var prizeMaxPeople = 0
var prizetime=''
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}

var arraydays
var arrayhours
var arrayminutes
Page({

  /**
   * 页面的初始数据
   */

  data: {
    remindname:'',
    remindNum:'',
    inputdetailenable: true,
    hasUserInfo: false,
    canIUse: app.globalData.canIUse,
    lottery_way: [itemlist[0]],
    prize_type: prizeTypelist[0],
    lottery_flag: 0,
    imagepath: app.globalData.imageurl,
    prizename: '',

    prizeamount: 0,
    lottery_time: '',
    lottery_detail_title: '开奖时间',
    multiArray: [],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // var tt = this
    that.initMultiArray(7)
    var arrays = [arraydays, arrayhours, arrayminutes]
    that.setData({
      multiArray: arrays
    })
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
    console.log('tempppp',temp)
    // var reader = Base64.CusBASE64.encoder(temp)
    // console.log("base64:" + reader)
    // var base64 = 'data:image/png;base64,' + reader
    that.setData({
      imagepath: temp
    })
    // wx.request({
    //   url: temp,
    //   method: 'GET',
    //   responseType: 'arraybuffer',
    //   success: function(res) {
    //     var base64 = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(res.data);
    //     imageBase64 = base64
    //     console.log(base64)
    //     that.setData({
    //       imagepath: base64
    //     })

    //   }
    // })
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
    if (flag == 1) {
      wx.showActionSheet({

        itemList: tt.getArrayFromobj(1, itemlist),
        success: function(res) {

          console.log(itemlist[res.tapIndex]);
          // itemlist[res.tapIndex]
          tt.setData({
            prize_type: itemlist[res.tapIndex]
          })
          typeindex = res.tapIndex
        },
        fail: function(res) {
          console.log('fail');

        }
      })
    } else {
      wx.showActionSheet({

        itemList: tt.getArrayFromobj(2, prizeTypelist),
        success: function(res) {

          console.log(itemlist[res.tapIndex]);
          // itemlist[res.tapIndex]
          tt.setData({
            lottery_way: prizeTypelist[res.tapIndex]
          })
          connditionIndex = res.tapIndex

          var title = tt.data.lottery_way.Name
          var isinputenable = title.indexOf('人数') == -1 ? true : false
          console.log(title + connditionIndex+ ":" + isinputenable)
          tt.setData({
            lottery_detail_title: title,
            inputdetailenable: isinputenable,
          })


        },
        fail: function(res) {
          console.log('fail');

        }
      })
    }



  },
  /**
   * 修改奖品图片
   */
  changeimage: function() {

    wx.navigateTo({
      url: '../cutInside/cutInside?src=' +'' ,//res.tempFilePaths[0]
      // url: '../chooseimage/chooseimage?image=' + res.tempFilePaths[0]

    })

    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original'],
    //   success: function(res) {
    //     wx.getImageInfo({
    //       src: res.tempFilePaths[0],
    //       success: function (res) {
    //         //console.log(res.width);
    //         //console.log(res.height);
    //         console.log('选择图片成功')
          
    //       },fail:function(res){
    //     console.log('选择图片失败')
    //       }
    //     })
    //     console.log('发送路径' + res.tempFilePaths[0])
    //     wx.navigateTo({
    //       url: '../chooseimage/chooseimage?image=' + res.tempFilePaths[0],
    //     })

    //   },
    //   fail: function() {
    //     console.log('选择图片失败')
    //   }
    // })
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

    httputil.commonrequest(app.globalData.getprizeAndlottery, bodymap, function(res) {
      console.log('getprizeAndlottery:' + res)
      ResPonse = res
      var list = ResPonse.Data
      if (flag == 1) {
        itemlist = list
        that.setData({
          prize_type: list[0]
        })
      } else {
        prizeTypelist = list
        that.setData({
          lottery_way: list[0]
        })
      }

    }, function(error) {
      console.log('getprizeAndlottery:' + error)

    })


  },
  
  submit: function(res) { 
    console.log('resssssss',res)
    if (app.globalData.hasUserInfo) {
      console.log('submit存在用户信息')
      this.luncheraction(res)

    } 
  },
  submit1: function (res) {
    if (app.globalData.hasUserInfo) {
      console.log('submit1存在用户信息')
    } else {
      console.log('submit1不存在用户信息')
      app.getUserInfo(res)
      wx.setStorageSync('userinfo', res.detail.rawData)
    }
  },
  luncheraction: function(res) {
    var tt = this
    var flag = tt.data.inputdetailenable
    var indexarray = tt.data.multiIndex
    var formid = res.detail.formId
    console.log('is',flag)
      if(prizeName==''){
        wx.showToast({
          title: '请输入奖品名称',
        })
        return
      }
    if (prizeNum <=0) {
      wx.showToast({
        title: '奖品数量至少1',
      })
      return
    }
    if (flag){
     
       var data = new Date()
      const year = data.getFullYear()
      const month = data.getMonth() + 1
      var day = data.getDate()
       var hour = data.getHours()
      var minute = data.getMinutes()
      // var day = data.getDay()
      var index0 = indexarray[0]
      var index1 = indexarray[1]
      var index2 = indexarray[2]
      prizetime = arraydays[index0]+" "+arrayhours[index1]+":"+arrayminutes[index2]
      var begin = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      console.log('begin', begin)
      console.log('prizetime', prizetime)


      console.log(begin > prizetime)
    if(begin>prizetime){
      wx.showToast({
        title: '开奖时间早于当前时间',
      })
      return
    }

      // if(hour>= index1&&index0==0){
      //     if(hour==index1){
      //         if(minute<=index2){
      //           wx.showToast({
      //             title: '开奖时间早于当前时间',
      //           })
      //           return
      //         }
      //       // if (minute<=30 && index2 == 1) {
      //       //   wx.showToast({
      //       //     title: '开奖时间早于当前时间',
      //       //   })
      //       //   return
      //       // }
      //     }else{
      //       wx.showToast({
      //         title: '开奖时间早于当前时间',
      //       })
      //       return
      //     }
       
      // }
     
    }else{
      console.log('prizeMaxPeople',prizeMaxPeople)
      if(prizeMaxPeople<=0){
        wx.showToast({
          title: '请输入参与人数',
        })
        return
      }
    }
  
  
    wx.showLoading({
      title: '请稍候',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

      wx.request({
      url: app.globalData.imageurl,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function(res) {
        var base64 = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(res.data);
        imageBase64 = base64
        console.log(base64)
        // tt.setData({
        //   imagepath: base64
        // })

      }
    })


    var bodyjson = {
      token: wx.getStorageSync('token'),
      launcher: 'client',
      openId: wx.getStorageSync('openId'),
      prizeName: prizeName,
      prizeImgBase64Str: imageBase64,
      prizeNum: prizeNum,
      type: itemlist[typeindex].Id,
      condition: prizeTypelist[connditionIndex].Id,
      joinUserNum: prizeMaxPeople,
      startTime: prizetime,
      formId:formid


    }


    httputil.commonrequest(app.globalData.createactivity, bodyjson, function(res) {
      // console.log("回调成功"+JSON.stringify(res))
      // var jsonO = eval(res.data);
      ResPonse = res
      var id = ResPonse.Data.Id
      // 

      if (ResPonse.Code == 8888) {
        console.log('id:',id)
        wx.showToast({
          title: '发起成功',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading()
        wx.navigateTo({
        url: '../mycreatdetail/mycreatdetail?Id='+id,
        success(){
          prizeName=''
          prizeNum=''
          console.log('11111111', 'uccess')
        },fail(){
          console.log('11111111', 'fail')
        },complete(){

         
          // var tt = this
          tt.initMultiArray(7)
          var arrays = [arraydays, arrayhours, arrayminutes]
          tt.setData({
            multiArray: arrays
          })
          tt.getLottery_way(1)
          tt.getLottery_way(0)
          tt.setData({
            remindname:'',
            remindNum:''
          })

          console.log('11111111', 'complete')
        }
      })
     
      } else {
        wx.showToast({
          title: '发起失败',
          icon: 'success',
          duration: 2000
        })
      }


    }, function(res) {
      wx.hideLoading()
      console.log("回调失败" + res)

    })

    console.log('发起活动')

  },
  getArrayFromobj: function(flag, obj) {

    var res = new Array(obj.length)
    if (flag == 1) {
      for (var i = 0; i < obj.length; i++) {
        res[i] = obj[i].Name
      }
      console.log("itemlist" + res)
      return res
    } else {
      for (var i = 0; i < obj.length; i++) {
        res[i] = obj[i].Name
      }
      console.log("itemlist" + res)
      return res
    }

  },
  prizeNameInput: function(e) {
    var temp = e.detail.value
    console.log('temp===111', temp)
    prizeName = e.detail.value
  },
  prizeNumInput: function(e) {
    prizeNum = e.detail.value
  },
  JoinNumInput: function (e) {
    var temp = e.detail.value
    console.log('temp===',temp)
    console.log('temp=type', typeof temp)
    console.log(typeof temp == 'string')
   if(typeof temp == 'string'){
     prizeMaxPeople = temp
   }
   
  },
   
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log("data", data)
    let numbersArray = []
    for (let i = 0; i < 24; i++) {
      numbersArray.push(i)
    }
    console.log("detail", e.detail.column)
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          default: data.multiArray[1] = arrayhours;
          data.multiArray[2] = arrayminutes
          break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = arrayminutes
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    console.log('data', data)
    this.setData(data);
  },
  initMultiArray: function() {
    var tt = this
    var array = new Array()
    arraydays = tt.getweektime(7)
    arrayhours = new Array()
    for (var x = 0; x < 24; x++) {
      if(x<=9){
        arrayhours[x] = '0'+x
      }else{
        arrayhours[x] = x
      }
      
    }
    arrayminutes = new Array()
    for (var x = 0; x < 60; x++) {
      if (x <= 9) {
        arrayminutes[x] = '0' + x
      } else {
        arrayminutes[x] = x
      }

    }
  },
  getweektime: function(days) {
    var datsarray = new Array()
    var now = new Date()
    for (var i = 0; i < days; i++) {
      var date = new Date(now.getTime() + i * 24 * 3600 * 1000);
      datsarray[i] = date.getFullYear() +"-"+(date.getMonth() + 1) + "-" + date.getDate()
      //  + " 周" + (date.getDay() == 0 ? '日':
      // date.getDay())
      console.log(date.getFullYear()+date.getMonth() + 1 + "月" + date.getDate() + "日" + " 周" + date.getDay())
    }
    arraydays = datsarray
    return datsarray

  }


})