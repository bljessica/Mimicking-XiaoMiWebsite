define(function(){
    function tvShift(classify_name){
        let $spans = $('#main .classify-wrapper .' + classify_name + ' .title-nav span');
        let $uls = $('#main .classify-wrapper .' + classify_name + ' ul');
        let len = $spans.length;
        for(let i = 0; i < len; i++){
            $spans.eq(i).mouseover(function(){
                let isActiveUl = $('#main .classify-wrapper .' + classify_name + '>.active');
                let isActiveSpan = $('#main .classify-wrapper .' + classify_name + ' .title-nav>.active');
                isActiveUl.removeClass('active');
                isActiveSpan.removeClass('active');
                $uls.eq(len - i - 1).addClass('active');
                $spans.eq(i).addClass('active');
            })
        }
    }

    return {
        tvShift: tvShift
    }
})