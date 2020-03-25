// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mall-x3k10'
})


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  await db.collection('allActivity').aggregate()
    .lookup({
      from: 'allClub',
      localField: 'clubID',
      foreignField: '_id',
      as: 'publishedActivities',
    })
    .end()
    .then(res => { console.log(res); data = res})
    .catch(err => console.log(err))
  return {
    data
  }
}