// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  let handleRes = 0 //0-数据库操作失败 1-操作成功
  let operation = event.operation
  let activityID = event.activityID
  //同意该活动
  if(operation === 0){
    await db.collection("allActivity").doc(String(activityID)).update({
      data : {
        state : "accepted"
      }
    })

    clubID = await db.collection("allActivity").where({_id : activityID}).get()
    clubID = clubID.data[0].clubID
    managerID = await db.collection("user_club").where({clubID : clubID, state : 0}).get()
    managerID = managerID.data[0].userID
    await db.collection("user_activity").add({data : {userID : managerID, activityID : activityID, state : 0}})
    handleRes = 1
  }
  //拒绝该活动
  else if(operation === 1){
    await db.collection("allActivity").doc(activityID).update({
      data : {
        state : "rejected"
      }
    }).then(res => {
      handleRes = 1
    })
  }

  return {handleRes}
}