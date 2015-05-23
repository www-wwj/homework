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
	res.render('admin/edit', { pageName:'userManage',userType:0,username:req.session.username});
}
app.editPage =function(req,res){
    res.render('admin/edit', { pageName:'userManage',userType:0,username:req.session.username});
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
app.deleteUser= function(req,res){ 
    var id = req.query.id;
    if(req.session.userType !== 0){
        res.send({"code":402, "message":"非法用户","result":false})
    }else{
        if(id==0){
            res.send({"code":401, "message":"管理员不能删除","result":false})  
        }
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.deleteUser(id,function(error){
                console.log(error,this)
                if(!error){
                   res.send({"code":200, "message":'',"result":true})
                }else{
                    res.send({"code":401, "message":"操作失败","result":false})                
                }
            });
        });
    }
}
module.exports = app;
