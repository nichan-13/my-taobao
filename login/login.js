$(function () {
    // 禁止前进后退
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            // 当点击浏览器的 后退和前进按钮 时才会被触发
            window.history.pushState('forward', null, ''); 
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '');  //在IE中必须得有这两行
    window.history.forward(1);

    $(".form").slideDown(1000);

    $("#landing").addClass("border-btn");

    $("#registered").click(function () {
        $("#landing").removeClass("border-btn");
        $("#landing-content").hide(500);
        $(this).addClass("border-btn");
        $("#registered-content").show(500);
    });

    $("#landing").click(function () {
        $("#registered").removeClass("border-btn");
        $(this).addClass("border-btn");
        $("#landing-content").show(500);
        $("#registered-content").hide(500);
    });

    // 点击登录
    $("#login-btn").click(function () {
        var userName = $('#user-name').val();
        var userPwd = $('#user-pwd').val();
        if (userName === 'Ooooh' && userPwd === '111111') {
            window.open('../index.html', '_self');
        }
    });

});
