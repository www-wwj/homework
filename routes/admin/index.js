var express = require('express');
var db = require('../../db/index');
var app ={};
app.listPage = function(req,res){
	res.render('admin/main',{pageName:"userManage",userType:0,username:req.session.username});
}
app.getList = function(req,res){
	res.send({"message":"","result":testData})
}
app.addPage =function(req,res){
	res.render('admin/edit', { userType: 1,pageName:'userManage',userType:0,username:req.session.username});
}
app.editPage =function(req,res){
    res.render('admin/edit', { userType: 1,pageName:'userManage',userType:0,username:req.session.username});
}
app.mainPage = function(req,res){
	res.render('main',{pageName:"main",userType:0,username:req.session.username});
}
app.getList = function(req,res){
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.getUserList(function(err,data){
           if(data){
                res.send({"message":"", "result":{"code":200, "total":data.length,"list":data}})
            }else{
                res.send({"message":"数据库异常", "result":{"code":500}})
            }
        });
    });  
}
module.exports = app;
