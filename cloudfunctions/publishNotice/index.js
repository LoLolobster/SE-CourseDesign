// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let publisherID = event.publisherID
  let noticeContent = event.noticeContent
  let noticeLevel = event.noticeLevel
  return await db.collection('allNotice').add({
    data : {
      noticeContent : noticeContent,
      noticeLevel, noticeLevel,
      noticeTime : Date.now(),
      publisherID : publisherID
  }})
}