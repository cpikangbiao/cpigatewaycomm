function adaptionContentSize() {
    // if ($(window).width() > 990) {
    //     $('#content').height($(window).height() - 190);
    //     $('#m_aside_left').height($(window).height() - 70);
    // } else {
    //     $('#content').height($(window).height() - 160);
    //     $('#m_aside_left').height($(window).height());
    // }
    $('#content').css('height', '');
    if ($('#content').height() < $(window).height() - 160) {
        if ($(window).width() > 990) {
            $('#content').height($(window).height() - 190);
        } else {
            $('#content').height($(window).height() - 160);
        }
    }
}

$(function () {
    adaptionContentSize();
    $('body').on('tap', function(){
        adaptionContentSize();
    });
    $('body').on('swipe', function(){
        adaptionContentSize();
    });
    $('body').on('scrollstart', function(){
        adaptionContentSize();
    });
    $('body').on('click', function(){
        adaptionContentSize();
    });
    $('body').on('mousemove', function(){
        adaptionContentSize();
    });
});
