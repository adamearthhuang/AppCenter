var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.setData({
      hidden: true
    });
  },
  onShow: function () {
    var $this = this;

    setTimeout(function () {
      wx.scanCode({
        success: function (data) {
          $this.setData({
            output: data.result,
            hidden: false
          });

          wx.showToast({
            title: '扫码成功',
            icon: 'success'
          });
        },
        fail: function () { 
          wx.navigateBack({
            delta: -1
          });
        },
      });
    }, 200);
  },
  onShareAppMessage: function () {
    return {
      title: '安全扫码',
      path: '/pages/qrcode/index'
    };
  },
  onOutputListener: function (data) {
    wx.setClipboardData({
      data: data.target.dataset.entry,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  }
});
