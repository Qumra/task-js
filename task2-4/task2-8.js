var data = JSON.parse(sessionStorage.getItem("sumPeople"));
var day = JSON.parse(sessionStorage.getItem('day'));
var voted_list = JSON.parse(sessionStorage.getItem("voted_list"));
var killed_list = JSON.parse(sessionStorage.getItem("killed_list"));
$(function () {
    var people = 0, killer = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].role == "平民" && data[i].isdied == "false") {
            people++;
        } else if (data[i].role == "杀手" && data[i].isdied == "false") {
            killer++;
        }
    }
    if (killer > people) {
        $(".icon").append(`<p>杀手胜利</p>`)

    } else if (killer == 0) {
        $(".icon").append(`<p>平民胜利</p>`)
    }
    $(".txt").append(`<p>杀手：${killer}人 &#12288&#12288&#12288&#12288平民：${people}人</p>`);

    let hanzi = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5:"五",
        6:"六",
        7:"七",
        8:"八",
        9:"九",
        10:"十",
    }

    for (var i = 1; i < day; i++) {
        var model = `<div class="list-info">
        <div class="info">
            <p class="title"><span class="tt">第${hanzi[i]}天</span></p>
            <p>晚上：${killed_list[i - 1].number}号被杀手杀死，${killed_list[i - 1].number}号是${killed_list[i - 1].role}</p>
            <p>白天：${voted_list[i - 1].number}号被全民投票杀死，${voted_list[i - 1].number}号是${voted_list[i - 1].role}</p>
        </div>
    </div>`
        $(".section2").append(model);
        if (day > 1 && killed_list.length == day && voted_list.length == day) {
            var modules = `<div class="list-info">
            <div class="info">
                <p class="title"><span class="tt">第${hanzi[day]}天</span></p>
                <p>晚上：${killed_list[day - 1].number}号被杀手杀死，${killed_list[day - 1].number}号是${killed_list[day - 1].role}</p>
                <p>白天：${voted_list[day - 1].number}号被全民投票杀死，${voted_list[day - 1].number}号是${voted_list[day - 1].role}</p>
            </div>
        </div>`
            $(".section2").append(modules);
        } else if (day > 1 && killed_list.length == day && voted_list.length < day){
            var modules = `<div class="list-info">
            <div class="info">
                <p class="title"><span class="tt">第${hanzi[day]}天</span></p>
                <p>晚上：${killed_list[day - 1].number}号被杀手杀死，${killed_list[day - 1].number}号是${killed_list[day - 1].role}</p>
            </div>
        </div>`
            $(".section2").append(modules);
        }
    }
    
        $(".btn1").click(function () {
            sessionStorage.clear();
            window.location.href = "task2-1.html"
        })
})