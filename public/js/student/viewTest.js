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
					this.__limit = this.__data.time*60;
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
				 * transTime 剩余时间显示转换
				 */	
				Regular.filter('transType', function( value ){
					   return du.transType(value);
					}).filter('transAlphabet', function( value ){
					   return du.transAlphabet(value);
					}).filter('transTime',function(value){
						var minute = Math.floor(value/60),
							second = value % 60;
						minute = minute>=10 ? minute:'0'+minute;
						second = second>=10?second:'0'+second;
						return minute+'分'+ second+'秒';
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
						begin:false,
						limit:this.__limit
					},
					begin:function(){
						var that = this;
						this.data.begin = true;
						var timeInterval = setInterval(function(){
							if(that.data.limit ===0){
								clearInterval(timeInterval);
								that.post();
							}else{
								that.data.limit --;
								component.$update();
							}

						},1000)
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
			},
			 __doPost:function(data){
                du._$requestByREST("/rest/student/addResult", {
                    type:"json",
                    method:"post",
                    data:data,
                    onerror : this.__cbDoPost._$bind(this),
                    onload: this.__cbDoPost._$bind(this)
                });
            },
            __cbDoPost:function(data){
                if(data&&data.code ===200){
                    du.showSuccess("测试结束");
                    setTimeout(function(){location.href ="/result";},3000)
                }else{
                    du.showError(data.message||'网络异常')
                }
            }
		}   
	page.__init();
});
	
