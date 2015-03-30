var sqlite3 = require("sqlite3");
var db_path = "db/db.sqlite3";
var connect;
module.exports = {
	create : function(fcb) {
		connect = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err){
			fcb(err, connect);
		});
	},
	createTable : function(connect, fcb) {
		connect.exec("CREATE TABLE User(nm text(100) NOT NULL, id text NOT NULL PRIMARY KEY, tel text(11) NOT NULL);", fcb);
	},
	add : function(info, fcb) {
		connect.run("INSERT INTO User(nm, id, tel) VALUES(?,?,?)", [info.nm, info.id, info.tel], fcb);
	},
	read : function() {
	},
	login:function(connect1,info,fcb){
		console.log('dddd',connect,info,fcb)
		connect.all("select * from users where username =? and password = ?",[info.username,info.password],fcb);
	}
}