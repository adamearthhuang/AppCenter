$(function() {

    initSelect();

    $('#input-height').focus();

    $('#input-height').bind('input propertychange', function() {

        // 转换
        if ($(this).val().length == 0) {
            hide();

        } else if ($('#input-weight').val().length > 0) {
            convert($('#input-weight').val(), $(this).val(), $('#input-sex').text());
            show();
        }

    });

    $('#input-weight').bind('input propertychange', function() {

        // 转换
        if ($(this).val().length == 0) {
            hide();

        } else if ($('#input-height').val().length > 0) {
            convert($(this).val(), $('#input-height').val(), $('#input-sex').text());
            show();
        }

    });

});

// 转换
function convert(weight, height, sex) {

    var BMI = parseFloat(getBMI(weight, height / 100).toFixed(1));

    var idealWeight;
    if ( $('#input-sex').text() == '男') {
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

    } else if (BMI >27 && BMI <= 29.9) {
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
    var status = level + '（相关疾病发病的危险性处于'+ degree +'状态）';

    // 设置内容
    $('#output').html(
        '体质指数：' + BMI + '（18.5~23.9为正常范围）<br>' +
        '身体状况：' + level + '<br>' +
        '相关疾病：' + degree + '<br>'+
        '理想体重：' + idealWeight + '公斤<br>'
    );
}

// 体质指数 = 体重(kg) / 身高的平方(m)
function getBMI(weight, height) {
    return  weight / eval(height * height);
}

// 显示
function show() {
    $('.divider-hide hr').css('display', 'block');
    $('#output-area').slideDown('fast');
}

// 隐藏
function hide() {
    $('#output-area').slideUp('fast', function() {
        $('.divider-hide hr').css('display', 'none');
        $('#output').html('');
    });
}

// 初始化下拉框
function initSelect() {
    $('div.select').click(function() {
        $('div.select hr').toggle();
        $('div.select ul').toggle();
    });

    // 解决手机上触摸后hover效果不消失的问题
    $('div.select ul li').on('mousedown mouseup mousemove touchstart touchend touchmove touchcancel', function(e) {
        switch(e.type){
            case "mousedown":
            case "touchstart":
                $(this).addClass('active');
                $('#input-sex').text($(this).text());

                if ($('#input-height').val().length > 0 && $('#input-weight').val().length > 0) {
                    convert($('#input-weight').val(), $('#input-height').val(), $('#input-sex').text());
                }

                break;

            case "mouseup":
            case "touchend":
            case "touchcancel":
                $(this).removeClass('active');
                break;

            case "mousemove":
            case "touchmove":
                break;
        }
        e.stopPropagation();
    });

}