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
    locationFilter: [
      {
        text: '所有',
        value: 0
      },
      {
        text: '文理学部',
        value: '文理学部'
      },
      {
        text: '信息学部',
        value: '信息学部'
      },
      {
        text: '工学部',
        value: '工学部'
      },
      {
        text: '医学部',
        value: '医学部'
      }
    ],

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
    ],

    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date(2025, 0, 1).getTime(),

    pickedTime:"",
    activityName:"",
    //活动所在校区
    activityLocation:"",
    //活动所在详细地址
    activityLocationDetail:"", 
    activityInfo:""
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
  },

  /*时间选择器获取时间*/
  onInput(event) {
    const { detail, currentTarget } = event;
    const result = this.getResult(detail, currentTarget.dataset.type);

    console.log(result);
    this.setData({
      pickedTime : result
    })
  },

  getResult(time, type) {
    const date = new Date(time);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return time;
      default:
        return '';
    }
  },

  onLocationChange:function(e){
    let detail = e.detail
    this.setData({
      activityLocation:e.detail
    })
    console.log(detail)
  },

  activityNameInput:function(e){
    this.setData({
      activityName:e.detail.value
    })
  },

  activityLocationDetailInput:function(e){
    this.setData({
      activityLocationDetail: e.detail.value
    })
  },

  activityInfoInput:function(e){
    this.setData({
      activityInfo:e.detail.value
    })
  },


  //提交表单，将数据存入数据库
  formSubmit:function(e){
    if (this.data.activityName === ""){
      wx.showToast({
        title: "活动名称为空！",
        image: '/images/warning.png'
      })
    } else if (this.data.pickedTime === null){
      wx.showToast({
        title: "请选择时间！",
        image: '/images/warning.png'
      })
    } else if (this.data.activityLocation === ""){
      wx.showToast({
        title: "请选择校区！",
        image: '/images/warning.png'
      })
    } else if (this.data.activityLocationDetail === "") {
      wx.showToast({
        title: "详细地址为空！",
        image: '/images/warning.png'
      })
    } else if (this.data.activityInfo === "") {
      wx.showToast({
        title: "活动简介为空！",
        image: '/images/warning.png'
      })
    }
    else{

      //数据库存取操作

      wx.showToast({
        title: "已提交活动申请！",
        icon: "success"
      })
    }
  }
  
})