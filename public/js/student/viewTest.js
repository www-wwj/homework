define([
	'base/element',
	'{pro}base/util.js',
	'{pro}base/regular.js',
  ],function(e,du,regular){
		var page;

		page ={
			__init:function(){
				this.__initData();
			},
			__initNode:function(){
				
			},
			__initData:function(){
				this.__edit = false;
				this.__index = 0;
				du._$requestByREST("/rest/student/testInfo", {
		            type:"json",
		            method:"get",
		            data: {id:du.getidTag()},
		            onerror : this.__cbGetData._$bind(this),
		            onload: this.__cbGetData._$bind(this)
		        });
			},
			__cbGetData: function(data){
				if(data.code ===200){
					this.__data = data.data;
					var questions = JSON.parse(data.data.question);
					for(var p in questions) {
						if(questions[p].type === 0){
							questions[p].reply = -1;
						}else{
							questions[p].reply = [];
							for(var q in questions[p].answer){
								questions[p].reply.push(false);
							}
						}
					}
					this.__data.question = questions;

					this.__initTemplate();
				}else{
					du.showError("error")
				}
			},
			__initTemplate:function(){
				var that = this;

				/**
				 * 自定义过滤方法
				 * transType 转化题库类型
				 * transAlphabet 数字转A B C
				 * transResult 显示自定义题目答案 
				 */	
				Regular.filter('transType', function( value ){
					   return du.transType(value);
					}).filter('transAlphabet', function( value ){
					   return du.transAlphabet(value);
					})
				
				var appRegular = Regular.extend({
				  template: '#main'
				});
				
				var component = new appRegular({
					/**
					 * 初始化参数 
					 * questions 题目内容
					 * index 初始题目偏移量 从第一题开始
					 * tab tab信息显示 0：题库基本信息 1：题目列表
					 * isNew 是否是新建 true/false
					 */
					data: {
						questions:this.__data,
						index:this.__index,
						begin:false
					},
					begin:function(){
						this.data.begin = true;
					},
					end:function(){
						var array = that.__checkData(this.data.questions),
							len = array.length,
							index="";
						if (len >0){
							for (var i = 0;i <len; i++) {
								index += array[i]+",";
							};
							index = index.slice(0,-1)+"题未答";
						}
						

						if (window.confirm(index +"确定提交试卷？")) {
				            
				        }
					}
				});
				component.$inject('#app'); 
			},
			__checkData:function(data){
				var array=[],
					flag,
					questions = data.question;
				for(var p in questions) {
					if(questions[p].type === 0){
						if(questions[p].reply === -1){
							array.push(parseInt(p)+1);
						}
					}else{
						flag = 0;
						for(var q in questions[p].reply){
							if(questions[p].reply[q] ===true){
								flag = 1;
								break;
							}
							
						}
						if(flag===0){
							array.push(parseInt(p)+1);
						}
					}
				}
				return array;
			}
		}   
	page.__init();
});
	
