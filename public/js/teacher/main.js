
define([
    'base/global',
    '{pro}cache/questions.js',
    '{lib}ui/pager/pager.js',
    '{pro}base/util.js',
    'base/util',
    'base/element',
    'base/event',
    'util/template/jst',
    'ui/item/list',
    'util/list/page'
    ], function(NEJ, cache, pg, du, u, e, v, jst, ui, listpg) {

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
                item:'jst-list',
                cache: {
                    key: 'qId',
                    lkey: 'question',
                    klass: cache._$$questionsCache
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
                onemptylist: du.showListMessage._$bind(null, '暂无题库')
            };
            this.__listModule = listpg._$$ListModulePG._$allocate(opt);
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