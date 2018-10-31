var util = require('../../utils/util');

Page({
  data: {
    hasLogin: false,
    scrollTop: 0,
    loginBarHeight: 60,
    userBarHeight: 60,
    items: [
      {
        title: '为你发现',
        grids: [
          {
            title: '今日推荐',
            url: '../advertisement/index',
            icon: '../../resource/index/advertisement.png'
          },
          {
            title: '每周电影',
            url: '../video/index',
            icon: '../../resource/index/video.png'
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
            icon: '../../resource/index/rmb.png'
          },
          {
            title: '安全扫码',
            url: '../qrcode/index',
            icon: '../../resource/index/qrcode.png'
          },
          {
            title: '非主流火星文',
            url: '../mars/index',
            icon: '../../resource/index/mars.png'
          },
          {
            title: '标准体重',
            url: '../weight/index',
            icon: '../../resource/index/weight.png'
          },
          {
            title: '亲属称谓',
            url: '../kinsfolk/index',
            icon: '../../resource/index/kinsfolk.png'
          },
          {
            title: '女性标准三围',
            url: '../measurement/index',
            icon: '../../resource/index/measurement.png'
          },
          {
            title: '位置信息',
            url: '../location/index',
            icon: '../../resource/index/location.png'
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
            icon: '../../resource/index/challenge.png'
          },
          {
            title: '谁是卧底',
            url: '../undercover/index',
            icon: '../../resource/index/undercover.png'
          },
          {
            title: '猜数字',
            url: '../random/index',
            icon: '../../resource/index/random.png'
          },
        ]
      },
    ]
  },
  onLoad: function () {
    this.setData({
      gridHeight: util.getScreenWidth() / 3 + 'px',
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
                    icon: '../../resource/index/money.png'
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
