// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
 const db = cloud.database()
  //所有社团
 let clubInfoList = await db.collection('allClub').where({state : "accepted"}).get()
 clubInfoList = clubInfoList.data
  //相应的manager
 let managerList = []
 for (let i in clubInfoList){
   clubID = clubInfoList[i]._id
   managerID = await db.collection('user_club').where({clubID : clubID, state : 0}).get()
   managerList.push(managerID.data[0].userID)
 }
  //manager信息
  managerInfoList = []
  for(let j in managerList){
    managerID = managerList[j]
    let managerInfo = await db.collection("allUser").where({_id : managerID}).get()
    managerInfoList.push(managerInfo.data[0])
  }


  for (let k in clubInfoList){
    clubInfoList[k].managerName = managerInfoList[k].realName
    clubInfoList[k].managerQQ = managerInfoList[k].QQ
  }

  return {clubInfoList}
}