/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../we-cropper/we-cropper.js'
var app = getApp()
var ResPonse = {
  Code: '0000',
  Msg: '',
  Data: null
}
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log('inage========',src)
        wx.uploadFile({
          url: app.globalData.commonurl + app.globalData.uploadimage,
          filePath: src,
          name: 'file',
          // header: { "Content-Type": "multipart/form-data"},
          header: { 'content-type': 'application/x-www-form-urlencoded' },

          formData: {'token':wx.getStorageSync('token')},
          success: function(res) {
            console.log('上传成功',res)
          },
          fail: function(res) {
            console.log('上传fail', res)
          },
          complete: function(res) {
              ResPonse = JSON.parse(res.data)

            app.globalData.imageurl = ResPonse.Data.ImgUrl//base64
        wx.navigateBack({
          delta: 1
        })
          },
        })



        // app.globalData.imageurl = src//base64
        // wx.navigateBack({
        //   delta: 1
        // })
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap () {
    const self = this
    console.log(1234)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
     

    const { cropperOpt } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()


    // var src = option.src
    // self.wecropper.pushOrign(src)
    this.uploadTap()
  }
  
})
