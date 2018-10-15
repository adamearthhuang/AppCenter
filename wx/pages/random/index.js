var util = require('../../utils/util');

Page({
  data: {
    min: '',
    max: '',
    hidden: true,
    output: '',
  },
  onLoad: function () {
    
  },
  onMinInputListener: function (data) {
    this.setData({
      min: data.detail.value,
      output: '',
      hidden: true
    });
  },
  onMaxInputListener: function (data) {
    this.setData({
      max: data.detail.value,
      output: '',
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return {
      title: '猜数字',
      path: '/pages/random/index'
    };
  },
  onOutputListener: function () {
    wx.setClipboardData({
      data: this.data.output + '',
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  },
  onNextListener: function () {
    this.refresh();
  },
  refresh: function () {
    this.setData({
      hidden: false,
      output: random(this.data.min, this.data.max)
    })
  }
});

function random(min, max) {
  return parseInt(min * 1 + Math.random() * (max - min + 1), 10);
}

