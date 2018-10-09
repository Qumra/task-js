var data = JSON.parse(sessionStorage.getItem("sumPeople"));
var day = JSON.parse(sessionStorage.getItem('day'));
var killed_list = JSON.parse(sessionStorage.getItem("killed_list"));
var step = "deadSay"
sessionStorage.setItem('step', step);
console.log(data);
$(function () {
    for (var i = 0; i < data.length; i++) {
        if (data[i].isdied == "true") {
            var modules = `  <div class="hbox">
        <div class="box">
            <div class="user change">${data[i].role}</div>
            <div class="num">${i + 1}号</div>
        </div>
        <img src="images/1.png" alt="">
</div>`
        } else {
            var modules = `  <div class="hbox">
        <div class="box">
            <div class="user">${data[i].role}</div>
            <div class="num">${i + 1}号</div>
        </div>
        <img src="images/1.png" alt="">
</div>`
        }
        $(".main").append(modules);
        if (data[i].isdied == "true") {
            $(".change").css("background-color", "#83b09a")
        }
    }
    $(".user").click(function () {
        $(".user").removeClass("red");
        var index1 = $(".user").index($(this));
        if (data[index1].role == "杀手"&&data[index1].isdied == "false") {
            alert("自己人，请选择平民")
        } else if (data[index1].isdied == "true") {
            alert("此人已死，请选择活人")
        } else {
            $(this).addClass("red");
            sessionStorage.setItem('index1', JSON.stringify(index1))
        }
    })
    // 判断游戏是否结束函数
    function judge(list) {
        var people = 0, killer = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].role == "平民" && list[i].isdied == "false") {
                people++;
            } else if (list[i].role == "杀手" && list[i].isdied == "false") {
                killer++;
            }
        }
        if (killer > people || killer == 0) {
            alert("游戏结束")
            window.location = "task2-8.html";
        } else {
            window.location = "task2-5.html";
        }
    }

    $("#confirm").click(function () {
        var index_k = (sessionStorage.getItem('index1'));
        if (index_k == null) {
            alert("请选择要投票的对象")
        } else {
            data[index_k].isdied = "true";
            data[index_k].kmode = "killer";
            data[index_k].ktime = day;
            killed_list.push(data[index_k]);
            sessionStorage.removeItem("index1");
            sessionStorage.setItem("killed_list", JSON.stringify(killed_list));
            sessionStorage.setItem("sumPeople", JSON.stringify(data));
            judge(data);
        }
    })
})