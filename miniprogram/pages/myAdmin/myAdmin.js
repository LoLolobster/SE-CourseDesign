// miniprogram/pages/myAdmin/myAdmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pendingActivityNum : 0,
    pendingClubNum : 0,
    pendingActivity: null,
    pendingClub: null
  },

  gotoActivityAdmin: function (e) {
    var info = {
      "clubName": e.currentTarget.dataset.item.clubName,
      "clubImg": e.currentTarget.dataset.item.clubImg,
      "activityName": e.currentTarget.dataset.item.activityName,
      "activityLocation": e.currentTarget.dataset.item.activityLocation,
      "activityTime": e.currentTarget.dataset.item.activityTime,
      "activityContent" : e.currentTarget.dataset.item.activityContent
    };

    wx.setStorageSync('activityInfo-admin', info);

    wx.navigateTo({
      url: '../activityInfo-admin/activityInfo-admin'
    })

  },

  gotoClubAdmin : function(e){
    var info = {
      "clubName": e.currentTarget.dataset.item.clubName,
      "clubImg": e.currentTarget.dataset.item.clubImg,
      "clubInfo": e.currentTarget.dataset.item.clubInfo,
      "managerName": e.currentTarget.dataset.item.managerName,
      "managerQQ": e.currentTarget.dataset.item.managerQQ,
    };

    wx.setStorageSync('clubInfo-admin', info);

    wx.navigateTo({
      url: '../clubInfo-admin/clubInfo-admin'
    })
  },
  //切换tab标签事件
  onChange: function (event) {
    // wx.showToast({
    //   title: `点击标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
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
        pendingActivity : res.result.data,
        pendingActivityNum: res.result.data.length
      })
    })
    //获取审批中的社团信息
    wx.cloud.callFunction({
      name : "getPendingClubInfo"
    })
    .then( res => {
      that.setData({
        pendingClub : res.result.data,
        pendingClubNum : res.result.data.length
      })
      console.log(res.result.data)
    })
  }
})