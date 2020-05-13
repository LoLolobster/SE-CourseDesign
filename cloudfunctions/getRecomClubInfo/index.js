// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let recomClubs = await db.collection("user_club").where({userID : event.userID , state : 2}).get()
  recomClubs = recomClubs.data
  let recomClubsInfo = []
  for (let i in recomClubs)
  {
    clubID = recomClubs[i].clubID
    score = recomClubs[i].score
    recomClub = await db.collection("allClub").where({_id : clubID}).get()
    recomClub = recomClub.data[0]
    recomClub.clubID = clubID
    recomClub.score = score
    recomClubsInfo.push(recomClub)
  }

  return {
    recomClubsInfo
  }
}