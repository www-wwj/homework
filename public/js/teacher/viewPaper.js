define([
	'base/element',
	'{pro}base/util.js',
	'{pro}base/regular.js',
  ],function(e,du,regular){
		var page,
			emptyAnswer ={name:""},
			emptyQuestion = [
				{title:'',answer:[emptyAnswer],result:0,type:0},
				{title:'',answer:[emptyAnswer],type:1,result:[true]}
			];

		page ={
			__init:function(){
				this.__initData();
			},
			__initNode:function(){
				
			},
			__initData:function(){
				this.__edit = false;
				this.__index = 0;
				du._$requestByREST("/rest/teacher/getPaper", {
		            type:"json",
		            method:"get",
		            data: {id:du.getidTag()},
		            onerror : this.__cbGetData._$bind(this),
		            onload: this.__cbGetData._$bind(this)
		        });
			},
			__cbGetData: function(data){
				if(data.code ===200){
					this.__edit = false;
					this.__data = data.data;
					this.__data.question = JSON.parse(data.data.question);
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
						}else if(du._$isString(value)===true){
							return du.transAlphabet(Number(value));
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
						edit:this.__edit,
						tab:0,
					},
					// 切换单选多选
					changeTag:function(index){
						var data =	this.data.questions.question[index],
							type = data.type;
						data.answer = [du.clone(emptyAnswer)];
						if(type === "0"){
							this.data.questions.question[index].result = 0;
						}else{
							this.data.questions.question[index].result=[true];
						}
						
					}
				});
				component.$inject('#app'); 
			}
		}   
	page.__init();
});
	
