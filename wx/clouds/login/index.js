// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 查询用户是否存在
    let result = await db.collection('user').where({
      openId: event.userInfo.openId
    }).get();

    let loginTime = new Date().toLocaleDateString().replace(/-/g, '') * 1;
    let loginDays = 1;
    
    // 如果用户不存在，则新增用户
    if (result.data.length === 0) {
      await db.collection('user').add({
        data: {
          openId: event.userInfo.openId,
          loginTime: loginTime,
          loginDays: loginDays
        }
      });

    // 如果用户已存在，则更新登录时间
    } else if (result.data.length === 1) {
      loginTime = result.data[0].loginTime;
      loginDays = result.data[0].loginDays;

      if (new Date().toLocaleDateString().replace(/-/g, '') * 1 > loginTime * 1) {
        loginTime = new Date().toLocaleDateString().replace(/-/g, '') * 1;
        loginDays++;
      }

      await db.collection('user').where({
        openId: event.userInfo.openId
      }).update({
        data: {
          loginTime: loginTime,
          loginDays: loginDays
        },
      });
    }

    return {
      code: 0,
      msg: 'success',
      data: {
        openId: event.userInfo.openId,
        loginTime: loginTime,
        loginDays: loginDays
      }
    };
    
  } catch (e) {
    return {
      code: 1,
      msg: 'failure'
    };
  }
}