angular.module("myApp")
.factory("path",function(){
    return  {
        // 登录地址
        login: "/carrots-admin-ajax/a/login",
      
        // 退出登录地址
        logout:  '/carrots-admin-ajax/a/logout',

        // article管理
        //新增article
        addArticle: '/carrots-admin-ajax/a/u/article',
         //编辑article
         redactArticle:function(id){
            return '/carrots-admin-ajax/a//u/article/'+id
        },
        //修改arcticle上线下线
        articleStatus: '/carrots-admin-ajax/a/u/article/status',

        //删除Arctic
        deleteArticle :function(id){
            return '/carrots-admin-ajax/a/u/article/'+id;
        },
        //获得单个article
        oneArticle :function(id){
            return '/carrots-admin-ajax/a/article/'+id
        },
        // 按条件获得article列表
        searchArticle:'/carrots-admin-ajax/a/article/search',
        // 图片上传
        img:'/carrots-admin-ajax/a/u/img/task',
    }
})