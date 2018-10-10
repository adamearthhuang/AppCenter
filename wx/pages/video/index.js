Page({
  data: {
    vid: 'o054924a2c5',
    title: '摔跤吧！爸爸',
  },
  onShareAppMessage: function () {
    return {
      title: '周末放映室',
      path: '/pages/video/index'
    };
  },
  onTitleListener: function () {
    wx.setClipboardData({
      data: this.data.title,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  }
});