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
  // 云端
  $(document).on('click', '.cloud-download', function () {
    $(this).addClass('hide').siblings('.infinite-scroll-preloader').removeClass('hide');
    $(this).closest('.col-12').siblings('.col-73').removeClass('cloud');
  });
  // 尾部工具栏样式变换
  $('.checked-tab .tab-item').click(function () {
    $(this).addClass('active').siblings('.tab-item').removeClass('active');
  });
  // 判断实际上有没有全部选中
  $(document).on('click', '.content .page-index input[type=checkbox]', function () {
    //  选中的复选框
    var checkInput = $('.content .page-index input[type=checkbox]').not(function () {
      return !this.checked
    });
    //  所有复选框的数字
    var inputLength = $('.content .page-index input[type=checkbox]').size();
    //  改变是否全选的文字
    if (checkInput.size() == inputLength) {
      $('.check-all').text('全不选');
    } else {
      $('.check-all').text('全选');
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
      $(this).parents('ul').prev('li').find('input.check-input').prop('checked', false);
    }
    // 是否需要全选
    var allInput = $(this).closest('ul').children('li').find('input.check-input').size();
    var checkInput = $(this).closest('ul').children('li').find('input.check-input').not(function () {
      return !this.checked
    });
    if (allInput == checkInput.size()) {
      $(this).closest('ul').prev('li').find('input.check-input').prop('checked', true);
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
    if ($(this).hasClass('tab-disable')) {
      $(this).removeClass('active');
    } else {
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

    // 文件夹重命名
    $('.row-opera').each(function () {
      if (!$(this).hasClass('hide')) {
        var oldName = $(this).closest('.row-opera').siblings('.card-content').find('.original-name').text();
        if (newName.val() == '') {
          $(this).siblings('.card-content').find('.original-name').text(oldName)
        } else {
          $(this).siblings('.card-content').find('.original-name').text(newName.val())
        }
      }
    });
    // 文件重命名
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
  // 移动蒙版
  $(document).on('click', '.popup-remove ul li .col-12 i', function () {
    $(this).toggle().siblings('.iconfont').toggle();
    $(this).closest('.row').siblings('ul').toggle();
  });
  // 移动单选
  $(document).on('click', '.popup-remove ul li .col-76', function () {
    var liArr = [];
    var liArr = $('.allDr').find('li').each(function () {
      return liArr.push($(this));
    });
    var checkIndex = $.inArray($(this).closest('li')[0], liArr);
    for (var i = 0; i < liArr.length; i++) {
      if (i == checkIndex) {
        $('.allDr li').eq(i).addClass('active');
      } else {
        $('.allDr li').eq(i).removeClass('active');
      }
    }
  });
  // 分享蒙版
  $(document).on('click', '.popup-share button.right', function () {
    var shareName = document.getElementsByName('share');
    for (var i = 0; i < shareName.length; i++) {
      if (shareName[i].checked) {
        if (shareName[i].id == 'inputCommon') {
          $.popup('.popup-to-common');
        } else if (shareName[i].id == 'inputSelf') {
          $.popup('.popup-to-oneself');
        }
      }
    }
  });
  // 文件夹处理
  $(document).on('click', '.dr .card-content-inner .col-12', function () {
    $(this).toggleClass('open');
    $(this).closest('.card-content').siblings('.row-opera').toggleClass('hide');
    $(this).closest('.card').siblings('.card').find('.row-opera').addClass('hide');
  });
  // 更多
  $(document).on('click', '.more', function () {
    var buttons1 = [
      {
        text: '移动到',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-remove');
        }
      },
      {
        text: '复制到',
        bold: true,
        color: 'danger',
        onClick: function () {
          $.popup('.popup-remove');
          $('.popup-remove h1.title').text('复制到');
          $('.popup-remove .bar-tab a.button-light').text('复制');
          $('.allDr li').removeClass('active');
        }
      },
      {
        text: '详细信息',
        onClick: function () {
          $.popup('.popup-detail');
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
  // 重命名
  $(document).on('click', '.row-opera .rename', function () {
    var oldName = $(this).closest('.row-opera').siblings('.card-content').find('.original-name').text();
    $('.popup-rename input').val(oldName);
    document.getElementById('showName').select();
  });
  // 删除
  $(document).on('click', '.row-opera .delete', function () {
    $(this).closest('.card').remove();
  });
  // 新建文件夹
  $(document).on('click', '.popup-create-new-file button.right', function () {
    var newDrName = $(this).siblings('.rename-input').find('input').val();
    // 主页新建文件夹
    if ($('.popup-add').hasClass('modal-in')) {
      if (newDrName !== '') {
        $('<div class="card"><div class="card-content"><div class="card-content-inner"><div class="row no-gutter">' +
          '<div class="col-12"><i class="iconfont open-close">&#xe63e;</i></div>' +
          '<div class="col-15"><div class="sprite sprite-dr"></div></div>' +
          '<div class="col-73"><p class="original-name">' + newDrName + '</p>' +
          '<p><span class="date-rank">2016-11-11</span> <span class="right">344.25k</span></p></div></div></div></div><div class="row row-opera hide">' +
          '<div class="col-25 share"><i class="iconfont open-popup" data-popup=".popup-share">&#xe64c;</i><span>分享</span></div>' +
          '<div class="col-25 delete"> <i class="iconfont">&#xe64b;</i> <span>删除</span></div>' +
          '<div class="col-25 rename open-popup" data-popup=".popup-rename"><i class="iconfont">&#xe64e;</i><span>重命名</span></div>' +
          '<div class="col-25 more"> <i class="iconfont">&#xe66f;</i><span>更多</span></div></div></div>').prependTo('.dr')
      }
      $.closeModal('.popup-create-new-file');
      $.closeModal('.popup-add');
    } else if ($('.popup-remove').hasClass('modal-in')) {
      if (newDrName !== '') {
        $('<li> <div class="row">' +
          '<div class="col-12"><i class="iconfont hide">&#xe653;</i><i class="iconfont">&#xe652;</i></div>' +
          '<div class="col-12"> <div class="sprite sprite-dr"></div></div>' +
          '<div class="col-76"><span class="dr-name">' + newDrName + '</span></div></div></li>').prependTo('.allDr');
        $.closeModal('.popup-create-new-file');

      }
    }
  });
  // 上传列表取消
  $(document).on('click', '.popup-up-list .content .buttons-tab .button-light', function () {
    $.confirm('未上传成功的文件将停止上传，是否确定取消', function () {
      $(this).closest('modal').addClass('hide');
      $.closeModal('.popup-up-list');
      $.closeModal('.popup-add');
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
      html += '<div class="card"><div class="card-content"><div class="card-content-inner">' +
        '<div class="row no-gutter">' +
        '<div class="col-12"> <div class="cloud-download"> <i class="iconfont ">&#xe66e;</i> </div> <div class="infinite-scroll-preloader hide"> <div class="preloader"></div> </div> <label for="file8" class="check-hide"> <div class="cloudfog-checkbox"> <input class="check-input" id="file8" type="checkbox"> <i class="iconfont">&#xe64f;</i> </div> </label> </div>' +
        '<div class="col-15"><div class="sprite sprite-jpg"></div></div><div class="col-73 cloud">' +
        '<p class="original-name">尤克里里之谈几点</p><p><span class="date-rank">2016-11-08</span><span class="right">344.25k</span>' +
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
      lastIndex = $('.list-container li').length;
      //容器发生改变,如果是js滚动，需要刷新滚动
      $.refreshScroller();
    }, 1000);
  });
});
// 上传图片
$('.popup-add').on('opened', function () {
  //上传图片
  /*
   * 先说一下步骤，webloader是同时支持PC端和移动端，无论什么端口，如果是支持HTML5调用就用H5的方式实现，如果不支持H5比如IE就调用Flash实现，所以这个插件比较慢
   */
  var uploader = WebUploader.create({
    //表示选择文件后是否自动上传
    auto: true,
    //swf文件是用于支持flash，如果浏览器不支持h5模式的上传，比如说IE 6 7 8, 就需要用的swf
    swf: "../lib/webuploader/Uploader.swf",
    //这里需要改成后台接受数据的参数
    server: 'http://webuploader.duapp.com/server/fileupload.php',
    //这个是表示点击哪一个元素出发这个插件
    pick: '#imgUpLoader',
    //表示可以重设大小，必须设置为true ，下面 compress参数才有用
    resize: true,
    //accept弹出框的提示，和后缀名限制
    accept: {
      title: '请选择图片文件',
      extensions: 'gif,jpg,jpeg,png,GIF,JPG,JPEG,PNG',
      //这个是，如果一次上传多张图片那么用都好分割
      mimeTypes: 'image/*'
    },
    //这个是表示生产的缩略图，也就是压缩图片的大小
    /*compress: {
     width: 90,
     height: 100,
     //表示图片的质量，建议写成90
     quality: 90
     },*/
    fileVal: "file", //设置文件上传域的name，不用管默认的
    fileSizeLimit: 4 * 1024 * 1024, //表示文件总大小是否超过了乘出来的值，超出了是不会加入列队的，也就是说一次行只能上传指定大小 为4 * 1024 * 1024大小。 这个是多个文件
    fileSingleSizeLimit: 2 * 1024 * 1024 //验证单个文件大小是否超出限制, 超出则不允许加入队列 ，注意这个是单个文件
  });
  //修改后图片上传前，尝试将图片压缩到90*100
  /*uploader.option('compress', {
   width: 90,
   height: 100
   });*/
  /*
   * uploadStart 某个文件开始上传前触发，一个文件只会触发一次。
   */
  uploader.on('startUpload', function () {
    $.toast("正在上传，请稍候。");
  });
  /*
   * 上传失败的时候出发
   * reason 参数是一个String对象，会返回出错的code
   */
  uploader.on('uploadError', function (file, reason) {
    $.toast("上传失败，请稍候再试。");
    console.log(reason);
  });
  /*
   * 当文件上传成功时触发。
   * response 参数返回 {Object}服务端返回的数据
   */
  uploader.on('uploadSuccess', function (file, response) {
    if (response.success) {
      //把传回来的数据加入到现有的列表,判断传入服务器的文件是什么后缀名的图片
      var fileObj = response.file;
      //后缀名
      var index1 = fileObj.lastIndexOf(".");
      var index2 = fileObj.length;
      var suffix = fileObj.substring(index1, index2);//后缀名
      suffix = suffix.toLocaleLowerCase(); //全部转为小写

      //文件后缀
      var upFileSuffix = 'sprite-jpg'; //默认为jpg类型
      if (suffix == 'jpg' || suffix == 'jpeg') {
        upFileSuffix = 'sprite-jpg';
      } else if (suffix == 'png') {
        upFileSuffix = 'sprite-png';
      } else if (suffix == 'gif') {
        upFileSuffix = 'sprite-gif';
      }
      //文件名称
      var upFileName = response.file.name.substring(0, fileName.lastIndexOf("."));
      //文件大小
      var upFileSize = response.file.Size;
      //上传时间
      var date = new Date();
      date.setMonth(date.getMonth() + 1); //月份+1
      var upFileSizeTime = date.Format("yyyy-MM-dd");

      var textHTML = '<div class="card">' +
        '<div class="card-content">' +
        '<div class="card-content-inner">' +
        '<div class="row no-gutter">' +
        '<label class="col-12" for="file11">' +
        '<div class="cloudfog-checkbox">' +
        '<input class="check-input" id="file11" type="checkbox">' +
        '<i class="iconfont">&#xe64f;</i>' +
        '</div>' +
        '</label>' +
        '<div class="col-15">' +
        '<div class="sprite ' + upFileSuffix + '"></div>' +
        '</div>' +
        '<div class="col-73">' +
        '<p class="original-name">' + upFileName + '</p>' +
        '<p>' +
        '<span class="date-rank">' + upFileSizeTime + '</span>' +
        '<span class="right">' + upFileSize + 'k</span>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      //插入到file第一个
      $('.file').prepend(textHTML);
    } else {
      $.toast(response.message);
    }
  });
});
