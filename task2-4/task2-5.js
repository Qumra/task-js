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
    $(".btn1").click(function(){
        sessionStorage.clear();
        window.location.href = "task2-1.html"
    })

})
//状态机
// $(document).ready(function () {
//     var fsm = {
//         //   初始化
//         state: JSON.parse(localStorage.getItem(('step'))),
//         timetokill: function () {
//             switch (fsm.state) {
//                 case "none":
//                     console.log(fsm.state);
//                     fsm.state = "kill";
//                     $("#killing").addClass("actived");
//                     localStorage.setItem('step', JSON.stringify(fsm.state));
//                     window.location.href = "task2-6.html";
//                     break;
//                 case "kill":
//                     alert("请勿重复点击");
//                     break;
//                 case "speak":
//                 case "vote":
//                     alert("请按照步骤来");
//                     break;
//             }
//         },
//         timetospeak: function () {
//             switch (fsm.state) {
//                 case "kill":
//                     fsm.state = "speak";
//                     for (var i = 0; i < data.length; i++) {
//                         if (data[i].role == "平民" && data[i].iskilled == true && data[i].days == day) {
//                             var info = `<p>${data[i].num}号被杀手杀死，真实身份是${data[i].role}</p>`;
//                             $(".am").append(info);
//                         }
//                     }
//                     $("#deadSay").addClass("actived");
//                     $('.mask').removeClass("hide");
//                     $('#txt').text("请死者亮明身份并发表遗言");
//                     $(".btns").children().click(function () {
//                     $(".mask").removeClass('db').addClass("hide");
//                     })
//                     break;
//                 case "speak":
//                     alert("请勿重复点击");
//                     break;
//                 case "none":
//                 case "vote":
//                     alert("请按照步骤来");
//                     break;
//             }
//         },
//         timetotalk: function () {
//             switch (fsm.state) {
//                 case "speak":
//                     fsm.state = "vote";
//                     $("#playSay").addClass("actived");
//                     $('.mask').removeClass("hide");
//                     $('#txt').text("请玩家依次发言");
//                     $(".btns").children().click(function () {
//                     $(".mask").removeClass('db').addClass("hide");
//                     })
//                     break;
//                 case "none":
//                 case "kill":
//                     alert("请按照步骤来");
//                     break;
//                 case "vote":
//                     alert("请勿重复点击");
//                     break;
//             }
//         },
//         timetovote: function () {
//             switch (fsm.state) {
//                 case "vote":
//                     fsm.state = "none";
//                     $("#vote").addClass("actived");
//                     window.location.href = "task2-7.html";
//                     break;
//                 case "speak":
//                 case "kill":
//                 case "none":
//                     alert("请按照步骤来");
//                     break;
//             }
//         }


//     };
// $("#killing").click(function () {
//     if ($(this).hasClass("actived")) {
//         alert("已经点击过了~")
//     } else {
//         fsm.timetokill();
//     }
// });
// $("#deadSay").click(function () {
//     if ($(this).hasClass("actived")) {
//         alert("已经点击过了~")
//     } else {
//         fsm.timetospeak();
//     }
// });
// $("#playSay").click(function () {
//     if ($(this).hasClass("actived")) {
//         alert("已经点击过了~")
//     } else {
//         fsm.timetotalk();
//     }
// });
// $("#vote").click(function () {
//     if ($(this).hasClass("actived")) {
//         alert("已经点击过了~")
//     } else {
//         fsm.timetovote();
//     }
// });

// })
