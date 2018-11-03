// 云函数入口文件
const cloud = require('wx-server-sdk');
const moment = require('moment');

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let openId = event.userInfo.openId;
    let loginTime = moment().format('YYYYMMDD') * 1;
    let loginDays = 1;
    let nickname = event.nickname;
    let avatar = event.avatar;
    let gender = event.gender;
    let city = event.city;
    let province = event.province;
    let country = event.country;
    let language = event.language;

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
          loginDays: loginDays,
          nickname: nickname,
          avatar: avatar,
          gender: gender,
          city: city,
          province: province,
          country: country,
          language: language
        }
      });
    }

    // 如果用户已存在，则进行更新
    if (result.data.length === 1) {
      loginTime = result.data[0].loginTime;
      loginDays = result.data[0].loginDays;

      if (moment().format('YYYYMMDD') * 1 > loginTime * 1) {
        loginTime =  moment().format('YYYYMMDD') * 1;
        loginDays++;
      }

      await db.collection('_user').where({
        openId: event.userInfo.openId
      }).update({
        data: {
          loginTime: loginTime,
          loginDays: loginDays,
          nickname: nickname,
          avatar: avatar,
          gender: gender,
          city: city,
          province: province,
          country: country,
          language: language
        },
      });
    }

    return {
      code: 0,
      msg: 'success',
      data: {
        openId: openId,
        loginTime: loginTime,
        loginDays: loginDays,
        nickname: nickname,
        avatar: avatar,
        gender: gender,
        city: city,
        province: province,
        country: country,
        language: language,
      }
    };
    
  } catch (e) {
    console.error(e);

    return {
      code: 1,
      msg: 'failure'
    };
  }
};