var util = require('../../utils/util');

Page({
  onLoad: function () {
    var height = util.getScreenHeight();
    var trHeight = util.getScreenWidth() / 3;
    this.setData({
      height: height + 'px',
      trHeight: trHeight + 'px'
    });
  },
  onShareAppMessage: function () {
    return {
      title: '应用中心',
      path: '/pages/index/index'
    };
  },
  onRMBClickListener: function () {
    wx.navigateTo({
      url: '../rmb/rmb'
    });
  },
  onHXWClickListener: function () {
    wx.navigateTo({
      url: '../hxw/hxw'
    });
  },
  onSWClickListener: function () {
    wx.navigateTo({
      url: '../sw/sw'
    });
  },
  onTZClickListener: function () {
    wx.navigateTo({
      url: '../tz/tz'
    });
  },
  onTJClickListener: function () {
    wx.navigateTo({
      url: '../tj/tj'
    });
  }
});
