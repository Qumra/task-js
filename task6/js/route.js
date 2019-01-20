// 定义模块
var app = angular.module('myApp', ['ui.router', 'ui.bootstrap','angularFileUpload']);
app.config(["$stateProvider", '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state("test", { //导航用的名字，如<a ui-sref="login">login</a>里的login
            url: '/test?id&edit',    //访问路径 
            templateUrl: 'test.html'
        })
        .state("home", {
            url: '/home',
            template: '<h1>Welcome!</h1>'
        })
        .state("article", {
            url: '/article?size&page&type&status&startAt&endAt&title&author',
            templateUrl: 'article.html'
        })
        .state("add",{
            url:'/add?id',
            templateUrl: 'add.html'
        })
}]);