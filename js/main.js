$(document).ready(function() { 

    $('.header-dropdown-trigger').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent('.header-dropdown-wrapper').toggleClass('active');
    });

    $('.header-dropdown-wrapper .dropdown-menu').on('click', function(event) {
        event.stopPropagation();
    });

    $('body').on('click', function(event) {
        $('.header-dropdown-wrapper').removeClass('active');
    });

    $('.left-menu-trigger').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('left-menu-fixed');
    });

    $('.left-sidebar-menu-wrapper .has-children > a').on('click', function(event) {
        event.preventDefault();
        $(this).siblings('.child-menu').slideToggle();
        $(this).parent().toggleClass('active');
    });

    $('.left-sidebar-menu-wrapper .tooltip').tooltip();

});