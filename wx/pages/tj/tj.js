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
      title: '今日推荐',
      path: '/pages/tj/tj'
    };
  }
});
