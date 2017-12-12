var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //发送内容至客户端
//     // res.send('<h1>welcome</h1>');
//     /*
//     读取views目录下的指定文件，解析并返回给客户端
//     第一个参数：表示末班的文件，相对于views目录，第二个参数表示传递给模板使用的数据
//     * */

    //分配模板
    console.log(req.userInfo);
    res.render('main/index', {
        userInfo: req.userInfo
    });
});

module.exports = router;
