/**
 * Created by Administrator on 2016/3/22.
 */
var myApp = angular.module('myApp',[]);

//购物车 加
myApp.directive('addNum',function(){
    return{
        link:function(scope,element,attr){
            element.bind('click',function(){
                angular.forEach(scope.dataList,function(data,index,array){
                    //点击加一
                    if(attr.items == data.items){
                        data.num = parseInt(data.num) + 1;
                        scope.allPrices();
                        scope.$apply()
                    }
                })
            })
        }
    }
});

//购物车 减
myApp.directive('reduceNum',function(){
    return{
        link:function(scope,element,attr){
            element.bind('click',function(){
                var This = this;
                angular.forEach(scope.dataList,function(data,index,array){
                    //点击减一
                    if(attr.items == data.items){
                        if(data.num <= 1){
                            if(confirm("是否删除该商品？")){
                                data.num = 0;
                                $(This).siblings('input').val(0);
                                scope.$apply();
                                scope.dataList.splice(index, 1);
                                $(This).parents('tr').remove();
                            }
                        }else{
                            data.num = parseInt(data.num) - 1;
                        }
                        scope.allPrices();
                        scope.$apply()
                    }
                })
            })
        }
    }
});

//单选
myApp.directive('oneCheck',function(){
    return function(scope,element,attr){
        element.click(function(){
            var This = this;
            angular.forEach(scope.dataList,function(data,index,array){
                if(attr.items == data.items){
                    var isChick = $(This).prop('checked');
                    data.Bol = isChick;
                    scope.allPrices();
                    scope.$apply()
                }
            })
        })
    }
});

//购物车控制器
myApp.controller('cartCtrl',['$scope','$http',function($scope,$http){
    //取数据
    $http({
        method:'GET',
        url:'package.json'
    }).success(function(data,status,headers,config){
        console.log('success...');
        console.log(data);
        $scope.dataList=data;
    }).error(function(data,status,headers,config){
        console.log('error....')
    });

    //总价格计算
    $scope.allPrices = function(){
        $scope.allprice = 0;
        angular.forEach($scope.dataList,function(data,index,array){
            data.price = data.num * data.oneprice;
            if(data.Bol == true){
                $scope.allprice += parseInt(data.price);
            }
        });
        return $scope.allprice;
    };

    //post数据到服务器
    $scope.postOrder = function() {
        if($scope.allprice > 0){
            //console.log($scope.dataList);  //打印改变后的json数据流
            //console.log($scope.allprice);  //打印生成的总价格

            //先定义一个空数组，获取改变了的数据items,num插入到这个空数组（这个数组就是将要传给服务器的数据）
            var arrayPostOrderObj = new Array();
            angular.forEach($scope.dataList,function(data,index,array){
                if(data.Bol == true){  //循环每一项，如果该项被选择
                    //console.log(data.Bol);  //打印该项的Bol
                    //console.log(data.items);  //打印该项的items
                    //console.log(data.num);  //打印该项改变后的num

                    arrayPostOrderObj.push(data.Bol,data.num,data.items);
                    console.log(arrayPostOrderObj);
                }
            });

            //上传数据
            /*$http({
                method:'post',
                url:'post.php',
                data:$scope.dataList
            }).success(function(){
                alert('数据上传成功')
            }).error(function(){
                alert('上传失败')
            })*/
        }else{
            return false;
        }
    };
    //post数据到服务器结束
}]);
