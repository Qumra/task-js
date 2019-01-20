
angular.module("myApp")
    .controller("articleListContr", function ($scope, $stateParams, $state, request) {
        //1.接受路由传入的参数，并初始化页面数据
        $scope.params = $stateParams;
        
        // 分页的配置项
        $scope.pagination={maxSize:3}
        //页面初始化，由于是异步请求数据，所以初始化组件的数据时要同时初始化
        request.search($scope.params, function (response) {
            //success函数  
            console.log(response)
            if (response.code == 0) {
                $scope.records = response.data.articleList;
                $scope.pagination.totalItems = response.data.total;
                $scope.pagination.page = $scope.params.page || 1;
                $scope.pagination.size = $scope.params.size || 10;
                $scope.params.startAt = parseInt($scope.params.startAt);
                $scope.params.endAt = parseInt($scope.params.endAt);
                console.log($scope.pagination.page);
                if( $scope.pagination.totalItems ==0){
                    $scope.flag=true;
                }else{
                    $scope.flag=false;
                }

            } else {
                alert(response.data.message)
            }
        }, function (error) {
            //error函数 
            alert("页面初始化失败");
        })
        
        //当前页数改变触发
        $scope.change = function () {
            console.log($scope.pagination.page);
            $scope.params.page=$scope.pagination.page;
            $scope.params.size=$scope.pagination.size;
            $state.go($state.current, $scope.params, { reload: true });
        }
        // $scope.confirm=function(){
        //     console.log($scope.pagination.page)
        //     $scope.params.page=$scope.pagination.page;
        //     $scope.params.size=$scope.pagination.size;
        //     $state.go($state.current, $scope.params, { reload: true });
        // }

        // 日期选择
        if ($scope.params.startAt && $scope.params.endAt) {
            $scope.params.startAt = parseInt($scope.params.startAt);
            $scope.params.endAt = parseInt($scope.params.endAt);
            if (isNaN($scope.params.startAt) || isNaN($scope.params.endAt)) {
                alert("参数有误")
            }
        }
        $scope.format = "yyyy/MM/dd";
        $scope.altInputFormats = ['yyyy/M!/d!'];
        $scope.popup1 = {
            opened: false
        };
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        // 第二个日期选择
        $scope.startDateOptions = {
            maxDate: new Date()
        }
        $scope.endDateOptions = {
            maxDate: new Date()
        }
        $scope.$watch('params.startAt', function (newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.popup2 = {
            opened: false
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        // 搜索
        $scope.search = function () {
            // 时间对象转时间戳
            var tmp1 = Date.parse($scope.params.startAt);
            var tmp2 = Date.parse($scope.params.endAt)
            if (!isNaN(tmp1)) {
                $scope.params.startAt = tmp1
            }
            if (!isNaN(tmp2)) {
                $scope.params.endAt = tmp2;
            }
            if ($scope.params.startAt == $scope.params.endAt) {
                $scope.params.endAt += 86399999;
            }
            $state.go($state.current, $scope.params, { reload: true });
        }
        // 清空
        $scope.clear = function () {
            $state.go($state.current,
                //      {
                //     author: "",
                //     endAt: "",
                //     page: "",
                //     size: "",
                //     startAt: "",
                //     status: "",
                //     title: "",
                //     type: ""
                // },
                angular.forEach($scope.params, function (value, key, obj) {
                    console.log(value);
                    console.log(key);
                    obj[key] = "";
                }),
                { reload: true })
        }
        // 修改article的上架/下架（status）
        $scope.changStatus = function (id, status) {
            if (status == 1) {
                // 确认弹出框
                bootbox.confirm({
                    message: "确定上线?",
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        console.log(result);
                        if (result) {
                            request.changStatus(id, status).then(function (res) {
                                if (res.data.code == 0) {
                                    $state.reload();
                                    var dialog = bootbox.dialog({
                                        message: "上线成功",
                                        closeButton: false
                                    });
                                    setTimeout(function () {
                                        dialog.modal('hide');
                                    }, 800);
                                }
                                else {
                                    var dialog = bootbox.dialog({
                                        message: "上线失败",
                                        closeButton: false
                                    });
                                    setTimeout(function () {
                                        dialog.modal('hide');
                                    }, 800);
                                }
                            })

                        }
                    }
                });
            } else {
                bootbox.confirm({
                    message: "确定要下线吗?",
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        // console.log(result);
                        if (result) {

                            request.changStatus(id, status).then(function (res) {
                                if (res.data.code == 0) {
                                    $state.reload();
                                    var dialog = bootbox.dialog({
                                        message: "下线成功",
                                        closeButton: false
                                    });
                                    setTimeout(function () {
                                        dialog.modal('hide');
                                    }, 800);
                                }
                                else {
                                    var dialog = bootbox.dialog({
                                        message: "下线失败",
                                        closeButton: false
                                    });
                                    setTimeout(function () {
                                        dialog.modal('hide');
                                    }, 800);
                                }
                            })
                        }
                    }
                });
            }
        }
        // 删除功能
        $scope.delete = function (id) {
            // 确认弹出框
            bootbox.confirm({
                message: "确定删除?",
                buttons: {
                    confirm: {
                        label: '确定',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        console.log(id);
                        request.deleteAtricle(id).then(function (res) {
                            if (res.data.code == 0) {
                                $state.reload();
                                var dialog = bootbox.dialog({
                                    message: "删除成功",
                                    closeButton: false
                                });
                                setTimeout(function () {
                                    dialog.modal('hide');
                                }, 800);
                            } else {
                                var dialog = bootbox.dialog({
                                    message: res.data.message,
                                    closeButton: false
                                });
                                setTimeout(function () {
                                    dialog.modal('hide');
                                }, 800);
                            }
                        })
                       
                    }
                }
            })
        }
    })