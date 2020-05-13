// miniprogram/pages/activityInfo-admin/activityInfo-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubName : null,
    clubImg : null,
    activityName :null,
    activityContent :null,
    activityID: null,
    activityTime:null,
    activityLocation:null

  },

  /**
   * 刷新管理员主界面
   */
  refreshMyAdmin :function(e){
    //获取当前页面栈
    var pages = getCurrentPages();
    if(pages.length > 1){
      var beforePage = pages[pages.length - 2]
      beforePage.onLoad()
    }
  },

  acceptBtn: function (e) {
    let that =  this
    wx.cloud.callFunction({
      name : "handlePendingActivity",
      data : {
        operation : 0,
        activityID : that.data.activityID
      }
    }).then(res => {
      if(res.result.handleRes === 1){
        wx.showToast({
          title: "同意申请",
          icon: "succces",
          duration: 1000,
          mask: true
        });
        that.refreshMyAdmin() //刷新myAdmin页面
        wx.navigateBack({ //返回上级页面
          delta : 0
        })
      }
    })

  },
  denyBtn: function (e) {
   let that = this
   wx.cloud.callFunction({
     name : "handlePendingActivity",
     data:{
       operation : 1,
       activityID : that.data.activityID
     }
   }).then(res => {
     console.log(res)
     if(res.result.handleRes === 1){
       wx.showToast({
         title: "拒绝申请",
         icon: "succces",
         duration: 1000,
         mask: true
       });
       that.refreshMyAdmin()
       wx.navigateBack({
         delta: 0
       })
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('activityInfo-admin');
    console.log(info.activityID);
    // let recieveData = []

    this.setData({
      clubName: info.clubName,
      clubImg: info.clubImg,
      activityName: info.activityName,
      activityLocation: info.activityLocation,
      activityTime: info.activityTime,
      activityContent: info.activityContent,
      activityID: info.activityID
    });
    wx.removeStorageSync('activityInfo-admin');
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
