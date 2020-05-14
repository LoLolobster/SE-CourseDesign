// miniprogram/pages/myAdmin/myAdmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pendingActivityNum : 0,
    pendingClubNum : 0,
    pendingActivity: null,
    pendingClub: null,
    notice : null,
    allClub : null,
  },

  gotoActivityAdmin: function (e) {
    var info = {
      "clubName": e.currentTarget.dataset.item.clubName,
      "clubImg": e.currentTarget.dataset.item.clubImg,
      "activityName": e.currentTarget.dataset.item.activityName,
      "activityLocation": e.currentTarget.dataset.item.activityLocation,
      "activityTime": e.currentTarget.dataset.item.activityTime,
      "activityContent" : e.currentTarget.dataset.item.activityContent,
      "activityID": e.currentTarget.dataset.item.activityID
    };

    wx.setStorageSync('activityInfo-admin', info);

    wx.navigateTo({
      url: '../activityInfo-admin/activityInfo-admin'
    })

  },

  gotoClubAdmin : function(e){
    var info = {
      "clubID": e.currentTarget.dataset.item.clubID,
      "clubName": e.currentTarget.dataset.item.clubName,
      "clubImg": e.currentTarget.dataset.item.clubImg,
      "clubInfo": e.currentTarget.dataset.item.clubInfo,
      "managerID": e.currentTarget.dataset.item.managerID,
      "managerName": e.currentTarget.dataset.item.managerName,
      "managerQQ": e.currentTarget.dataset.item.managerQQ,
    };
    wx.setStorageSync('clubInfo-admin', info);
    wx.navigateTo({
      url: '../clubInfo-admin/clubInfo-admin'
    })
  },

  gotoClubReport : function(e){
    wx.setStorageSync("clubReport", e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../clubReport/clubReport',
    })
  },
  
  onInput : function(e){
    this.setData({
      notice : e.detail.value
    })
  },

  publishNotice : function(e){
    wx.cloud.callFunction({
      "name": "publishNotice",
      "data" : {
        noticeContent : this.data.notice,
        noticeLevel : 0,
        publisherID : wx.getStorageSync("userID")
      }
    }).then(res => {
      wx.showToast({
        title: '发布成功！',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取审中的活动信息
    wx.cloud.callFunction({
      name : "getPendingActivityInfo",
    })
    .then(res => {
      that.setData({
        pendingActivity : res.result.returnData,
        pendingActivityNum: res.result.returnData.length
      })
    })
    //获取审批中的社团信息
    wx.cloud.callFunction({
      name : "getPendingClubInfo"
    })
    .then( res => {
      that.setData({
        pendingClub : res.result.returnData,
        pendingClubNum : res.result.returnData.length
      })
    })

    //获取所有社团信息，用于社团报表
    wx.cloud.callFunction({
      name : "getClubMainInfo"
    }).then(res => {
      that.setData({
        allClub : res.result.clubInfoList
      })
    })
  }
})