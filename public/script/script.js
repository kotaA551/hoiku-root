$(function () {
  const $menuTrigger = $('.hamb_inr');
  const $sitemap = $('.header_sitemap_cont');

  $menuTrigger.on('click', function () {
    $sitemap.toggleClass('is-open');
    $menuTrigger.parent().toggleClass('js_open');
  });
});


// スクロール時のヘッダーの透明度変更
$(window).on('scroll', function () {
  const scrollThreshold = 600;
  const $header = $('header');

  if ($(this).scrollTop() > scrollThreshold) {
    $header.addClass('solid-header').removeClass('transparent-header');
  } else {
    $header.addClass('transparent-header').removeClass('solid-header');
  }
});


$(function () {
    $('.tab_btn a').on('click', function () {
      var target = $(this).data('tab');

      $('.tab_btn a').removeClass('is-active');
      $(this).addClass('is-active');

      $('.tab-contents-item').removeClass('is-active').hide();
      $(target).addClass('is-active').show();
    });

    $('.tab-contents-item').not('.is-active').hide();
});



