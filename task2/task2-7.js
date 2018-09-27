$(function(){
    var data = JSON.parse(localStorage.getItem("sumPeople"));
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if(data[i].isdied==true){
            var modules = `  <div class="hbox">
            <div class="box">
                <div class="user change">${data[i].role}</div>
                <div class="num">${i + 1}号</div>
            </div>
            <img src="images/1.png" alt="">
    </div>`
        }else{
            var modules = `  <div class="hbox">
            <div class="box">
                <div class="user">${data[i].role}</div>
                <div class="num">${i + 1}号</div>
            </div>
            <img src="images/1.png" alt="">
    </div>`
        }
        $(".main").append(modules);
        if(data[i].isdied==true){
            $(".change").css("background-color","#83b09a")
        }
    }
    onvote($(".hbox"));
    function onvote(obj) {
        obj.click(function () {
            var index = obj.index($(this));
            data[index].isdied = true;
            data[index].isvoted = true;
            data[index].daysun=localStorage.getItem("voted_click");
            var save3 = JSON.stringify(data)
            localStorage.setItem("sumPeople",save3);
        })
    }
    var click = localStorage.getItem("tousi_click");
    if(click==null){
        click=0;
        localStorage.setItem("tousi_click",click);
    }
    $("#tousi").click(function(){
        console.log(click);
        click++;
        localStorage.setItem("tousi_click",click);
    })
})