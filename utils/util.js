function getScreenWidth() {
  var windowWidth;
  wx.getSystemInfo({  
    success: function (res) {  
      windowWidth = res.windowWidth;  
    }  
  });  
  return windowWidth;
}

function getScreenHeight() {
  var windowHeight;
  wx.getSystemInfo({
    success: function (res) {
      windowHeight = res.windowHeight;
    }
  });
  return windowHeight;
}

module.exports = {
  getScreenWidth: getScreenWidth,
  getScreenHeight: getScreenHeight
};


