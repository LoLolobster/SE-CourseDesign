// miniprogram/pages/clubInfo-admin/clubInfo-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubName: "",
    clubInfo: "",
    managerName: "",
    managerQQ: ""
  },

  acceptBtn : function(e){
    wx.showToast({
      title:"同意申请",
      icon:"succces",
      duration: 1000,
      mask:true
    });
  }, 
  denyBtn: function (e) {
    wx.showToast({
      title: "拒绝申请",
      icon: "succces",
      duration: 1000,
      mask: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('clubInfo-admin');
    console.log(info.clubImg);
    // let recieveData = []

    this.setData({
      "clubName": info.clubName,
      "clubImg": info.clubImg,
      "clubInfo": info.clubInfo,
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