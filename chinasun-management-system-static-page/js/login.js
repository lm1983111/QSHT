/**
 * Created by Administrator on 2016/5/11.
 */
$(function(){
    var loginWrap = $(".login-wrap");
    var loginWrapW = loginWrap.width();
    var loginWrapH = loginWrap.height();

    function setSize(){
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        $("body").css({"height":wHeight,"width":wWidth});
        loginWrap.css({"margin-left":-loginWrapW/2, "margin-top":-loginWrapH/2-30});
    }
    setSize();
    $(window).resize(function(){
        setSize()
    });
});

//登陆本地验证
function login(){
    var userNameValue = document.getElementById("userName").value;
    var pwdValue = document.getElementById("pwd").value;

    //如果用户名为空，弹出提示
    if(userNameValue == ""){
        //alert("用户名不能为空！");
        $("#errorWrap > div").css("display","none");
        $("#userNameErrorNote").css("display","block");
        return false;
    }

    //如果密码为空，弹出提示
    if( pwdValue == ""){
        //alert("密码不能为空！");
        $("#errorWrap > div").css("display","none");
        $("#pwdErrorNote").css("display","block");
        return false;
    }else{
        return true;
    }
}