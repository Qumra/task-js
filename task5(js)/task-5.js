

// alert('请求已发送，请等待响应...');
window.onload = function () {
    // var name = document.getElementById("username").value;
    // var pwd = document.getElementById("pwd").value;
    var name='admin';
    var pwd='123456';
    var btn = document.getElementById("btn");
    name.onblur = function () {
        var RegExp = /^a-zA-Z+$/;  //用户名为英文字母
        if (name == "") {
            alert("请输入用户名")
        } else if (!RegExp.test(name)) {
            alert("请输入正确的用户名格式");
        }
    }
    pwd.onblur = function () {
        var RegExp = /^\d{6,16}$/  //密码为数字
        if (pwd == "") {
            alert("请输入密码")
        } else if (!RegExp.test(pwd)) {
            alert("密码格式不正确")
        }
    }
    btn.onclick = function () {
        var xhr = new XMLHttpRequest(); // 新建XMLHttpRequest对象
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
        xhr.onreadystatechange = function () { // 状态发生变化时，函数被回调
            if (xhr.readyState === 4) { // 成功完成
                // 判断响应结果:
                if (xhr.status === 200) {
                    // 成功，通过responseText拿到响应的文本:
                    return success(xhr.responseText);
                } else {
                    // 失败，根据响应码判断失败原因:
                    return fail(xhr.status);
                }
            } else {
                // HTTP请求还在继续...
            }
        }
        // 发送请求:
        var url = `http://dev.admin.carrots.ptteng.com/a/login?name=${name}&pwd=${pwd}`; //我们这里的客户端代码运行在localhost:8008
        xhr.open('POST', url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //请求头部，需要服务端同时设置
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("");

        function fail(code) {
           alert(`Error code:  ${code}`)
        }
        function success(text) {
            var textarea = document.getElementById('test-response-text');
            textarea.value = text;
        }
    }
}