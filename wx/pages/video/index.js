Page({
  data: {
    vid: '',
    title: '',
    timestamp: 0,
    index: 0,
  },
  onLoad: function () {
    this.readStorage();
    this.writeStorage();

    this.setData({
      vid: getVideos()[this.data.index].vid,
      title: getVideos()[this.data.index].title,
    });
  },
  onShareAppMessage: function () {
    return {
      title: '每周影院',
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
  },
  writeStorage: function () {
    if (this.data.timestamp === 0) {
      this.setData({
        timestamp: Date.parse(new Date())
      });
    }

    wx.setStorage({
      key: 'video',
      data: {
        timestamp: this.data.timestamp,
        index: this.data.index
      }
    });
  },
  readStorage: function () {
    var data = wx.getStorageSync('video');

    if (data) {
      if (Date.parse(new Date()) - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
        this.setData({
          timestamp: Date.parse(new Date()),
          index: data.index + 1 >= getVideos().length ? 0 : data.index + 1
        });
      } else {
        this.setData({
          timestamp: data.timestamp,
          index: data.index >= getVideos().length ? 0 : data.index
        });
      }
    }
  }
});

function getVideos() {
  return [
    {
      vid: 'l0629bcqnif',
      title: '头号玩家'
    },
    {
      vid: 'q0714sn8fzx',
      title: '我不是药神'
    },
    {
      vid: 'g05645iyu6s',
      title: '寻梦环游记',
    },
    {
      vid: 'o054924a2c5',
      title: '摔跤吧！爸爸',
    },
    {
      vid: 'i0717sc43dh',
      title: '小萝莉的猴神大叔'
    },
    {
      vid: 'j01822d878h',
      title: '疯狂动物城'
    },
  ];
}