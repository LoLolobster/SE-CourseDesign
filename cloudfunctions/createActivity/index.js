// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let clubName = event.clubName
  let activityContent = event.activityContent
  let activityLocation = event.activityLocation
  let activityTime = event.activutyTime
  let department = event.department
  let activityName = event.activityName

  let clubID = await db.collection("allClub").where({
    clubName : clubName
  }).get()
  clubID = clubID.data[0]._id

  return await db.collection("allActivity").add({
    data : {
      activityContent : activityContent,
      activityLocation : activityLocation,
      activityName : activityName,
      activityTime : activityTime,
      clubID : clubID,
      department :department,
      state : "pending"
    }
  })
}