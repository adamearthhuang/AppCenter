var util = require('../../utils/util');

Page({
  onLoad: function () {
    var height = util.getScreenHeight();
    this.setData({
      height: height + 'px',
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return {
      title: '红包',
      path: '/pages/hb/hb'
    };
  }
});
