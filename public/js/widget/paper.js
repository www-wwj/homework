/*
 * ------------------------------------------
 * 带跳到第几页的pager
 * @version  1.0
 * @author   hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 * ------------------------------------------
 */
define(['{lib}base/util.js',
      '{lib}ui/pager/pager.js',
      '{lib}base/util.js',
      '{pro}base/util.js'
    ],
  function(_t1, _t2, _t3,_t4, _p) {
    var using = NEJ.P;
    var i = using('nej.ui');
    var dw = using('dd.widget');
    var du = using('dd.util');
    var u = using('nej.u');
    var e = using('nej.e');
    var $ = du.$;
    var proto;

    _p._$$Pager = dw._$$Pager = NEJ.C();
    var MAX_MESSAGES = 100000/20;

    proto = dw._$$Pager._$extend(i._$$Pager);
    /**
     * 初始化空间
     * @param  {Object} _options 传入参数与Pager一致
     * @return 
     */
    proto.__reset = function(_options){
      if(!!_options.label){
        _options.label.next = "&gt;";
        _options.label.prev = "&lt;";
      }
      this.__supReset(_options);
      var self = this;
      this.$search = $('<span class="search">跳到<input class="u-ipt"type="text" />页 <span class="u-btn u-btn-go u-btn-s0">GO</span> </span>')
      var $input = this.$search._$find('.u-ipt');
      if(_options.total > 7) {
        this.$search._$insert2(this.__body)._$on(['keydown input', 'click .u-btn'], function(e){
          var value = $input._$val();
          if(e.type == 'click' || e.which==13){// enter
            if(!/\d+/.test(value)) return du.showError('只能输入数字')
            value = parseInt(value,10);
            var max = Math.min(MAX_MESSAGES, self.__page.__total);
            if(value > max){
              du.showError('跳转页数不能超过'+max);
            }else{
              if(value <1){
                du.showError('跳转页数不能小于1');
              }else{
                self._$setIndex(value)
                $input._$val('')
              }
            }
          }
        });
      }
    }
    /**
     * 控件销毁
     * 主要是解绑事件代理
     */
    proto.__destroy = function(){
      this.__supDestroy();
      this.$search._$off();
    }

    return _p;
})
