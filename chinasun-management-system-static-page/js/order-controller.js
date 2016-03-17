/**
 * Created by Administrator on 2016/3/17.
 */
var app = angular.module("orderApp",[]);
app.controller("orderController", function ($scope) {
   $scope.dataList=[
       {Bol:'false',name:'洗衣机',num:'1',items:'0',oneprice:'100',price:''},
       {Bol:'false',name:'热水器',num:'1',items:'0',oneprice:'200',price:''},
       {Bol:'false',name:'拖拉机',num:'1',items:'0',oneprice:'1000',price:''}
   ]
});

//购物车 加
app.directive("myAdds",function(){
   return{
       link: function(scope,element,attr){
           element.click(function(){
               var This = this
               angular.forEach(scope.dataList,function(data,index,array){
                   if(attr.items == data.items){

                   }
               })
           })
       }
   }
});