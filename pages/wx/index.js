var util = require('../../utils/util');

Page({
  onLoad: function (options) {
    this.setData({
      url: options.url,
      title: options.title
    });
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: '/pages/wx/index?url=' + this.data.url + "&title=" + this.data.title
    };
  }
});
