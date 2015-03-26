define([
    'base/klass',
    'util/cache/abstract',
    '{pro}base/util.js',
    'base/util'
], function(k,cache,du,u,p) {

    p._$$questionsCache = k._$klass();
    var pro = p._$$questionsCache._$extend(cache._$$CacheListAbstract);

    pro.__init = function(options){
        this.__super(options);
    }

    pro.__doLoadList = function(options) {
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

    pro.__cbLoadList = function(callback, json) {
        var result = json && json.result;
        callback(result);
    };
     /**
     * 从服务器上删除列表项，子类实现具体逻辑
     * @protected
     * @method {__doDeleteItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    pro.__doDeleteItem = function(options) {
        var callback = options.onload;
        var data = options.data;
        this._$setEvent('delete', this.__cbDeleteItem._$bind(this, callback));
        this._$delete(data.id);
    };
    /**
     * 从服务器上删除消息
     * @param  {Number} id 消息id
     * @return {Void}
     */
    pro._$delete = function(id) {
        du._$requestByREST('/rest/teacher/bankDelete', {
            method: 'DELETE',
            param: {
                'id': id
            },
            onload: this._$dispatchEvent._$bind(this, 'delete')
        });
    };
      /**
     * 从服务器删除一项的回调函数
     * @param {Object} callback
     * @param {Object} json
     */
    pro.__cbDeleteItem = function(callback, json) {
        var data = json && json.result;
        if (u._$isFunction(callback) && u._$isBoolean(data)) {
            callback(data);
        }
    };
    return p;
});