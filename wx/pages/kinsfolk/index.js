var util = require('../../utils/util');

Page({
  data: {
    multiIndex: [0, 0],
    multiArray: [['我是男生', '我是女生'], ['我称呼对方', '对方称呼我']],
  },
  onLoad: function () {

  },
  onShareAppMessage: function () {
    return {
      title: '亲戚关系',
      path: '/pages/kinsfolk/index'
    };
  },
  onMultiSelectListener: function (data) {
    this.setData({
      multiIndex: data.detail.value
    })
  }
});
