const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled: true, //登录按钮是否禁用
    userName: "", //用户输入的用户名
    userPwd: "",  //用户输入的密码
    storedName: '', //缓存中的用户名
    storedPwd: '', //缓存中的密码
    remPwdChecked: false, //checkbox是否显示为选中
    autoLoginChecked: false
  },

  /**
   * 用户名输入回调函数——控制登录按钮启用
  */
  onNameInput: function (e) {
    if(e.detail){
      app.globalData.hasNameInput = true
      this.setData({
        userName : e.detail
      })
    }     
    else
      app.globalData.hasNameInput = false
    this.setData({
      btnDisabled: !(app.globalData.hasNameInput & app.globalData.hasPwdInput)
    })
  },

  /**
   * 密码输入回调函数——控制登录按钮启用
  */
  onPwdInput : function(e) {
    if(e.detail){
      app.globalData.hasPwdInput = true
      this.setData({
        userPwd: e.detail
      })
    }
    else
    app.globalData.hasPwdInput = false
    this.setData({
      btnDisabled: !(app.globalData.hasNameInput && app.globalData.hasPwdInput)
    })
    
  },


  /**
   * checkbox回调：记住密码&自动登陆
  */
  _handlerCheck: function (e) {
    app.globalData.remPwd = false
    app.globalData.autoLogin = false
    for (let i = 0; i < e.detail.value.length; i++) {
      if (e.detail.value[i] === "remPwd") app.globalData.remPwd = true
      if (e.detail.value[i] === "autoLogin") app.globalData.autoLogin = true
    }
    //缓存——是否记住密码
    wx.setStorage({
      key: 'remPwdChecked',
      data: app.globalData.remPwd
    })
  },

  /**
   * 登录按钮回调：处理登录事件
  */
  _handlerLogin : function(e){

    wx.showLoading({
      title: '登录中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    let inputName = this.data.userName 
    let inputPwd = this.data.userPwd
    //调用数据库查询
    const db = wx.cloud.database()
    db.collection("allUser").where({
      userName : inputName,
    })
    .get()
    .then(res => {
      //查询用户名成功
      if(res.data.length > 0){
        //密码匹配成功
        if(res.data[0].userPwd === inputPwd){
          //设置全局变量userID
          app.globalData.userID = res.data[0]._id
          //将全局变量userName设置为当前登录的用户名
          app.globalData.userName = res.data[0].userName

          wx.setStorage({
            key: 'userID',
            data: res.data[0]._id,
          })
          
          //如果记住密码——缓存用户名,密码与ID
          if (app.globalData.remPwd) {
            wx.setStorage({
              key: 'userName',
              data: inputName,
            })
            wx.setStorage({
              key: 'userPwd',
              data: inputPwd,
            })
            
          }
          //缓存——是否自动登录(只有在初次登录成功时才能自动登录)
          if (app.globalData.autoLogin){
            wx.setStorage({
              key: 'autoLoginChecked',
              data: app.globalData.autoLogin
            })
          }    
          //页面跳转
          wx.switchTab({
            url: '../activityMain/activityMain',
          })
        }
        //密码匹配失败
        else{
          wx.showToast({
            title: '用户名或密码错误！',
            icon: 'none',
            duration: 2000
          })
        }
      }
      //没有查到用户名
      else{
        wx.showToast({
          title: '请先注册！',
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  },

  /**
   * 注册按钮点击事件
  */
  _handlerSignUp:function(){
       wx.navigateTo({
        url: '../signup/signup'})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取缓存：自动登录是否被勾选
    wx.getStorage({
      key: 'autoLoginChecked',
      success: function(res) { 
        that.setData({ autoLoginChecked:res.data }) 
        //如果缓存显示上次已经勾选（即初次登录成功）
        if(that.data.autoLoginChecked){
          //页面跳转
          wx.switchTab({
            url: '../activityMain/activityMain',
          })
        }
      },
    })
    
    //获取缓存：上次记住密码是否被勾选
    wx.getStorage({
      key: 'remPwdChecked',
      success: function (res) {
        that.setData({ remPwdChecked: res.data })
        //如果勾选
        if (that.data.remPwdChecked) {
          //获取缓存：用户名&密码，填充输入框
          wx.getStorage({
            key: 'userName',
            success: function (res) {
              that.setData({
                storedName: res.data,
                userName :res.data
              })
            },
          })
          wx.getStorage({
            key: 'userPwd',
            success: function (res) {
              that.setData({
                storedPwd: res.data,
                userPwd : res.data,
                btnDisabled: false //如果有缓存数据，登录按钮自动启用
              })
            },
          })
        }
      },
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
