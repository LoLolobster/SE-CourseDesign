// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  
  let manageClubs = []
  let joinClubs = []

  let userID = event.userID
  
  //获取所有管理社团的ID
  let manageClubIDs = []
  manageClubs = await db.collection("user_club").where({
    userID : userID,
    state : 0
  }).get()
  manageClubs = manageClubs.data
  for(let mc of manageClubs){
    manageClubIDs.push(mc.clubID)
  }

  //获取所有参加社团的ID
  let joinClubIDs = []
  joinClubs = await db.collection("user_club").where({
    userID : userID,
    state : 1
  }).get()
  joinClubs = joinClubs.data 
  for(let jc of joinClubs){
    joinClubIDs.push(jc.clubID)
  }

  manageClubs = []
  for(let i in manageClubIDs){
   await db.collection("allClub").doc(manageClubIDs[i]).get().then(res => {
     manageClubs.push(res.data)
   })
  }

  joinClubs = []
  for (let j in joinClubIDs){
    await db.collection("allClub").doc(joinClubIDs[j]).get().then(res => {
      joinClubs.push(res.data)
    })
  }

  return {manageClubs,joinClubs}
}