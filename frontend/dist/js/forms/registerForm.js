"use strict";$("#main .register-form .submit").click(function(){$.ajax({url:"http://localhost:3000/register",type:"POST",data:$("#main .register-form").serialize(),success:function(e){console.log(e),e=JSON.parse(e),alert(e.msg),0==e.code?window.location.href="login.html":window.location.href="register.html"},error:function(){alert("异常")}})});