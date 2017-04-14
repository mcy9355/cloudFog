require('./public');
$.init();
$(function () {
  // 选择所属云端
  $('.open-belongs-cloud').click(function () {
    $(this).parents('.popup').children('.belongs-cloud').toggle();
  });
  // 删除
  $('.delete-user').click(function () {
    $('.footer-delete').removeClass('hide');
    $('.footer-save').addClass('hide');
  });
  
  $('.button-delete').click(function () {
    $(this).parents('.popup-edit')
  })
});