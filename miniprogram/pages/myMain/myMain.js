// miniprogram/pages/myMain/myMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     nickName:'尔康',
     avatar:"cloud://mall-x3k10.6d61-mall-x3k10-1301527969/myPhoto.jpg",
     activeNames: ['1'],
     sex: '男',
     province: '湖北',
     city: '武汉',
     signature: 'hello world',
     clublist:'家里蹲社团',
    show: false,
    /*nickName: '',
    avatar: "",
    activeNames: ['1'],
    sex: '',
    province: '',
    city: '',
    signature: '',
    clubList: [],*/
    isShezhang: null,
    array: ['社长', '副社长', '社员'],
    mClubList: [{
      'id': '3',
      'title': '家里蹲',
      }, 
      {'id': '1',
      'title': '运动类社团',
      }, ],
    oClubList: [{
      'id': '2',
      'title': 'LGD',
    },
    {
      'id': '0',
      'title': '社团',
    },],
    //0:文学 1:运动 2：电竞 3:其他
    mNoticeList: [{
      'content': '你妈妈喊你回家吃饭',
    },
    ],
    oNoticeList: [{
      'content': '知道了妈妈妈妈真好',
    },
    ],
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
  //TODO
  },

  showPicker() {
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
    // var info = wx.getStorageSync('perInfo');
    // this.setData({
    //   nickName: info.name,
    //   shezhang:1,
    //   avatar: "",
    //   activeNames: ['1'],
    //   sex: '',
    //   province: '',
    //   city: '',
    //   signature: '',
    //   clublist: '',
    // })
    let that = this
    let personID = wx.getStorageSync("personInfo").personID
    let isManager = wx.getStorageSync("personInfo").isManager
    wx.cloud.callFunction({
      "name": "getPersonInfo",
      "data": {
        "personID": personID
      }
    }).then(res => {
      console.log(res)
      that.setData({
        "nickName": res.result.personInfo.userName,
        "avatar": res.result.personInfo.userImg,
        "activeNames": [],
        "sex": res.result.personInfo.gender,
        "province": res.result.personInfo.address[0],
        "city": res.result.personInfo.address[1],
        "signature": res.result.personInfo.signature,
        "isShezhang": isManager,
        "clubList": res.result.personInfo.clubList
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
  },

})