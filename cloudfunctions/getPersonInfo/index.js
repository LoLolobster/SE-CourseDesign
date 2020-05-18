// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let personID = event.personID
  let personInfo = await db.collection("allUser").where({_id : personID}).get()
  personInfo = personInfo.data[0]

  let manageClubList = []
  await db.collection("user_club").aggregate().lookup({
    from : "allClub",
    localField : "clubID",
    foreignField : "_id",
    as : "hisClub"
  })
  .match({
    userID : personID,
    state : 0
  })
  .end()
  .then(res => {
    for (let i in res.list){
      manageClubList.push(res.list[i].hisClub[0])
    }
  })

  let joinClubList = []
  await db.collection("user_club").aggregate().lookup({
    from: "allClub",
    localField: "clubID",
    foreignField: "_id",
    as: "hisClub"
  })
    .match({
      userID: personID,
      state: 1
    })
    .end()
    .then(res => {
      for (let i in res.list) {
        joinClubList.push(res.list[i].hisClub[0])
      }
    })

  let joinActivityList = []
  await db.collection("user_activity").aggregate().lookup({
    from: "allActivity",
    localField: "activityID",
    foreignField: "_id",
    as: "hisActivity"
  })
    .match({
      userID: personID,
      state: 1
    })
    .end()
    .then(res => {
      for (let i in res.list) {
        joinActivityList.push(res.list[i].hisActivity[0])
      }
    })

  let manageActivityList = []
  for(let mc of manageClubList){
    let activities = await db.collection("allActivity").where({
      clubID : mc._id
    }).get()
    for(let ac of activities.data){
      manageActivityList.push(ac)
    }
  }

  let publishNoticeList = []
  for(let mc of manageClubList){
    let notices = await db.collection("allNotice").where({
      clubID : mc._id,
      noticeLevel : 1
    }).get()
    for(let notice of notices.data){
      publishNoticeList.push(notice)
    }
  } 

  let receiveNoticeList = []
  let globalNotice = await db.collection("allNotice").where({noticeLevel : 0}).get()
  for(let gn of globalNotice.data){
    receiveNoticeList.push(gn)
  }
  for(let jc of joinClubList){
    let notices = await db.collection("allNotice").where({
      clubID: jc._id,
      noticeLevel : 1
    }).get()
    for(let n of notices.data){
      receiveNoticeList.push(n)
    }
  }

  personInfo.joinClubList = joinClubList
  personInfo.manageClubList = manageClubList
  personInfo.joinActivityList = joinActivityList
  personInfo.manageActivityList = manageActivityList
  personInfo.publishNoticeList = publishNoticeList
  personInfo.receiveNoticeList = receiveNoticeList
  return {personInfo}

}