(function($) {
  var HelloWorldDevs = function() {
    this.rowLength = 3;
    this.rowNum = 1;
    that = this;
    $('.fslider.customjs').flexslider({
      selector: ".slider-wrap > .slide",
      animation: 'slide',
      easing: 'swing',
      direction: 'horizontal',
      reverse: false,
      slideshow: 'false',
      slideshowSpeed: Number(5000),
      animationSpeed: Number(600),
      pauseOnHover: true,
      video: false,
      controlNav: false,
      directionNav: false,
      smoothHeight: false,
      useCSS: true,
      touch: true,
      start: function (slider) {
        SEMICOLON.widget.animations();
        SEMICOLON.initialize.verticalMiddle();
        slider.removeClass('preloader2');
      }
    });
    $('.ui-accordion-header').click(function () {
     $(this).parent().find('.ui-accordion-content').addClass('folded');
     $(this).next().removeClass('folded');
   });

    $('.load-more').on("click", function () {
      HWD.rowNum += 1;
      HWD.fixRows();
    });
  };

  HelloWorldDevs.prototype.fixRows = function () {
    var rowLength = ($(window).width() < 992) ? 2 : 3;
    var mod = rowLength * this.rowNum;
    var $cells = $('.section-services__service-tile');
    var $loadMore = $('.load-more');
    for (var x = 0; x < $cells.length; x++) {
      if (x < mod) {
        $($cells[x]).removeClass('hidden');
      } else {
        $($cells[x]).addClass('hidden');
      }
      if ($cells.length <= mod) {
        $loadMore.hide();
      }
    }
  };

  HelloWorldDevs.prototype.noOrphans = function (selectors) {
    $(selectors).each(function () {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    });
  };

  HelloWorldDevs.prototype.mailForm = function (form) {
    var $form = $(form);
    $form.before('<div class="form-error"></div>');
    $form.submit(function(e) {
      e.preventDefault();
      var formData = $form.serialize();
      var formAction = $form.attr('action');
      $.ajax({
        type: 'POST',
        url: formAction,
        data: formData,
        dataType: 'json',
        encode: true
      }).done(function (response) {
        $('.form-error').remove();
        $form.replaceWith('Congratulations! Dentistry is a big part of a \
	            healthy life, and we\'re excited to be a part of yours. We will \
	            contact you in the next 2 business days to schedule your \
	            appointment and to answer any questions you may still have. \
	            Thank you!');
      }).error(function (response) {
        var $error_list = $('<ul></ul>');
        $.each(response.responseJSON, function(key, value) {
          $error_list.append('<li>'+value+'</li>');
        });
        $('.form-error').html($error_list).fadeIn();
      });
    });
  };

  var HWD = new HelloWorldDevs();
  $(document).ready(function () {
    HWD.fixRows();
    HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p');
    HWD.mailForm('#mail-form');
    $('.tour-slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplaySpeed: 8000,
    });
    $('.team-slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplaySpeed: 8000,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  });
  $(window).on("resize", function () {
    HWD.fixRows();
  });
})(jQuery);
