require('./public');
$(function () {
  $(document).on('click', '.content .card .cloudfog-checkbox input', function () {
    //选中的复选框
    var checkInput = $('.content .page-index .check-input').not(function () {
      return !this.checked;
    });
    if(checkInput.size()>0){
      $('.checked-tab .cancel button.right').addClass('active');
    }else{
      $('.checked-tab .cancel button.right').removeClass('active');
    }
  });
});