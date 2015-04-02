define([
    'base/klass',
    '{pro}cache/cache.js',
    '{pro}base/util.js',
], function(k,cache,du,p) {

    p._$$resultCache = k._$klass();
    var pro = p._$$resultCache._$extend(cache._$$baseCache);

    pro.__init = function(options){
        this.__super(options);
    }

    pro.__doLoadList = function(options) {
        var callback = options.onload;
        var data = options.data;
        du._$requestByREST("/rest/student/resultList", {
            type:"json",
            method:"get",
            onerror : this.__cbLoadList._$bind(this, callback),
            onload: this.__cbLoadList._$bind(this, callback)
        });
    };

    return p;
});