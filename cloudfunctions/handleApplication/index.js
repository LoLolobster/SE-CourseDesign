// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let opType = event.opType //0-同意加入社团申请，1-拒绝加入社团，2-同意加入活动，3-拒绝加入活动
  let userID = event.userID
  if(opType === 0){
    let clubID = event.clubID
    let docID = await db.collection("user_club").where({
      clubID : clubID,
      userID : userID,
      state : -1
    }).get()
    docID = docID.data[0]._id

    return await db.collection("user_club").doc(docID).update({
      data : {
        state: 1
      }
    })
  }

  else if(opType === 1){ //拒绝加入社团
    let clubID = event.clubID
    let docID = await db.collection("user_club").where({
      clubID: clubID,
      userID: userID,
      state: -1
    }).get()
    docID = docID.data[0]._id
    return await db.collection("user_club").doc(docID).remove()
  }

  else if(opType === 2){
    let activityID = event.activityID
    let docID = await db.collection("user_activity").where({
      activityID: activityID,
      userID: userID,
      state: -1
    }).get()
    docID = docID.data[0]._id

    return await db.collection("user_activity").doc(docID).update({
      data: {
        state: 1
      }
    })
  }

  else if(opType === 3){
    let activityID = event.activityID
    let docID = await db.collection("user_activity").where({
      activityID: activityID,
      userID: userID,
      state: -1
    }).get()
    docID = docID.data[0]._id
    return await db.collection("user-activity").doc(docID).remove()
  }
}