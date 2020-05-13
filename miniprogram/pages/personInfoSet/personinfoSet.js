// miniprogram/pages/personInfo/personinfo.js
Page({
  data: {
    show: false,
    tempFilePaths: '',//文件路径
    nickName: '',//昵称
    avatar: "",//头像
    sex: '',
    signature: '',
    items: [
      { name: 'man', value: '男' },
      { name: 'femail', value: '女' },
      { name: 'bm', value: '保密' }
    ],
    region: [],
    customItem: ''
  },
  chooseimage: function () {//点击头像事件 
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let filePath = res.tempFilePaths[0] //临时文件路径
        let cloudPath = Date.now() + wx.getStorageSync("userName") + filePath.match(/\.[^.]+?$/)[0] //远端文件名
        wx.cloud.uploadFile({ //上传到云存储
          cloudPath,
          filePath
        }).then(res => {
          _this.setData({ //再设置回本地
            "avatar" : res.fileID
          })
        })

      },
    })
  },

  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  nickNameInput: function (e) {//昵称改变事件 
    this.setData({
      nickName: e.detail.value
    })
  },
  signatureInput: function (e) {//签名改变事件
    this.setData({
      signature: e.detail.value
    })
  },
  
  save: function () {//存数据
    //获取修改后的数据
    let inputData = {
      userImg : this.data.avatar,
      nickName : this.data.nickName,
      gender :this.data.sex,
      address : this.data.region,
      signature : this.data.signature
    }

    wx.cloud.callFunction({
      "name" : "setUserInfo",
      "data" : {
        inputData : inputData,
        userID : wx.getStorageSync("userID")
      }
    }).then(res => {
      wx.showToast({
        title: '保存成功！',
      })
    })
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onLoad: function () {
    let that = this 
    let userID = wx.getStorageSync("userID")
    wx.cloud.callFunction({
      "name" : "getPersonInfo",
      "data" : {
        personID : userID
      }
    }).then(res => {
      that.setData({
        "tempFilePaths" : res.result.personInfo.userImg,
        "nickName": res.result.personInfo.nickName,
        "avatar": res.result.personInfo.userImg,
        "sex": res.result.personInfo.gender,
        "signature": res.result.personInfo.signature,
        "region": res.result.personInfo.address
      })
    })

  },
})