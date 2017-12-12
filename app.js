//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parse,用来处理post提交的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用--app即NodeJS Http.createServer()
var app = express();

//引入用户类模型
var User = require('./models/User');


//设置静态文件托管,当用户访问的url以/public开始，那么直接返回__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

/*配置应用模板*/
//定义当前应用所使用的模板引擎，第一个参数：模板引擎名称，同时也是模板文件的后缀；第二个参数表示用于处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数时目录
app.set('views', './views');
//注册使用的模板引擎，第一个参数必须是view engine，第二个参数必须和上一个方法第一个参数一致
app.set('view engine', 'html');
//取消模板缓存
swig.setDefaults({cache: false});

/*bodyparser设置*/
app.use(bodyParser.urlencoded({extended: true}));//在request对象中增加一个属性body,body存放post提交的数据

/*设置cookie*/
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        console.log(req.cookies.get('userInfo'));//String类型
        try {
            //字符串转成对象
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录的用户类型是否为管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        }
    } else {
        next();
    }
});

/*
路由信息（接口地址），存放在routes的根目录
根据不同的功能划分模块
配置路由，（'自定义路径'，接口地址）
*/
app.use('/', require('./routes/main'));
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

//连接数据库
mongoose.connect('mongodb://localhost:27018/database', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        //监听http请求
        app.listen(8080);
    }
});



