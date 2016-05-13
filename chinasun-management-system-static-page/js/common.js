$(function(){
    //进页面给页面添加高宽
    function setBodyWithHeight(){
        var wWith = $(window).width();
        var wHeight = $(window).height();
        $(".view-wrap").css({"min-height":wHeight});
        //$(".view-body").css({"min-height":wHeight-80});
        $(".wizard").css({"min-height":wHeight-96})
    }
    setBodyWithHeight();
    $(window).resize(function(){
        setBodyWithHeight()
    });

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

    //文本截断函数
    function ellipsisText(e,x){
        $(e).each(function(){
            var maxTextLen = x;
            var realLen = $(this).text();
            if(realLen.length > maxTextLen){
                var cutText = realLen.substring(0,maxTextLen);
                $(this).html(cutText + "...")
            }
        });
    }
    ellipsisText(".td-attach-img50text-right",27);
    ellipsisText(".limit-acolor a",20);

    //tabs
    $(function() {
        (function() {
            $('#tabNav > li > a').attr('class', '');
            $('#tabNav > li:first > a').attr('class', 'current');
            $('#tabContent > div').hide();
            $('#tabContent > div:first').fadeIn();

            $('#tabNav > li > a').on('click', function(e) {
                e.preventDefault();
                if ($(this).attr('class') == 'current') {
                    return
                } else {
                    $('#tabNav > li > a').attr('class', '');
                    $('#tabContent > div').hide();
                    $(this).attr('class', 'current');
                    $($(this).attr('name')).fadeIn()
                }
            })
        })();
    });

    //sidebar-none-or-display
    $("#btnFoldSidebar").click(function(){
        var viewBody = $(".view-body");
        if(viewBody.hasClass("view-sidebar-none")){
            viewBody.removeClass("view-sidebar-none");
            viewBody.addClass("view-sidebar-block");
            $(".view-main").css({"left":"180px"});
        }else{
            viewBody.removeClass("view-sidebar-block");
            viewBody.addClass("view-sidebar-none");
            $(".view-main").css({"left":"0"});
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


