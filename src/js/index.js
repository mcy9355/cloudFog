require('./public');
$.init();
$(function () {
  // 分类展开与闭合
  // 展开切换图标
  $(document).on('click', '.icon-down', function () {
    $(this).addClass('hide').siblings('.icon-up').removeClass('hide');
  });
  // 闭合切换图标，闭合popup
  $(document).on('click', '.icon-up', function () {
    $(this).addClass('hide').siblings('.icon-down').removeClass('hide');
  });
  // 尾部工具栏样式变换
  $('.checked-tab .tab-item').click(function () {
    $(this).addClass('active').siblings('.tab-item').removeClass('active');
  });
  // 判断实际上有没有全部选中
  $('.content .page-index input[type=checkbox]').click(function () {
    //  选中的复选框
    var checkInput = $('.content .page-index input[type=checkbox]').not(function () {
      return !this.checked
    });
    //  所有复选框的数字
    var inputLength = $('.content .page-index input[type=checkbox]').size();
    //  改变是否全选的文字
    if (checkInput.size() !== inputLength) {
      $('.check-all').text('全选');
    } else {
      $('.check-all').text('全不选');
    }
    // 点击超过两个文件不能重命名
    $('.check-all').closest('.cancel').find('.check-num').text(checkInput.size());  //填充文字
    if (checkInput.size() == 1) {
      $('.rename-item,.download-item').removeClass('tab-disable');
    } else {
      $('.rename-item,.download-item').addClass('tab-disable').removeClass('active');
    }
  });
  // 全选和取消全选
  $('.check-all').click(function () {
    if ($('.check-all ').text() == '全选') {
      $('.content .page-index').find('input[type=checkbox]').prop('checked', true);
      $('.check-all ').text('全不选');
    } else {
      $('.check-all ').text('全选');
      $('.content .page-index').find('input[type=checkbox]').prop('checked', false);
    }
    var checkInput = $('.content .page-index input[type=checkbox]').not(function () {
      return !this.checked
    }); //选中的复选框
    $('.check-all').closest('.cancel').find('.check-num').text(checkInput.size());  //填充文字
    $('.rename-item,.download-item').addClass('tab-disable').removeClass('active');
  });
  // 删除选中文件
  $('.popup-delete .confirm').click(function () {
    $('.content .card .cloudfog-checkbox input').each(function () {
      if ($(this).prop('checked') == true) {
        $(this).closest('.card').remove();
        $.closeModal('.popup-delete');
      }
    })
  });
  // 分享模板消失
  $(document).on('click', '.popup-share .cancel', function () {
    $.closeModal('.popup-share')
  });
  // 分享给个人选框效果
  $('.popup-to-oneself label.item-media').click(function () {
    var checkStatus = $(this).find('input').prop('checked');
    if (checkStatus == true) {
      $(this).parent('li').next('ul').find('input.check-input').prop('checked', true);
    } else {
      $(this).parent('li').next('ul').find('input.check-input').prop('checked', false);
    }
  });
  // 分享给公共资源
  $('.popup-to-common .list-block li').click(function () {
    $(this).find('.item-after').removeClass('hide').closest('li').siblings('li').find('.item-after').addClass('hide');
  });
  // 显示或隐藏子文件
  $('.popup-to-oneself .iconfont-down').click(function () {
    $(this).closest('li').next('ul').toggleClass('hide');
  });
  // 获取焦点显示小叉号
  $('.popup-to-oneself #searchKey').focus(function () {
    $('.popup-to-oneself i.cancel').show()
  });
  // 失去焦点消失小叉号
  $('.popup-to-oneself #searchKey').blur(function () {
    $('.popup-to-oneself i.cancel').hide()
  });
  // 是否可以点击重命名
  $('.rename-item').click(function () {
    if ($(this).hasClass('tab-disable')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
      $.popup('.popup-rename');
    }
  });
  // 是否可以点击下载
  $('.download-item').click(function () {
    if($(this).hasClass('tab-disable')){
      $(this).removeClass('active');
    }else{
      $(this).addClass('active');
    }
  });
  // 重命名模板将旧的名字复制到新的框框中，获取焦点
  $(document).on('click', '.rename-item.active', function () {
    $('.content .card .cloudfog-checkbox input').each(function () {
      if ($(this).prop('checked') == true) {
        var originalName = $(this).closest('label').siblings('.col-73').find('.original-name').text();
        $('.popup-rename input').val(originalName);
      }
    });
    document.getElementById('showName').select();
  });
  // 点击叉号清空框框内容
  $(document).on('click', '.popup-rename .name-delete', function () {
    $(this).siblings('#showName').val('');
  });
  // 点击确定复制新的名字并替换
  $(document).on('click', '.popup-rename .confirm', function () {
    var newName = $('#showName').change(function () {
      return $(this).val();
    });
    $('.content .card .cloudfog-checkbox input').each(function () {
      if ($(this).prop('checked') == true) {
        var originalName = $(this).closest('label').siblings('.col-73').find('.original-name').text();
        if (newName.val() == '') {
          $(this).closest('label').siblings('.col-73').find('.original-name').text(originalName);
        } else {
          $(this).closest('label').siblings('.col-73').find('.original-name').text(newName.val());
        }
      }
    });
    $.closeModal('.popup-rename');
  });

  // 文件夹操作
  $('.sprite-dr').parents('.col-15').parents('.row').click(function () {
    $(this).find('input').prop('checked', true);
    $(this).closest('.card').siblings('.card').find('input').prop('checked', false);
    $('.file').find('input').prop('checked', false);
    $('.content').addClass('checked-content');

    $('.normal-tab').addClass('hide')
      .siblings('.checked-tab').removeClass('hide')
      .find('.tab-item').removeClass('tab-disable');
  });
  
  $('.file label.col-12').click(function () {
    $('.dr').find('input').prop('checked', false);
  });




});


