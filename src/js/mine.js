require('./public');
$.init();
$(function () {
  $('#username').blur(function () {
    if ($(this).val().length >= 3 && $(this).val().length <= 20 && $(this).val() != '') {
    } else if ($(this).val() == '') {
      $.toast("用户名不能为空");
    } else {
      $.toast("用户名应该为3-20位之间");
    }
  });

  $('#tel').blur(function () {
    var phone = document.getElementById('tel').value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      $.toast("请输入正确电话号码");
    }
  });

  $('#nowRePwd').blur(function () {
    if ($(this).val() !== $('#nowPwd').val()) {
      $.toast("与第一次输入不一致");
    }
  });


});

