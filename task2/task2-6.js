$(function () {
    var data = JSON.parse(localStorage.getItem("sumPeople"));
    for (var i = 0; i < data.length; i++) {
        if (data[i].isdied == true) {
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
        if (data[i].isdied == true) {
            $(".change").css("background-color", "#83b09a")
        }
    }
    onkill($(".hbox"));
    function onkill(obj) {
        obj.click(function () {
            var index = obj.index($(this));
            data[index].isdied = true;
            data[index].iskilled = true;
            data[index].daynight = localStorage.getItem("killing_click");
            var save2 = JSON.stringify(data)
            localStorage.setItem("sumPeople", save2);
        })
    }
    var click = localStorage.getItem("confirm_click");
    if(click==null){
        click=0;
        localStorage.setItem("confirm_click",click);
    }
    $("#confirm").click(function () {
        console.log(click);
        click++;
        localStorage.setItem("confirm_click", click);
    })
})