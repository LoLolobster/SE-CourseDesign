// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let managementInfo = {}
  let userID = event.userID

  //获取管理的社团
  let manageClubList = []
  await db.collection("user_club").aggregate().lookup({
    from: "allClub",
    localField: "clubID",
    foreignField: "_id",
    as: "hisClub"
  })
    .match({
      userID: userID,
      state: 0
    })
    .end()
    .then(res => {
      for (let i in res.list) {
        manageClubList.push(res.list[i].hisClub[0])
      }
    })

    //获取管理的活动
  let manageActivityList = []
  for (let mc of manageClubList) {
    let activities = await db.collection("allActivity").where({
      clubID: mc._id
    }).get()
    for (let ac of activities.data) {
      manageActivityList.push(ac)
    }
  }

  //获取管理社团的加入申请
  let clubApplicationList = []
  for(let mc of manageClubList){
   let applicants = await db.collection("user_club").where({
     clubID : mc._id,
     state : -1
   }).get()
   applicants = applicants.data
   for(let application of applicants){
     let applicant = await db.collection("allUser").doc(application.userID).get()
     applicant = applicant.data
     clubApplicationList.push({ clubInfo: mc, applicantInfo: applicant })
   }
  }

  //获取管理活动的加入申请
  let activityApplicationList = []
  for(let ma of manageActivityList){
    let applicants = await db.collection("user_activity").where({
      activityID : ma._id,
      state : -1
    }).get()
    applicants = applicants.data
    for(let a of applicants){
      let applicant = await db.collection("allUser").doc(a.userID).get()
      applicant = applicant.data
      activityApplicationList.push({"activityInfo":ma, "applicantInfo":applicant})
    }
  }

  managementInfo["clubApplicationList"] = clubApplicationList
  managementInfo["activityApplicationList"] = activityApplicationList
  return { managementInfo}
}