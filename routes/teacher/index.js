var express = require('express');
var app ={};
var db = require('../../db/index');
var testData = {"total":5,"code":200,"list":[
	{basic:{name:'终极必杀考试题1',desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',type:1},
    question:[
        {title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},
	],createtime:1418979419335,id :1},
	{basic:{name:'终极必杀考试题2',desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',type:1},
    question:[
        {title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},

	],createtime:1418979419335,id :2},
	{basic:{name:'终极必杀考试题3',desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',type:1},
    question:[
        {title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},
	],createtime:1418979419333,id :3},
	{basic:{name:'终极必杀考试题4',desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',type:1},
    question:[
        {title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},
	],createtime:1418979319335,id :4},
	{basic:{name:'终极必杀考试题5',desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',type:1},
    question:[
        {title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
        {title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},
	],createtime:1418979413335,id :5}	
]}
app.bankPage = function(req,res){
	res.render('teacher/main',{pageName:"qBank",userType:1,username:req.session.username});
}
app.paperPage = function(req,res){
    res.render('teacher/paper',{pageName:"paper",userType:1,username:req.session.username});
}

app.getPaperList = function(req,res){
    res.send({"message":"","result":testData})
}
app.addPage =function(req,res){
	res.render('teacher/edit', { userType: 1,pageName:'qBank',userType:1,username:req.session.username});
}
app.addPaperPage =function(req,res){
    res.render('teacher/addPaper', { userType: 1,pageName:'paper',userType:1,username:req.session.username});
}
app.editPage =function(req,res){
    res.render('teacher/edit', { userType: 1,pageName:'qBank',userType:1,username:req.session.username});
}
app.viewPaperPage =function(req,res){
    res.render('teacher/viewPaper', { userType: 1,pageName:'paper',userType:1,username:req.session.username});
}

app.mainPage = function(req,res){
	res.render('main',{pageName:"main",userType:1,username:req.session.username});
}

app.getList = function(req,res){
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
            db.getBankList(uid,function(err,data){
                if(data){
                    res.send({"message":"", "result":{"code":200, "total":data.length,"list":data}})
                }else{
                    res.send({"message":"数据库异常", "result":{"code":500}})
                }
            });
        }); 
    });
}
app.addBank = function(req,res){
    var param = req.body;
    if(req.session.userType !== 1){
        res.send({"code":402, "message":"非法用户","result":false})
    }else{
        var data = {
            name:param.name,
            desc:param.desc,
            type:param.type,
            question:JSON.stringify(param.question),
            uid:req.session.uid,
            uname:req.session.username,
            createtime:new Date().getTime()
        }
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.addBank(data,function(error){
                if(!error){
                   res.send({"code":200, "message":'',"result":true})
                }else{
                    res.send({"code":401, "message":"操作失败","result":false})                
                }
            });
        });
    }    
}
app.editBank = function(req,res){
    var param = req.body;
    if(req.session.userType !== 1){
        res.send({"code":402, "message":"非法用户","result":false})
    }else{
        var data = {
            id:param.id,
            name:param.name,
            desc:param.desc,
            type:param.type,
            question:JSON.stringify(param.question),
            uid:req.session.uid,
            uname:req.session.username,
            createtime:new Date().getTime()
        }
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.editBank(data,function(error){
                console.log(error)
                if(!error){
                   res.send({"code":200, "message":'',"result":true})
                }else{
                    res.send({"code":401, "message":"操作失败","result":false})                
                }
            });
        });
    }    
}
app.getBank = function(req,res){
    var id = req.query.id;
    db.connect(function(err){
        if(err){
            console.logo(err)
            return;
        }
        db.getBankDetail(id,function(err,data){
           if(data){
                res.send({"code":200,"data":data})
            }else{
                res.send({"message":"数据库异常", "code":500})
            }
        });
    });  
}
app.deleteBank = function(req,res){ 
    var id = req.query.id;
    if(req.session.userType !== 1){
        res.send({"code":402, "message":"非法用户","result":false})
    }else{
        db.connect(function(err){
            if(err){
                console.logo(err)
                return;
            }
            db.deleteBank(id,function(error){
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
