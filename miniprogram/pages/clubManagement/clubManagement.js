// miniprogram/pages/clubManagement/clubManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubFilter : [],
    allClubFilter :[],//用于创建活动
    academyFilter: [],
    genderFilter: [
      {
        text: '所有',
        value: '所有'
      },
      {
        text: '男',
        value: '男'
      },
      {
        text: '女',
        value: '女'
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
    ],
    activityFilter : [],
    
    
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
    uncheckedClubMemberNum: 0,
    uncheckedClubMember: [],
    allUncheckedClubMember:[], //记录所有的待审批社团新成员，用于筛选
    //待审批的活动参与人员
    uncheckedActivityMemberNum: 0,
    uncheckedActivityMember: [],
    allUncheckedActivityMember : [],
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date(2025, 0, 1).getTime(),
    activityClub : "",
    pickedTime:"",
    activityName:"",
    //活动所在校区
    activityLocation:"",
    //活动所在详细地址
    activityLocationDetail:"", 
    activityInfo:"",
    clubOpType : null, //处理社团申请 0-同意,1-拒绝
    activityOpType : null,
  },

  /**
   * 同意或拒绝申请后更新UI
   * type:0-社团，1-活动
   */
  refreshUI: function (applicantID, type) {
    if(type === 0){
      let temp = this.data.uncheckedClubMember
      let allTemp = this.data.allUncheckedClubMember
      for(let i in temp){
        if(temp[i].applicantInfo._id === applicantID){
          temp.splice(i,1)
        }
      }
      for (let i in allTemp) {
        if (allTemp[i].applicantInfo._id === applicantID) {
          allTemp.splice(i, 1)
        }
      }
      this.setData({
        uncheckedClubMember : temp,
        allUncheckedClubMember : allTemp
      })

    }

    if (type === 1) {
      let temp = this.data.uncheckedActivityMember
      let allTemp = this.data.allUncheckedActivityMember
      for (let i in temp) {
        if (temp[i].applicantInfo._id === applicantID) {
          temp.splice(i, 1)
        }
      }
      for (let i in allTemp) {
        if (allTemp[i].applicantInfo._id === applicantID) {
          allTemp.splice(i, 1)
        }
      }
      this.setData({
        uncheckedActivityMember: temp,
        allUncheckedActivityMember: allTemp
      })
    }
  },


  /**
   * 按社团筛选-新成员审批
   */
  onClubChange : function(e){
    let newUncheckedClubMember = []
    for(let app of this.data.allUncheckedClubMember){
      if(app.clubInfo.clubName === e.detail || e.detail==="所有"){
        newUncheckedClubMember.push(app)
      }
    }
    this.setData({
      uncheckedClubMember: newUncheckedClubMember
    })
  },

  /**
   * 按学院筛选-新成员审批
   */
  onAcademyChange: function (e) {
    let newUncheckedClubMember = []
    for (let app of this.data.allUncheckedClubMember) {
      if (app.applicantInfo.academy === e.detail || e.detail === "所有") {
        newUncheckedClubMember.push(app)
      }
    }
    this.setData({
      uncheckedClubMember: newUncheckedClubMember
    })
  },

  /**
   * 按性别过滤-新成员审批
   */
  onGenderChange : function(e){
    let newUncheckedClubMember = []
    for (let app of this.data.allUncheckedClubMember) {
      if (app.applicantInfo.gender === e.detail || e.detail === "所有") {
        newUncheckedClubMember.push(app)
      }
    }
    this.setData({
      uncheckedClubMember: newUncheckedClubMember
    })
  },

  /**
 * 按年级过滤-新成员审批
 */
  onGradeChange: function (e) {
    let newUncheckedClubMember = []
    for (let app of this.data.allUncheckedClubMember) {
      if (app.applicantInfo.grade === e.detail || e.detail === "所有") {
        newUncheckedClubMember.push(app)
      }
    }
    this.setData({
      uncheckedClubMember: newUncheckedClubMember
    })
  },

  /**
 * 按活动名称过滤-活动人员审批
 */
  onActivityChange: function (e) {
    let newUncheckedActivityMember = []
    for (let app of this.data.allUncheckedActivityMember) {
      if (app.activityInfo.activityName === e.detail || e.detail === "所有") {
        newUncheckedActivityMember.push(app)
      }
    }
    this.setData({
      uncheckedActivityMember: newUncheckedActivityMember
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name : "getClubManagementInfo",
      data : {
        userID : wx.getStorageSync("userID")
      }
    }).then(res => {
      console.log(res)
      //社团名过滤器
      let clubNames = []
      let clubNames1 = []
      clubNames.push({
        text: '所有',
        value: '所有'
      })
      for (let a of res.result.managementInfo.clubApplicationList){
        if (!clubNames1.includes(a.clubInfo.clubName)){
          clubNames1.push(a.clubInfo.clubName)
          clubNames.push({ "text": a.clubInfo.clubName, "value": a.clubInfo.clubName })
        }
      }
      //学院名过滤器
      let academyNames = []
      let academyNames1 = []
      academyNames.push({
        text: '所有',
        value: '所有'
      })
      for (let a of res.result.managementInfo.clubApplicationList) {
        if (!academyNames1.includes(a.applicantInfo.academy)) {
          academyNames1.push(a.applicantInfo.academy)
          academyNames.push({ "text": a.applicantInfo.academy, "value": a.applicantInfo.academy })
        }
      }
      //活动名过滤器
      let activityNames = []
      let activityNames1 = []
      activityNames.push({
        text: '所有',
        value: '所有'
      })
      //所有管理的社团
      let allClubNames = []
      for(let mc of wx.getStorageSync("myMainInfo").manageClubList){
        allClubNames.push({ text: mc.clubName, value: mc.clubName})
      }

      that.setData({
        allClubFilter : allClubNames
      })
      for (let a of res.result.managementInfo.activityApplicationList) {
        if (!activityNames1.includes(a.activityInfo.activityName)) {
          activityNames1.push(a.activityInfo.activityName)
          activityNames.push({ "text": a.activityInfo.activityName, "value": a.activityInfo.activityName })
        }
      }
      that.setData({
        uncheckedClubMember : res.result.managementInfo.clubApplicationList,
        uncheckedClubMemberNum: res.result.managementInfo.clubApplicationList.length,
        allUncheckedClubMember: res.result.managementInfo.clubApplicationList,
        clubFilter : clubNames,
        academyFilter : academyNames,
        activityFilter : activityNames,
        uncheckedActivityMemberNum: res.result.managementInfo.activityApplicationList.length,
        uncheckedActivityMember: res.result.managementInfo.activityApplicationList,
        allUncheckedActivityMember: res.result.managementInfo.activityApplicationList
      })
    })
  },


  /*
      该函数同意成员加入社团
    */
  acceptClubApplication: function (e) {
   this.setData({
     clubOpType : 0
   })
  },

  /**
   * 拒绝该加入社团申请
   */
  refuseClubApplication : function(e){
    this.setData({
      clubOpType: 1
    })
  },

  /**
   * 冒泡到cardview进行处理
   */
  handleClubApplication : function(e){
    let that  = this
    let application = e.currentTarget.dataset.item
    if(this.data.clubOpType === 0){ //同意的话
      wx.cloud.callFunction({
        name : "handleApplication",
        data : {
          opType : 0,
          userID : application.applicantInfo._id,
          clubID : application.clubInfo._id
        }
      }).then(res => {
        wx.showToast({
          title: '已同意'
        })
        that.refreshUI(application.applicantInfo._id, 0)
      })
    }

    else if (this.data.clubOpType === 1) { //拒绝
      wx.cloud.callFunction({
        name: "handleApplication",
        data: {
          opType: 1,
          userID: application.applicantInfo._id,
          clubID: application.clubInfo._id
        }
      }).then(res => {
        wx.showToast({
          title: '已拒绝'
        })
        that.refreshUI(application.applicantInfo._id, 0)
      })
    }
  },

  /**
   * 同意活动加入申请
   */
  acceptActivityApplication : function(e){
    this.setData({
      activityOpType : 0
    })
  },

  /**
   * 拒绝活动加入申请
   */
  refuseActivityApplication: function (e) {
    this.setData({
      activityOpType: 1
    })
  },

/**
 * 冒泡到cardview进行处理
 */
  handleActivityApplication : function(e){
    let that = this
    let application = e.currentTarget.dataset.item
    if (this.data.activityOpType === 0) { //同意的话
      wx.cloud.callFunction({
        name: "handleApplication",
        data: {
          opType: 2,
          userID: application.applicantInfo._id,
          activityID: application.activityInfo._id
        }
      }).then(res => {
        wx.showToast({
          title: '已同意'
        })
        that.refreshUI(application.applicantInfo._id, 1)
        
      })
    }

    else if (this.data.clubOpType === 1) { //拒绝
      wx.cloud.callFunction({
        name: "handleApplication",
        data: {
          opType: 3,
          userID: application.applicantInfo._id,
          clubID: application.activityInfo._id
        }
      }).then(res => {
        wx.showToast({
          title: '已拒绝'
        })
        that.refreshUI(application.applicantInfo._id, 1)
      })
    }
  },

  /*时间选择器获取时间*/
  onInput(event) {
    const { detail, currentTarget } = event;
    const result = this.getResult(detail, currentTarget.dataset.type);
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
  chooseClub :function(e){
    this.setData({
      activityClub : e.detail
    })
  },
  onLocationChange:function(e){
    let detail = e.detail
    this.setData({
      activityLocation:e.detail
    })
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
      let that = this
      wx.cloud.callFunction({
        name : "createActivity",
        data : {
          activityContent : that.data.activityInfo,
          activityLocation: that.data.activityLocationDetail,
          activityName : that.data.activityName,
          activityTime : that.data.activityTime,
          clubName : that.data.activityClub,
          department : that.data.activityLocation
        }
      }).then(res => {

        wx.showToast({
          title: "已提交活动申请！",
          icon: "success"
        })
      })
    }
  }
  
})