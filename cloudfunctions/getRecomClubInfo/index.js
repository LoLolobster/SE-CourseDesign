// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  await db.collection('recomClub').where({
    userID: event.userID
  })
  .get()
  .then(res => {
    clubs = res.data[0].clubItem
  })  
  
  var clubInfoList = []
  allClub = db.collection('allClub')
  for (let i in clubs){
    await allClub.where({
      _id : clubs[i][0]
    }).get()
    .then(res =>{
      let clubInfo = {
        clubImg: res.data[0].clubImg,
        clubName: res.data[0].clubName,
        memberCount: res.data[0].memberCount,
        score: clubs[i][1],
        tag: res.data[0].tag
      }
      clubInfoList.push(clubInfo)
    })
  }

  return {
    clubInfoList
  }
}