/**
 * @file app.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

!(function(a) {
  'use strict';
  a('.dropdown-menu a.dropdown-toggle').on('click', function(t) {
    return (
      a(this).next().hasClass('show') ||
      a(this)
          .parents('.dropdown-menu')
          .first()
          .find('.show')
          .removeClass('show'),
      a(this).next('.dropdown-menu').toggleClass('show'),
      !1
    );
  }),
  a(function() {
    a('[data-toggle="tooltip"]').tooltip();
  }),
  a(function() {
    a('[data-toggle="popover"]').popover();
  }),
  a('#light-dark').on('click', function(t) {
    if (localStorage.getItem('theme') == 'dark') {
      localStorage.setItem('theme', 'light');
      $('.bot-avatar').css('display', 'none');
      setTimeout(() => {
        $('.bot-avatar').fadeIn();
      }, 100);
      checkTheme();
    } else {
      localStorage.setItem('theme', 'dark');
      $('.bot-avatar').css('display', 'none');
      setTimeout(() => {
        $('.bot-avatar').fadeIn();
      }, 100);
      checkTheme();
    }
    // location.reload();
  }),
  Waves.init();
  $('[contenteditable]').focusout(function() {
    const element = $(this);
    if (!element.text().trim().length) {
      element.empty();
    }
  });
  function checkTheme() {
    if (localStorage.getItem('theme') == 'light') {
      setTimeout(() => {
        a('#bootstrap-style').attr('disabled', !1);
      }, 50);
      setTimeout(() => {
        a('#bootstrap-dark-style').attr('disabled', !0);
        a('#app-dark-style').attr('disabled', !0),
        a('#app-style').attr('disabled', !1);
      }, 100);
    } else {
      localStorage.setItem('theme', 'dark');
      setTimeout(() => {
        a('#bootstrap-dark-style').attr('disabled', !1);
      }, 50);
      setTimeout(() => {
        a('#bootstrap-style').attr('disabled', !0),
        a('#app-dark-style').attr('disabled', !1),
        a('#app-style').attr('disabled', !0);
      }, 100);
    }
  }
  checkTheme();
})(jQuery);
