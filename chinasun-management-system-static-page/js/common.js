$(function(){
    //进页面给页面添加高宽
    (function setBodyWithHeight(){
        var wWith = $(window).width();
        var wHeight = $(window).height();
        $(".view-body").css({"min-height":wHeight-80});
    })();

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


//话题详情-回复评论
function heightReply(){
    var ctdCommentWrap = $("#ctdCommentWrap");
    if(ctdCommentWrap.hasClass('replying')){
        ctdCommentWrap.removeClass('replying')
    }else{
        ctdCommentWrap.addClass('replying')
    }
}



//手机号校验
function validateTele(event){
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(event.target.value))){
        //console.log(event.target.value)
        var ThisEleParent  = event.target.parentNode;  //插入提示的父亲容器
        $(event.target).next(".red-note").html("");
        $(event.target).next(".red-note").html("手机号格式不正确!");
        return false;
    }else{
        $(event.target).next(".red-note").html("");
    }
}


//点击缩略图显示大图
function showSourceImg(event){
    var thisImgEle = $(event.target);
    var sourceUrl = $(thisImgEle).attr('src');
    console.log(sourceUrl);
    //获取页面尺寸
    var wWidthShowImg = $(window).width();
    var wHeightShowImg = $(window).height();
    console.log(wWidthShowImg);
    console.log(wHeightShowImg);
    //创建一个新的img对象，并获取图像宽高
    var sourceImgObj = new Image();
    sourceImgObj.src = sourceUrl;
    var imgWidthNatural = sourceImgObj.width;
    var imgHeightNatural = sourceImgObj.height;
    console.log(imgWidthNatural);
    console.log(imgHeightNatural);
    //点击按钮弹出层，同时在body底部加入mask


    /*$('body').append('<div class="source-img-wrap">' +
        '<img src="' +
        sourceUrl +
        '"> ' +
        '</div>');*/

}