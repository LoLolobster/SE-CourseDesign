// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  var returnData = []
  await db.collection("allActivity")
  .aggregate()
  .lookup({
    from : "allClub",
    localField : "clubID",
    foreignField : "_id",
    as : "club"
  })
  .match({
    state : "pending"
  })
  .end()
  .then(res => {{
    for (let i in res.list){
      item = {}
      item.activityID = res.list[i]._id
      item.activityContent = res.list[i].activityContent
      item.activityLocation = res.list[i].activityLocation
      item.activityName = res.list[i].activityName
      item.activityTime = res.list[i].activityTime
      item.clubImg = res.list[i].club[0].clubImg
      item.clubName = res.list[i].club[0].clubName
      returnData.push(item)
    }
  }})
  return {returnData}
}