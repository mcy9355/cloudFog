const $=require('zepto');
require('sm');
$(function () {
  // 搜索框展开与闭合
  // 搜索框出现
  $(document).on('click', '.search-input', function () {
    $('#search').blur();
  });
  // 排序框效果
  $('.popup-rank ul li').click(function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    setTimeout(function () {
      $(".popup-rank").hide();
    }, 200);
  });
  // 选择
  $('.cloudfog-checkbox input[type=checkbox]').click(function () {
    $('.normal-tab').addClass('hide').siblings('.checked-tab').removeClass('hide'); //底部显示与隐藏
    $('.content').addClass('checked-content');  //距离底部的bottom的切换
  });
  // 取消
  $('.close-checked-tab').click(function () {
    $('.checked-tab').addClass('hide').siblings('.normal-tab').removeClass('hide'); //底部显示与隐藏
    $('.content').removeClass('checked-content'); //距离底部的bottom的切换
    $('.content .page-index').find('input[type=checkbox]').prop('checked', false);
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
  
  
  
});





