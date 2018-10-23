Page({
  onLoad: function () {

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
