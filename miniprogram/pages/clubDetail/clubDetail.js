const app = getApp();
const db = wx.cloud.database()
Page({
  data: {
      clubName:"",
      clubIntro:"",
      clubImage: "",
      hasJoined : false
  },

  /**
   * 处理加入社团和退出社团的申请
   * 根据hasJoined判断申请类型
  */
  handleApplication : function(){
    let handleType = 0 //0-加入 1-退出
    if(this.data.hasJoined){
      handleType = 1
    }
    
    wx.showModal({
      title: '',
      content: '是否确认提出该申请？',
      success (res) {
        if(res.confirm){
          //推送申请到后端
          wx.cloud.callFunction({
            name: "handleUserApplication_Club",
            data: {
              userID: wx.getStorageSync("userID"),
              clubID: wx.getStorageSync("clubDetail")._id,
              handleType: handleType
            }
          }).then(res => {
            if (res.result.opCode === 1) {
              wx.showToast({
                title: '申请成功，请等待审核',
                icon: 'none'
              })
            }
            else if (res.result.opCode === 2) {
              wx.showToast({
                title: '已申请，请勿重复操作',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },



  /**
   * 主要干两件事：从缓存获取当前页面要展示的和需要传递给子页面的社团信息，
   *              查询当前登录的用户在不在这个社团里
  */
  onLoad: function (options) {
    let clubDetail_info = wx.getStorageSync("clubDetail")
    this.setData({
      clubName : clubDetail_info.clubName,
      clubIntro : clubDetail_info.clubInfo,
      clubImage : clubDetail_info.clubImg
    })

    //看看有没有关于当前用户加入社团的信息，有就直接拿来用，否则调用数据库读取
    let that = this
    wx.getStorageInfo({
      success: function(res) {
        let hasInfo = false
        for(let key of res.keys){
          if(key === "userClub"){
            hasInfo = true
            break
          }
        }
        if(!hasInfo){ //如果没有，调云函数获取，并写入缓存
          wx.cloud.callFunction({
            name: "getUserClub",
            data: {
              userID: wx.getStorageSync("userID")
            }
          }).then(res => {
            wx.setStorageSync("userClub", res.result)
          })
        }
        let userClubInfo = wx.getStorageSync("userClub") //调取缓存查询是否加入当前社团

        let currentClubID = wx.getStorageSync("clubDetail")._id
        for (let mc of userClubInfo.manageClubs){
          if(mc._id === currentClubID){
            that.setData({
              hasJoined :true
            })
          }
        }
        for (let jc of userClubInfo.joinClubs) {
          if (jc._id === currentClubID) {
            that.setData({
              hasJoined: true
            })
          }
        }

      },
    })

  },
  
  toNotice: function () {
    wx.navigateTo({
      url: '../clubNotice/clubNotice'
    })
  },

  getScanning: function () {
    app.getScanning()
  }
})