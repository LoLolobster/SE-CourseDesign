// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
 const db = cloud.database()
 
 let clubID = event.clubID
  
 let reportData = {}

 //社团成员数量
 let memberCount = []
 let clubInfo = await db.collection("allClub").doc(clubID).get()
  for(let mc of clubInfo.data.lastMemberCount){
    memberCount.push(mc)
  }
  memberCount.push(clubInfo.data.memberCount)

  //社团活动的参与人数
  let activityList = await db.collection("allActivity").where({clubID : clubInfo.data._id}).get() //先拿到所有的活动列表
  let activityNames = [] //获取所有活动的名字
  let activityMemberCount = [] //获取所有活动的参与人数
  for(let ac of activityList.data){
    activityNames.push(ac.activityName)
    let count = await db.collection("user_activity").where({activityID : ac._id}).get()
    count = count.data.length
    activityMemberCount.push(count)
  }

  //社团男女比例
  let userList = await db.collection("user_club").where({ clubID: clubInfo.data._id}).get()
  let sum = userList.data.length
  let maleNumber = 0
  let femaleNumber = 0
  let bmNumber = 0
  for(let userID of userList.data){
    let user = await db.collection("allUser").doc(userID.userID).get()
    user = user.data
    if(user.gender === "男"){
      maleNumber += 1
    }
    else if(user.gender === "女"){
      femaleNumber += 1
    }
    else{
      bmNumber += 1
    }
  }
  let genderPartition = []
  genderPartition.push(maleNumber/sum)
  genderPartition.push(femaleNumber / sum)
  genderPartition.push(bmNumber / sum)

  //构造成员数量曲线图
  reportData.lineChartData = {}
  reportData.lineChartData.memberCount = memberCount
  reportData.lineChartData.year = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020']
  
  //构造活动参与人数柱状图
  reportData.columnChartData ={}
  reportData.columnChartData.activityNames = activityNames
  reportData.columnChartData.activityMemberCount = activityMemberCount

  //构造社团男女比例饼状图
  reportData.pieChartData = {}
  reportData.pieChartData.genderPartition = genderPartition
  reportData.pieChartData.genderNames = ["男","女","保密"]

 return {reportData}
}