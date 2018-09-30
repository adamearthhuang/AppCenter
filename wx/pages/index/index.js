var util = require('../../utils/util');

Page({
  data: {
    items: [
      {
        title: '限时推广',
        grids: [
          {
            title: '今日推荐',
            url: '../advertisement/advertisement',
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
            url: '../rmb/rmb',
            img: '../../resource/index/rmb.png'
          },
          {
            title: '非主流火星文',
            url: '../mars/mars',
            img: '../../resource/index/mars.png'
          },
          {
            title: '女性标准三围',
            url: '../measurement/measurement',
            img: '../../resource/index/measurement.png'
          },
          {
            title: '标准体重',
            url: '../weight/weight',
            img: '../../resource/index/weight.png'
          },
          { },
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
