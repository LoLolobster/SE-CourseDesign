// miniprogram/pages/activityInfo-admin/activityInfo-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityContent:"武汉大学环绕东湖水，坐拥珞珈山，校园环境优美，风景如画，被誉为“中国最美丽的大学”。学校占地面积5195亩，建筑面积266万平方米。中西合璧的宫殿式建筑群古朴典雅，巍峨壮观，26栋早期建筑被列为“全国重点文物保护单位。"
  },
  acceptBtn: function (e) {
    wx.showToast({
      title: "同意申请",
      icon: "succces",
      duration: 1000,
      mask: true
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
    var info = wx.getStorageSync('activityInfo-admin');
    console.log(info.clubImg);
    // let recieveData = []

    this.setData({
      "clubName": info.clubName,
      "clubImg": info.clubImg,
      "activityName": info.activityName,
      "activityLocation": info.activityLocation,
      "activityTime": info.activityTime,
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
