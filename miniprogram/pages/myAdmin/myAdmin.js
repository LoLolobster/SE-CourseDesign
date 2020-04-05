// miniprogram/pages/myAdmin/myAdmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newActivityNum : "6",
    newClubNum : "2",

    newActivity : 
    [
      {
        clubImg : "/images/club/2.JPG",
        activityName : "跨年轰趴",
        clubName : "嘻哈社",
        activityTime : "2020/01/01",
        activityLocation : "C3活动室"
        }, 
        {
          clubImg: "/images/club/3.JPG",
          activityName: "年度表彰",
          clubName: "文学社",
          activityTime: "2020/01/12",
          activityLocation: "国软204阶梯教室"
        }, 
        {
          clubImg: "/images/club/1.JPG",
          activityName: "中期汇报",
          clubName: "码农社",
          activityTime: "2020/04/07",
          activityLocation: "青楼311"
        }, 
        {
          clubImg: "/images/club/2.JPG",
          activityName: "支部团建",
          clubName: "武汉大学计算机学院团委",
          activityTime: "2020/05/03",
          activityLocation: "信部操场"
        }, 
        {
          clubImg: "/images/club/3.JPG",
          activityName: "十佳歌手决赛",
          clubName: "武大艺协",
          activityTime: "2020/12/31",
          activityLocation: "梅园操场"
        },
        {
          clubImg: "/images/club/2.JPG",
          activityName: "部门聚餐",
          clubName: "轮滑社",
          activityTime: "2020/04/23",
          activityLocation: "梅园食堂"
        }
    ],

    newClub:[
      {
        "clubName": "足球社",
        "clubHeaderName": "Messi",
        "clubHeaderQQ": "1051302489",
        "clubInfo": "武汉大学足球队",
        "clubImg": ""
      },
      {
        "clubName": "电竞社",
        "clubHeaderName": "S1mple",
        "clubHeaderQQ": "9999999",
        "clubInfo": "电子竞技爱好者俱乐部",
        "clubImg": "/images/club/2.JPG"
      }
    ]

  },

  gotoActivityAdmin: function (e) {
    // var index = e.currentTarget.testData.index;
    // var id = this.data.testData[index].id;
    // wx.setStorage({
    //   key:"id",
    //   data:id
    // })

    var info = {
      "clubName": e.currentTarget.dataset.item.clubName,
      "clubImg": e.currentTarget.dataset.item.clubImg,
      "activityName": e.currentTarget.dataset.item.activityName,
      "activityLocation": e.currentTarget.dataset.item.activityLocation,
      "activityTime": e.currentTarget.dataset.item.activityTime
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
      "clubHeaderName": e.currentTarget.dataset.item.clubHeaderName,
      "clubHeaderQQ": e.currentTarget.dataset.item.clubHeaderQQ,
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