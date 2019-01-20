angular.module("myApp")
 // 类型过滤器
  .filter('type', function () { //可以注入依赖
    return function (type) {
        var output;
        switch (type) {
            case 0:
                output = "首页banner";
                break;
            case 1:
                output = "找职位banner";
                break;
            case 2:
                output = "找精英banner";
                break;
            case 3:
                output = "行业大图";
                break;
        }
        return output;
    }
    // 状态过滤
})
// 状态过滤器
.filter('status', function () {
    return function (status) {
        var output;
        switch (status) {
            case 1:
                output = "草稿";
                break;
            case 2:
                output = "上线";
                break;
        }
        return output;
    }
})
// 上下线过滤器
.filter("status1", function () {
    return function (status) {
        var output;
        switch (status) {
            case 1:
                output = "上线";
                break;
            case 2:
                output = "下线";
                break;
        }
        return output;
    }
})