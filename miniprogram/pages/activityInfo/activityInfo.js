// miniprogram/pages/activityInfo/activityInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubName: "",
    clubImg: "",
    activityTime: "",
    activityLocation: "",
    activityName: "",
    activityContent: "",
    activityID : "" //用于报名

  },

  // 报名按钮
  onClickRight() {
   let activityID = this.data.activityID
   let userID = wx.getStorageSync("userID")
    wx.cloud.callFunction({
      name : "signUpActivity",
      data : {
        activityID : activityID,
        userID : userID
      }
    }).then(res => {
      if(res.result.currentState === 0){
        wx.showToast({
          title: '报名失败！请稍后重试',
          icon: "none"
        })
      }

      else if(res.result.currentState === 1){
        wx.showToast({
          title: '报名成功！',
        })
      }

      else if (res.result.currentState === 2){
        wx.showToast({
          title: '请勿重复报名',
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var info = JSON.parse(options.info);
    // console.log(info);

    var info = wx.getStorageSync('activityInfo');
    this.setData({
      "clubName":info.clubName,
      "clubImg":info.clubImg,
      "activityName": info.activityName,
      "activityLocation": info.activityLocation,
      "activityTime": info.activityTime,
      "activityContent" : info.activityContent,
      "activityID" : info.activityID
    });
    wx.removeStorageSync('activityInfo');
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

  }
})