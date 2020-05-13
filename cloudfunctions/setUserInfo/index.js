// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const inputData = event.inputData
  const userID = event.userID
   return await db.collection('allUser').doc(String(userID)).update({
     data: {
       userImg: inputData.userImg,
       nickName : inputData.nickName,
       gender : inputData.gender,
       address : inputData.address,
       signature : inputData.signature
     }
   })

}