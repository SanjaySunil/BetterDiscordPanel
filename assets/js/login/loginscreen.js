/**
 * @file loginscreen.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

$(function() {
  $('#container').append('<style>#container, .acceptContainer:before');
  setTimeout(function() {
    $('.logoContainer').transition(
        {
          scale: 1,
        },
        700,
        'ease',
    );
    setTimeout(function() {
      $('.logoContainer .logo').addClass('loadIn');
      setTimeout(function() {
        $('.logoContainer .text').addClass('loadIn');
        setTimeout(function() {
          $('.acceptContainer').transition({
            height: '431.5px',
          });
          setTimeout(function() {
            $('.acceptContainer').addClass('loadIn');
            setTimeout(function() {
              $('.formDiv, form h1').addClass('loadIn');
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 1000);
  }, 10);
});

document.querySelector('#token').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    login();
  }
});
