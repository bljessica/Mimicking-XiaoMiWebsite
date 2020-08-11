define(function() {
    var index = 0;//第几页
    var timer = null;
    var $box = $('#main .slider-wrapper');
    var $lis = $('#main .slider-wrapper .slider li')

    function shiftLeft() {
        $('#main .slider-wrapper .slider .prev').removeClass('prev');
        $li = $('#main .slider-wrapper .slider .active');
        $li.removeClass('active');
        $li.addClass('prev');
        index++;
        if(index == 5){
            index = 0;
        }
        $lis.eq(index).addClass('active');
        console.log(index)

    }

    function shiftRight() {
        $('#main .slider-wrapper .slider .prev').removeClass('prev');
        $li = $('#main .slider-wrapper .slider .active');
        $li.removeClass('active');
        $li.addClass('prev');
        index--;
        if(index == -1){
            index = 4;
        }
        $lis.eq(index).addClass('active');
        console.log(index)
    }

    function autoShift(){
        //轮播
        $(document).ready(function() {
            timer = setInterval(function(){
                shiftLeft();
            }, 2000);
        })

        //鼠标移入停止轮播
        $box.mouseover(function(){
            clearInterval(timer);
        })

        //鼠标移出开始轮播
        $box.mouseout(function(){
            clearInterval(timer);
            timer = setInterval(function(){
               shiftLeft();
            }, 2000);
        })

        //左箭头
        $('#main .slider-wrapper .to-left').click(function(){
            // clearInterval(timer);
            shiftRight();
        });

        //右箭头
        $('#main .slider-wrapper .to-right').click(function(){
            // clearInterval(timer);
            shiftLeft();
        });
    }

    return {
        autoShift: autoShift
    };
})
    



