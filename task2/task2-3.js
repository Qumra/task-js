$(function () {
    var data =  JSON.parse(sessionStorage.getItem("sumPeople"));
    console.log(data);
    var clicks = 0;
    $(".btn").click(function () {
        clicks++;
        console.log(clicks);
        if (clicks < 2 * data.length - 1) {
            if (clicks % 2 !== 0) {
                $("#card1").hide();
                $(".send").show();
                $("#role").html(`角色:${data[(clicks - 1) / 2].role}`);
                $(".circle").html(`${(clicks + 1) / 2}`);
                $(".btn a").html(`隐藏并传递给${(clicks + 1) / 2 + 1}号`);
            } else {
                $("#card1").show();
                $(".send").hide();
                $(".circle").html(`${(clicks + 2) / 2}`);
                $(".btn a").html(`查看${(clicks + 2) / 2}号`);
            }
        }else if(clicks = 2 * data.length - 1){
            $("#card1").hide();
            $(".send").show();
            $("#role").html(`角色:${data[(clicks - 1) / 2].role}`);
            $(".circle").html(`${(clicks + 1) / 2}`);
            var url ="<meta http-equiv=refresh content=1;url='task2-4.html'></meta>"
            $(".btn a").html("法官查看").append(url);
        }
    })

})