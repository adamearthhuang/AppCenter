var util = require('../../utils/util');

Page({
  onLoad: function () {
  
  },
  onShareAppMessage: function () {
    return {
      title: '推荐',
      path: '/pages/advertisement/index'
    };
  }
});
