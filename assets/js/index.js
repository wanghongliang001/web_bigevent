$(function() {
    getUserInfo()
    $('#btnLogout').on('click', function() {
        var layer = layui.layer
            //提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1清空本地存储中的token；重新跳转登录页面
            localStorage.removeItem('token')
            location.href = '../../home/login.html'
            layer.close(index);
        });
    })

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.code !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                console.log(res);
                renderAvatar(res.data);

            },
            // 不论成功还是失败， 都会调用complete回调函数
            // complete: function(res) {
            //     console.log('执行了complete回调');
            //     console.log(res);
            //     // 在complete回调函数中，可以使用.responseJSON拿到服务器响应回来的数据
            //     if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空token
            //         localStorage.removeItem('token')
            //             // 强制跳转登录页面
            //         location.href = '../../home/login.html'
            //     }
            // }


        })
    }
    // 渲染用户的头像
    function renderAvatar(user) {
        // 获取用户的名称
        var name = user.nickname || user.username;
        // 设置欢迎的文本
        $('#welcome').html('欢迎 ' + name);
        // 按需渲染用户头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }

    }
})