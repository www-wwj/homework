var sqlite3 = require("sqlite3");
var db_path = "db/db.sqlite3";
var connect;
module.exports = {
	connect : function(fcb) {
		if(!connect){
			connect = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err){
				fcb(err);
			});
		}else{
			fcb();
		}
		
	},
	add : function(info, fcb) {
		connect.run("INSERT INTO User(nm, id, tel) VALUES(?,?,?)", [info.nm, info.id, info.tel], fcb);
	},
	read : function() {
	},
	login:function(info,fcb){
		connect.all("select * from users where username =? and password = ?",[info.username,info.password],fcb);
	}
}