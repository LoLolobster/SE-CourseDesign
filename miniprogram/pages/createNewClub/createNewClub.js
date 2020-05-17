// miniprogram/pages/createNewClub/createNewClub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp_img: ""
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


  formSubmit: function(e) {
    var id = e.target.id
    adds = e.detail.value;
    adds.program_id = app.jtappid
    adds.openid = app._openid
    adds.zx_info_id = this.data.zx_info_id
    this.upload()

    wx.showToast({
      title:"已提交新社团申请！"
    })
  },


  /*
    将新社团信息储存在云数据库pendingclub中
  */
  upload: function() {
    var that = this

    wx.uploadFile({

      //url填写服务器数据库的图片储存路径
      url: 'https:***/submit',
      filePath: that.data.temp_img,
      name: 'content',
      formData: adds,
      success: function(res) {
        console.log(res)
        if (res) {
          wx.showToast({
            title: '已提交发布！',
            duration: 3000
          });
        }
      }
    })

    this.setData({
      formdata: ''
    })
  },

  upimg: function() {
    var that = this;
    
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function(res) {
          that.setData({
            temp_img: that.data.temp_img.concat(res.tempFilePaths)
          })
        }
      })
  },
})