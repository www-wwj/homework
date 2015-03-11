var express = require('express');
var router = express.Router();

/* GET home page. */

router.index = function(req, res){
res.render('index', { title: 'Index' });
};
router.login = function(req, res){
res.render('login', { title: '用户登陆'});
};
router.doLogin = function(req, res){
var user={
username:'admin',
password:'admin'
}
if(req.body.username===user.username && req.body.password===user.password){
res.redirect('/home');
}
res.redirect('/login');
};
router.logout = function(req, res){
res.redirect('/');
};
router.home = function(req, res){
var user={
username:'admin',
password:'admin'
}
res.render('home', { title: 'Home',user: user});
};
router.student = function(req,res){
	res.render('student',{title:'student',name:'wujieshisb'});
};
module.exports = router;
