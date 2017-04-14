require('./public');
$.init();
$(function () {
  // $(document).on('click', '.content .card .cloudfog-radio input', function () {
  //   $('.normal-tab').addClass('hide').siblings('.checked-tab').removeClass('hide'); //底部显示与隐藏
  // });
  $(document).on('click','.content .card .cloudfog-radio input', function () {
    var buttons1 = [
      {
        text: '下载',
        bold: true,
        color: 'danger',
        onClick: function() {
          $.alert("你选择了“下载“");
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

  // 云端
  $(document).on('click', '.cloud-download', function () {
    $(this).addClass('hide').siblings('.infinite-scroll-preloader').removeClass('hide');
    $(this).closest('.col-12').siblings('.col-73').removeClass('cloud');
  });

});


// 懒加载
var loading = false;
// 最多可加载的条目
var maxItems = 100;
// 每次加载添加多少条目
var itemsPerLoad = 20;
function addItems(number, lastIndex) {
  // 生成新条目的HTML
  var html = '';
  for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
    html += '<div class="card">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row no-gutter">' +
      '<div class="col-12">' +
      '<div class="cloud-download">' +
      '<i class="iconfont ">&#xe66e;</i>' +
      '</div>' +
      '<div class="infinite-scroll-preloader hide">' +
      '<div class="preloader">' +
      '</div>' +
      '</div><label for="file1" class="check-hide">' +
      '<div class="cloudfog-radio">' +
      '<input id="file8" class="radio-btn" type="radio" name="myShare">' +
      '<i class="green-dot">' +
      '</i></div></label>' +
      '</div>' +
      '<div class="col-15 cloud">' +
      '<i class="iconfont icon-dir"></i>' +
      '</div><div class="col-73 cloud">' +
      '<p>尤克里里之谈几点</p>' +
      '<p><span>2016-11-01</span><span class="right">所有者:小明</span></p>' +
      '</div></div></div></div></div>';
  }
  // 添加新条目
  $('.card-list').append(html);
}
//预先加载20条
addItems(itemsPerLoad, 0);
// 上次加载的序号
var lastIndex = 20;
// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom', function () {
  // 如果正在加载，则退出
  //未触发
  if (loading) return;

  // 设置flag
  loading = true;

  // 模拟1s的加载过程
  setTimeout(function () {
    // 重置加载flag
    loading = false;

    if (lastIndex >= maxItems) {
      // 加载完毕，则注销无限加载事件，以防不必要的加载
      $.detachInfiniteScroll($('.infinite-scroll'));
      // 删除加载提示符
      $('.infinite-scroll-preloader').remove();
      return;
    }
    // 添加新条目
    addItems(itemsPerLoad, lastIndex);
    // 更新最后加载的序号
    /*lastIndex = 4;*/
    lastIndex = $('.card-list .card').length;
    //容器发生改变,如果是js滚动，需要刷新滚动
    $.refreshScroller();
  }, 1000);
});