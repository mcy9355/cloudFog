require('./public');
$(function () {
  // 分享菜单蒙板消失
  $('.popup-share-menu ul li').click(function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    setTimeout(function () {
      $(".popup-share-menu").hide();
    }, 200);
  });
  // 全选o取消全选
  $(document).on('click', '.content .head-card #allFile', function () {
    if($(this).prop('checked') == true){
      $('.content .card .cloudfog-checkbox input').prop('checked', true);
    }else{
      $('.content .card .cloudfog-checkbox input').prop('checked', false);
    }
  });
  // 点击是否选中判断是否全选并填充文字
  $(document).on('click', '.content .card .cloudfog-checkbox input', function () {
    var inputLength = $('.content .page-index .check-input').size(); //所有复选框的数字
    var checkInput = $('.content .page-index .check-input').not(function () {
      return !this.checked;
    }); //选中的复选框
    if(checkInput.size() == inputLength){
      $('.content .head-card #allFile').prop('checked', true);  // 全选按钮选中
    }else{
      $('.content .head-card #allFile').prop('checked', false);   // 全选按钮不选中
    }
    $('.checked-tab .cancel .check-num').text(checkInput.size());  //  填充文字
  });
  // 取消分享—删除文件
  $('.checked-tab button.right').click(function () {
    $('.content .card .cloudfog-checkbox input').each(function () {
      if ($(this).prop('checked') == true) {
        $(this).closest('.card').remove();
      }
    })
  });





});