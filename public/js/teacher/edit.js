NEJ.define([
	'util/tab/tab',
	'base/element',
    '{pro}base/util.js',
    '{pro}base/regular.js'
  ],function(tab,e,du,regular){
  		var page,
            emptyAnswer =[{name:"我是选项",correct:1}];
  		page ={
  			__init:function(){
                this.__initData();
                this.__initTemplate();
  				this.__initNode();
  				this.__initTab();
  			},
  			__initNode:function(){
  				this.__basic = e._$get("basic");
  				this.__questions = e._$get('questions');
                
  			},
  			__initData:function(){
                this.__data ={
                    basic:{
                        name:'终极必杀考试题',
                        desc:'要是能重来 我要选李白，几百年前做的好坏 没那么多人猜',
                        type:1
                    },
                    question:[
                        {qid:1,title:'这题正确答案是A',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:0}]},
                        {qid:1,title:'这题正确答案是2',type:0,answer:[{name:"我是1选项",correct:0},{name:"我是2选项",correct:1},{name:"我是3选项",correct:0}]},
                        {qid:1,title:'这题正确答案是3',type:0,answer:[{name:"我是1选项",correct:1},{name:"我是2选项",correct:0},{name:"我是3选项",correct:1},{name:"我是4选项a",correct:0}]},
                    ]
                }
                this.__index = 0;
  			},
            __initTemplate:function(){
                var appRegular = Regular.extend({
                  template: '#main'
                });

                // initialize component then $inject to #app's  bottom
                var component = new appRegular({
                    data: {questions:this.__data,index:this.__index},
                    changeTag:function(index){
                        this.data.questions.question[index].answer = emptyAnswer;
                    }
                });
                component.$inject('#app'); 
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
	
