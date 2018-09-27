// var daily = new stateMachine({

//     init: 'kill',

//     transitions: [

//         { name: 'kill' , from: 'killing',  to: 'deadSay' },

//         { name: 'identify',  from: 'deadSay',  to: 'playSay' },

//         { name: 'disscus',  from: 'playSay',  to: 'voted' },

//         { name: 'vote',  from: 'voted',  to: 'voteDead' }

//     ],
//     methods: {

//         onkill: function(obj) {
//             obj.click(function () {
//                 var index = obj.index($(this));
//                 data[index].isdied = true;
//             })
//             console.log(data);
//         },

//         onidentify: function () { 'identifing ' },

//         ondisscuss: function () { ' discussing' },

//         onvote: function () { ' vote one people' },

//     }

// })
$(function () {
    var data = JSON.parse(localStorage.getItem("sumPeople"));
    console.log(data);
    var con_clicks = localStorage.getItem("confirm_click");
    console.log(con_clicks);
    if (con_clicks > 0) {
        $("#killing").addClass("actived");
        for (var i = 0; i < data.length; i++) {
            if ( data[i].role =="平民"&& data[i].iskilled == true && data[i].days == con_clicks) {
                var info = `<p>${i + 1}号被杀手杀死，真实身份是${data[i].role}</p>`;
                $(".am").append(info);
            }
        }
    }
    var times = 0;
    $("#killing").click(function () {
        times++;
        localStorage.setItem("killing_click", times);
        var url = "<meta http-equiv=refresh content=1;url='task2-6.html'></meta>"
        $(this).append(url);

    })
    $("#deadSay").click(function () {
        $('.mask').removeClass("hide");
        $('#txt').text("请死者亮明身份并发表遗言");
        $(this).addClass("actived");
    })
    $(".btns").children().click(function () {
        $(".mask").removeClass('db').addClass("hide");
    });
    $("#playSay").click(function () {
        $('.mask').removeClass("hide");
        $('#txt').text("玩家依次发言");
        $(this).addClass("actived");
    })
    var vtimes =0;
    $("#voted").click(function () {
        vtimes++;
        localStorage.setItem("voted_click", vtimes);
        var url = "<meta http-equiv=refresh content=1;url='task2-7.html'></meta>"
        $(this).append(url);
        $(this).addClass("actived");
    });
    let hanzi ={
    1:"一",
    2:"二",
    3:"三",
    4:"四"
}
function showDays(num){
    var day = `<li>第${hanzi[num]}天</li>`;
    $(".contain .days").append(day);
}
    var adddays = localStorage.getItem("tousi_click");
    if(adddays==null){
        adddays=1;
        localStorage.setItem("tousi_click",adddays);
    }
    for(i=1;i<=adddays;i++){
        showDays(i);
    }
})