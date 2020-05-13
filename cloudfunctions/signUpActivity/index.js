// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  let currentState = null //0-未报名 1-报名成功 2-已报名
  let inputUserID = event.userID
  let inputActivityID = event.activityID

  await db.collection("user_activity").where({
    userID: inputUserID,
    activityID: inputActivityID
  }).get().then(res => {
    if(res.data.length === 0){
      currentState = 0
    }
    else{
      currentState = 2 
    }
  })

  if (currentState === 0){
    await db.collection("user_activity").add({
      data: {
        userID: inputUserID,
        activityID: inputActivityID,
        state: 2
      }
    })
      .then(res => {
        currentState = 1
      })

  }
  return  {currentState}
}