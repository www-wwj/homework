define([
	'base/element',
	'{pro}base/util.js',
	'{pro}base/regular.js',
  ],function(e,du,regular){
		var page,
			emptyData ={
				userName:"",
				userPwd:"",
				nickName:"",
				userType:2
			};

		page ={
			__init:function(){
				this.__initData();
			},
			__initData:function(){
				if(location.pathname.indexOf('edit')!== -1){
					du._$requestByREST("/rest/teacher/getBank", {
			            type:"json",
			            method:"get",
			            data: {id:du.getidTag()},
			            onerror : this.__cbGetData._$bind(this),
			            onload: this.__cbGetData._$bind(this)
			        });
				}else{
					this.__data = du.clone(emptyData);
					this.__initTemplate();
				}	
				
			},

			__cbGetData: function(data){
				if(data.code ===200){
					this.__edit = false;
					this.__data = data.data;
					this.__data.question = JSON.parse(data.data.question)
					this.__oldData = du.clone(this.__data);
					this.__isNew = false;
					this.__initTemplate();
				}else{
					du.showError("error")
				}
				
			},
			__initTemplate:function(){
				var that = this;
				
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
					data:this.__data,
					//保存
					saveUser:function(){
						var cb = function(){
							du.showSuccess("保存成功");
							setTimeout(function(){location.href="/userManage"},3000)
						};
						var data = {
		  					username:this.data.userName.trim(),
		  					password:this.data.userPwd.trim(),
		  					name:this.data.nickName.trim(),
		  					type:this.data.userType
		  				}
						that.__validate(data,cb)
					}
				});
				component.$inject('#app'); 
			},
			// 数据验证
			__validate:function(data,cb){
				if(data.username ==""){
					du.showError("用户名不能为空");
					return false;
				}
				if(data.password ==""){
					du.showError("密码不能为空");
					return false;
				}
				if(data.name ==""){
					du.showError("昵称不能为空");
					return false;
				}
				this.__doPost(data,cb);
			},

			/**
			 * 提交保存题库请求
			 * @param  {Function} cb 成功请求后的回调
			 * @return     
			 */
			__doPost:function(data,cb){
				du._$requestByREST("/rest/register", {
		            type:"json",
		            method:"post",
		            data: data,
		            onerror : this.__cbDoPost._$bind(this,cb),
		            onload: this.__cbDoPost._$bind(this, cb)
		        });	
			},
			__cbDoPost:function(cb,data){
				if(data&&data.code ===200){
					cb();
				}else{
					du.showError(data.message||'网络异常')
				}
			}
		}  
	page.__init();
});
	
