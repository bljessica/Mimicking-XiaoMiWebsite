define(function() {
    let index = 1;//第几页
    let timer = null;
    let $box = $('#main .slider-wrapper');
    let $lis = $('#main .slider-wrapper .slider li')
    let $dots = $('#main .slider-wrapper .slider-dots li');

    function shiftLeft() {
        //图片
        $('#main .slider-wrapper .slider .prev').removeClass('prev');
        let $li = $('#main .slider-wrapper .slider .active');
        $li.removeClass('active');
        $li.addClass('prev');
        //小圆点
        $('#main .slider-wrapper .slider-dots .prev').removeClass('prev');
        let $dot = $('#main .slider-wrapper .slider-dots .active');
        $dot.removeClass('active');
        $dot.addClass('prev');
        
        index++;
        if(index === 6){
            index = 1;
        }
        $lis.eq(index).addClass('active');
        $dots.eq(index - 1).addClass('active');

    }

    function shiftRight() {
        //图片
        $('#main .slider-wrapper .slider .prev').removeClass('prev');
        let $li = $('#main .slider-wrapper .slider .active');
        $li.removeClass('active');
        $li.addClass('prev');
        //小圆点
        $('#main .slider-wrapper .slider-dots .prev').removeClass('prev');
        let $dot = $('#main .slider-wrapper .slider-dots .active');
        $dot.removeClass('active');
        $dot.addClass('prev');

        index--;
        if(index === 0){
            index = 5;
        }
        $lis.eq(index).addClass('active');
        $dots.eq(index - 1).addClass('active');
    }

    function autoShift(){
        //轮播
        $(document).ready(function() {
            timer = setInterval(function(){
                shiftLeft();
            }, 3000);
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
            }, 3000);
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

    function navShow(){
        let $btns = $('#main .slider-wrapper .slider-nav>li');
        let $descs = $('#main .slider-wrapper .slider-nav .desc-container');

        for(let i = 0; i < $btns.length; i++){
            $btns.eq(i).mouseover(function(){
                $descs.eq(i).show();
            })
            $btns.eq(i).mouseout(function(){
                $descs.eq(i).hide();
            })
        }
    }

    return {
        autoShift: autoShift,
        navShow: navShow
    };
})
    



