
define([
    'base/global',
    '{pro}cache/test.js',
    '{lib}ui/pager/pager.js',
    '{pro}base/util.js',
    'base/element',
    'base/event',
    'util/template/jst',
    'ui/item/list',
    'util/list/page',
    '{pro}widget/tableView.js'
    ], function(NEJ, cache, pg, du, e, v, jst, ui, listpg,di) {

    // 页面对象.
   
    var page = {
        __init : function() {
            this.__initNode();
            this.__initListModule();
        },
        __initNode : function() {
            this.__cotainer = e._$get("container");
        },
        __initListModule : function() {
            var that = this;
            var c = this.__cotainer;
            var selectType = e._$get("selectType");
            var opt = {
                limit: 4,
                parent: du.get('list', c),
                item: {
                    klass: di._$$listItem,

                },
                cache: {
                    lkey: 'all',
                    klass: cache._$$testCache
                },
                pager: {
                    klass: pg._$$Pager,
                    clazz: '',
                    label: {
                        prev: "<",
                        next: ">"
                    },
                    noend: true,
                    parent: du.get('page', c)
                },
                onerror: du.showListError,
                onbeforelistload: du.showListLoading,
                onupdate:this.__onUpdate._$bind(this),
                onemptylist: du.showListMessage._$bind(null, '暂无题库')
            };
            v._$addEvent(selectType,"change",function(){
                if(that.__listModule){
                    that.__listModule._$recycle();
                }
                opt.cache.lkey = selectType.value;
                that.__listModule = listpg._$$ListModulePG._$allocate(opt);
            })
            this.__listModule = listpg._$$ListModulePG._$allocate(opt);
        },
        __onUpdate:function(event){
            location.href ="/viewTest?id="+event.id;
        }
    };
    v._$addEvent(
        document,'templateready',
        function(){
            jst._$add('jst-list');
            page.__init();
        }
    );
   
});