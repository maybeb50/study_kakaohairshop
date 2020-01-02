/*

Mouse Event 

mousewheel // IE, Chrome, Opera, Safari
DOMMouseScroll // FireFox 


Mouse Up 120 
Mouse Down -120


*/

var _nowScene = 1;
var _maxScene = 6;
var _slideTime = 500; // 0.5s
var _moveTime = 500; // 0.5s
var _actionFlag = false;
var _actionType = 'easeInOutCubic'; // 화면 이동 옵션
var clearIntervalEvent;

$(document).ready(function () {

    clearIntervalEvent = function() {
        clearTimeout(clearIntervalEvent);
    }

    $('.link_video').on('click', function() {
        var $this = $(this);
        var tmpUrl = $this.attr('href');

        if($this.parent('li').hasClass('item_video1')){
            $('.item_video1 > a').addClass('on');
            $('.item_video2 > a').removeClass('on');
            $('.item_video3 > a').removeClass('on');
        } else if($this.parent('li').hasClass('item_video2')) {
            $('.item_video2 > a').addClass('on');
            $('.item_video1 > a').removeClass('on');
            $('.item_video3 > a').removeClass('on');
        } else if($this.parent('li').hasClass('item_video3')) {
            $('.item_video3 > a').addClass('on');
            $('.item_video1 > a').removeClass('on');
            $('.item_video2 > a').removeClass('on');
        };

        $('.video_player').attr('src', tmpUrl);
        return false;
    });

    if(window.addEventListener) 
        /* DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false); 
        /* IE/Opera. */
        window.onmousewheel = document.onmousewheel = wheel;
});

function clearSceneClass() {
    for(var i = 0; i < _maxScene + 2; i++) {
        $('#kakaoPromotion').removeClass('promotion_scene' + i);
    }
}

function setScene(num) {
    // Up -> 0 , Down -> 2
    console.log(num);
    console.log('_nowScene', _nowScene);

    if(true === _actionFlag) return;    // 화면 이동 시에 동작 X
    if(num < 1) return;         
    if(num > 6) return;
    if(num === _nowScene) return;

    _actionFlag = true;
    delay = 10;

    // 화면 이동 
    $('.intro_kakaohairshop').each(function(index) {
        $(this).delay(delay).animate({
           top: (index - num + 1) + '00%'       // index - 2+1 + '00%'
        }, 500, 'easeInOutCubic', function() {
            _actionFlag = false;
            clearIntervalEvent();
        });
    });

    clearSceneClass();

    $('.intro_kakaohairshop').removeClass('off');
    $('.intro_kakaohairshop').eq(_nowScene - 1).addClass('off');

    if(num !== 1) {
        console.log('num !== 1 // true', num);
        $('#kakaoPromotion').delay(_moveTime).addClass('promotion_scene' + num);
    } else if (num == 1) {
        console.log('num !== 1 // false', num);
        $('#kakaoPromotion').delay(_moveTime).addClass('promotion_scene' + num);
    }

    _nowScene = num;

}

function setMove(isUp) {
    if(isUp) {
        /* MouseUp */
        setScene(_nowScene - 1);        // 0
    } else {
        /* MouseDown */
        setScene(_nowScene + 1);        // 2
    }
}

function handle(delta) {    // 1 or -1
    // console.log(Math.abs(delta));       // 1 
    if(Math.abs(delta) < 0.9) return;
    if(true === _actionFlag) return;

    if(delta < 0) {
        /* MouseDown : -1 */
        setMove(false);
    } else {
        /* MouseUp : 1 */
        setMove(true);
    }
}

function wheel(event) {
    /* 나중에 수정하자 */
    // console.log(event.wheelDelta);
    var delta = 0;

    if(!event) event = window.event;

    if(event.wheelDelta) {
        /* IE, Opera : UP: 120 , Down : -120*/
        delta = event.wheelDelta / 120;    
        
        if(window.opera) delta = -delta;

    } else if(event.detail) {
        /*  Mozilla case : Up: -3, Down: 3  */
        /*
            UP : -(-3) / 3  = 1
            Down : -(+3) / 3 = -1
        */
        delta = -event.detail / 3;
    };

    // console.log(delta); // MouseUp 1 , MouseDown -1
    if(delta) handle(delta);
}