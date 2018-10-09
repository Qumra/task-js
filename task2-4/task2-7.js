var data = JSON.parse(sessionStorage.getItem("sumPeople"));
var day = JSON.parse(sessionStorage.getItem('day'));
var step = sessionStorage.getItem("step");
var voted_list = JSON.parse(sessionStorage.getItem("voted_list"));
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
        var index = $(".user").index($(this));
        if (data[index].isdied == "true") {
            alert("此人已死，请选择活人")
        } else {
            $(this).addClass("red");
            sessionStorage.setItem('index', JSON.stringify(index))
        }
    })

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
            day++;
            step = "live";
            sessionStorage.setItem('day', JSON.stringify(day));
            sessionStorage.setItem('step', step);
            window.location = "task2-5.html";
        }
    }
    var progress = JSON.parse(sessionStorage.getItem("progress"));
    progress.kill = false;
    progress.say = false;
    progress.disscus = false;
    progress.vote = false;
    $("#tousi").click(function () {
        var index_v = sessionStorage.getItem('index');
        if (index_v == null) {
            alert("请选择要投票的对象")
        } else {
            data[index_v].isdied = "true";
            data[index_v].kmode = "voted";
            data[index_v].ktime = day;
            sessionStorage.setItem("sumPeople", JSON.stringify(data));
            voted_list.push(data[index_v]);
            sessionStorage.setItem("voted_list", JSON.stringify(voted_list));
            sessionStorage.setItem("progress", JSON.stringify(progress));
            sessionStorage.removeItem("index");
            judge(data);
        }

    })
})