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
        //console.log('success...');
        //console.log(data);
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
        //定义传给服务器的数组为空，从数据流中获取改变了的data并插入到空数组
        var arrayPostOrderObj = [];
        if($scope.allprice > 0){

            //获取上传数据
            angular.forEach($scope.dataList,function(data,index,array){
                if(data.Bol == true){  //循环每一项，如果该项被选择
                    this.push(data); //this等于arrayPostOrderObj空数组
                }
            },arrayPostOrderObj);
            console.log(arrayPostOrderObj);

            //执行上传数据
            $http({
                method:'post',
                url:'',
                data: [arrayPostOrderObj, $scope.allprice]
            }).success(function(){
                console.log('数据上传成功');
            }).error(function(){
                console.log('上传失败');
            })
        }else{
            return false;
        }
    };
    //post数据到服务器结束
}]);

