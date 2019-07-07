var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.setData({
      height: util.getScreenWidth() - 15 * 2 - 15 * 2
    });
  },
  onShareAppMessage: function () {
    return {
      title: '红包',
      path: '/pages/money/index'
    };
  },
});
