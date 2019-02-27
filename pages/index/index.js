var util = require('../../utils/util');

Page({
  data: {
    hasLogin: false,
    scrollTop: 0,
    loginBarHeight: 20 + 40,
    userBarHeight: 20 + 50,
    items: [
      {
        title: '为你发现',
        grids: [
          {
            title: '今日推荐',
            url: '../advertisement/index',
            icon: '../../resources/index/advertisement.png'
          },
          {
            title: '每周电影',
            url: '../video/index',
            icon: '../../resources/index/video.png'
          },
          { },
        ]
      },
      {
        title: '便民生活',
        grids: [
          {
            title: '人民币大写',
            url: '../rmb/index',
            icon: '../../resources/index/rmb.png'
          },
          {
            title: '安全扫码',
            url: '../qrcode/index',
            icon: '../../resources/index/qrcode.png'
          },
          {
            title: '非主流火星文',
            url: '../mars/index',
            icon: '../../resources/index/mars.png'
          },
          {
            title: '标准体重',
            url: '../weight/index',
            icon: '../../resources/index/weight.png'
          },
          {
            title: '亲属称谓',
            url: '../kinsfolk/index',
            icon: '../../resources/index/kinsfolk.png'
          },
          {
            title: '女性标准三围',
            url: '../measurement/index',
            icon: '../../resources/index/measurement.png'
          },
          {
            title: '位置信息',
            url: '../location/index',
            icon: '../../resources/index/location.png'
          },
          { },
          { },
        ]
      },
      {
        title: '休闲娱乐',
        grids: [
          {
            title: '真心话大冒险',
            url: '../challenge/index',
            icon: '../../resources/index/challenge.png'
          },
          {
            title: '谁是卧底',
            url: '../undercover/index',
            icon: '../../resources/index/undercover.png'
          },
          {
            title: '猜数字',
            url: '../random/index',
            icon: '../../resources/index/random.png'
          },
        ]
      },
      {
        title: '精品游戏',
        grids: [
          {
            title: '跳一跳',
            miniProgram: true,
            appId: 'wx7c8d593b2c3a7703',
            icon: '../../resources/index/jump.png'
          },
          { },
          { },
        ]
      },
    ]
  },
  onLoad: function () {
    this.setData({
      gridHeight: util.getScreenWidth() / 3 + 'px',
      tips: getTips()
    });

    this.requestInit();
    
    this.login();
  },
  onShareAppMessage: function () {
    return {
      title: '应用中心',
      path: '/pages/index/index'
    };
  },
  onGetUserInfo: function (e) {
    var userInfo = e.detail.userInfo;
    this.requestLogin(userInfo.nickName, userInfo.avatarUrl, userInfo.gender, userInfo.city, userInfo.province, userInfo.country, userInfo.language);

    this.setData({
      hasLogin: true,
      avatar: userInfo.avatarUrl,
      nickname: userInfo.nickName
    });
  }, 
  onUserBarClickListener: function () {
    wx.navigateTo({
      url: '../rank/index',
    });
  },
  login: function () {
    var $this = this;

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              $this.requestLogin(userInfo.nickName, userInfo.avatarUrl, userInfo.gender, userInfo.city, userInfo.province, userInfo.country, userInfo.language);

              $this.setData({
                hasLogin: true,
                avatar: userInfo.avatarUrl,
                nickname: userInfo.nickName
              });
            }
          });
        }
      }
    });
  },
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },
  onTouchEnd: function () {
    var barHeight = this.data.hasLogin ? this.data.userBarHeight : this.data.loginBarHeight;

    if (this.data.scrollTop <= barHeight / 2) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (this.data.scrollTop <= barHeight) {
      wx.pageScrollTo({
        scrollTop: barHeight,
      });
    }
  },
  requestInit: function () {
    var $this = this;

    wx.cloud.callFunction({
      name: 'init',
      success: function (res) {
        console.log('init', res.result);

        // 累计用户
        $this.setData({
          userSum: '累计用户 ' + res.result.data.userSum,
        });

        // 红包
        if (res.result.data.moneyEnable) {
          $this.setData({
            items: [
              {
                title: '限时推广',
                grids: [
                  {
                    title: '红包',
                    url: '../money/index',
                    icon: '../../resources/index/money.png'
                  },
                  {},
                  {}
                ]
              }
            ].concat($this.data.items)
          });
        }
      }
    });
  },
  requestLogin: function (nickname, avatar, gender, city, province, country, language) {
    var $this = this;

    wx.cloud.callFunction({
      name: 'login',
      data: {
        nickname: nickname,
        avatar: avatar,
        gender: gender,
        city: city,
        province: province,
        country: country,
        language: language
      },
      success: function (res) {
        console.log('login', res.result);

        $this.setData({
          loginDays: '已使用 ' + res.result.data.loginDays + ' 天',
        });
      }
    });
  }
});

function getTips() {
  var hour = new Date().getHours();
  
  if (hour >= 6 && hour <= 9) {           // 早上
    return '一日之计在于晨。'; 
  } else if (hour >= 10 && hour <= 11) {  // 上午
    return '面朝大海，春暖花开。';
  } else if (hour >= 12 && hour <= 13) {  // 中午
    return '午安，我的朋友。';
  } else if (hour >= 14 && hour <= 16) {  // 下午
    return '滴水穿石，非一日之功。';
  } else if (hour >= 17 && hour <= 18) {  // 傍晚
    return '出去走走，看看世界。';
  } else if (hour >= 19 && hour <= 23) {  // 晚上
    return '结束一天的忙碌，回归生活。';
  } else if (hour >= 0 && hour <= 5) {    // 深夜
    return '还不去睡觉？';
  }
}