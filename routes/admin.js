var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员用户
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});
/*首页*/
router.get('/', function (req, res, next) {
    res.render('admin/index', {
            userInfo: req.userInfo
        }
    );
});

/*用户管理*/
router.get('/user', function (req, res) {
    /*从数据库中读取所有用户的数据
    *
    * limit(Number):限制获取的数据条数
    * skip(2):忽略数据的条数，例：忽略前两条，从第三条开始取
    *
    * 每页显示两条
    * 1:1-2 skip：0 ->(当前页-1)*limit
    * 2:3-4 skip：2 ->
    * */
    var page = Number(req.query.page) || 1;
    var limit = 2;

    var pages = 0;

    User.count().then(function (count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);//取值不能超过pages
        page = Math.max(page, 1);//取值不能小于1

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                count:count,
                pages:pages,
                limit:limit,
                page: page
            })
        })
    })


});
module.exports = router;
