// miniprogram/pages/myMain/myMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     nickName:'',
     avatar:"",
     activeNames: ['1'],
     sex: '',
     province: '',
     city: '',
     signature: '',
     clublist:'',
    show: false,
    isShezhang: null,
    array: ['社长', '副社长', '社员'],
    mClubList: [],
    oClubList: [],
    mActivityList: [],
    oActivityList :  [],
    mNoticeList: [],
    oNoticeList: [],
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  gotoClub: function (e){
    wx.setStorageSync("clubDetail", e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../clubDetail/clubDetail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  gotoPersonSet(){
    wx.navigateTo({
      url: '../personInfoSet/personinfoSet',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  createClub(){
    wx.navigateTo({
      url: '../createNewClub/createNewClub',
    })
  },

  showPicker() {
    this.setData({
      show: true
    });
  },

  gotoClubManagement: function () {
    wx.navigateTo({
      url: '../clubManagement/clubManagement'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let personID = wx.getStorageSync("userID")
    wx.cloud.callFunction({
      "name": "getPersonInfo",
      "data": {
        "personID": personID
      }
    }).then(res => {
      wx.setStorageSync("myMainInfo", res.result.personInfo)
      that.setData({
        "nickName": res.result.personInfo.nickName,
        "avatar": res.result.personInfo.userImg,
        "sex": res.result.personInfo.gender,
        "province": res.result.personInfo.address[0],
        "city": res.result.personInfo.address[1],
        "signature": res.result.personInfo.signature,
        "mClubList" : res.result.personInfo.manageClubList,
        "oClubList": res.result.personInfo.joinClubList,
        "mActivityList": res.result.personInfo.manageActivityList,
        "oActivityList": res.result.personInfo.joinActivityList,
        "mNoticeList": res.result.personInfo.publishNoticeList,
        "oNoticeList": res.result.personInfo.receiveNoticeList,


      })
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      position: e.detail.value
    })
  },

  handlerServe() {
    wx.showModal({
      title: '确认',
      content: '确认辞退吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
    
        }
      }
    })
  }
})