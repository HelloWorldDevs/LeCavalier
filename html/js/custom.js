(function($) {
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

  $(window).on("resize", function () {
    HWD.fixRows();
  });
})(jQuery);
