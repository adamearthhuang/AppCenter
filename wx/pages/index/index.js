var util = require('../../utils/util');

Page({
  data: {
    items: [
      {
        title: '限时推广',
        grids: [
          {
            title: '今日推荐',
            url: '../advertisement/index',
            img: '../../resource/index/advertisement.png'
          },
          { },
          { }
        ]
      },
      {
        title: '便民生活',
        grids: [
          {
            title: '人民币大写',
            url: '../rmb/index',
            img: '../../resource/index/rmb.png'
          },
          {
            title: '安全扫码',
            url: '../qrcode/index',
            img: '../../resource/index/qrcode.png'
          },
          {
            title: '非主流火星文',
            url: '../mars/index',
            img: '../../resource/index/mars.png'
          },
          {
            title: '标准体重',
            url: '../weight/index',
            img: '../../resource/index/weight.png'
          },
          {
            title: '女性标准三围',
            url: '../measurement/index',
            img: '../../resource/index/measurement.png'
          },
          
          { },
        ]
      }
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
