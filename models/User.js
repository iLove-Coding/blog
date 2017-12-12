//创建模型
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

//创建模型方法,并设置全局访问，mongoose.model是构造函数，提供了对表的操作方法
module.exports = mongoose.model('User', usersSchema);