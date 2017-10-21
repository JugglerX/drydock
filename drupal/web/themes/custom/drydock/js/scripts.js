console.log('Scripts.js');

(function ($, Drupal) {

  Drupal.behaviors.hamburger = {
    attach: function (context) {

      $('#hamburger').on('click', function (e) {
        console.log($(this));
        console.log($(this).hasClass('open'));
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
          $('#block-mainnavigation').removeClass('open');
        } else {
          $(this).addClass('open');
          $('#block-mainnavigation').addClass('open');
        }
      });

      $('#block-mainnavigation').on('click', function(e) {
        console.log(e.target == this);
        if (e.target == this) {
          console.log($(this));
          $(this).removeClass('open');
          $('#hamburger').removeClass('open');
        }
      })

    }
  };

  // Drupal.behaviors.tooltipster = {
  //   attach: function (context) {
  //     $('.tooltipster-text').tooltipster({
  //       animation: 'fade',
  //       delay: [300, 100],
  //       trigger: 'custom',
  //       triggerOpen: {
  //         mouseenter: true,
  //         touchstart: true
  //       },
  //       triggerClose: {
  //         mouseleave: true,
  //         click: true,
  //         scroll: true,
  //         tap: true
  //       },
  //       interactive: true,
  //       side: 'right',
  //       arrow: true,
  //       maxWidth: 250
  //     });
  //   }
  // };

}(jQuery, Drupal));
