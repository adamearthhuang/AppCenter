var util = require('../../utils/util');

Page({
  data: {
    hidden: true,
  },
  onShareAppMessage: function () {
    return {
      title: '位置信息',
      path: '/pages/location/index'
    };
  },
  onOutputListener: function () {
    wx.setClipboardData({
      data: this.data.output,
      success: function () {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },
  onLocationListener: function () {
    var $this = this;

    wx.chooseLocation({
      success: function (data) {
        $this.setData({
          hidden: false,
          output: '名称：' + data.name + '\n' +
            '地址：' + data.address + '\n' + 
            '纬度：' + data.latitude + '\n' +
            '经度：' + data.longitude
        });
      }
    });
  },
});

