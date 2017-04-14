require('./public');
$.init();
$(function () {
  // 分享菜单蒙板消失
  $('.popup-share-menu ul li').click(function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    setTimeout(function () {
      $(".popup-share-menu").hide();
    }, 200);
  });
  // 页面切换
  $('.popup-share-menu .grid-demo li.my-share ').click(function () {
    $('#myShare').removeClass('hide').siblings('#shareMe').addClass('hide');
  });
  // 我的分享和分享给我tab切换
  $('.popup-share-menu .grid-demo li.share-me ').click(function () {
    $('#shareMe').removeClass('hide').siblings('#myShare').addClass('hide');
  });
  // 我的分享编辑
  $(document).on('click', '#myShare .edit', function () {
    $('.file').find('input[type=radio]').prop('checked', false);
    $(this).addClass('active').closest('.card').siblings('.card').find('.edit').removeClass('active');
    var buttons1 = [
      {
        text: '取消分享',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.confirm('确定取消分享?',
            function () {
              $('#myShare .dr .edit').each(function () {
                if($(this).hasClass('active')){
                  $(this).closest('.card').remove();
                }
              });
            },
            function () {
              $('#myShare .dr .edit').removeClass('active');
            }
          );
        }
      },
      {
        text: '详细信息',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-detail');
        }
      }
    ];
    var buttons2 = [
      {
        text: '取消',
        bg: 'danger',
        onClick: function () {
          $('.page-index .dr').find('.col-12').find('.edit').removeClass('active');
        }
      }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);

  });
  // 分享给我编辑
  $(document).on('click', '#shareMe .edit', function () {
    $('.file').find('input[type=radio]').prop('checked', false);
    $(this).addClass('active').closest('.card').siblings('.card').find('.edit').removeClass('active');
    var buttons1 = [
      {
        text: '详细信息',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-detail');
        }
      }
    ];
    var buttons2 = [
      {
        text: '取消',
        bg: 'danger',
        onClick: function () {
          $('.page-index .dr').find('.col-12').find('.edit').removeClass('active');
        }
      }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);

  });
  // 单个文件选中
  $(document).on('click', '.file label.col-12', function () {
    $('.dr .edit').removeClass('active');
    var buttons1 = [
      {
        text: '下载',
        bold: true,
        color: 'danger'
      },
      {
        text: '详细信息',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-detail');
        }
      }
    ];
    var buttons2 = [
      {
        text: '取消',
        bg: 'danger',
        onClick: function () {
          $('.page-index .file').find('.col-12').find('input').prop('checked',false);
        }
      }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);
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
      '<label class="col-12" for="file11">' +
      '<div class="cloudfog-radio">' +
      '<input id="file11" class="radio-btn" type="radio" name="myShare">' +
      '<i class="green-dot">' +
      '</i>' +
      '</div>' +
      '</label>' +
      '<div class="col-15">' +
      '<div class="sprite sprite-jpg">' +
      '</div>' +
      '</div>' +
      '<div class="col-73">' +
      '<p class="original-name">尤克里里之谈几点</p>' +
      '<p>' +
      '<span class="date-rank">2016-11-08&nbsp;05:55</span>' +
      '<span class="right">分享给小明</span>' +
      '</p></div></div></div></div></div>';
  }
  // 添加新条目
  $('.infinite-scroll-bottom .file').append(html);
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
    lastIndex = $('#myShare .card').length;
    //容器发生改变,如果是js滚动，需要刷新滚动
    $.refreshScroller();
  }, 1000);
});