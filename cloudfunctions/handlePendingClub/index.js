// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  let handleRes = 0 //0-数据库操作失败 1-操作成功
  let operation = event.operation
  let clubID = event.clubID
  let managerID = event.managerID
  //user_club表中的pending项
  let user_clubID = await db.collection("user_club").where({ userID: managerID, clubID: clubID }).get()
  user_clubID = user_clubID.data[0]._id

  //同意该社团申请
  if (operation === 0) {
    await db.collection("allClub").doc(String(clubID)).update({
      data: {
        state: "accepted"
      }
    })
    await db.collection("user_club").doc(String(user_clubID)).update({
      data : {
        state : 0
      }
    }).then(rse => {
      handleRes = 1
    })
  }
  //拒绝该社团申请
  else if (operation === 1) {
    await db.collection("allClub").doc(clubID).update({
      data: {
        state: "rejected"
      }
    })

    await db.collection("user_club").doc(String(user_clubID)).remove({
    }).then(res => {
      handleRes = 1
    })
  }

  return { handleRes }
}