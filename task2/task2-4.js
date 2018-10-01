$(function () {
    var data = JSON.parse(sessionStorage.getItem("sumPeople"));
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var modules = `  <div class="hbox">
        <div class="box">
            <div class="user">${data[i].role}</div>
            <div class="num">${i + 1}号</div>
        </div>
</div>`
        $(".main").append(modules);
    }
    function init() {
        var temp = [];
        var day = 1;
        var killed_list=[];
        var voted_list=[];
        for (i = 0; i < data.length; i++) {
            temp.push({
                role: data[i].role,
                isdied: "false",
                number: i + 1,
                kmode: "notyet",
                ktime: "notyet"
            });
        }
        sessionStorage.setItem('sumPeople', JSON.stringify(temp));
        sessionStorage.setItem('day', JSON.stringify(day));
        sessionStorage.setItem("killed_list", JSON.stringify(killed_list));
        sessionStorage.setItem("voted_list", JSON.stringify(voted_list));
    }
    init();
    $(".btn").click(function(){
        window.location.href = "task2-5.html";
    })
})