$(function(){
    //获取并添加左侧sidebar-trans高度，为了添加height0过度动画
    $(".sidebar-trans").each(function(){
        var height = $(this).height();
        $(this).css({"height":height})
    });

    //点击当前sidebar-title给他的兄弟ul添加height0样式
    $(".sidebar-title").on("click",function(){
        if($(this).next().hasClass("height0")){
            $(this).next().removeClass("height0");
            $(this).parent().removeClass("sidebar-nav-flod");
        }else{
            $(this).next().addClass("height0");
            $(this).parent().addClass("sidebar-nav-flod");
        }
    });

});