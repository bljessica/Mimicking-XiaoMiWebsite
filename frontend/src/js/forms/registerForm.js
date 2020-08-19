$('#main .register-form .submit').click(() => {
    $.ajax({
        url: 'http://localhost:3000/register',
        type: 'POST', 
        data: $('#main .register-form').serialize(),
        success: (res) => {
            console.log(res)//打印服务端返回的数据(调试用)
            res = JSON.parse(res)
            alert(res.msg);
            
            if(res.code == 0){
                window.location.href = 'login.html';
            } else {
                window.location.href = 'register.html';
            }
        },
        error: (msg) => {
            alert('异常');
        }
    })
})