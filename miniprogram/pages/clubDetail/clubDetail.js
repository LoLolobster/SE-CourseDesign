const app = getApp();
Page({
  data: {
      clubName:"",
      clubIntro:"",
      clubImage: "",
  },
  onLoad: function (options) {
    let clubDetail_info = wx.getStorageSync("clubDetail")
    this.setData({
      clubName : clubDetail_info.clubName,
      clubIntro : clubDetail_info.clubInfo,
      clubImage : clubDetail_info.clubImg
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示.
    var join = app.globalData.join;
    if (join == true) {
      this.setData({
        operation: '退出社团',
      })
    } else {
      join:false
      this.setData({
        operation: '加入社团',
      })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  defaultJoin: function (e) {
    if (app.globalData.join == true) {
      // 点击退出
      app.globalData.join = false
      wx.showToast({
        title: '已退出社团',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      this.onShow()
    } else {
      wx.showToast({
        title: '成功加入社团',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      app.globalData.join = true
      // 点击加入
      this.onShow()
      // wx.navigateTo({
      //   //这个还没写
      //   url: '../join/join'
      // })
    }
  },
  
  toNotice: function () {
    wx.navigateTo({
      url: '../clubNotice/clubNotice'
    })
  },

  getScanning: function () {
    app.getScanning()
  }
})