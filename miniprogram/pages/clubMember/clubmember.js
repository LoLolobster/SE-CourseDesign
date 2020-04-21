// miniprogram/pages/clubMember/clubmember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    shezhang: [{
      "name": '张三',
    },
    {
      "name": '李四',
    },
    {
      "name": '王五',
    }],

    fushezhang: [{
      "name": '张三',
    }, 
    {
      "name": '李四',
    }],
    
    sheyuan: [{
      "name": '张三',
    },
    {
      "name": '李四',
    }],
  },




  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  gotoPerson: function (e) {
    //此处查询数据库，得到其他信息项
    var info = {
      "name":e.currentTarget.dataset.item.name 
    };
    wx.setStorageSync('perInfo', info);
    wx.navigateTo({
      url: '../personInfo/personinfo'
    })

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