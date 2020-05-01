// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  var data = []
  await db.collection("pendingActivity").aggregate().lookup   ({
    from : "allClub",
    localField : "clubID",
    foreignField : "_id",
    as : "club"
  }).end()
  .then(res => {
    for(let i in res.list){
      item = {}
      item.activityContent = res.list[i].activityContent
      item.activityName = res.list[i].activityName
      item.activityLocation = res.list[i].activityLocation
      item.activityTime = res.list[i].activityTime
      item.clubImg = res.list[i].club[0].clubImg
      item.clubName = res.list[i].club[0].clubName
      data.push(item)
    }
  })
  return {data}

}