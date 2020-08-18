let $submit = $('#main .login-box .login-form .submit');
        $submit.click(() => {
            $.ajax({         
                type: "POST",
                // dataType: "json",//预期服务器返回的数据类型
                url: "http://localhost:3000/login" ,
                xhrFields:{withCredentials:true},
                data: $('#main .login-box .login-form').serialize(),              
                success: function (res) {                   
                    console.log(res);//打印服务端返回的数据(调试用)
                    res = JSON.parse(res)
                    alert(res.msg);
                    if (res.code == 0) {
                        // $('#main .login-box .login-form .account').val('');
                        // $('#main .login-box .login-form .pwd').val('');
                        window.location.href = 'index.html';
                        
                    } else {
                        window.location.href = 'login.html';
                    }
                },               
                error : function(result) {
                    alert('异常');
                }
            });
        })