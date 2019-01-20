var day = JSON.parse(sessionStorage.getItem(('day')));
var data = JSON.parse(sessionStorage.getItem("sumPeople"));
var step = sessionStorage.getItem("step");
var voted_list = JSON.parse(sessionStorage.getItem("voted_list"));
var killed_list = JSON.parse(sessionStorage.getItem("killed_list"));
console.log(data);

if (step == undefined) {
    step = 'live';
} else if (step == 'deadSay') {
    step = 'deadSay';
} else if (step == 'live') {
    step = 'live';
}
var fsm = new StateMachine({
    init: step,
    transitions: [
        { name: 'kill', from: 'live', to: 'deadSay' },
        { name: 'say', from: 'deadSay', to: 'playSay' },
        { name: 'disscus', from: 'playSay', to: 'voted' },
        { name: 'vote', from: 'voted', to: 'live' }
    ]
});
var status_init = {
    kill: false,
    say: false,
    disscus: false,
    vote: false
}
var progress = JSON.parse(sessionStorage.getItem("progress"));
if (!progress) {
    progress = status_init;
}
$(function () {
    if (progress.kill) {
        $("#killing").addClass("actived");
        for (var i = 0; i < data.length; i++) {
            if (data[i].kmode == "killer" && data[i].isdied == "true" && data[i].ktime == day) {
                var info = `<p>${data[i].number}号被杀手杀死，真实身份是${data[i].role}</p>`;
                $(".am").append(info);
            }
        }
    }
    if (progress.say) {
        $("#deadSay").addClass("actived");
    }
    if (progress.disscus) {
        $("#playSay").addClass("actived");
    }
    if (progress.vote) {
        $("#voted").addClass("actived");
    }
    $("#killing").click(function () {
        if (fsm.is('live')) {
            $("#killing").addClass("actived");
            fsm.kill();
            window.location.href = "task2-6.html";
            progress.kill = true;
            sessionStorage.setItem('progress', JSON.stringify(progress));
        }
        else {
            alert("请按照步骤来");
            console.log(fsm.state)
        }
    });
    $("#deadSay").click(function () {
        if (fsm.is('deadSay')) {
            $("#deadSay").addClass("actived");
            $('.mask').removeClass("hide");
            $('#txt').text("请死者亮明身份并发表遗言");
            $(".btns").children().click(function () {
                $(".mask").removeClass('db').addClass("hide");
            })
            fsm.say();
            progress.say = true;
            sessionStorage.setItem('progress', JSON.stringify(progress));
        }
        else {
            alert("请按照步骤来");
            console.log(fsm.state);
        }
    });
    $("#playSay").click(function () {
        if (fsm.is('playSay')) {
            $("#playSay").addClass("actived");
            $('.mask').removeClass("hide");
            $('#txt').text("请玩家依次发言");
            $(".btns").children().click(function () {
                $(".mask").removeClass('db').addClass("hide");
            })
            fsm.disscus();
            progress.disscus = true;
            sessionStorage.setItem('progress', JSON.stringify(progress));
        }
        else {
            alert("请按照步骤来");
            console.log(fsm.state);
        }
    });
    $("#voted").click(function () {
        if (fsm.is('voted')) {
            $("#voted").addClass("actived");
            fsm.vote();
            window.location = "task2-7.html";
            progress.vote = true;
            sessionStorage.setItem('progress', JSON.stringify(progress));
        }
        else {
            alert("请按照步骤来");
            console.log(fsm.state);
        }
    });
})

$(function () {
    let hanzi = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九",
        10: "十",
    }
    function showDays(num) {
        var day;
        if(num>=2){
            for(var i= 0;i <killed_list.length;i++){
                if(killed_list[i].ktime ==num-1){
                    var k =`<p>${killed_list[i].number}号被杀手杀死，它的身份是${killed_list[i].role}</p>`
                }
            }
            for(var j= 0;j <voted_list.length;j++){
                if(voted_list[j].ktime==num-1){
                    var v = `<p>${voted_list[j].number}号被投死，他的身份是${voted_list[j].role}</p>`
                }
                
            }
            day = `<div class="mes">${k}${v}</div><li>第${hanzi[num]}天</li>`
        }else{
            day = `<li>第${hanzi[num]}天</li>`;
        }    
        $(".contain .days").append(day);
    }

    for (i = 1; i <= day; i++) {
        showDays(i);
    }
    $("li").click(function(){
        $(this).next().toggle()
    })
    $(".btn1, #close").click(function(){
        sessionStorage.clear();
        window.location.href = "task2-1.html"
    })
    $("#back").click(function(){
        sessionStorage.removeItem("day");
        sessionStorage.removeItem("step");
        sessionStorage.removeItem("killed_list");
        sessionStorage.removeItem("voted_list");
        sessionStorage.removeItem("progress");
        window.location.href = "task2-4.html"
    })
})

