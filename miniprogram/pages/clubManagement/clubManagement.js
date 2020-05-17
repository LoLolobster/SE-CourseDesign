// miniprogram/pages/clubManagement/clubManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    academyFilter: [],
    genderFilter: [
      {
        text: '所有',
        value: '所有'
      },
      {
        text: '男生',
        value: '男生'
      },
      {
        text: '女生',
        value: '女生'
      }
    ],
    gradeFilter: [
      {
        text: '所有',
        value: 0
      },
      {
        text: '2016级',
        value: '2016级'
      },
      {
        text: '2017级',
        value: '2017级'
      },
      {
        text: '2018级',
        value: '2018级'
      },
      {
        text: '2019级',
        value: '2019级'
      }
    ]
    ,

    //待审批的社团新成员
    uncheckedClubMemberNum: 5,
    uncheckedClubMember: [
      {
        'userImg': "/images/signin/account.png",
        'userName': "User1",
        "userGender": "男",
        "userAcademy": "计算机学院",
        "userGrade": "2017级"
      }, {
        'userImg': "/images/signin/account.png",
        'userName': "User2",
        "userGender": "女",
        "userAcademy": "文学院学院",
        "userGrade": "2017级"
      }, {
        'userImg': "/images/signin/account.png",
        'userName': "User3",
        "userGender": "女",
        "userAcademy": "新闻传播学院",
        "userGrade": "2019级"
      }, {
        'userImg': "/images/signin/account.png",
        'userName': "User4",
        "userGender": "男",
        "userAcademy": "网络安全学院",
        "userGrade": "2016级"
      }, {
        'userImg': "/images/signin/account.png",
        'userName': "User5",
        "userGender": "男",
        "userAcademy": "土木工程学院",
        "userGrade": "2018级"
      }, {
        'userImg': "/images/signin/account.png",
        'userName': "User3",
        "userGender": "女",
        "userAcademy": "新闻传播学院",
        "userGrade": "2019级"
      }
    ],

    //待审批的活动参与人员
    uncheckedActivityMemberNum: 2,
    uncheckedActivityMember: [
      {
        'userImg': "/images/signin/account.png",
        'userName': "User1",
        "userGender": "男",
        "userAcademy": "计算机学院",
        "userGrade": "2017级"
      },
      {
        'userImg': "/images/signin/account.png",
        'userName': "User4",
        "userGender": "男",
        "userAcademy": "网络安全学院",
        "userGrade": "2016级"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },


  /*
      该函数同意成员加入社团，
      主要实现：待审批成员表中删除该成员，社团成员表中加入该成员，
    */
  accept: function () {
    wx.showToast({
      title: '同意申请成功！',
    })
  }
})