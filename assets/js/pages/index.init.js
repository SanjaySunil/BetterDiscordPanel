/**
 * @file index.init.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

$(document).ready(function() {
  $('.popup-img').magnificPopup({
    type: 'image',
    closeOnContentClick: !0,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: !0,
    },
  }),
  $('#user-status-carousel').owlCarousel({
    items: 4,
    loop: !1,
    margin: 16,
    nav: !1,
    dots: !1,
  }),
  $('#user-profile-hide').click(function() {
    $('.user-profile-sidebar').hide();
  }),
  $('.user-profile-show').click(function() {
    $('.user-chat').addClass('user-chat-show');
    $('.user-profile-sidebar').show();
  }),
  $('.channels').click(function() {
    $('.user-chat').addClass('user-chat-show');
  }),
  $('.user-chat-remove').click(function() {
    $('.user-chat').removeClass('user-chat-show');
  });
});
