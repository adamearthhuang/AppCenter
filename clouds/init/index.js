// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let result = await db.collection('_').get();

    return {
      ret: 0,
      data: result.data[0]
    };

  } catch (e) {
    console.error(e);

    return {
      ret: -1
    };
  }
};