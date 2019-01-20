window.onload = function () {
    var name = document.getElementById("username");
    var pwd = document.getElementById("pwd");
    var info = document.getElementById("info");
    // var name='admin';    
    // var pwd='123456';
    var btn = document.getElementById("btn");
    name.onblur = function () {
        var RegExp = /^[A-Za-z0-9]{5,10}$/;  //用户名为英文字母
        if (name.value == "") {
            info.innerHTML= "请输入用户名"
        } else if (!RegExp.test(name.value)) {
            info.innerHTML= "请输入正确的用户名格式"
        }else {
            info.innerHTML= ""
        }
    }
    pwd.onblur = function () {
        var RegExp = /^\d{6,16}$/  //密码为数字
        if (pwd.value == "") {
            info.innerHTML= "请输入密码"
        } else if (!RegExp.test(pwd.value)) {
            info.innerHTML= "密码格式不正确"
        }else {
            info.innerHTML= ""
        }
    }
    btn.onclick = function () {
        var xhr = new XMLHttpRequest(); // 新建XMLHttpRequest对象
        // xhr.responseType = 'application/json'
        xhr.onreadystatechange = function () { // 状态发生变化时，函数被回调
            if (xhr.readyState === 4) { // 成功完成
                // 判断响应结果:
                if (xhr.status === 200) {
                    // 成功，通过responseText拿到响应的文本:
                    console.log(xhr.responseText);
                    if(JSON.parse(xhr.responseText).code==0){
                        alert("跳转到新页面")
                    }else {
                        alert(JSON.parse(xhr.responseText).message)
                    }
                } else {
                    // 失败，根据响应码判断失败原因:
                    return fail(xhr.status);
                }
            } else {
                // HTTP请求还在继续...
            }
        }
        // 发送请求:
        var url = "/carrots-admin-ajax/a/login";
        xhr.open('POST', url, true);
        // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //请求头部，需要服务端同时设置
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`name=${name.value}&pwd=${pwd.value}`);

        function fail(code) {
           alert(`Error code:  ${code}`)
        }
    }
}