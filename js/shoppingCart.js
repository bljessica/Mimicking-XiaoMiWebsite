define(function(){
    function showDesc(){
        $('#header .shopping-cart').mouseover(function(){
            $('#header .shopping-cart-desc').stop(true, true);
            $('#header .shopping-cart-desc').animate({
                height: '102px'
            }, 500);
            $('#header .shopping-cart-desc p').show();
        })
        $('#header .shopping-cart').mouseout(function(){
            $('#header .shopping-cart-desc').stop(true, true);
            $('#header .shopping-cart-desc').animate({
                height: '0'
            }, 500);
            $('#header .shopping-cart-desc p').hide();
        })
    }

    return {
        showDesc: showDesc
    }
})