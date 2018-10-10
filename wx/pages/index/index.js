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
            icon: '../../resource/index/advertisement.png'
          },
          {
            title: '周末放映室',
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
          {},
        ]
      },
    ],
  },
  onLoad: function () {
    this.setData({
      gridHeight: util.getScreenWidth() / 3 + 'px'
    });
  },
  onShareAppMessage: function () {
    return {
      title: '应用中心',
      path: '/pages/index/index'
    };
  }
});
