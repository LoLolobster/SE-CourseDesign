// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let personID = event.personID
  let personInfo = await db.collection("allUser").where({_id : personID}).get()
  personInfo = personInfo.data[0]

  let activityList = []
  await db.collection("user_activity").aggregate().lookup({
    from : "allActivity",
    localField : "activityID",
    foreignField : "_id",
    as : "hisActivity"
  })
  .match({
      userID: personID
    })
  .end()
  .then(res => {
    for(let i in res.list){
      activityList.push(res.list[i].hisActivity[0])
    }
  })

  let clubList = []
  await db.collection("user_club").aggregate().lookup({
    from : "allClub",
    localField : "clubID",
    foreignField : "_id",
    as : "hisClub"
  })
  .match({
    userID : personID
  })
  .end()
  .then(res => {
    for (let i in res.list){
      clubList.push(res.list[i].hisClub[0])
    }
  })

  personInfo.activityList = activityList
  personInfo.clubList = clubList
  return {personInfo}

}