// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const db = cloud.database()
  let isGlobal = event.isGlobal
  //返回最新的全局公告
  if(isGlobal){
    let globalNotice = await db.collection("allNotice")
    .where({ noticeLevel: 0 })
    .orderBy('noticeTime', 'desc')
    .get()
    globalNotice = globalNotice.data[0]
    return { globalNotice }
  }
  //返回所有社团公告
  else {
    let clubID = event.clubID
    console.log(clubID)
    let noticeInfo = await db.collection("allNotice")
    .where({noticeLevel : 1, clubID : clubID})
    .get()
    noticeInfo = noticeInfo.data
    return {noticeInfo}
  }
}