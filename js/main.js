$(document).ready(function() { 
    loadLeftMenu();
    loadHeader();
    
    function loadLeftMenu() {
        return $('.left-menu-wrapper').load("template/left-menu.html", function() { 
            $(this).trigger('create');
        });
    }

    function loadHeader() {
        return $('.header-container').load("template/header.html", function() { 
            $(this).trigger('create');
        });
    }

    $('body').on('click', '.header-dropdown-trigger', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent('.header-dropdown-wrapper').toggleClass('active');
    });

    $('body').on('click', '.header-dropdown-wrapper .dropdown-menu', function(event) {
        event.stopPropagation();
    });

    $('body').on('click', function() {
        $('.header-dropdown-wrapper').removeClass('active');
    });

    $('body').on('click', '.left-menu-trigger', function(event) {
        event.preventDefault();
        $('body').toggleClass('left-menu-fixed');
    });

    $('body').on('click', '.left-sidebar-menu-wrapper .has-children > a', function(event) {
        event.preventDefault();
        $(this).siblings('.child-menu').slideToggle();
        $(this).parent().toggleClass('active');
    });
    
    $(document).ready(function(){
        $('select').formSelect();
    });

});