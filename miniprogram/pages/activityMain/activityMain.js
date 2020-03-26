// pages/activityMain/activityMain.js
// const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {

    //后端传入数据
    realData: [],

    clubFilter: [
      {
        text: 'Club1',
        value: 1
      },
      {
        text: 'Club2',
        value: 2
      }
    ],
    dateFilter: [
      {
        text: '一天内',
        value: 'b'
      },
      {
        text: '三天内',
        value: 'c'
      },

      {
        text: '一周内',
        value: 'd'
      },

      {
        text: '一月内',
        value: 'e'
      }
    ],
    locationFilter : [
      {
        text: '文理学部',
        value: 1
      },
      {
        text: '信息学部',
        value: 2
      },
      {
        text: '工学部',
        value: 3
      },
      {
        text: '医学部',
        value: 4
      }
    ]



  },

  gotoActivity: function(e) {
    // var index = e.currentTarget.testData.index;
    // var id = this.data.testData[index].id;
    // wx.setStorage({
    //   key:"id",
    //   data:id
    // })

    // wx.navigateTo({
    //   url : '../club/club1/club1',
    // })

    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    if (index) {

    }
  },

  item1click: function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    //数据容器
    let cloudData = []
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
            "clubName": activity.publishedActivities[0].clubName
          }
          //将信息添加到数据容器
          cloudData.push(obj)
        }
        //将数据容器赋值给小程序端
        that.setData({
          realData: cloudData
        })
      }
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