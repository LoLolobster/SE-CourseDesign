// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let opCode = 0 //0-操作失败 1-操作成功 2-已提出申请
  let userID = event.userID
  let clubID = event.clubID
  let handleType = event.handleType //0-加入，1-退出

  //加入，写入user_club，state为-1(加入待审核)
  if(handleType === 0){
    //先查有没有提出过申请
    await db.collection("user_club").where({
      userID : userID,
      clubID : clubID,
      state : -1
    }).get().then(res => {
      if(res.data.length > 0){
        opCode = 2
      }
    })
    //没提出过再处理
    if(opCode !== 2){
      await db.collection("user_club").add({
        data: {
          userID: userID,
          clubID: clubID,
          state: -1
        }
      }).then(res => {
        opCode = 1
      })
    }
  }

  //退出，写入user_club，state为-2(退出待审核)
  else if(handleType === 1){
    //先查有没有提出过申请
    await db.collection("user_club").where({
      userID: userID,
      clubID: clubID,
      state: -2
    }).get().then(res => {
      if (res.data.length > 0) {
        opCode = 2
      }
    })
    //没提出过再处理
    if (opCode !== 2) {
      await db.collection("user_club").add({
        data: {
          userID: userID,
          clubID: clubID,
          state: -2
        }
      }).then(res => {
        opCode = 1
      })
    }
  }
  return {opCode}
}