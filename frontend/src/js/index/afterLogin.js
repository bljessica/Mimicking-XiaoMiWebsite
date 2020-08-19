define(() => {
    function greeting(){
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/account',
            xhrFields: {
                withCredentials: true
            },
            success: (res) => {
                console.log(res)
                if(res.account){
                    let $loginBtn = $('#header .user-action .login');
                    let $registerBtn = $('#header .user-action .register');
                    $loginBtn.html(res.account.substring(0, 3) + '...,你好！');
                    $registerBtn.css('display', 'none')
                }
                
            },
            error: (msg) => {
                console.log(msg)
            }
        })
        // if(!$.isEmptyObject($.session)){
        //     console.log($.session)
        //     let $loginBtn = $('#header .user-action .login');
        //     let $registerBtn = $('#header .user-action .register');
        //     $loginBtn.html('你好！');
        //     $registerBtn.html('');
        // }
    }

    return {
        greeting: greeting
    }
})