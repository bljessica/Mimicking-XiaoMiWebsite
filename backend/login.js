const http = require('http')
var querystring = require('querystring');

const server = http.createServer((req, res) => {
    if(req.url=='/login'&& req.method.toLowerCase() == 'post'){
        var alldata ='';
        req.on('data',function(chunk){
            alldata+=chunk;
        })
        req.on('end', function () {
            /**设置响应头允许ajax跨域访问**/
            res.setHeader("Access-Control-Allow-Origin","*");
            /*星号表示所有的异域请求都可以接受，*/
            // res.setHeader("Access-Control-Allow-Methods","GET,POST");
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            var datastring = alldata.toString()//得到的是一个字符串 需要解析
            var obj= querystring.parse(datastring);//定义一个对象来存放解析后的值
            console.log(obj.account);
            console.log(obj.password);
            // res.writeHead(302, {
            //     'Location': 'http://127.0.0.1:3000'
            // })
            res.end(JSON.stringify({
                code: 0,
                msg: '请求成功'
            }))
        })
    }
})

server.listen(3000, 'localhost', () => {
    console.log('服务器运行中...')
})