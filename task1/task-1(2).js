// 1.获取九宫格中的小格子DOM
var box = document.getElementsByClassName("box");
var btn1 =document.getElementById('btn1');
var btn2 =document.getElementById('btn2');
var arr_color = ["#9d5167","#e2512a","#6be22a","#163107","#1cb45c","#a66824","#15c7c5","#8507c7","#c707b7"]
console.log (box);
var arr = Array.prototype.slice.call(box);
console.log (arr);
// 随机获取数组中任意个数的函数
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
  // 2.随机取得小格子中的3个格子
 console.log( getArrItem(arr, 3));
 console.log( getArrItem(arr_color, 3));
  // 设置定时器
  var timer = null;
  btn1.onclick = function(){
      clearInterval(timer);
      timer = setInterval(function(){
          for(var i=0;i<9;i++){
              arr[i].style.backgroundColor = '#EE9900';
          }
          var box_array = getArrItem(arr, 3);
          var colors = getArrItem(arr_color, 3);
          // 4.将随机出来的颜色值分别添加到3个格子的样式上
          for(var i=0;i<3;i++){
              box_array[i].style.backgroundColor = colors[i];
          }
      },2000)
     
  }
  btn2.onclick = function(){
      clearInterval(timer);
      for(var i=0;i<9;i++){
          arr[i].style.backgroundColor = '#EE9900';
      }
  }