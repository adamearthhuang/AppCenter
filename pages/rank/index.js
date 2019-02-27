var util = require('../../utils/util');

Page({
  data: {
    users: []
  },
  onLoad: function () {
    this.requestRank();
  },
  onShareAppMessage: function () {
    return {
      title: '排行榜',
      path: '/pages/rank/index'
    };
  },
  requestRank: function () {
    var $this = this;

    wx.cloud.callFunction({
      name: 'rank',
      success: function (res) {
        console.log('rank', res.result);

        $this.setData({
          users: res.result.data
        });
      }
    });
  }
});


