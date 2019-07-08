var util = require('../../utils/util');

Page({
  data: {
    items: [
      {
        title: '为你发现',
        grids: [
          {
            title: '今日推荐',
            url: '../advertisement/index',
            icon: '../../resources/index/advertisement.png'
          },
          { },
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
    });

    this.requestInit();
  },
  showAD: function () {
    // 在页面中定义插屏广告
    let interstitialAd = null;

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-68e171a71a23996a'
      });
      interstitialAd.onLoad(() => { });
      interstitialAd.onError((err) => { });
      interstitialAd.onClose(() => { });
    }

    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err);
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '应用中心',
      path: '/pages/index/index'
    };
  },
  requestInit: function () {
    var $this = this;

    wx.cloud.callFunction({
      name: 'init',
      success: function (res) {
        console.log('init', res.result);

        // 累计用户
        $this.setData({
          users: '累计用户 ' + res.result.data.users,
        });

        // 是否可用
        if (res.result.data.enable) {
          $this.showAD();

          $this.data.items.splice(0, 0, {
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
          });

          $this.data.items[1].grids.splice(1, 1, {
            title: '每周电影',
            url: '../video/index',
            icon: '../../resources/index/video.png'
          });

          $this.setData({
            items: $this.data.items
          });
        }
      }
    });
  },
});
