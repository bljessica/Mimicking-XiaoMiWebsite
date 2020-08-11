define(function() {
    var index = 1;//第几页
    var timer = null;
    var $ul = $('#main .classify-wrapper .shangou .products-box .products');
    var $box = $('#main .classify-wrapper .shangou');

    function shiftLeft() {
        index++;
        $ul.animate({
            left: (-1) * index * 988 + 'px'
        }, 500, 'linear', function(){
            if(index === 6) {
                index = 1;
                $ul.animate({
                    left: '-988px'
                }, 0);
            } 
        })  
    }

    function shiftRight() {
        index--;
        $ul.animate({
            left: (-1) * index * 988 + 'px'
        }, 500, 'linear', function(){
            if(index === 0) {
                index = 6;
                $ul.animate({
                    left: -988 * 6 + 'px'
                }, 0);
            } 
        }) 
    }

    function autoShift(){
        //闪购轮播
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
        $('#main .classify-wrapper .shangou .title-bar .iconzuojiantou').click(function(){
            // clearInterval(timer);
            shiftRight();
        });

        //右箭头
        $('#main .classify-wrapper .shangou .title-bar .iconyoujiantou').click(function(){
            // clearInterval(timer);
            shiftLeft();
        });
    }

    return {
        autoShift: autoShift
    };
})
    



