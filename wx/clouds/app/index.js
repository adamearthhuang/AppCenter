// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let result = await db.collection('app').get();

    return {
      code: 0,
      msg: 'success',
      data: {
        users: result.data[0].users
      }
    };

  } catch (e) {
    return {
      code: 1,
      msg: 'failure'
    };
  }
}