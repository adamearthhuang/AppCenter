// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let _ = await query();
    let user = await queryUser(event);
    
    return {
      code: 0,
      msg: 'success',
      data: {
        userSum: _.userSum,
        moneyEnable: _.moneyEnable,
        openId: user.openId,
        loginTime: user.loginTime,
        loginDays: user.loginDays,
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

async function query() {
  let result = await db.collection('_').get();

  return {
    userSum: result.data[0].userSum,
    moneyEnable: result.data[0].moneyEnable
  };
}

async function queryUser(event) {
  let openId = event.userInfo.openId;
  let loginTime = new Date().toLocaleDateString().replace(/-/g, '') * 1;
  let loginDays = 1;

  // 查询用户是否存在
  let result = await db.collection('_user').where({
    openId: event.userInfo.openId
  }).get();

  // 如果用户不存在，则新增用户
  if (result.data.length === 0) {
    await db.collection('_user').add({
      data: {
        openId: openId,
        loginTime: loginTime,
        loginDays: loginDays
      }
    });
  } 

  // 如果用户已存在，则更新登录时间
  if (result.data.length === 1) {
    loginTime = result.data[0].loginTime;
    loginDays = result.data[0].loginDays;

    if (new Date().toLocaleDateString().replace(/-/g, '') * 1 > loginTime * 1) {
      loginTime = new Date().toLocaleDateString().replace(/-/g, '') * 1;
      loginDays++;
    }

    await db.collection('_user').where({
      openId: event.userInfo.openId
    }).update({
      data: {
        loginTime: loginTime,
        loginDays: loginDays
      },
    });
  }

  return {
    openId: openId,
    loginTime: loginTime,
    loginDays: loginDays
  };
}