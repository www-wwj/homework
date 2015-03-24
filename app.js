var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Wilson'));
app.use(session({secret: 'wilson'}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', routes.doMapping);

app.post('/login',routes.doLogin);
// app.get('/rest/get',function(req,res){
//     res.send({data:req.query.asd })
// })

app.get('/rest/teacher/questionsList',function(req,res){
    res.send({"message":"","result":{"total":5,"list":[{"id":12004,"weight":0,"title":"新增获取素材列表、关注权限管理及视频通话接口","url":"https://plus.yixin.im/pub/notice/14122501.html","isnew":0,"timetag":1419314175863},{"id":12003,"weight":0,"title":"易信公众平台改版说明","url":"https://plus.yixin.im/pub/notice/14122502.html","isnew":0,"timetag":1419314112966},{"id":12002,"weight":0,"title":"【重要】易信网页授权接口升级","url":"https://plus.yixin.im/pub/notice/14121101.html","isnew":0,"timetag":1419314089889},{"id":11003,"weight":3,"title":"公众平台改版上线预告","url":"https://plus.yixin.im/pub/notice/14121701.html","isnew":1,"timetag":1418979712754},{"id":11001,"weight":1,"title":"自定义菜单上线了","url":"https://plus.yixin.im/pub/notice/14062601.html","isnew":0,"timetag":1418979419335}]},"code":200})
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
