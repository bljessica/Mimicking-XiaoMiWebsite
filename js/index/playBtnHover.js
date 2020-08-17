define(function(){
    function playHover(){
        let $imgs = $('#main .classify-wrapper .classify-video .videos li img');
        let $btns = $('#main .classify-wrapper .classify-video .videos li .play-btn');
        for(let i = 0; i < $imgs.length; i++){
            $imgs.eq(i).mouseover(function(){
                $btns.eq(i).css({
                    backgroundColor: '#FA6509',
                    borderColor: '#FA6509',
                    transition: '.2s'
                })
            });
            $btns.eq(i).mouseover(function(){
                $(this).css({
                    backgroundColor: '#FA6509',
                    borderColor: '#FA6509',
                    transition: '.2s'
                })
            });
            $imgs.eq(i).mouseout(function(){
                $btns.eq(i).css({
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    transition: '.2s'
                })
            });
        }
    }

    return {
        playHover: playHover
    }
})