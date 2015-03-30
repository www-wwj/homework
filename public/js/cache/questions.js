define([
    'base/klass',
    '{pro}cache/cache.js',
    '{pro}base/util.js',
], function(k,cache,du,p) {

    p._$$questionsCache = k._$klass();
    var pro = p._$$questionsCache._$extend(cache._$$baseCache);

    pro.__init = function(options){
        this.__super(options);
    }

    pro.__doLoadList = function(options) {
        var callback = options.onload;
        var data = options.data;
        du._$requestByREST("/rest/teacher/questionsList", {
            type:"json",
            method:"get",
            onerror : this.__cbLoadList._$bind(this, callback),
            onload: this.__cbLoadList._$bind(this, callback)
        });
    };

    /**
     * 从服务器上删除消息
     * @param  {Number} id 消息id
     * @return {Void}
     */
    pro._$delete = function(data) {
        du._$requestByREST('/rest/teacher/bankDelete', {
            method: 'DELETE',
            param: {
                'id': data.id
            },
            onload: this._$dispatchEvent._$bind(this, 'delete')
        });
    };
    return p;
});