// pages/personinfo/perisoninfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   /* nickName:'尔康',
    avatar:"cloud://mall-x3k10.6d61-mall-x3k10-1301527969/myPhoto.jpg",
    activeNames: ['1'],
    sex: '男',
    province: '湖北',
    city: '武汉',
    signature: 'hello world',
    clublist:'家里蹲社团',*/
    show: false,
    nickName:'',
    avatar:"",
    activeNames: ['1'],
    sex: '',
    province: '',
    city: '',
    signature: '',
    clublist:'',
    position:'',//职位 社长 0/副社长 1/社员 2
    isShezhang:1 ,//0显示，1不显示
    array: ['社长', '副社长', '社员'],
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  showPicker(){
    this.setData({
      show: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //TODO 
  //从数据库中获取{{shezhang}}的值，为1时显示按钮，否则隐藏
  //从数据库中读取用户数据
  onLoad: function (options) {
    var info = wx.getStorageSync('perInfo');
    this.setData({
      nickName: info.name,
      shezhang:1,
      avatar: "",
      activeNames: ['1'],
      sex: '',
      province: '',
      city: '',
      signature: '',
      clublist: '',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      position: e.detail.value
    })
  },
  
  handlerServe(){
    wx.showModal({
      title: '确认',
      content: '确认辞退吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //TODO 从社团数据库中删除该用户
        }
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