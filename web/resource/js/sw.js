/**
 * Created by APEXISM on 2016/10/26.
 */
$(function() {

    $('#input').focus();

    $('#input').bind('input propertychange', function() {

        // 转换
        if ($(this).val().length == 0) {
            hide();

        } else {
            convert($(this).val());
            show();
        }

    });


});

// 转换
function convert(value) {

    var bust = Math.round(value * 0.535);
    var waist = Math.round(value * 0.365);
    var hips = Math.round(value * 0.565);

    // 设置内容
    $('#output').html(
        '胸围：' + bust + '<br>' +
        '腰围：' + waist + '<br>' +
        '臀围：' + hips
    );

}


// 显示
function show() {
    $('#divider hr').css('display', 'block');
    $('#output-area').slideDown('fast');
}

// 隐藏
function hide() {
    $('#output-area').slideUp('fast', function() {
        $('#divider hr').css('display', 'none');
        $('#output').html('');
    });
}