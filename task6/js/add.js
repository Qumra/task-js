angular.module("myApp")
    .controller('addContr', function ($scope, $state, $stateParams, $http, FileUploader,request,path) {
        // $scope.addParams = $state.Params;
        var E = window.wangEditor;
        var editor = new E('#editor');
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();

        $scope.uploader = new FileUploader({
            url: path.img, //换成自己的上传地址
            method: 'POST',
            queue: [],//上传队列
        });

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            var reader = new FileReader();
            reader.addEventListener("load", function (e) {
                //文件加载完之后，更新angular绑定
                console.log(e.target.result);
                $scope.$apply(function () {
                    $scope.imgUrl = e.target.result;
                });
            }, false);
            reader.readAsDataURL(fileItem._file);
            $scope.uploader.addToQueue(fileItem)
        };
        $scope.clearItems = function () {    //重新选择文件时，清空队列，达到覆盖文件的效果
            $scope.uploader.clearQueue();
        }
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            $scope.imgUrl = response.data.url;
        };
        $scope.changeMB = function (size) {
            var output;
            output = (size / 1024 / 1024).toFixed(2);
            return output;
        }
        // 上线
        // 存为草稿
        $scope.data = {};
        $scope.publish = function (status) {
            $scope.data.status = status;
            $scope.data.content = editor.txt.html();
            $scope.data.img = $scope.imgUrl;
            if ($stateParams.id) {
                $scope.data.createAt = $scope.createAt;
                // $http({
                //     method: 'PUT',
                //     url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                //     data: $scope.data,
                //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                //     transformRequest: function (obj) {
                //         var str = [];
                //         for (var p in obj) {
                //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //         }
                //         return str.join("&");
                //     },
                // }).
                request.editArticle( $scope.data,$stateParams.id)
                .then(function (res) {
                    console.log(res.data.code);
                    if (res.data.code == 0) {
                        $state.go('article');
                        var dialog = bootbox.dialog({
                            message: "编辑成功",
                            closeButton: false
                        });
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 800);
                    } else {
                        alert(res.data.message);
                    }
                })
            } else {
                // $http({
                //     method: 'POST',
                //     url: '/carrots-admin-ajax/a/u/article',
                //     data: $scope.data,
                //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
                //     transformRequest: function (obj) {
                //         var str = [];
                //         for (var p in obj) {
                //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //         }
                //         return str.join("&");
                //     },

                // })
                request.addArticle($scope.data)
                .then(function (res) {
                    if (res.data.code == 0) {
                        $state.go('article');
                        var dialog = bootbox.dialog({
                            message: "新增成功",
                            closeButton: false
                        });
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 800);
                    } else {
                        alert(res.data.message);
                    }
                })
            }

        }





        $scope.topTitle = "新增"
        // 编辑渲染
        if ($stateParams.id) {
            $scope.topTitle = "编辑";
            // $http({
            //     method: 'GET',
            //     url: '/carrots-admin-ajax/a/article/' + $stateParams.id,

            // })
            request.oneArticle($stateParams.id)
            .then(function (res) {
                console.log(res.data.data.article);
                $scope.data.title = res.data.data.article.title;
                $scope.data.type = res.data.data.article.type.toString();
                $scope.data.industry = res.data.data.article.industry.toString();
                editor.txt.html(res.data.data.article.content);
                $scope.data.url = res.data.data.article.url;
                $scope.imgUrl = res.data.data.article.img;
                $scope.createAt = res.data.data.article.createAt;
            })

        }
    })