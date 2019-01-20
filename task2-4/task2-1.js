

//    window.onload = function(){
//     var lis = document.getElementsByTagName("li");
//     var tab = document.getElementsByClassName("tab");
//     console.log(lis);
//     console.log(tab);
//     for(var i = 0; i<lis.length; i++){
//         lis[i].index = i;
//         lis[i].onclick = function(){
//             console.log(1111);
//             for(var j = 0; j<lis.length; j++){
//                 lis[j].className = "";
//                tab[j].className = "tab";
//             }
//             this.className = "active";
//             tab[this.index].classList.add("current");
//         }
//     }
//    }

var lis = $("ol li");
var pages = $(".pages");
var last = $(".last");
$(function () {
    console.log(pages);
    //隐式遍历
    lis.click(function () {
        // console.log(1111);
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        console.log(index);
        $(".tab").eq(index).addClass('current').siblings().removeClass('current');
    });
    // 向右点击
    pages.click(function () {
        var index = pages.index($(this));
        console.log(index);
        index++;
        lis.eq(index).addClass('active').siblings().removeClass('active');
        $(".tab").eq(index).addClass('current').siblings().removeClass('current');
    });
    // 向左点击
    last.click(function () {
        var index = last.index($(this))+1;
        console.log(index);
        index--;
        lis.eq(index).addClass('active').siblings().removeClass('active');
        $(".tab").eq(index).addClass('current').siblings().removeClass('current');
    })
    window.jQuery = window.$ = jQuery;
})