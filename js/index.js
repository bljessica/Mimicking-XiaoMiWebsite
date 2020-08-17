require.config({
    baseUrl: 'js/', 
    paths: {
        'jquery': 'jquery-3.4.1',
        'shangouShift': 'index/shangouShift',
        'slider': 'index/slider',
        'classifyShift': 'index/classifyShift',
        'playBtnHover': 'index/playBtnHover',
        'toUp': 'index/toUp',
        'shoppingCart': 'index/shoppingCart',
        'nav': 'index/nav',
    }
});

require(['jquery'], function($){
    require(['shangouShift', 'slider', 'classifyShift', 'playBtnHover', 'toUp', 'shoppingCart', 'nav'], 
        function(shangouShift, slider, classifyShift, playBtnHover, toUp, shoppingCart, nav){

        shangouShift.autoShift();
        slider.autoShift();
        slider.navShow();
        classifyShift.tvShift('classify-tv');
        classifyShift.tvShift('classify-intelli');
        playBtnHover.playHover();
        toUp.toUp();
        shoppingCart.showDesc();
        nav.navDescShow();
    });
})