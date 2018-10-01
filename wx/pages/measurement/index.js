var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.setData({
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return {
      title: '女性标准三围',
      path: '/pages/measurement/index'
    };
  },
  onInputListener: function (data) {
    if (data.detail.value.length == 0) {
      this.setData({
        hidden: true
      });

    } else {
      this.setData({
        hidden: false,
        output: convert(data.detail.value)
      });
    }
  },
  onOutputListener: function (data) {
    wx.setClipboardData({
      data: data.target.dataset.entry,
      success: function () {
        wx.showToast({ 
          title: '复制成功' 
        });
      }
    });
  }
});

function convert(value) {
  var bust = Math.round(value * 0.535);
  var waist = Math.round(value * 0.365);
  var hips = Math.round(value * 0.565);

  return '胸围：' + bust + '\n' +
    '腰围：' + waist + '\n' +
    '臀围：' + hips;
}
