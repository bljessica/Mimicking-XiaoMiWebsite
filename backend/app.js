const express = require('express')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const mongoose = require('mongoose')
const md5 = require('md5-node')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session); 
const app = express()

app.use(bodyParser.json())
app.use(urlencoded({extended: false}))

const url = 'mongodb://localhost/mi';

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

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Origin", "null");//前端域名
    res.header("Access-Control-Allow-Credentials",'true');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : false,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 10 // 设置 session 的有效时间，单位毫秒
    },
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/session',
        touchAfter:  600 // time period in seconds
    })
}));

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log('数据库连接失败'))

const db = mongoose.connection
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'mongodb连接错误'))
//设定集合规则
const accountSchema = new mongoose.Schema({
    account: {
        type: String,
        unique: true
    },
    password: String
})
//创建集合并应用规则
const Account = mongoose.model('Account', accountSchema)

app.get('/account', (req, res) => {
    res.send(req.session)
})

app.post('/register', (req, res) => {
    let obj = req.body
    //验证格式
    let [code, msg] = verifyAccount(obj)
    // res.header('Access-Control-Allow-Origin', '*')
    if(code === 1){
        res.send(JSON.stringify({code: code, msg: msg}))
        return
    }
    //查询是否有同名邮箱
    Account.findOne({account: obj.account}, (err, data) => {
        if(err){
            console.log('查询失败')
            return;
        }
        if(data){
            res.send(JSON.stringify({
                code: 1,
                msg: '邮箱已被注册'
            }))
        }
        else {
            Account.create({account: obj.account, password: md5(obj.password)}, (err, data) => {
                if(err){
                    console.log('插入数据失败')
                    return;
                }
                res.send(JSON.stringify({
                    code: 0,
                    msg: '注册成功'
                }))
            })
        }
    })
})


app.post('/login', (req, res) => {
    let obj = req.body
    let [code, msg] = verifyAccount(obj)
    // res.header('Access-Control-Allow-Origin', '*')
    if(code === 1){
        res.send(JSON.stringify({code: code, msg: msg,}))
        return
    }
    Account.findOne({account: obj.account}, (err, data) => {
        if(err){
            console.log('查询失败')
            return;
        }
        if(data){
            if(data.password === md5(obj.password)){
                code = 0
                msg = '登陆成功'
                req.session.account = obj.account
                req.session.save()
            }
            else {
                code = 1
                msg = '密码错误'
            }
        }
        else {
            code = 1
            msg = '用户未注册'
        }
        res.send(JSON.stringify({
            code: code,
            msg: msg
        }))
    })
})

const server = app.listen(3000, 'localhost', () => {
    let host = server.address().address
    let port = server.address().port

    console.log('服务器运行在http://%s:%s', host, port)
})
