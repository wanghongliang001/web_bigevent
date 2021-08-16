$(function() {
    var form = layui.form
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('input[name="old_pwd"]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            if (value !== $('input[name="new_pwd"]').val()) {
                return '两次密码不一致'
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'patch',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})