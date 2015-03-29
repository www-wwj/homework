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
                                this.data.selectBank.push(select[p]);
                                max += select[p].question.length;
                            }
                        }
                        this.data.show = 0;
                        this.data.max = max;
                    }
                })
                component.$inject('#app'); 
            }
            // __validate:function(data,cb){
            //  var basic = data.basic,
            //      questions = data.question;
            //  if(basic.name.trim() ===""){
            //      du.showError("题库名不能为空");
            //      return;
            //  }
            //  if(basic.desc.trim()===""){
            //      du.showError("题库描述不能为空");
            //      return;
            //  }
            //  try{
            //      questions.forEach(function(element,index,arr){
            //          var result = element.result,
            //              answer = element.answer;
            //          if(element.title.trim()===""){
            //              du.showError("第"+(index+1)+"题名称不能为空");
            //              throw BreakException;
            //          }
            //          try{
            //              answer.forEach(function(ele,offset,array){
            //                  if(ele.name.trim()===""){
            //                      du.showError("第"+(index+1)+"题"+"第"+(offset+1)+"选项名称不能为空");
            //                      throw BreakException;
            //                  }
            //              })
            //          }catch(e){
            //              throw BreakException;
            //          }
            //          if(u._$isArray(result)===true){
            //              for (var i = result.length - 1; i >= 0; i--) {
            //                  if(result[i]===true){
            //                      break;
            //                  }
            //              };
            //              if(i < 0){
            //                  du.showError("第"+(index+1)+"题"+"选项答案不能为空");
            //                  throw BreakException;
            //              }
            //          }
                        
            //      })
            //  }catch(e){
            //      return;
            //  }
            //  cb();
            // }
        }   
    page.__init();
});
    
