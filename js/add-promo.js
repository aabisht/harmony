$(document).ready(function() {
    $('#adPlannerTemplates').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function customTemplateShowHide(target) {
        if(target === "#adPlannerCustomTemplate") {
            $('.adPlannerCustomTemplateWrapper').find('.ad-planer-template-img-wrapper').hide();
            $('.adPlannerCustomTemplateWrapper').find('.ad-planer-template-form-wrapper').show();
            $('.adPlannerCustomTemplateWrapper').find('.templateSaveBtn').css({'display': 'inline-block'});
            $('.adPlannerCustomTemplateWrapper').find('.templateNextBtn').css({'display': 'inline-block'});
            $('.adPlannerCustomTemplateWrapper').find('.templateSelectorBtn').hide();
        } else {
            $('.adPlannerCustomTemplateWrapper').find('.ad-planer-template-img-wrapper').show();
            $('.adPlannerCustomTemplateWrapper').find('.ad-planer-template-form-wrapper').hide();
            $('.adPlannerCustomTemplateWrapper').find('.templateSaveBtn').hide();
            $('.adPlannerCustomTemplateWrapper').find('.templateNextBtn').hide();
            $('.adPlannerCustomTemplateWrapper').find('.templateSelectorBtn').show();
        }
    }
    
    $('body').on('click', '.templateSelectorBtn', function(event) {
        event.preventDefault();
        var target = $(this).attr('data-target');
        $(target).prop("checked", true);
        $(this).closest('.ad-planer-template').siblings().find('.templateSelectorBtn').removeClass('disabled');
        $(this).closest('.ad-planer-template').siblings().removeClass('selected-template');
        $(this).closest('.ad-planer-template').addClass('selected-template');
        $(this).addClass('disabled');

        customTemplateShowHide(target);
    });

    $('body').on('change', '.templateSelectorRadio', function(event) {
        event.preventDefault();
        $(this).closest('.ad-planer-template').siblings().removeClass('selected-template');
        $(this).closest('.ad-planer-template').addClass('selected-template');
        $(this).closest('.ad-planer-template').siblings().find('.templateSelectorBtn').removeClass('disabled');
        $(this).closest('.ad-planer-template').find('.templateSelectorBtn').addClass('disabled');
        customTemplateShowHide('#'+$(this).attr('id'));
    });
});