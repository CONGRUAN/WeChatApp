Page({
  data: {
    painting: {},
    shareImage: ''
  },
  onLoad() {
    this.eventDraw()
  },
  eventDraw() {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [
          {
            type: 'image',
            url: '../../images/bg1.png',//背景图
            top: 0,
            left: 0,
            width: 375,
            height: 555
          },
          {
            type: 'image',
            url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',//头像
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'text',
            content: '您的好友【kuckboy】',
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: 'text',
            content: '送你一个免费的福利',
            fontSize: 15,
            color: '#563D20',
            textAlign: 'left',
            top: 59.5,
            left: 96
          },
         
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',//奖品图
            top: 138,
            left: 47.5,
            width: 280,
            height: 136
          },
         
          {
            type: 'image',
            url: '../../images/qrcode1.jpg',//小程序二维码
            top: 420,
            left: 45,
            width: 100,
            height: 100,
            border:true,
          },
          {
            type: 'text',
            content: '奖品介绍：',//奖品名称
            fontSize: 17,
            lineHeight: 21,
            color: '#fac441',
            textAlign: 'left',
            top: 306,
            left: 44,
            width: 287,
            MaxLineNumber: 1,
            breakWord: true,
            bolder: true
          },

          {
            type: 'text',
            content: '保时捷最sdac的啊新款 x5',//奖品名称
            fontSize: 16,
            lineHeight: 21,
            color: '#383549',
            textAlign: 'left',
            top: 336,
            left: 44,
            width: 287,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true
          },
          // {
          //   type: 'text',
          //   content: '￥0.00',
          //   fontSize: 19,
          //   color: '#E62004',
          //   textAlign: 'left',
          //   top: 387,
          //   left: 44.5,
          //   bolder: true
          // },
          {
            type: 'text',
            content: '开奖时间：2018-8-04 12:30:00',//开奖时间
            fontSize: 15,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 361,
            left: 44.5,
           
          },
          {
            type: 'text',
            content: '长按识别图中二维码跟我一起领福利',
            fontSize: 14,
            color: '#383549',
            textAlign: 'left',
            top: 460,
            left: 165.5,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      }
    })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  }
})