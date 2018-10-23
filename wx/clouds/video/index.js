// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let result = await db.collection('video').get();

    let index = result.data[0].index;
    let timestamp = result.data[0].timestamp;
    let length = result.data.length - 1;

    if (timestamp == 0) {
      timestamp = Date.parse(new Date()) * 1;

    } else {
      if (Date.parse(new Date()) * 1 - timestamp * 1 > 7 * 24 * 60 * 60 * 1000) {
        index = index + 1 >= length ? 0 : index + 1;
        timestamp = Date.parse(new Date()) * 1;
      } else {
        index = index >= length ? 0 : index;
      }
    }

    await db.collection('video').where({
      _id: 'W89FdQIrVDZJFtV4'
    }).update({
      data: {
        index: index,
        timestamp: timestamp
      }
    });

    return {
      code: 0,
      msg: 'success',
      data: {
        index: index,
        timestamp: timestamp,
        name: result.data[index + 1].name,
        vid: result.data[index + 1].vid
      }
    };
  } catch (e) {
    console.error(e);

    return {
      code: 1,
      msg: 'failure'
    };
  }
}