NEJ.define([
	'util/tab/tab',
	'base/element',
    '{pro}base/util.js'
  ],function(tab,e,du){
  		var page;
  		page ={
  			__init:function(){
  				this.__initNode();
  				this.__initData();
  				this.__initTab();
  			},
  			__initNode:function(){
  				this.__basic = e._$get("basic");
  				this.__questions = e._$get('questions');
  			},
  			__initData:function(){

  			},
  			/**
  			 * 初始化tab控件
  			 * @return {void} 
  			 */
  			__initTab:function(){
  				this.__tab = tab._$$Tab._$allocate({
			        list:e._$getChildren('tab'),
			        index:0,
			        selected:"z-crt",
			        onchange:function(event){
			        	var index = event.index;
			        	this.__showContent(index);
		    			
			        }._$bind(this)
			    });
  			},
  			/**
  			 * 显示切换标签后的内容
  			 * @param  {int} flag 0：显示基本信息 1:显示题目
  			 * @return {void}     
  			 */
  			__showContent:function(flag){
  					this.__basic.style.display = (flag===0)?"":"none";
  					this.__questions.style.display =(flag===1)?"":"none";
  			}
  		}	
    page.__init();
});
	
