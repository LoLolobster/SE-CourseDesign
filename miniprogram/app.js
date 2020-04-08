//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'mall-x3k10',
        traceUser: true,
      })
    }

    this.globalData = {
      join:false,
      hasNameInput : false, //登录页面输入框是否有数据
      hasPwdInput : false,   //用于控制登录界面登录按钮的启用
      remPwd : false, //是否记住密码
      autoLogin : false //是否自动登录
    }
  }
})