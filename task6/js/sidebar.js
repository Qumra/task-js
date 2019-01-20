angular.module("myApp")
    .controller('AccordionDemoCtrl', function ($scope) {

        $scope.groups = [

            {
                head: "后台管理",
                content: [{ list: '角色管理',url:'test' }, { list: '模块管理', url:'test'}, { list: '密码管理' , url:'test' }, { list: '账户管理', url:'test' }]
            },
            {
                head: "内容管理",
                content: [{ list: '公司列表', url:'test' }, { list: '职位列表', url:'test' }]
            },
            {
                head: "信息管理",
                content: [{ list: 'Atrical列表', url:'article' }]
            },

        ];

        $scope.ggtitle = sessionStorage.getItem('theTitle');
        $scope.ggcontent = sessionStorage.getItem('theContent');
        // 一级菜单
        $scope.getHomeTitle = function (e) {
            $scope.ggtitle = ($scope.ggtitle == e) ? undefined : e;
        };

        // 二级菜单
        $scope.getHomeContent = function (z, index) {
            $scope.ggcontent = z;
            sessionStorage.setItem('theTitle', index);
            sessionStorage.setItem('theContent', z);
        };
    })