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
				du._$requestByREST("/rest/student/resultInfo", {
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
					}).filter('transResult',function(value){
						// 单选传入int 多选传数组
						if(du._$isNumber(value)===true){
							return du.transAlphabet(value)
						}else{
							var str ="";
							value.forEach(function(element,index,arr){
								if(element===true){
									str += du.transAlphabet(index)+"、";
								}
							});
						return str.slice(0,-1);

						}
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
						tab:0
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
				            this.post();
				        }
					},
					post:function(){
						var data = du.clone(this.data.questions);
						data.question =JSON.stringify(data.question);
						that.__doPost(data);
					}
				});
				component.$inject('#app'); 
			}
		}   
	page.__init();
});
	
