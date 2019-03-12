// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let result = await db.collection('_user')
                          .orderBy('loginDays', 'desc')
                          .where({
                            gender: db.command.gte(0),
                            _id: db.command.neq('W8i1MN2AWotkmPt2')
                          })
                          .limit(100)
                          .get();

    var data = [];
    for (let i = 0; i < result.data.length; i++) {
      data.push({
        avatar: result.data[i].avatar,
        nickname: result.data[i].nickname,
        loginDays: result.data[i].loginDays
      });
    }

    return {
      code: 0,
      msg: 'success',
      data: data
    };

  } catch (e) {
    console.error(e);

    return {
      code: 1,
      msg: 'failure'
    };
  }
};