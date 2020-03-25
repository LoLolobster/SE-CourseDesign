Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false, //按钮是否禁用
    userName: '', //获取到的用户名栏中的值
    userPwd: '',
    userPwdAgain: '',
    success: false,
    state: ''
  },
  
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login',
    })

  },
  handleInputUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  handleuserPwd: function (e) {
    console.log(e);
    this.setData({
      userPwd: e.detail.value
    })
  },
  handleuserPwdAgain: function (e) {
    console.log(e);
    this.setData({
      userPwdAgain: e.detail.value
    })

  },
  
  submit: function (e) {
    var that = this
    var userName = that.data.userName;
    var warn = null; //warn为当用户名为空时提示用户的文字，默认为空
    if (userName == '') {
      wx.showToast({
        title: '用户名不能为空',
        duration: 2000
      })
      return
    }
    else if (that.data.state == 1) {  //判断是否被注册
      wx.showToast({
        title: '用户名已被注册',
        duration: 2000
      })
      return
    }
    else{
    if (this.data.userPwd == '') {
      wx.showToast({
        title: '请输入密码',
        duration: 2000
      })
      return
    } else if (this.data.userPwdAgain != this.data.userPwd) {
      wx.showToast({
        title: '两次密码不一致',
        duration: 2000
      })
      return
    } else {
      var that = this
      var userName = that.data.userName;
      wx.request({
        url: getApp().globalData.baseUrl + '',
        method: "POST",
        data: {
          userName: userName,
          userPwd: that.data.userPwd
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功~',
            icon: 'loading',
            duration: 2000
          })
          console.log(res)
          that.setData({
            success: true
          })
        }
      })
    }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
