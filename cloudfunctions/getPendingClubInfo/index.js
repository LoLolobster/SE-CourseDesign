// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  var data = []
  await db.collection("pendingClub").aggregate().lookup({
    from : "allUser",
    localField: "clubManagerID",
    foreignField : "_id",
    as : "clubManager"
  }).end()
  .then( res => {
    for (let i in res.list){
      item = {}
      item.clubImg = res.list[i].clubImg
      item.clubName = res.list[i].clubName
      item.clubInfo = res.list[i].clubInfo
      item.managerName = res.list[i].clubManager[0].realName
      item.managerTel = res.list[i].clubManager[0].tel
      item.managerQQ = res.list[i].clubManager[0].QQ
      data.push(item)
    }
  })

  return {data}
}