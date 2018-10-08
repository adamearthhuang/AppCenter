var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.refresh();
  },
  onShareAppMessage: function () {
    return {
      title: '谁是卧底',
      path: '/pages/undercover/index'
    };
  },
  onOutputListener: function () {
    wx.setClipboardData({
      data: this.data.output,
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
      output: getWord()
    });
  }
});

function getWord() {
  var data = [
    '酸菜鱼 - 水煮鱼',
    '橙子 - 橘子',
    '蜘蛛侠 - 蝙蝠侠',
    '自行车 - 电动车',
    '辣椒 - 芥末',
    '公交 - 地铁',
    '双胞胎 - 龙凤胎'
  ];

  return data[parseInt(Math.random() * data.length, 10)];
}