"use strict";define(function(){var a=1,e=null,r=$("#main .slider-wrapper"),i=$("#main .slider-wrapper .slider li"),s=$("#main .slider-wrapper .slider-dots li");function n(){$("#main .slider-wrapper .slider .prev").removeClass("prev");var e=$("#main .slider-wrapper .slider .active");e.removeClass("active"),e.addClass("prev"),$("#main .slider-wrapper .slider-dots .prev").removeClass("prev");var r=$("#main .slider-wrapper .slider-dots .active");r.removeClass("active"),r.addClass("prev"),6===++a&&(a=1),i.eq(a).addClass("active"),s.eq(a-1).addClass("active")}return{autoShift:function(){$(document).ready(function(){e=setInterval(function(){n()},3e3)}),r.mouseover(function(){clearInterval(e)}),r.mouseout(function(){clearInterval(e),e=setInterval(function(){n()},3e3)}),$("#main .slider-wrapper .to-left").click(function(){!function(){$("#main .slider-wrapper .slider .prev").removeClass("prev");var e=$("#main .slider-wrapper .slider .active");e.removeClass("active"),e.addClass("prev"),$("#main .slider-wrapper .slider-dots .prev").removeClass("prev");var r=$("#main .slider-wrapper .slider-dots .active");r.removeClass("active"),r.addClass("prev"),0===--a&&(a=5),i.eq(a).addClass("active"),s.eq(a-1).addClass("active")}()}),$("#main .slider-wrapper .to-right").click(function(){n()})},navShow:function(){for(var r=$("#main .slider-wrapper .slider-nav>li"),a=$("#main .slider-wrapper .slider-nav .desc-container"),e=0;e<r.length;e++)!function(e){r.eq(e).mouseover(function(){a.eq(e).show()}),r.eq(e).mouseout(function(){a.eq(e).hide()})}(e)}}});