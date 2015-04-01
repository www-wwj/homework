var express = require('express');
var db = require('../../db/index');
var app ={};
app.listPage = function(req,res){
	res.render('student/main',{pageName:"test",userType:2,username:req.session.username});
}
app.getResult = function(req,res){
    res.render('student/result',{pageName:"result",userType:2,username:req.session.username});
}
app.testPage = function(req,res){
    res.render('student/viewTest',{pageName:"test",userType:2,username:req.session.username});
}
app.getList = function(req,res){
    var type = req.query.type;
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.getTest(type,function(err,data){
           if(data){
                res.send({"message":"", "result":{"code":200, "total":data.length,"list":data}})
            }else{
                res.send({"message":"数据库异常", "result":{"code":500}})
            }
        });
    });  
}

app.getTestInfo = function(req,res){
    var id = req.query.id;
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.getTestInfo(id,function(err,data){
           if(data){
                res.send({"code":200,"data":data})
            }else{
                res.send({"message":"数据库异常", "code":500})
            }
        });
    });  
}
app.editPage =function(req,res){
	res.render('student/edit', {pageName:'test',userType:2,username:req.session.username});
}
app.mainPage = function(req,res){
	res.render('main',{pageName:"main",userType:2,username:req.session.username});
}
module.exports = app;
