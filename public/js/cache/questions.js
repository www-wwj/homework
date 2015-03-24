define([
    'base/global',
    'util/cache/abstract',
    '{pro}base/util.js'
], function(NEJ,cache,du,p) {
    p._$$questionsCache = NEJ.C();
    var proto = p._$$questionsCache._$extend(cache._$$CacheListAbstract);

    proto.__init = function(options){
        this.__supInit(options);
    }

    proto.__doLoadList = function(options) {
        var callback = options.onload;
        var data = options.data;
        data={
            page:options.offset/options.limit+1
        };
        du._$requestByREST("/rest/teacher/questionsList", {
            type:"json",
            method:"get",
            data: data,
            onerror : this.__cbLoadList._$bind(this, callback),
            onload: this.__cbLoadList._$bind(this, callback)
        });
    };

    proto.__cbLoadList = function(callback, json) {
        var result = json && json.result;
        callback(result);
    };
});