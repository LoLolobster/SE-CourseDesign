// pages/activityMain/activityMain.js
// const app = getApp()

const cloudData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //后端传入数据
    realData: [],
    globalNotice : "",
    clubFilter: [],
    dateFilter: [
      {
        text: '所有',
        value: '所有'
      },
      {
        text: '一天内',
        value: '一天内'
      },
      {
        text: '三天内',
        value: '三天内'
      },

      {
        text: '一周内',
        value: '一周内'
      },

      {
        text: '一月内',
        value: '一月内'
      }
    ],

    locationFilter : [
      {
        text: '所有',
        value: '所有'
      },
      {
        text: '文理学部',
        value: '文理学部'
      },
      {
        text: '信息学部',
        value: '信息学部'
      },
      {
        text: '工学部',
        value: '工学部'
      },
      {
        text: '医学部',
        value: '医学部'
      }
    ]
  },

  gotoActivity: function(e) {

    var info = {
      "clubName": e.currentTarget.dataset.item.clubName, 
      "clubImg" : e.currentTarget.dataset.item.clubImg,
      "activityName" : e.currentTarget.dataset.item.activityName,
      "activityLocation" : e.currentTarget.dataset.item.activityLocation,
      "activityTime" : e.currentTarget.dataset.item.activityTime
    };

    wx.setStorageSync('activityInfo', info);

    wx.navigateTo({
      url : '../activityInfo/activityInfo'
    })

  },

  //按社团名筛选
  onClubNameChange : function(e){
    let detail = e.detail
    let newActivityList = []
    for (let ac of cloudData){
      if(ac.clubName === detail || detail==="所有"){
        newActivityList.push(ac)
      }
    }
    this.setData({
      realData : newActivityList
    })
  },

  //按时间筛选
  onTimeChange : function(e){
      let detail = e.detail
      let newActivityList = []
      let now = Date.now()
    for (let ac of cloudData) {
      let activityTS = Date.parse(ac.activityTime) //字符串日期转换为时间戳
      switch (detail){
        case "所有":
          newActivityList.push(ac)
          break;
        case "一天内":
          if (now - activityTS <= 86400000){
            newActivityList.push(ac)
          }
          break;
        case "三天内":
          if (now - activityTS <= 3 * 86400000) {
            newActivityList.push(ac)
          }
          break;
        case "一周内":
          if (now - activityTS <= 7 * 86400000) {
            newActivityList.push(ac)
          }
          break;
        case "一月内":
          if (now - activityTS <= 30 * 86400000) {
            newActivityList.push(ac)
          }
          break;
        default:
        break;
      }
    }
   this.setData({
     realData : newActivityList
   })
  },

  //按地点（学部）筛选
  onLocationChange : function(e){
    console.log(e)
    let detail = e.detail
    let newActivityList = []
    for (let ac of cloudData) {
      if (ac.department === detail || detail==="所有") {
        newActivityList.push(ac)
      }
    }
    this.setData({
      realData: newActivityList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    //数据容器
    let clubNames = []
    clubNames.push({
      text: "所有",
      value: "所有"
    })
    //调用云函数获取活动数据
    wx.cloud.callFunction({
      name: 'getActivityMainInfo',
      success: function(res) {
        console.log("云函数调用成功")
        for (var activity of res.result.data.list) {
          //获取每个活动的信息
          let obj = {
            "clubImg": activity.publishedActivities[0].clubImg,
            "activityName": activity.activityName,
            "activityTime": activity.activityTime,
            "activityLocation": activity.activityLocation,
            "clubName": activity.publishedActivities[0].clubName,
            "activityContent" : activity.activityContent,
            "department": activity.department
          }
          //将信息添加到数据容器
          cloudData.push(obj)
          clubNames.push({
            text : obj.clubName,
            value: obj.clubName
          })
        }
        //将数据容器赋值给小程序端
        that.setData({
          realData: cloudData,
          clubFilter : clubNames
        })
      }
    })

    //获取globalNotice
    wx.cloud.callFunction({
      name : "getNoticeInfo",
      data : {
        isGlobal :true
      }
    }).then(res => {
      that.setData({
        globalNotice : res.result.globalNotice.noticeContent
      })
    })

  },

  //固定公告栏在顶部
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
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