/**
 * Created by APEXISM on 2016/10/23.
 */
$(function() {

    $('tr').css('height', $('td').width());

    // 解决手机上触摸后hover效果不消失的问题
    $('td').on('mousedown mouseup mousemove touchstart touchend touchmove touchcancel', function (e) {
        switch(e.type){
            case "mousedown":
            case "touchstart":
                $(this).addClass('active');
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

});

