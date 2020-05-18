// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let clubName = event.clubName
  let clubInfo = event.clubInfo
  let clubImg = event.clubImg
  let userID = event.userID
  let returndata = null
  await db.collection("allClub").add({
    data : {
      clubImg : clubImg,
      clubInfo : clubInfo,
      clubName : clubName,
      state : "pending"
    }
  }).then(res => {
    returndata = res
  })

  return await db.collection("user_club").add({
    data : {
      clubID : returndata._id,
      userID : userID,
      state : 0
    }
  })
}