"use strict";require.config({baseUrl:"js/",paths:{jquery:"jquery-3.4.1",shangouShift:"index/shangouShift",slider:"index/slider",classifyShift:"index/classifyShift",playBtnHover:"index/playBtnHover",toUp:"index/toUp",shoppingCart:"index/shoppingCart",nav:"index/nav",afterLogin:"index/afterLogin"}}),require(["jquery"],function(i){require(["shangouShift","slider","classifyShift","playBtnHover","toUp","shoppingCart","nav","afterLogin"],function(i,t,e,n,a,s,o,r){i.autoShift(),t.autoShift(),t.navShow(),e.tvShift("classify-tv"),e.tvShift("classify-intelli"),n.playHover(),a.toUp(),s.showDesc(),o.navDescShow(),r.greeting()})});