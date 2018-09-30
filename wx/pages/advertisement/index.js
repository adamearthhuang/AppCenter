var util = require('../../utils/util');

Page({
  onLoad: function () {
  
  },
  onShareAppMessage: function () {
    return {
      title: '今日推荐',
      path: '/pages/advertisement/index'
    };
  }
});
