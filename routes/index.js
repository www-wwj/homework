var express = require('express');
var router = express.Router();


router.index = function(req, res){
	res.redirect('/login');
};
router.login = function(req, res){
	res.render('login', { title: '用户登陆'});
};
router.doLogin = function(req, res){
	console.log("----");
	var db = require("db");
	db.create(function(err, cnt){
		console.log("OKKKK");
		db.createTable(cnt, function(){
			console.log("create");
		});
	});


	var user={
		username:'admin',
		password:'admin'
	}
	if(req.body.username=== user.username && req.body.password===user.password){
		req.session.username = req.body.username; 
		console.log('aaa ',req.session)
		res.redirect('/home');
	}
	res.render('login', { title: '用户登陆',errors:'error'});
};
router.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
};
router.home = function(req, res){
	var username = req.session.username;
	console.log('bbb',req.session);
	console.log('bbb',username);
res.render('home', { title: 'Home',username: username});
};
router.main = function(req, res){
	res.render('main', { title: '首页'});
};
module.exports = router;
