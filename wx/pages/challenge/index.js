var util = require('../../utils/util');

Page({
  data: {
    array: ['真心话', '大冒险'],
    index: 0,
    output: '',
  },
  onLoad: function () {
    this.refresh();
  },
  onShareAppMessage: function () {
    return {
      title: '真心话大冒险',
      path: '/pages/challenge/index'
    };
  },
  onSelectListener: function (data) {
    this.setData({
      index: data.detail.value
    });

    this.refresh();
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
    if (this.data.array[this.data.index] == '真心话') {
      this.setData({
        output: getTrueWord()
      });
    } else {
      this.setData({
        output: getGreatAdventure()
      });
    }
  }
});

function getTrueWord() {
  var data = [
    '你的初恋是几岁？',
    '你吻过几个人？',
    '今天穿什么颜色的内裤？',
  ];
  
  return data[parseInt(Math.random() * data.length, 10)];
}

function getGreatAdventure() {
  var data = [
    '现场选一位异性进行表白。',
    '与一位异性十指相扣，对视10秒。',
    '做一个大家都满意的鬼脸。',
  ];

  return data[parseInt(Math.random() * data.length, 10)];
}
