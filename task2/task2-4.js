$(function () {
    var data =JSON.parse(localStorage.getItem("sumPeople"));
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
})