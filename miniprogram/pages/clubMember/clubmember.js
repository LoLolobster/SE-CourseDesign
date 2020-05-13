// miniprogram/pages/clubMember/clubmember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shezhang: [],
    sheyuan: [],
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  gotoPerson: function (e) {
    let personID = e.currentTarget.dataset.item.ID
    if(personID === this.data.shezhang[0].ID) {
      wx.setStorageSync("personInfo", { "personID": personID, "isManager" : true})
    }
    else {
      wx.setStorageSync("personInfo", { "personID": personID, "isManager": false })
    }
    wx.navigateTo({
      url: '../personInfo/personinfo'
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