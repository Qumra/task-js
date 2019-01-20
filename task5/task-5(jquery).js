$(function(){
    $("#username").blur(function(){
        var RegExp = /^[A-Za-z0-9]{5,10}$/;  //用户名为英文字母
        if ($(this).val() == "") {
            $("#info").html("请输入用户名")
        } else if (!RegExp.test($(this).val())) {
            $("#info").html("请输入正确的用户名格式")
        }else {
            $("#info").html("")
        }
    });
    $("#pwd").blur(function(){
        var RegExp = /^\d{6,16}$/  //密码为数字
        if ($(this).val() == "") {
            $("#info").html("请输入密码") 
        } else if (!RegExp.test($(this).val())) {
            $("#info").html("密码格式不正确") 
        }else {
            $("#info").html("")
        }
    })
    $("#btn").click(function(){
        var name = $("#username").val();
        var pwd = $('#pwd').val();
        $.ajax ({
            url :'/carrots-admin-ajax/a/login',
            type:'POST',
            dataType:'json',
            data:{'name':name,'pwd':pwd},
            success:function(data){
                if(data.code==0){
                    alert("跳转新页面")
                    // window.location ="../task6/view/task6-1.html"
                }else {
                    alert(data.message)
                } 
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest,textStatus);
                alert(textStatus+":"+XMLHttpRequest.status+XMLHttpRequest.statusText);
            }
        })
    })
})