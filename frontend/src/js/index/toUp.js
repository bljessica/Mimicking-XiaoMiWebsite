define(function(){
    function toUp(){
        let $btn = $('#aside .toUp');
        $(window).scroll(function(){
            var top = $(window).scrollTop();
            if(top > 200) {
                $btn.show();
            }
            else {
                $btn.hide();
            }
        });
        $btn.click(function(){
            var top = $(window).scrollTop();
            $('body, html').animate({
                scrollTop: 0
            }, 500);
        })
    }

    return {
        toUp: toUp
    }
})