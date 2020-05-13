// miniprogram/pages/clubMember/clubmember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
//TODO 从数据库中获取数据
    shezhang: [],
    sheyuan: [],
  },




  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  gotoPerson: function (e) {
    wx.setStorageSync("personInfo", { "personID": e.currentTarget.dataset.item.ID})
    wx.navigateTo({
      url: '../personInfo/personinfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let clubID = wx.getStorageSync("clubDetail").clubID
    wx.cloud.callFunction({
      "name": "getClubMemberInfo",
      "data" : {
        "clubID" : clubID
      }
    }).then(res => {
      that.setData({
        shezhang : res.result.managerInfo,
        sheyuan : res.result.membersInfo
      })
    })
  },

})