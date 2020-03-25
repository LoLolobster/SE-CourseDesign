// pages/activityMain/activityMain.js
// const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    testData: {
      "data": [
        {
          "index": 1,
          "clubImg": "/images/club/1.JPG",
          "activityName": "第一周例会",
          "activityTime": "2020-01-01",
          "activityLocation": "青楼310室",
          "clubName": "学生会外联社"
        },
        {
          "index": 2,
          "clubImg": '/images/club/2.JPG',
          "activityName": "第一次排练",
          "activityTime": "2020-01-03",
          "activityLocation": "国软教学楼",
          "clubName": "合唱团"
        },
        {
          "index": 3,
          "clubImg": '/images/club/3.JPG',
          "activityName": "第一次训练",
          "activityTime": "2020-02-10",
          "activityLocation": "信部操场",
          "clubName": "足球社"
        }, {
          "index": 4,
          "clubImg": '/images/club/1.JPG',
          "activityName": "第一周例会",
          "activityTime": "2020-01-01",
          "activityLocation": "青楼310室",
          "clubName": "学生会外联社"
        },
        {
          "index": 5,
          "clubImg": '/images/club/2.JPG',
          "activityName": "第一次排练",
          "activityTime": "2020-01-03",
          "activityLocation": "国软教学楼",
          "clubName": "合唱团"
        },
        {
          "index": 6,
          "clubImg": '/images/club/3.JPG',
          "activityName": "第一次训练",
          "activityTime": "2020-02-10",
          "activityLocation": "信部操场",
          "clubName": "足球社"
        }, {
          "index": 7,
          "clubImg": '/images/club/1.JPG',
          "activityName": "第一周例会",
          "activityTime": "2020-01-01",
          "activityLocation": "青楼310室",
          "clubName": "学生会外联社"
        },
        {
          "index": 8,
          "clubImg": '/images/club/2.JPG',
          "activityName": "第一次排练",
          "activityTime": "2020-01-03",
          "activityLocation": "国软教学楼",
          "clubName": "合唱团"
        },
        {
          "index": 9,
          "clubImg": '/images/club/3.JPG',
          "activityName": "第一次训练",
          "activityTime": "2020-02-10",
          "activityLocation": "信部操场",
          "clubName": "足球社"
        }
      ]
    },
    //后端传入数据
    realData : []
      
    

  },

  gotoActivity: function (e) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //数据容器
    let cloudData = []
    //调用云函数获取活动数据
    wx.cloud.callFunction({
      name: 'getActivityMainInfo',
      success : function(res){
        console.log("云函数调用成功")
        for (var activity of res.result.data.list){
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
          realData : cloudData
        })
      }
    })
    
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