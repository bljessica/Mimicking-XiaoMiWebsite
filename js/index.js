require.config({
    baseUrl: 'js/', 
    paths: {
        'jquery': 'jquery-3.4.1',
        'shangou_shift': 'shangou_shift',
        'slider': 'slider'
    }
});

require(['jquery'], function($){
    require(['shangou_shift', 'slider'], function(shangou_shift, slider){

        shangou_shift.autoShift();
        slider.autoShift();

    });
})