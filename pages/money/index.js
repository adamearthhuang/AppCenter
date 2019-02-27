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
  onOkListener: function () {
    wx.setClipboardData({
      data: '544225785',
      success: function () {
        wx.showToast({ 
          title: '已领取',
          icon: 'success'
        });
      }
    });
  }
});
