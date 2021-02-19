var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.setData({
      width: util.getScreenWidth() - 10 * 2,
      height: (util.getScreenWidth() - 10 * 2) / 2.7
    });
  },
  onShareAppMessage: function () {
    return {
      title: '股神专属',
      path: '/pages/quote/index'
    };
  }
});
