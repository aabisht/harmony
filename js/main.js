$(document).ready(function() { 

    $('.tooltip').tooltip();
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();

    loadLeftMenu();
    // loadHeader();
    
    function loadLeftMenu() {
        return $('.left-menu-wrapper').load("template/left-menu.html", function() { 
            $(this).trigger('create');
            $('.header-container, .main-body-content-wrapper').show();
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
    
    $('select').formSelect();
    $('.collapsible').collapsible();
    // $('.datepicker').datepicker();

    $('body').on('click', '.select-wrapper input.select-dropdown', function(event) {
        event.stopPropagation();
    });

    $('body').on('click', '.modal-button-add-more', function(event) {
        event.preventDefault();
        var modalFormItem = $('.modal-form-item'), itemLength = modalFormItem.length, nextItemNum = (itemLength+1);

        $(modalFormItem[itemLength - 1]).after('<div class="modal-form-item modal-form-item-'+nextItemNum+'" data-index="'+nextItemNum+'"><div class="row align-items-start justify-content-center"><div class="col-md-10 modal-form-input-wrapper"><div class="row align-items-start justify-content-center"></div></div><div class="col-md-2 modal-form-input-action-wrapper"><div class="button-wrapper"><a href="javascript:;" class="button-primary button-stroked tooltip modal-button-clear-row" data-tooltip="Clear Field"><i class="fas fa-times-circle"></i></a><a href="javascript:;" class="button-primary button-stroked tooltip modal-button-remove-row" data-tooltip="Remove Field"><i class="fas fa-minus-circle"></i></a></div></div></div></div>');

        $('.modal-form-item-'+nextItemNum+' .modal-form-input-wrapper > .row').append('<div class="col-sm-4"> <div class="cell-wrapper"> <div class="input-field"> <select id="modal-attribute-list-'+nextItemNum+'" class="modal-attribute-list"> <option value="" disabled selected>Choose Attribute List</option> <option value="1">Option 1</option> <option value="2">Option 2</option> <option value="3">Option 3</option> </select> <label for="modal-attribute-list-'+nextItemNum+'">Attribute List</label> </div> </div> </div>');

        $('.modal-form-item-'+nextItemNum+' .modal-form-input-wrapper > .row').append('<div class="col-sm-4"> <div class="cell-wrapper"> <div class="input-field"> <select id="modal-operator-'+nextItemNum+'" class="modal-operator"> <option value="" disabled selected>Choose Operator</option> <option value="contains">CONTAINS</option> <option value="equals">EQUALS</option> <option value="starts">STARTS</option> </select> <label for="modal-operator-'+nextItemNum+'">Operator</label> </div> </div> </div>');

        $('.modal-form-item-'+nextItemNum+' .modal-form-input-wrapper > .row').append('<div class="col-sm-4"> <div class="cell-wrapper"> <div class="input-field"> <input placeholder="Enter default value" id="modal-value-'+nextItemNum+'" type="text" class="modal-value"> <label for="modal-value-'+nextItemNum+'" class="active">Value</label> </div> </div> </div>');

        $('.modal-form-item-'+nextItemNum+' select').formSelect();
        $('.modal-form-item-'+nextItemNum+' .tooltip').tooltip();

    });

    $('body').on('click', '.modal-button-clear-row', function(event) { 
        event.preventDefault();
        $(this).closest('.modal-form-item').find('.modal-form-input-wrapper').find('.modal-attribute-list').val('');
        $(this).closest('.modal-form-item').find('.modal-form-input-wrapper').find('.modal-operator').val('');
        $(this).closest('.modal-form-item').find('.modal-form-input-wrapper').find('.modal-value').val('');

        $(this).closest('.modal-form-item').find('.modal-form-input-wrapper').find('select').formSelect();
    });

    $('body').on('click', '.modal-button-remove-row', function(event) { 
        event.preventDefault();
        $(this).closest('.modal-form-item').remove();
    });

    $('body').on('click', '.removed-saved-search-modal', function() { 
        var removedSavedSearchName = '',
            removedSavedSearchIndex = '';

        removedSavedSearchName = $(this).attr('data-name').trim();
        removedSavedSearchIndex = $(this).attr('data-item').trim();

        $('#deleteSavedSearchName').text(removedSavedSearchName);
        $('.removed-saved-search').attr('data-delete-index', removedSavedSearchIndex);
    });

    $('body').on('click', '.removed-saved-search', function(event) { 
        event.preventDefault();
        var deleteIndex = $(this).attr('data-delete-index');
        $('.removed-saved-search-modal[data-item="'+ deleteIndex +'"]').parent('.header-saved-search-item').remove();

        var saveSearchLength = $('.removed-saved-search-modal').closest('.dropdown-content').children('li').length;
        console.log(saveSearchLength);
        if(saveSearchLength === 0) {
            $('.save-search-trigger').parent('.button-primary').removeClass('button-with-dropdown');
            $('.save-search-trigger').hide();
        } else {
            if(!$('.save-search-trigger').parent('.button-primary').hasClass('button-with-dropdown')) {
                $('.save-search-trigger').parent('.button-primary').addClass('button-with-dropdown');
            }
            $('.save-search-trigger').show();
        }
    });

    $('body').on('click', '.input-field-remove-trigger', function() {
        $(this).closest('.header-adv-search-input-input-item').remove();
    });

    $('body').on('click', '.save-saved-search-name', function() {
        var val = $('#saveSearchNameInput').val(),
            itemLength = $('#savedSearchWrapper > li').length;

        $('#savedSearchWrapper').append('<li class="header-saved-search-item"><a href="javscript:;">'+val+' </a> <a href="javascript:;" class="removed-saved-search-modal modal-trigger"  data-target="deleteSavedSearchModal" data-item="'+(itemLength+1)+'" data-name="Organic Items"><i class="far fa-trash-alt"></i></a></li>');
        // debugger;
    });

    

    $('.tooltip').tooltip();
    $('.modal').modal();
    $('.dropdown-trigger').dropdown();

});