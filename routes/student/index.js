var express = require('express');
var db = require('../../db/index');
var app ={};
app.mainPage = function(req,res){
    res.render('main',{pageName:"main",userType:2,username:req.session.username});
}
app.listPage = function(req,res){
	res.render('student/main',{pageName:"test",userType:2,username:req.session.username});
}
app.getResult = function(req,res){
    res.render('student/result',{pageName:"result",userType:2,username:req.session.username});
}
app.viewResult = function(req,res){
    res.render('student/viewResult',{pageName:"result",userType:2,username:req.session.username});
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


app.addResult = function(req,res){
    var param = req.body;
    console.log(param)
    if(req.session.userType !== 2){
        res.send({"code":402, "message":"非法用户","result":false})
    }else{
        var data = {
            name:param.name,
            desc:param.desc,
            type:param.type,
            time:param.time,
            question:param.question,
            total:param.total,
            uid:req.session.uid,
            uname:req.session.username,
            createtime:new Date().getTime()
        }
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.addResult(data,function(error){
                if(!error){
                   res.send({"code":200, "message":'',"result":true})
                }else{
                    res.send({"code":401, "message":"操作失败","result":false})                
                }
            });
        });
    }    
}
app.getResultList = function(req,res){
    var uid = req.session.uid;
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.getResultList(uid,function(err,data){
                if(data){
                    res.send({"message":"", "result":{"code":200, "total":data.length,"list":data}})
                }else{
                    res.send({"message":"数据库异常", "result":{"code":500}})
                }
            });
        }); 
    });
}
app.getResultInfo = function(req,res){
    var id = req.query.id,
        uid = req.session.uid;
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.getResultInfo(id,uid,function(err,data){
            console.log('wjj',data)
           if(data){
                res.send({"code":200,"data":data})
            }else{
                res.send({"message":"数据库异常", "code":500})
            }
        });
    });  
}
module.exports = app;
