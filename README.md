# 小米官网仿制
## 项目描述
仿制小米官网的主页以及登录、注册界面，实现登录、注册功能。
## 技术要点：
+ 基于div+css布局
+ 前端采用require.js进行模块化编程，在模块中使用jquery框架
+ 使用gulp构建前端项目，对js,css代码和图片进行压缩
+ 使用原生node.js结合mongodb数据库实现登陆注册功能，之后用express框架重写
+ 使用md5对密码进行加密再进行存储
+ 使用mongodb数据库存储session，记录登录状态
## 运行：
+ 前端代码：入口文件为index.html
+ 后端代码： 
```
cd backend
npm install
node app.js
```
