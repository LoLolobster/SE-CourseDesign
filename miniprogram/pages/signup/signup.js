/**
 * 获取数据库引用：allUser集合
*/
const db = wx.cloud.database()
const allUser = db.collection('allUser')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false, //按钮是否禁用
    success: false
  },
  
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/login',
    })

  },

  _handleSubmit: function (e) {

    /**
     * 获取用户输入
    */
    let inputName = e.detail.value.inputName
    let inputPwd = e.detail.value.inputPwd
    let repeatPwd = e.detail.value.repeatPwd

    /**
     * 验证输入合法性
    */

    if (inputName == '') {
      wx.showToast({
        title: '用户名不能为空',
        icon : 'none',
        duration: 2000
      })
      return
    } 
    if (inputPwd == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    } 
    if (inputPwd !== repeatPwd) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }

    /**
     * 注册逻辑
    */
    allUser.where({
      userName : inputName
    }).get()
    .then(res => {
     if(res.data.length > 0){
       wx.showToast({
         title: '用户名已注册',
         duration: 2000
       })
     }
     else{
       allUser.add({
         data : {
           userName : inputName,
           userPwd : inputPwd
         }
       }).then(res =>{
        wx.showModal({
          title: '提示',
          content: '注册成功',
          success : function(res){
            if(res.confirm){
              wx.switchTab({
                url: '../activityMain/activityMain',
              })
            }
            else if(res.cancel){
              wx.switchTab({
                url: '../activityMain/activityMain',
              })
            }
          }
        })
       })
     }
    })
    
    // wx.cloud.callFunction({
    //   name : 'signUp',
    //   data : {
    //     inputName : inputName,
    //     inputPwd : inputPwd
    //   }
    // }).then(res=>{
    //   console.log(res.result)
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
