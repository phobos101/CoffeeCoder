$(function() {
  $('.code-nav').on('click', function() {
    event.preventDefault();
  });

  $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $(this).parent().addClass('open');
  });
});
