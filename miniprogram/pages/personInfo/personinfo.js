// pages/personinfo/perisoninfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'尔康',
    avatar:"cloud://mall-x3k10.6d61-mall-x3k10-1301527969/myPhoto.jpg",
    activeNames: ['1'],
    sex: '男',
    province: '湖北',
    city: '武汉',
    signature: 'hello world',
    clublist:'家里蹲社团',
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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