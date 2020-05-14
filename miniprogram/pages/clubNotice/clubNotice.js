Page({
  data: {
    details: [],
  },
  
  onLoad : function(options){
    let that = this
    wx.cloud.callFunction({
      name : "getNoticeInfo",
      data : {
        isGlobal: false,
        clubID: wx.getStorageSync("clubDetail")._id
      }
    }).then(res => {
      if(res.result.noticeInfo.length===0){
        that.setData({
          details: [{noticeTitle : "暂无公告"}]
        })
      }
      else {
        that.setData({
          details: res.result.noticeInfo
        })
      }
    })
  }

})