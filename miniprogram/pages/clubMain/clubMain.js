// miniprogram/pages/club/club.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realData:[],
    testData:[
      {
        tabs2: [1,2],
        "clubName" : "足球社",
        "clubHeaderName": "Messi",
        "clubHeaderQQ": "1051302489",
        "clubInfo": "武汉大学足球队",
        "clubImg":""
      }
    ]

  },

  gotoClub : function(e){
    console.log("to club info page")
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