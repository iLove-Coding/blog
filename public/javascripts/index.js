$(function () {
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    $loginBox.find('a').on('click', function () {
        $registerBox.show();
        $loginBox.hide();
    })

    //切换到登陆面板
    $registerBox.find('a').on('click', function () {
        $registerBox.hide();
        $loginBox.show();
    })

    //注册
    $registerBox.find('button').on('click', function () {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword: $registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success: function (result) {
                $registerBox.find('.result-info').html(result.message);
                if (!result.code) {
                    //注册成功,显示登录隐藏注册
                    setTimeout(function () {
                        $registerBox.hide();
                        $loginBox.show();
                    }, 1000);

                }
            }
        })
    });

    //登录
    $loginBox.find('button').on('click', function () {
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function (result) {
                $loginBox.find('.result-info').html(result.message);
                if (!result.code) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }
            }
        })
    })

    $('#logout').on('click', function () {
        $.ajax({
            url: '/api/user/logout',
            success: function (result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        })
    })
});