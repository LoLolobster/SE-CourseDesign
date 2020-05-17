// miniprogram/pages/club-Activity/club-Activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    clubName: "",
    clubImg: "",

    realData: [
      {
        activityLocation: "信部操场",
        activityTime: "2020/05/10",
        activityName: "新学期招新"
      }, {
        activityLocation: "梅园操场",
        activityTime: "2020/05/11",
        activityName: "诗词大会"
      }, {
        activityLocation: "樱顶",
        activityTime: "2020/05/14",
        activityName: "第三周例会"
      }
    ]
    ,
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
    locationFilter: [
      {
        text: '所有',
        value: 0
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('clubInfo');
    console.log(info.clubName);
    this.setData({
      "clubName": info.clubName,
      "clubImg": info.clubImg
    });
    wx.removeStorageSync('clubName');
  },

  gotoThisActivity: function (e) {
    var info = {
      "clubName": this.clubName,
      "clubImg": this.clubImg,
      "activityName": e.currentTarget.dataset.item.activityName,
      "activityLocation": e.currentTarget.dataset.item.activityLocation,
      "activityTime": e.currentTarget.dataset.item.activityTime
    };

    wx.setStorageSync('activityInfo', info);

    wx.navigateTo({
      url: '../activityInfo/activityInfo'
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