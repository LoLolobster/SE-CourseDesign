// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let globalNotice = await db.collection("allNotice").where({ noticeLevel: 0 }).orderBy('noticeTime', 'desc').get()
  globalNotice = globalNotice.data[0]
  return {globalNotice}
}