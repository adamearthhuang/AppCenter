Page({
  data: {
    name: '',
    vid: ''
  },
  onLoad: function () {
    this.requestVideo();
  },
  onShareAppMessage: function () {
    return {
      title: '每周电影',
      path: '/pages/video/index'
    };
  },
  onNameListener: function () {
    wx.setClipboardData({
      data: this.data.title,
      success: function () {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },
  requestVideo: function () {
    var $this = this;

    wx.cloud.callFunction({
      name: 'video',
      success: function (res) {
        console.log('video', res.result);

        $this.setData({
          name: res.result.data.name,
          vid: res.result.data.vid
        });
      }
    });
  }
});
