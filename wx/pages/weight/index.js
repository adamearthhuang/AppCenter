var util = require('../../utils/util');

var height = '', weight = '';

Page({
  onLoad: function () {
    this.setData({
      sex: '男',
      sexArray: ['男', '女'],
      sexIndex: 0,
      hidden: true
    });
  },
  onShareAppMessage: function () {
    return {
      title: '标准体重',
      path: '/pages/weight/weight'
    };
  },
  onHeightInputListener: function (data) {
    height = data.detail.value;

    if (height.length == 0) {
      this.setData({
        hidden: true
      });

    } else if (weight.length > 0) {
      this.setData({
        hidden: false,
        output: convert(weight, height, this.data.sex)
      });
    }
  },
  onWeightInputListener: function (data) {
    weight = data.detail.value;

    if (weight.length == 0) {
      this.setData({
        hidden: true
      });

    } else if (height.length > 0) {
      this.setData({
        hidden: false,
        output: convert(weight, height, this.data.sex)
      });
    }
  },
  onSexSelectListener: function (data) {
    this.setData({
      sexIndex: data.detail.value,
      sex: this.data.sexArray[data.detail.value]
    });
    
    if (height.length > 0 && weight.length > 0) {
      this.setData({
        output: convert(weight, height, this.data.sex)
      });
    }
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
  }
});

function convert(weight, height, sex) {
  var BMI = parseFloat(getBMI(weight, height / 100).toFixed(1));

  var idealWeight;
  if (sex == '男') {
    idealWeight = Math.round(50 + (2.3 * (height - 152)) / 2.54);
  } else {
    idealWeight = Math.round(45.5 + (2.3 * (height - 152)) / 2.54);
  }

  var level, degree;
  if (BMI >= 40) {
    level = 'Ⅲ度肥胖';
    degree = '发病率非常严重增加';

  } else if (BMI >= 30 && BMI < 40) {
    level = 'II度肥胖';
    degree = '发病率严重增加';

  } else if (BMI > 27 && BMI <= 29.9) {
    level = 'I度肥胖';
    degree = '发病率中度增加';

  } else if (BMI >= 24) {
    level = '肥胖前期';
    degree = '发病率增加';

  } else if (BMI >= 18.5 && BMI <= 23.9) {
    level = '正常范围';
    degree = '发病率处于平均水平';

  } else {
    level = '体重过低';
    degree = '发病率低，但其它疾病发病率增加';
  }
  var status = level + '（相关疾病发病的危险性处于' + degree + '状态）';

  return '体质指数：' + BMI + '（18.5~23.9为正常范围）' + '\n' + 
    '身体状况：' + level + '\n' +
    '相关疾病：' + degree + '\n' +
    '理想体重：' + idealWeight + '公斤';
}

function getBMI(weight, height) {
  return weight / (height * height);
}