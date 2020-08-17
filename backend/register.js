const http = require('http')
const querystring = require('querystring')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let url = 'mongodb://localhost:27017/';
let dbname = 'mi'

const server = http.createServer((req, res) => {
    let obj = null, msg = null;
    if(req.url == '/register' && req.method.toLowerCase() == 'post'){
        var alldata = '';

        req.on('data', (chunk) => {
            alldata += chunk;
        })

        MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
            if(err) {
                console.log('数据库连接失败')
                return;
            }
            console.log('连接成功')
            obj = querystring.parse(alldata.toString())
            const dbase = db.db(dbname); //数据库db对象
            //创建集合,之后不用再创建了
            // dbase.createCollection('accounts', function (err, res) {
            //     if (err) {
            //         console.log('创建集合失败');
            //         return;
            //     }
            //     console.log("创建集合!");
            //     db.close();
            // });
            //插入一条数据
            dbase.collection("accounts").insertOne(obj, (err, result) => {  //向school数据库中，student的集合中插入一条数据
                if (err){
                    console.log('插入失败:' + err);
                    return;
                }
                // console.log(result);  //一个对象，里面有关于数据库，和插入数据的方法和属性   
                msg = result.toString()
                db.close();// db.close(); //数据库关闭每一次数据库进行一次操作以后，使用完成，都要关闭 
            })
            res.setHeader('Content-Type', 'text/plain;charset=utf-8')
            res.setHeader('Access-Control-Allow-Origin', '*')
            
            console.log(obj.account)
            console.log(obj.password)
            res.end(JSON.stringify({
                'code': 0,
                'msg': 'ok'
            }))

        })
    }
})
        

server.listen(3000, 'localhost', () => {
    console.log('服务器正在运行...')
})