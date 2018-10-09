$(function () {
    let progressBar = $(".select input[type='range']");
    let max = 18, min = 4;
    progressBar.attr('max', max);
    progressBar.attr('min', min);
    linkage(4);
    $("#num").change(function () {
        let num = $(this).val();
        if (num < min || num > max) {
            // alert("玩家人数为" + min + "-" + max + "人,请输入合理范围")
            $(".mask").removeClass('hide')
                .addClass('db');
        } else {
            linkage(num);
        }
    });
    function linkage(m) {
        let killer = Math.floor(m / 3);
        let people = m - killer;
        $("#killer").html(killer);
        $("#people").html(people);
        let val = Math.floor((m - 4) / 14 * 100);
        progressBar.val(m);
        let percent = `${val}% 100%`;
        progressBar.css("background-size", percent);
        $("#num").val(m);
        var killer_arr = [];
        for(var i=0;i<killer;i++){
            var obj = {};
            obj.role = "杀手";
            obj.isdied = false;
            killer_arr.push(obj);
        };
        var people_arr = [];
        for(var i=0;i<people;i++){
            var obj = {};
            obj.role = "平民";
            obj.isdied = false;
            people_arr.push(obj);
        };
        var sum_arr = killer_arr.concat(people_arr);
        var disoder_arr = getArrItem(sum_arr, sum_arr.length);
        console.log(disoder_arr);
        var save1 = JSON.stringify(disoder_arr);
        console.log(save1);
        sessionStorage.setItem("sumPeople",save1);
    }
    $(".btnImg").click(function () {
        let num = $("#num").val();
        if ($(this).hasClass("add")) {
            num++;
        } else {
            num--;
        }
        if (num > 18) {
            num = 18;
            alert("最多人数为18人")
        }
        if (num < 4) {
            num = 4;
            alert("最少人数为4人")
        }
        linkage(num);
    });
    progressBar.change(function () {
        // console.log(progressBar.val());
        var slider = progressBar.val();
        linkage(slider);

    });

    $(".btns").children().click(function () {
        $(".mask").removeClass('db').addClass("hide");
    });

    function getArrItem(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
          temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来 
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组 
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
})
