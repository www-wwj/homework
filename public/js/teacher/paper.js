
define([
    'base/global',
    '{pro}cache/paper.js',
    '{lib}ui/pager/pager.js',
    '{pro}base/util.js',
    'base/element',
    'base/event',
    'util/template/jst',
    'ui/item/list',
    'util/list/page',
    '{pro}widget/tableView.js'
    ], function(NEJ, cache, pg, du,e, v, jst, ui, listpg,di) {

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
            var c = this.__cotainer;
            var opt = {
                limit: 4,
                parent: du.get('list', c),
                item: {
                    klass: di._$$listItem,

                },
                cache: {
                    lkey: 'id',
                    klass: cache._$$paperCache
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
                ondelete: this.__onDelete._$bind(this),
                onupdate:this.__onUpdate._$bind(this),
                onemptylist: du.showListMessage._$bind(null, '暂无试卷')
            };
            this.__listModule = listpg._$$ListModulePG._$allocate(opt);
        },
        __onDelete:function(event){
            this.__listModule._$delete(event);
        },
         __onUpdate:function(event){
            location.href ="/viewPaper?id="+event.id;
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