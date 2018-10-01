var util = require('../../utils/util');

Page({
  onLoad: function () {
    this.setData({
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return {
      title: '人民币大写',
      path: '/pages/rmb/index'
    };
  },
  onInputListener: function (data) {
    if (data.detail.value.length == 0) {
      this.setData({
        hidden: true
      });

    } else {
      this.setData({
        hidden: false,
        output: convert(data.detail.value)
      });
    }
  },
  onOutputListener: function (data) {
    wx.setClipboardData({
      data: data.target.dataset.entry,
      success: function () {
        wx.showToast({ 
          title: '复制成功',
          icon: 'success'
       });
      }
    });
  }
});

function convert(number) {
  // 强制变成两位小数形式再乘100，方便处理
  number = new String(Math.round(parseFloat(number).toFixed(2) * 100));

  // 数字金额的长度
  var numberLength = number.length;

  // 当前指定位置的数字
  var curNumber;

  // 中文数字，chineseNumberStr.length=10
  var chineseNumberStr = "零壹贰叁肆伍陆柒捌玖";

  // 中文单位，chineseUnitStr.length=15
  var chineseUnitStr = "万仟佰拾亿仟佰拾万仟佰拾元角分";

  // 中文数字临时变量
  var tempChineseNumber;

  // 中文单位临时变量
  var tempChineseUnit;

  // 用来计算连续的零值的个数
  var zeroCount = 0;

  // 转换后的汉字金额
  var chinese = "";

  // 大于15位超出
  if (numberLength > 15) {
    return "仅支持万亿级";
  }

  // 空或者0显示零元整
  if (isNaN(number) || number == 0) {
    return "零元整";
  }

  // 仅获取该数字金额的所要用到的中文单位
  chineseUnitStr = chineseUnitStr.substr(chineseUnitStr.length - numberLength, numberLength); // 取出对应位数的STRING2的值

  // 遍历该数字金额的每一个数字
  for (var i = 0; i < numberLength; i++) {

    // 取出需转换的某一位的数字
    curNumber = parseInt(number.substr(i, 1), 10);

    // 该位不是元、万、亿、万亿等关键位
    if (i != (numberLength - 3) && i != (numberLength - 7) && i != (numberLength - 11) && i != (numberLength - 15)) {
      if (curNumber == 0) {
        tempChineseNumber = "";
        tempChineseUnit = "";
        zeroCount = zeroCount + 1;
      } else if (curNumber != 0 && zeroCount != 0) {
        tempChineseNumber = "零" + chineseNumberStr.substr(curNumber, 1);
        tempChineseUnit = chineseUnitStr.substr(i, 1);
        zeroCount = 0;
      } else {
        tempChineseNumber = chineseNumberStr.substr(curNumber, 1);
        tempChineseUnit = chineseUnitStr.substr(i, 1);
        zeroCount = 0;
      }
    } else { // 该位是元、万、亿、万亿等关键位
      if (curNumber != 0 && zeroCount != 0) {
        tempChineseNumber = "零" + chineseNumberStr.substr(curNumber, 1);
        tempChineseUnit = chineseUnitStr.substr(i, 1);
        zeroCount = 0;
      } else if (curNumber != 0 && zeroCount == 0) {
        tempChineseNumber = chineseNumberStr.substr(curNumber, 1);
        tempChineseUnit = chineseUnitStr.substr(i, 1);
        zeroCount = 0;
      } else if (curNumber == 0 && zeroCount >= 3) {
        tempChineseNumber = "";
        tempChineseUnit = "";
        zeroCount = zeroCount + 1;
      } else {
        tempChineseNumber = "";
        tempChineseUnit = chineseUnitStr.substr(i, 1);
        zeroCount = zeroCount + 1;
      }

      // 如果该位是亿位或元位，则必须写上
      if (i == (numberLength - 11) || i == (numberLength - 3)) {
        tempChineseUnit = chineseUnitStr.substr(i, 1);
      }
    }

    chinese = chinese + tempChineseNumber + tempChineseUnit;
  }

  // 最后一位（分）为0时，即没有分位，则加上“整”
  if (curNumber == 0) {
    chinese = chinese + "整";
  }
  
  return chinese;
}