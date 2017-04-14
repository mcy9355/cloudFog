require('./public');
$.init();
$(function () {
  // 用户
  // 计算和
  var inputLength = $('#user .list-block li.item-link .cloudfog-checkbox input').size(); //所有复选框的数字
  $('#user .all-role').text(inputLength);
  // 全选o取消全选
  $(document).on('click', '#user .list-block #allUser', function () {
    if ($(this).prop('checked') == true) {
      $('#user .list-block li.item-link .cloudfog-checkbox input').prop('checked', true);
    } else {
      $('#user .list-block li.item-link .cloudfog-checkbox input').prop('checked', false);
    }
  });
  // 点击是否选中判断是否全选并填充文字
  $(document).on('click', '#user .list-block li .cloudfog-checkbox input', function () {
    var inputLength = $('#user .list-block li.item-link .cloudfog-checkbox input').size(); //所有复选框的数字
    var checkInput = $('#user .list-block li.item-link .cloudfog-checkbox input').not(function () {
      return !this.checked;
    }); //选中的复选框
    if (checkInput.size() == inputLength) {
      $('#user .list-block #allUser').prop('checked', true);  // 全选按钮选中
    } else {
      $('#user .list-block #allUser').prop('checked', false);   // 全选按钮不选中
    }
    $('.checked-tab .cancel .check-num').text(checkInput.size());  //  填充文字
    if (checkInput.size() > 0) {
      $('.checked-tab .cancel button.right').addClass('active');
    } else {
      $('.checked-tab .cancel button.right').removeClass('active');
    }
  });
  // 操作
  $(document).on('click', '.add-user', function () {
    var buttons1 = [
      {
        text: '请选择',
        label: true
      },
      {
        text: '添加用户',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-add-user');
        }
      },
      {
        text: '批量导入用户',
        onClick: function () {
          $.popup('.popup-add-user-group');
        }
      }
    ];
    var buttons2 = [
      {
        text: '取消',
        bg: 'danger'
      }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);
  });

  // 用户组
  var inputLength = $('#userGroup .list-block li.item-link .cloudfog-checkbox input').size(); //所有复选框的数字
  $('#userGroup .all-role').text(inputLength);
  // 全选o取消全选
  $(document).on('click', '#userGroup .list-block #allUserGroup', function () {
    if ($(this).prop('checked') == true) {
      $('#userGroup .list-block li.item-link .cloudfog-checkbox input').prop('checked', true);
    } else {
      $('#userGroup .list-block li.item-link .cloudfog-checkbox input').prop('checked', false);
    }
  });
  // 点击是否选中判断是否全选并填充文字
  $(document).on('click', '#userGroup .list-block li .cloudfog-checkbox input', function () {
    var inputLength = $('#userGroup .list-block li.item-link .cloudfog-checkbox input').size(); //所有复选框的数字
    var checkInput = $('#userGroup .list-block li.item-link .cloudfog-checkbox input').not(function () {
      return !this.checked;
    }); //选中的复选框
    $('.checked-tab .cancel .check-num').text(checkInput.size());  //  填充文字

    if (checkInput.size() == inputLength) {
      $('#userGroup .list-block #allUserGroup').prop('checked', true);  // 全选按钮选中
    } else {
      $('#userGroup .list-block #allUserGroup').prop('checked', false);   // 全选按钮不选中
    }

    if (checkInput.size() > 0) {
      $('.checked-tab .cancel button.right').addClass('active');
    } else {
      $('.checked-tab .cancel button.right').removeClass('active');
    }
  });

  // 删除选中文件
  $('.checked-tab .cancel button.right').click(function () {
    $('.content-block .list-block .item-link .cloudfog-checkbox input').each(function () {
      if ($(this).prop('checked') == true) {
        $(this).closest('.item-link').remove();
      }
    });
    var inputLength = $('#userGroup .list-block li.item-link .cloudfog-checkbox input').size(); //所有复选框的数字
    $('#userGroup .all-role').text(inputLength);
    var inputLength = $('#user .list-block li.item-link .cloudfog-checkbox input'); //所有复选框的数字
    $('#user .all-role').text(inputLength.size());
  });

  $('.popup-edit-user .reset-pwd').click(function () {
    $('.checked-tab.tab-reset').removeClass('hide');
    $('.popup-edit-user .content').removeClass('checked-content');
  });

  $('.popup-edit-user .delete-user').click(function () {
    $('.checked-tab.tab-del').removeClass('hide');
    $('.popup-edit-user .content').removeClass('checked-content');
  });

  // 组织架构
  $('#framework .list-block ul li .iconfont').click(function () {
    $(this).toggleClass('open');
    $(this).closest('li').next('ul').toggleClass('hide');
  });
  $('#framework .list-block ul li .iconfont').each(function () {
    if ($(this).closest('li').next('ul').size() == 0) {
      $(this).text('');
    }
  });
  $(document).on('click', '.popup-rename .confirm', function () {
    var oldName = $('.popup-rename #showName').val();
    var newNameLi = '<li class="item-content item-link">' +
      '<label for="user1"> <div class="cloudfog-checkbox">' +
      '<input type="checkbox" id="user1">' +
      '<i class="iconfont">&#xe64f;</i>' +
      '</div>' +
      '</label>' +
      '<div class="item-media">' +
      '<i class="icon icon-f7"></i>' +
      '</div><div class="item-inner open-popup" data-popup=".popup-edit-role">' +
      '<div class="item-title">' + oldName + '</div>' +
      '<div class="item-after"></div></div>' +
      '</li>';
    $('.popup-rename .rename-input .name-delete').click(function () {
      $(this).siblings('input').val('');
    });


    $('#userGroup .list-block ul .item-title').each(function () {
      if ($(this).text() == oldName) {
        console.log($(this));
      } else {
        console.log($(this) + '拉拉')
      }
    });

    if ($.trim(oldName) !== '') {
      $(newNameLi).prependTo('#userGroup .list-block ul');
      $.closeModal('.popup-rename');
    } else {
      $(this).siblings('.warning').text('用户名不允许为空');
    }


    // if ($.trim(oldName) == $(this).text()) {
    //   $(this).siblings('.warning').text('该名称已被使用，请使用其他名称');
    // } else {
    //   $(newNameLi).prependTo('#userGroup .list-block ul');
    //   $.closeModal('.popup-rename');
    // }

    $(this).siblings('.rename-input').find('#showName').focusin(function () {
      $('.warning').text('');
    });


  });


});