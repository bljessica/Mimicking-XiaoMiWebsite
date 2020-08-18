const http = require('http')
const querystring = require('querystring')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let url = 'mongodb://localhost:27017/';
let dbname = 'mi'

function verifyAccount(obj){
    let code = 0, msg = null;
    if(obj.account == '' || obj.password == ''){
        code = 1,
        msg = '邮箱或密码不能为空'
    } 
    else {
        var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var pwdLen = obj.password.length;
        if(!isEmail.test(obj.account)){
            code = 1,
            msg = '邮箱格式不正确'
        } 
        else if(pwdLen < 8){
            code = 1,
            msg = '密码长度须不少于八位'
        }
        else {
            code = 0;
            msg = '成功'
        }
    }
    return [code, msg];
}

function createSet(dbase){
    // 创建集合,之后不用再创建了
    dbase.createCollection('accounts', function (err, res) {
        if (err) {
            console.log('创建集合失败');
            return;
        }
        console.log("创建集合!");
        db.close();
    });
}


const server = http.createServer((req, res) => {
    //登录
    if(req.url=='/login'&& req.method.toLowerCase() == 'post'){
        var alldata ='';

        req.on('data',function(chunk){
            alldata+=chunk;
        })

        MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
            let obj = null;
            if(err) {
                console.log('数据库连接失败')
                return;
            }
            console.log('连接成功')
            obj = querystring.parse(alldata.toString())
            console.log(obj.account)
            console.log(obj.password)
            res.setHeader('Content-Type', 'text/plain;charset=utf-8')
            res.setHeader('Access-Control-Allow-Origin', '*')
    
            let [code, msg] = verifyAccount(obj)
            if(code == 1){
                res.end(JSON.stringify({
                    code: code,
                    msg: msg,
                }))
            }
            const dbase = db.db(dbname); //数据库db对象
            //查询数据库
            dbase.collection('accounts').find({account: obj.account}).toArray((err, result) => {
                if(err){
                    console.log('查询失败')
                    return;
                }
                if(result.length == 0){
                    res.end(JSON.stringify({
                        code: 1,
                        msg: '用户未注册'
                    }))
                }
                else {
                    if(result[0].password == obj.password){
                        res.end(JSON.stringify({
                            code: 0,
                            msg: '登陆成功'
                        }))
                    }
                    else {
                        res.end(JSON.stringify({
                            code: 1,
                            msg: '密码错误'
                        }))
                    }
                }
                db.close();
            })
        })
    } 
    //注册
    else if(req.url == '/register' && req.method.toLowerCase() == 'post'){
        let alldata = '';

        req.on('data', (chunk) => {
            alldata += chunk;
        })

        MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
            let obj = null;
            if(err) {
                console.log('数据库连接失败')
                return;
            }
            console.log('连接成功')
            obj = querystring.parse(alldata.toString())

            res.setHeader('Content-Type', 'text/plain;charset=utf-8')
            res.setHeader('Access-Control-Allow-Origin', '*')
            console.log(obj.account)
            console.log(obj.password)
            let [code, msg] = verifyAccount(obj);
            if(code == 1){
                res.end(JSON.stringify({
                    code: code,
                    msg: msg,
                }))
            }
            const dbase = db.db(dbname); //数据库db对象
            //查询是否有同名邮箱
            dbase.collection('accounts').find({account: obj.account}).toArray((err, result) => {
                if(err){
                    console.log('查询失败')
                    return;
                }
                if(result.length > 0){
                    res.end(JSON.stringify({
                        code: 1,
                        msg: '邮箱已被注册',
                    }))
                }
                db.close();
            })
            //插入一条数据
            dbase.collection("accounts").insertOne(obj, (err, result) => {  //向school数据库中，student的集合中插入一条数据
                if (err){
                    console.log('插入失败:' + err);
                    return;
                }
                res.end(JSON.stringify({
                    code: 0,
                    msg: '注册成功',
                }))
                db.close();// db.close(); //数据库关闭每一次数据库进行一次操作以后，使用完成，都要关闭 
            })
        })
    }
})

server.listen(3000, 'localhost', () => {
    console.log('服务器运行中...')
})