define([
    'base/element',
    '{pro}base/util.js',
    '{pro}base/regular.js',
  ],function(e,du,regular){
        var page;

        page ={
            __init:function(){
                this.__select ={};
                this.__initData();
                
            },
            __initData:function(){
                du._$requestByREST("/rest/teacher/questionsList", {
                    type:"json",
                    method:"get",
                    onerror : this.__cbLoadList._$bind(this),
                    onload: this.__cbLoadList._$bind(this)
                });
            },
            __cbLoadList : function(json){
                var result = json && json.result;
                this.__data =result.list;
                this.__initTemplate();
            },
            __initTemplate:function(){
                var that = this;
                Regular.filter('transType', function( value ){
                   return du.transType(value);
                })
                var appRegular = Regular.extend({template: '#main'});
  
                var component = new appRegular({
                    data: {
                        bank:this.__data,
                        show :0,
                        select:[],
                        selectBank:[],
                        max:0,
                    },
                    changeType:function(){
                        this.data.selectBank=[];
                        this.data.select=[];
                        this.data.max = 0;
                        that.__select ={};
                    },
                    addBank:function(flag,data){
                        if(flag==true){
                            that.__select['data-'+data.id] = data;
                        }else{
                            if(that.__select['data-'+data.id]){
                                that.__select['data-'+data.id] = null;
                            }
                        }
                    },
                    saveBank:function(){
                        var p,
                            select = that.__select,
                            max = 0;
                        this.data.selectBank = [];
                        for(p in select){
                            if(select.hasOwnProperty(p)){
                                select[p].question = JSON.parse(select[p].question);
                                this.data.selectBank.push(select[p]);
                                max += select[p].question.length;
                            }
                        }
                        this.data.show = 0;
                        this.data.max = max;
                    },
                    savePaper:function(){
                        that.__validate(this.data);
                    }
                })
                component.$inject('#app'); 
            },
            //验证提交信息
            __validate:function(data){
                var paper = {};
                if(!data.name||data.name.trim()===""){
                    du.showError("试卷名称不能为空");
                    return;
                }
                paper.name = data.name;
                if(!data.desc||data.desc.trim()===""){
                    du.showError("试卷描述不能为空");
                    return;
                }
                paper.desc = data.desc;
                if(data.type==-1){
                    du.showError("请选择试卷类别");
                    return;
                }
                paper.type = data.type;
                paper.time = data.time;
                if(data.selectBank.length === 0){
                     du.showError("请选择题库");
                     return;
                }
                paper.question = data.selectBank;
                data.total = parseInt(data.total)
                if(!data.total||data.total<=0||data.total>data.max){
                    du.showError("设置题数不正确");
                    return;
                }
                paper.total = data.total;
                this.__compositionPaper(paper);

            },
            __compositionPaper:function(data){
                var array=[];
                for (var i = data.question.length - 1; i >= 0; i--) {
                    for (var j = data.question[i].question.length - 1; j >= 0; j--) {
                        array.push(data.question[i].question[j]);
                    };
                };
                data.question = JSON.stringify(du.getArrayItems(array,data.total))
                this.__doSave(data);
            },
            __doSave:function(data){
                du._$requestByREST("/rest/teacher/addPaper", {
                    type:"json",
                    method:"post",
                    data:data,
                    onerror : this.__cbDoSave._$bind(this),
                    onload: this.__cbDoSave._$bind(this)
                });
            },
            __cbDoSave:function(data){
                if(data&&data.code ===200){
                    du.showSuccess("添加成功");
                    location.href ="/paper";
                }else{
                    du.showError(data.message||'网络异常')
                }
            }
        }   
    page.__init();
});
    
