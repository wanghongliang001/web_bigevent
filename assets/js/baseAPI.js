//每次调用$.get()或$.ajax()的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们Ajax提供的内置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://www.liulongbin.top:3008' + options.url
        // console.log(options.url)

    //统一为有权限的接口，设置headers请求头
    options.headers = {
        Authorization: localStorage.getItem('token') || ''

    }

    //全局统一挂载complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
                // 强制跳转登录页面
            location.href = '../../home/login.html'
        }
    }
})