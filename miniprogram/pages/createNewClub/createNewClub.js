// miniprogram/pages/createNewClub/createNewClub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp_img: "",
    clubName: "",
    clubInfo: ""


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /*
    将新社团信息储存在云数据库pendingclub中
  */
  

  upimg: function() {
    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let filePath = res.tempFilePaths[0] //临时文件路径
        let cloudPath = Date.now() + "club" + filePath.match(/\.[^.]+?$/)[0] //远端文件名
        wx.cloud.uploadFile({ //上传到云存储
          cloudPath,
          filePath
        }).then(res => {
          that.setData({ //再设置回本地
            "temp_img": res.fileID
          })
        })

      },
    })
  },
  clubNameInput: function(e) {
    this.setData({
      clubName: e.detail.value
    })
  },
  headerNameInput: function(e) {
    this.setData({
      headerName: e.detail.value
    })
  },
  headerqqInput: function(e) {
    this.setData({
      headerqq: e.detail.value
    })
  },
  headerPhoneInput: function(e) {
    this.setData({
      headerPhone: e.detail.value
    })
  },
  clubInfoInput: function(e) {
    this.setData({
      clubInfo: e.detail.value
    })
  },

  formSubmit: function(e) {
    let that = this 
    if (this.data.clubName === "") {
      wx.showToast({
        title: "社团名称为空！",
        image:'/images/warning.png',
        duration:2000
      })
    } else if (this.data.clubInfo === "") {
      wx.showToast({
        title: "社团简介为空！",
        image: '/images/warning.png'
      })
    }
    else {
      wx.cloud.callFunction({
        name : "createClub",
        data : {
          clubImg : that.data.temp_img,
          clubInfo : that.data.clubInfo,
          clubName : that.data.clubName,
          userID : wx.getStorageSync("userID")
        }
      }).then(res =>{
        console.log(res)
        wx.showToast({
          title: "已提交社团申请！",
          icon: "success"
        })
      })
    }
  },
})