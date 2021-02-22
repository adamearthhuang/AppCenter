var util = require('../../utils/util');

Page({
  onLoad: function () {
    var $this = this;

    wx.cloud.callFunction({
      name: 'init',
      success: function (res) {
        console.log('init', res.result);
        
        $this.setData({
          url: res.result.data.url
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '严选',
      path: '/pages/vip/index'
    };
  }
});
