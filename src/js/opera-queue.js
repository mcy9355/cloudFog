require('./public');
$.init();
$(function () {
  $(document).on('click', '.list-block .card .card-content-inner .row .col-11', function () {
    $(this).closest('.card-content-inner').siblings('.add-card').toggleClass('hide');
    $(this).children('.iconfont').toggle();
  });





});