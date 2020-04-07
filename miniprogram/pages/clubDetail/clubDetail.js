const app = getApp();
Page({
  data: {
      //此处需要动态读取社团信息,现在先写死
      clubName:"文学社",
      clubIntro:"指点江山，激扬文字，粪土当年万户侯！",
      clubImage: "/images/bg/WHU2.JPEG",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示.
    var join = app.globalData.join;
    var userInfo = wx.getStorageSync('clubInfo');
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
      wx.navigateTo({
        url: '../clubMain/clubMain'
      })
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
  
  getScanning: function () {
    app.getScanning()
  }
})