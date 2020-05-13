// miniprogram/pages/clubInfo-admin/clubInfo-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubID : null,
    clubName: "",
    clubInfo: "",
    managerID : null,
    managerName: "",
    managerQQ: ""
  },

  /**
  * 刷新管理员主界面
  */
  refreshMyAdmin: function (e) {
    //获取当前页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]
      beforePage.onLoad()
    }
  },

  acceptBtn : function(e){
    let that = this
    wx.cloud.callFunction({
      name: "handlePendingClub",
      data: {
        operation: 0,
        clubID: that.data.clubID,
        managerID : that.data.managerID
      }
    }).then(res => {
      console.log(res)
      if (res.result.handleRes === 1) {
        wx.showToast({
          title: "同意申请",
          icon: "succces",
          duration: 1000,
          mask: true
        });
        that.refreshMyAdmin() //刷新myAdmin页面
        wx.navigateBack({ //返回上级页面
          delta: 0
        })
      }
    })

  }, 
  denyBtn: function (e) {
    let that = this
    wx.cloud.callFunction({
      name: "handlePendingClub",
      data: {
        operation: 1,
        clubID: that.data.clubID,
        managerID: that.data.managerID
      }
    }).then(res => {
      if (res.result.handleRes === 1) {
        wx.showToast({
          title: "拒绝申请",
          icon: "succces",
          duration: 1000,
          mask: true
        });
        that.refreshMyAdmin() //刷新myAdmin页面
        wx.navigateBack({ //返回上级页面
          delta: 0
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('clubInfo-admin');
    console.log(info.clubImg);
    // let recieveData = []

    this.setData({
      "clubID":info.clubID,
      "clubName": info.clubName,
      "clubImg": info.clubImg,
      "clubInfo": info.clubInfo,
      "managerID" : info.managerID,
      "managerName": info.managerName,
      "managerQQ": info.managerQQ,
    });
    wx.removeStorageSync('clubInfo-admin');
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})