let $submit = $('#main .login-box .login-form .submit');
$submit.click(() => {
    $.ajax({         
        type: "POST",
        // dataType: "json",//预期服务器返回的数据类型
        url: "http://127.0.0.1:3000/login" ,
        data: $('#main .login-box .login-form').serialize(),              
        success: function (result) {                   
            console.log(result);//打印服务端返回的数据(调试用)
            result = JSON.parse(result)
            alert(result.code);

            if (result.code == 0) {
                alert(result.msg);
                window.location.href = 'index.html';
                
            } else {
                alert(result.code)
            }
        },               
        error : function(result) {
            alert('异常');
        }
    });
})