require('./public');
$(function () {
  $('.view-icon1').click(function () {
    $(this).addClass('hide').siblings('.view-icon2').removeClass('hide');
    $(this).siblings('input').prop('type','text');
  });
  $('.view-icon2').click(function () {
    $(this).addClass('hide').siblings('.view-icon1').removeClass('hide');
    $(this).siblings('input').prop('type','password');
  });
});


