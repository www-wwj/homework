define([
	'base/element',
	'{pro}base/util.js',
	'{pro}base/regular.js',
  ],function(e,du,regular){
		var page,
			emptyAnswer =[{name:"我是选项",correct:1}],
			emptyQuestion = {title:'输入题目名称',type:0,answer:emptyAnswer,result:[0]};

		page ={
			__init:function(){
				this.__initData();
				this.__initTemplate();
				this.__initNode();
			},
			__initNode:function(){
				
			},
			__initData:function(){
				if(location.pathname.indexOf('edit')!== -1){
					this.__edit = false;
					this.__data ={
						basic:{
							name:'终极必杀考试题',
							desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',
							type:1
						},
						question:[
							{title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}],result:[1,0,0]},
							{title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}],result:[0,0,1]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]},
							{title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}],result:[1,0,1,0]}
						]
					};
					this.__oldData = du.clone(this.__data);
					this.__isNew = false;
				}else{
					this.__edit = true;
					this.__data ={
						basic:{
							name:'',
							desc:'',
							type:0
						},
						question:[emptyQuestion]
					}
					this.__isNew = true;
				}	
				this.__index = 0;
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
					}).filter('transResult',function(array){
						var str ="";
						array.forEach(function(element,index,arr){
							if(element==1)
							str += du.transAlphabet(index+1)+"、";
						});
						return str.slice(0,-1);
					}
				)
				
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
						isNew:this.__isNew,
					},
					//编辑题库操作
					editBank:function(){
						this.data.edit = true;
					},
					//取消编辑题库操作
					cancelEditBank:function(){
						that.__data = du.clone(that.__oldData);
						this.data.questions = that.__data;
						this.data.edit = false;
					},
					// 切换单选多选
					changeTag:function(index){
						this.data.questions.question[index].answer = du.clone(emptyAnswer);
					},
					//增删问题选项
					addAnswer:function(index){
						if(this.data.questions.question[index].answer.length>8){
							du.showError("最多添加8个选项");
							return;
						}
						this.data.questions.question[index].answer.push(du.clone(emptyAnswer));
					},
					rmAnswer:function(index,offset){
						if(this.data.questions.question[index].answer.length<2){
							du.showError("至少添加一个选项");
							return;
						}
						this.data.questions.question[index].answer.splice(offset,1);
					},
					// 增删问题
					addQuestion:function(){
					  this.data.questions.question.push(du.clone(emptyQuestion));
					  this.data.index =  this.data.questions.question.length-1;
					},
					delQuestion:function(index){
						var total = this.data.questions.question.length;
						if(total == 1){
							this.data.questions.question[0] = du.clone(emptyQuestion);
						}else{
							if(index +1 == total){
								this.data.index --;
							}
							this.data.questions.question.splice(index,1);
						}
							
					}
				});
				component.$inject('#app'); 
			}
		}   
	page.__init();
});
	
