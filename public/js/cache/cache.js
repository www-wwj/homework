define([
    'base/klass',
    'util/cache/abstract',
    '{pro}base/util.js'
], function(k,cache,du,p,o,f,r) {

    p._$$baseCache = k._$klass();
    var pro = p._$$baseCache._$extend(cache._$$CacheListAbstract);

    pro.__init = function(options){
        this.__super(options);
    }

    /**
     * 子类实现请求方式
     */
    pro.__doLoadList = f;

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
        this._$delete(data);
    };
 
      /**
     * 从服务器删除一项的回调函数
     * @param {Object} callback
     * @param {Object} json
     */
    pro.__cbDeleteItem = function(callback, json) {
        var data = json && json.result;
        if (du._$isFunction(callback) && du._$isBoolean(data)) {
            callback(data);
        }
    };
    return p;
});