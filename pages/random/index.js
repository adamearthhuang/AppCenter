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
      min: data.detail.value
    });

    if (this.data.min != '' && this.data.max != '' && this.data.max * 1 >= this.data.min * 1) {
      this.refresh();
    } else {
      this.setData({
        hidden: true
      });
    }
  },
  onMaxInputListener: function (data) {
    this.setData({
      max: data.detail.value
    });

    if (this.data.min != '' && this.data.max != '' && this.data.max * 1 >= this.data.min * 1) {
      this.refresh();
    } else {
      this.setData({
        hidden: true
      });
    }
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
          title: '已复制',
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

