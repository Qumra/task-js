angular.module('myApp')
    .factory('request', function ($http, path, dataFactory) {
        return {
            // 登录服务
            login: function (params) {
                return $http({
                    method: "POST",
                    url: path.login,
                    params: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

            },
            // 搜索Article列表
            search: function (params, success, err) {
                dataFactory.getlist(path.searchArticle, 'GET', {}, params).then(function (response) {
                    success(response)
                },
                    function (error) {
                        err(error)
                    })
                //  $http({
                //     method: 'GET',
                //     url: path.searchArticle,
                //     params: parms,
                // })
            },

            // 修改article的上架/下架
            changStatus: function (id, status) {
                if (status == 1) {
                    status = 2;
                } else {
                    status = 1;
                }
                let params = {
                    id: id,
                    status: status
                }
                return $http({
                    method: 'PUT',
                    url: path.articleStatus,
                    params: params,
                })
            },
            //  删除arcticle
            deleteAtricle: function (id) {
                return $http({
                    method: 'DELETE',
                    url: path.deleteArticle(id),
                })
            },
            // 获得单个article
            oneArticle: function (id) {
                return $http({
                    method: 'GET',
                    url: path.oneArticle(id),
                })
            },
            // 新增article
            addArticle: function (params) {
                return $http({
                    method: 'POST',
                    url: path.addArticle,
                    data: params,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                })
            },
            // 编辑article
            editArticle: function (params, id) {
                return $http({
                    method: 'PUT',
                    url: path.redactArticle(id),
                    data: params,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                })
            },
        }
    })