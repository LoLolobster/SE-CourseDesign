// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  var returnData = []
  await db.collection("allClub").aggregate().lookup({
    from : "user_club",
    localField: "_id",
    foreignField : "clubID",
    as : "pendingItem"
  })
  .match({
    state : "pending"
  })
  .end()
  .then( res => {
    for(let i in res.list){
      let item = {}
      item.clubID = res.list[i]._id
      item.clubImg = res.list[i].clubImg
      item.clubInfo = res.list[i].clubInfo
      item.clubName = res.list[i].clubName
      item.managerID = res.list[i].pendingItem[0].userID
      returnData.push(item)
    }
  })

  var tasks = []
  for(let i in returnData){
    await db.collection("allUser").where({
      _id : returnData[i].managerID
    }).get().then(res => {
      returnData[i].managerName = res.data[0].realName
      returnData[i].managerQQ = res.data[0].QQ
    })
  }

return {returnData}
  
}