$('#main .register-form .submit').click(() => {
    $.ajax({
        url: 'http://127.0.0.1:3000/register',
        type: 'POST', 
        data: $('#main .register-form').serialize(),
        success: (res) => {
            res = JSON.parse(res)
            // alert(res.code);//打印服务端返回的数据(调试用)
            if(res.code == 0){
                alert(res.msg);
            } else {
                alert(res.error);
            }
        },
        error: (msg) => {
            console.log(msg);
        }
    })
})