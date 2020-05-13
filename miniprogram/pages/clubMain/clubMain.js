// miniprogram/pages/club/club.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    realData: [],
    globalNotice: "深切悼念抗击新冠肺炎疫情斗争牺牲烈士和逝世同胞，4月4日所有社团活动暂时停止",
    testData: [{
      // tabs2: [0, 1],
      "clubName": "足球社",
      "clubHeaderName": "Messi",
      "clubHeaderQQ": "1051302489",
      "clubInfo": "武汉大学足球队",
      "clubImg": ""
    }],

    //推荐社团 数据
    tabTxt: ['社团类型', '社团人数', '评分'], //分类
    tab: [true, true, true],
    typeList: [{
      'id': '1',
      'title': '运动类社团'
    }, {
      'id': '1',
      'title': '文艺类社团'
    }],
    type_id: 0, //类型
    type_txt: '',
    number_id: 0, //人数
    number_txt: '',
    score_id: 0, //评分
    score_txt: '',
  },

  // 选项卡
  filterTab: function(e) {
    var data = [true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function(e) {
    var self = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          type_id: id,
          type_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          number_id: id,
          number_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          score_id: id,
          score_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function() {
    //调用数据接口，获取数据


  },

  navigateTo: function (e) {
    wx.setStorageSync("clubDetail", e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../clubDetail/clubDetail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //切换tab标签事件
  onChange: function (event) {
    wx.showToast({
      title: `点击标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  //固定公告栏在顶部
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取用户（test1）推荐社团信息列表
   let that = this
   wx.cloud.callFunction({
     name : "getRecomClubInfo",
     data : {
       userID: wx.getStorageSync("userID")
     },
     success :function(res) {
       that.setData({
         realData : res.result.recomClubsInfo
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