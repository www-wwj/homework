var sqlite3 = require("sqlite3");
var db_path = "db/db.sqlite3";
var connect;
module.exports = {
	connect : function(fcb) {
		console.log('ssss')
		if(!connect){
			connect = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err){
				fcb(err);
			});
		}else{
			fcb();
		}
		
	},
	addUser : function(info, fcb) {
		connect.run("insert into users(id, username, password,name,type) VALUES(?,?,?,?,?)", [null, info.username, info.password,info.name,info.type], fcb);
	},
	deleteUser : function(id,fcb) {
		connect.run("delete from users where id =?", [id], fcb);
	},
	login:function(info,fcb){
		connect.all("select * from users where username =? and password = ?",[info.username,info.password],fcb);
	},
	searchUser:function(info,fcb){
		connect.get("select * from users where username =? ",[info.username],fcb);
	},
	//老师相关
	addBank : function(info,fcb) {
		connect.run("insert into questionbank(id, name,type,desc,uid,uname,createtime,question) VALUES(?,?,?,?,?,?,?,?)", [null, info.name, info.type,info.desc,info.uid,info.uname,info.createtime,info.question], fcb);
	},
	editBank : function(info,fcb) {
		connect.run("update questionbank set name =?,type = ?,desc = ?,createtime = ?,question = ? where id = ?", [info.name, info.type,info.desc,info.createtime,info.question,info.id], fcb);
	},
	deleteBank : function(id,fcb) {
		connect.run("delete from questionbank where id =?", [id], fcb);
	},
	getBankDetail : function(id,fcb){
		connect.get("select * from questionbank where id =?",[id],fcb);
	},
	getBankList : function(id,fcb){
		connect.all("select * from questionbank where uid =? order by id desc",[id],fcb);
	},
	getPaperList : function(id,fcb){
		connect.all("select * from paper where uid =? order by id desc",[id],fcb);
	},
	getPaperDetail : function(id,fcb){
		connect.get("select * from paper where id =?",[id],fcb);
	},
	addPaper : function(info,fcb) {
		connect.run("insert into paper(id, name,type,desc,time,total,uid,uname,createtime,question) VALUES(?,?,?,?,?,?,?,?,?,?)", [null, info.name, info.type,info.desc,info.time,info.total,info.uid,info.uname,info.createtime,info.question], fcb);
	},
	deletePaper : function(id,fcb) {
		connect.run("delete from paper where id =?", [id], fcb);
	},
	//学生相关
	getTest : function(type,fcb){
		if(type==='all'){
			connect.all("select p.id,p.name,p.type,p.desc,p.time,p.total,p.createtime,p.question,u.name as uname from paper as p left join users as u on p.uid = u.id order by p.id desc",fcb);
		}else{
			connect.all("select p.id,p.name,p.type,p.desc,p.time,p.total,p.createtime,p.question,u.name as uname from paper as p left join users as u on p.uid = u.id where p.type =? order by p.id desc",[type],fcb);
		}
	},
	getTestInfo : function(id,fcb){
		connect.get("select * from paper where id =?",[id],fcb);
	},
	addResult : function(info,fcb){
		connect.run("insert into result(id,name,type,desc,time,total,uid,uname,createtime,question) VALUES(?,?,?,?,?,?,?,?,?,?)", [null, info.name, info.type,info.desc,info.time,info.total,info.uid,info.uname,info.createtime,info.question], fcb);
	},
	getResultList : function(id,fcb){
		connect.all("select * from result where uid =? order by id desc",[id],fcb);
	},
	getResultInfo : function(id,uid,fcb){
		connect.get("select * from result where id =? and uid =?",[id,uid],fcb);
	},
	//管理员
	getUserList :function(fcb){
		connect.all("select * from users",fcb);
	}
}