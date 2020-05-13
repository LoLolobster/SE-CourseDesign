// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let clubID = event.clubID
  //社长
  let managerID = await db.collection("user_club").where({clubID : clubID, state : 0}).get()
  managerID = managerID.data[0].userID
  let managerInfo = await db.collection("allUser").where({_id : managerID}).get()
  managerInfo = [{ "ID": managerID, "name" : managerInfo.data[0].realName}]

  //社员
  let membersID = await db.collection("user_club").where({clubID : clubID, state : 1}).get()
  membersID = membersID.data

  let userMap = {}
  await db.collection("allUser").get().then(res =>{
    for(let i in res.data){
      userMap[res.data[i]._id] = res.data[i]
    }
  })

  let membersInfo = []
  for(let j in membersID){
    let memberID = membersID[j].userID
    if(memberID in userMap){
      membersInfo.push({
        "ID" : memberID,
        "name" : userMap[memberID].realName
      })
    }
  }
 
 return {managerInfo, membersInfo}
  

}