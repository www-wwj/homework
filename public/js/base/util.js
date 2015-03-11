/*
 * ------------------------------------------
 * 通用接口实现文件
 * ------------------------------------------
 */

define([
    '{lib}base/element.js',
    '{lib}base/event.js',
    '{lib}base/util.js',
    '{lib}util/ajax/rest.js',  
    '{lib}util/chain/chainable.js'
    ], 
    function(e,v,u,j,$,p,o,f,r) {
    var msgNode,timer,timer2;
    /**
     * 获取祖先中第一个符合条件的节点
     * @param  {Node} node      起始节点
     * @param  {Function} condition 条件函数
     * @param  {Node} opt_root  根节点
     * @return {[type]}           [description]
     */
    p.findAncestor = function(node, condition, opt_root) {
        while (node && node !== opt_root) {
            if (u._$isFunction(condition) && condition(node)) {
                return node;
            }
            node = node.parentNode;
        }
    };
    /**
     * 名称转化为类名
     * @param  {String} name 名称
     * @return {String}      类名
     */
    p.nameToClass = function(name) {
        return 'j-' + name;
    };
    /**
     * 类名转化为名称
     * @param  {String} clazz 类名
     * @return {String}       名称
     */
    p.classToName = function(clazz) {
        return clazz.substr && clazz.substr(2);
    };

    $._$implement({
        _$toggleClass: function(className) {
            if (this._$hasClassName(className)) {
                this._$delClassName(className)
            } else {
                this._$addClassName(className)
            }
            return this;
        },
        _$find: function(sl) {
            return this._$children(sl, true);
        }
    })
    /**
     * 类似e._$get, 不过是传入选择器
     * @param {Node|String} 选择器或者节点
     * @param {Node|Null} 可以传入Context 限制查找范围
     * @return {Node}
     */
    p.$ = function(sl, context) {
        var container = document.createElement('div');
        if (typeof sl === 'string' && sl.trim().indexOf("<") == 0) {
            container.innerHTML = sl;
            var res = $(container.childNodes);
            return res;
        }
        return $(sl, context);
    }
    /**
     * 获取节点的第一个父元素满足selector
     * @param node {Node} 字节点
     * @param {Function|String|Null} 如果不传入则获得第一个父节点,可以传入选择器进行过滤
     */
    p.getParent = function(node, selector) {
        var test, parent;
        if (!selector) test = passFn;
        else {
            test = typeof selector === 'function' ? selector : function(node) {
                return nes.matches(node, selector);
            }
        }
        if (!node) return;
        parent = node.parentNode;
        while (parent) {
            if (test(parent)) return parent;
            else parent = parent.parentNode;
        }
    }

    /**
     * 获取指定名称的第一个节点
     * 页面结构举例
     * [code type="html"]
     *   <div class='j-title'></div>
     * [/code]
     * 脚本举例
     * [code]
     *   var node = p.get('title', context);
     * [/code]
     * @param  {String} name 名称
     * @param  {Node} context 上下文节点
     * @return {Node}      节点
     */
    p.get = function(name, opt_context) {
        var nodes = e._$getByClassName(opt_context, this.nameToClass(name));
        return nodes && nodes[0];
    };
    /**
     * 获取指定名称的所有节点
     * @param  {String} name 名称
     * @param  {Node}   opt_context 上下文节点
     * @return {Node}      节点
     *
     */
    p.getAll = function(name, opt_context) {
        return e._$getByClassName(opt_context, this.nameToClass(name));
    };
    /**
     * 显示信息
     *  @param  {Object} options 配置参数
     * @config  {String} message 信息
     * @config  {String} type    信息类型('error','success','hint'),默认为'hint'
     * @config  {Boolean} autoDisappear    是否自动消息，默认为true
     * @return {Void}
     */

    p.showMessage = function(options) {
        options = options || o;
        var message = options.message;
        var content = p.get('content', msgNode);
        var closer = options.closer;
        var type = options.type || 'hint';
        var delay = options.delay;
        var autoDisappear = options.autoDisappear;
        if (!msgNode) {
            msgNode = document.createElement('div');
            msgNode.innerHTML = '<p class="j-content"></p>';
            document.body.appendChild(msgNode);
            msgNode.className = 'u-msg1 u-msg1-' + type;
        }
        window.clearTimeout(timer);
        window.clearTimeout(timer2);
        var content = p.get('content', msgNode);
        content.innerHTML = message || '';
        if (closer && !autoDisappear) {
            content.innerHTML += '<a href="javascript:void(0);" class="closer j-closer" title="我知道了">×</a>';
            v._$addEvent(p.get('closer', msgNode), 'click', function() {
                e._$delClassName(msgNode, 'u-msg1-show');
                closer();
            });
        }
        msgNode.className = 'u-msg1 u-msg1-' + type;
        if (options.klass) msgNode.className += ' ' + options.klass;
        timer2 = window.setTimeout(function() {
            e._$addClassName(msgNode, 'u-msg1-show');
        }, 0);
        autoDisappear = autoDisappear === undefined ? true : autoDisappear;
        if (autoDisappear) {
            timer = window.setTimeout(function() {
                e._$delClassName(msgNode, 'u-msg1-show');
            }, delay || 2500);
        }
    };
    /**
     * 隐藏信息
     * @return {Void}
     */
    p.hideMessage = function() {
        if (msgNode) {
            e._$delClassName(msgNode, 'u-msg1-show');
        }
    };
    /**
     * 显示成功信息
     * @param  {Object|String} options 配置参数|消息内容
     * @config  {String} message 信息
     * @config  {Boolean} autoDisappear    是否自动消息，默认为true
     * @return {Void}
     */
    p.showSuccess = function(options) {
        if (u._$isString(options)) {
            options = {
                message: options
            };
        }
        options = options || {};
        options.type = 'success';
        return p.showMessage(options);
    };
    /**
     * 显示提示信息
     * @param  {Object} options 配置参数
     * @config  {String} message 信息
     * @config  {Boolean} autoDisappear    是否自动消息，默认为true
     * @return {Void}
     */
    p.showHint = function(options) {
        if (u._$isString(options)) {
            options = {
                message: options
            };
        }
        options = options || {};
        options.type = 'hint';
        return p.showMessage(options);
    };
    /**
     * 显示错误信息
     * @param  {Object} options 配置参数
     * @config  {String} message 信息
     * @config  {Boolean} autoDisappear    是否自动消息，默认为true
     * @return {Void}
     */
    p.showError = function(options) {
        if (u._$isString(options)) {
            options = {
                message: options
            };
        }
        options = options || {};
        options.type = 'error';
        return p.showMessage(options);
    };
   
    /**
     * clone一个对象
     * @param  {Object} obj 要clone的对象
     * @return {Object}     clone出来的对象
     */
    p.clone = function(obj) {
        if (obj === undefined) {
            return undefined;
        }
        return JSON.parse(JSON.stringify(obj));
    };
    /**
     * 去所有空格
     * @param {String} str 输入的字符串
     * @return {String} 去除所有空格后的字符串
     */
    p.trimAll = function(str) {
        return str.replace(/\s+/g, "");
    };
    /**
     * 合并连续空格
     * @param {String} str 输入的字符串
     * @return {String} 合并连续空格后的字符串
     */
    p.mergeSpace = function(str) {
        return str.replace(/\s+/g, " ");
    };
   
    /**
     * 判断一个字符串是不是一个合法的date字符串，如:2012-9-12, 2013/09/14
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    p.isDate = function(str) {
        if (!str) {
            return;
        }
        var arr = str.match(/(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
        if (!arr) {
            return false;
        }
        var reg = /^0*/;
        var yearNum = parseInt(arr[1].replace(reg, ''), 10);
        var monthNum = parseInt(arr[3].replace(reg, ''), 10) - 1;
        var dateNum = parseInt(arr[4].replace(reg, ''), 10);
        var date = new Date(yearNum, monthNum, dateNum);
        return date.getFullYear() === yearNum && date.getMonth() === monthNum && date.getDate() === dateNum;
    };
    /**
     * 去除字符串中html标签
     * @param  {String} str 字符串
     * @return {String}     处理后的字符串
     */
    p.removeTag = function(str) {
        var node = document.createElement('div');
        node.innerHTML = str || '';
        return node.innerText;
    };
    
    // 通用验证对象
    p.validator = {
        /**
         * 字符串是否是合法url
         * @param  {String} str 待检测字符串
         * @return {Boolean}    是否合法
         */
        url: function(str) {
            if (!str) return;
            //return /^https?:\/\/[\w\-_]+(\.[\w\-_]+)+([!\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/.test(str);
            //中文url的可能性
            return /^(https?:\/\/([-\w]+\.)+[-\w]+(?:\:\d+)?(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)$/i.test(str);
        },

        /**
         * 字符串是否是合法email
         * @param  {String} str 待检测字符串
         * @return {Boolean}    是否合法
         */
        email: function(str) {
            if (!str) return;
            return /^\w[\w\.-]*[a-zA-Z0-9]?@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(str);
        },
        /**
         * 字符串是否是合法的固定电话号
         * @param  {String} str 待检测字符串
         * @return {Boolean}    是否合法
         */
        phone: function(str) {
            if (!str) return;
            return /^0\d{2,3}\-\d{7,8}$/.test(str);
        },
        /**
         * 字符串是否是合法的密码(数字/字母/英文符号，最少6位)
         * @param  {String} str 待检测字符串
         * @return {Boolean}    是否合法
         */
        password: function(str) {
            if (!str) return;
            return /^[-~`!@#$%^&*()_+=|{}\[\]:;"'<,>.?\/\d\w]{6,18}$/.test(str);
        }
    };
    /**
     * 将long型的时间转换成yyyy-MM-dd字符串型, 或可以传入format
     * @param  {Number} time 时间
     * @return {String}      时间字符串
     */
    p.transTime = function(time, format) {
        return time && u._$format(time, format || 'yyyy-MM-dd');
    };

    /**
     * @param {String} template 简单模版
     * @param {Object} param 参数
     */
    p.tpl = function(template) {
        function get(path, param) {
            var base = param;
            var spaths = path.split('.');
            spaths.forEach(function(path) {
                var tmp = base[path];
                if (!(base = base[path])) return '';
            })
            var type = typeof base;
            if (type === 'function') return base();
            if (type !== 'object') return base;
            return '';
        }
        return function(param) {
            return template.replace(/\{([\w\.]+)}/g, function(all, capture) {
                return get(capture, param);
            })
        }

    }
 
    /**
     * 简单extend
     * @param  {[type]} o1       被覆盖着
     * @param  {[type]} o2       要mixin的对象
     * @param  {[type]} override 是否覆盖
     * @return {Object}          o1
     */
    p.extend = function(o1, o2, override) {
        for (var i in o2) {
            if (o1[i] == undefined || override) {
                o1[i] = o2[i]
            }
        }
        return o1;
    }
  
    /**
     * REST异步请求
     * @param {String} str 被匹配字符串
     */
    
    p._$requestByREST = function(url, options){
        var tokenName = p.tokenName; 
        // options.result = {headers:tokenName};
        // options.headers = options.headers || {};
        // options.headers["YX-st"] = globals[tokenName];
        options.timeout = options.timeout || 10000;
        // HOOK下onload增加onend回调.
        var fld = options.onload;
        options.onload = function(data) {
            if(data&&data.code ==401){
                p.showError(data.message||'会话已过期，请重新登录');
                setTimeout(function(){ location.reload();},2000);         
                return;
            }
            fld ? fld.apply(this, arguments) : 0;
            options.onend ? options.onend.call(this, arguments) : 0;
        };
        if(!options.onerror){
            options.onerror = function(data){
                if(!!data && data.message){
                    if(~data.message.indexOf('超时')){
                        p.showError('请求超时！');
                    }else{
                        p.showError(data.message);
                    }
                }else{
                    p.showError('网络异常，请检查后再试');
                }
            };
        }
        // HOOK下onerror增加onend回调.
        var fer = options.onerror;
        options.onerror = function() {
            fer ? fer.apply(this, arguments) : 0;
            options.onend ? options.onend.call(this, arguments) : 0;
        };          
        // var oldLoad = options.onload;

        // options.onload = function(json){
        //     if(json && json.headers && json.headers[tokenName]) globals[tokenName] = json.headers[tokenName];
        //     oldLoad.apply(this, arguments);
        // }
        return j._$request(url, options);
    };
        

    /**
     * 时间对象的格式化;
     */
    Date.prototype.format = function(format) {
        /* 
         * eg:format="yyyy-MM-dd hh:mm:ss";
         */
        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond  
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
     /**
     * 将时间信息转换为时间戳.
     * @param       {String}            字符串时间，例如2014-06-27 12:30
     * @return      {Number}            时间戳
     */
    p.transToTimeSpan = function(_str){
        try{
            if(_str){
                _str = _str?_str.replace(/[-\.]/g,"/"):undefined;
                return parseInt(new Date(_str).valueOf());
            }
            else{
                return parseInt(new Date().valueOf());
            }
            
        }
        catch(ex){
            return 0;
        }
    };

    /**
     * String对象扩展
     */
    String.prototype.LTrim = function() {
        return this.replace(/(\s*$)/g, "");
    }

    /**
     * Array对象的扩展
     */
    Array.prototype.map = Array.prototype.map || function(fn) {
        var arr = this;
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(fn(arr[i]));
        }
        return newArr;
    }
    return p;
});