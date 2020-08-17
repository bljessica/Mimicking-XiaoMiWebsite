define(function(){
    let $nav = $('#nav');
    let $btns = $('#nav .navbar .hasDesc');
    let $descs = $('#nav .navbar .desc');

    function hasActive(){
        for(let i = 0; i < $btns.length; i++){
            if($descs.eq(i).css('display') != 'none'){
                return true;
            }
        }
        return false;
    }

    function navDescShow(){
        for(let i = 0; i < $descs.length; i++){
            $btns.eq(i).mouseenter(function(){
                console.log(hasActive())
                if(!hasActive()){
                    $descs.eq(i).stop(true, true);
                    $descs.eq(i).slideDown(500);
                } else {
                    $descs.stop(true, true);
                    $descs.eq(i).show();
                    $descs.eq(i).animate({
                        height: '250px'
                    }, 0)
                }
            })
            $btns.eq(i).mouseleave(function(){
                $descs.eq(i).stop(true, true);
                $descs.eq(i).slideUp(500);
            })
            $descs.eq(i).mouseenter(function(){
                if(!hasActive()){
                    $descs.eq(i).stop(true, true);
                    $descs.eq(i).slideDown(500);
                } else {
                    $descs.stop(true, true);
                    $descs.eq(i).show();
                    $descs.eq(i).animate({
                        height: '250px'
                    }, 0)
                }
            })
        }

        $nav.mouseover(function(){
            $nav.css('borderBottom', '1px solid #E0E0E0');
        })

        $nav.mouseout(function(){
            $nav.css('borderBottom', '1px solid white');
        })
        
    } 
    

    return {
        navDescShow: navDescShow
    }
})