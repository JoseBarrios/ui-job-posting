$(document).ready(function (s) {

    $( window ).resize(function() {
        resizeChossenSelect();
    });

    var config = {
        '.chosen-select'           : {disable_search_threshold:10},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"100%"}
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }


    $('[data-toggle="tooltip"]').tooltip()

    if ($('a[data-toggle="tab"]').length > 0){
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            e.target // newly activated tab
            var masonry = "."+$(e.target).attr('data-masonry');
            e.relatedTarget // previous active tab
            $(masonry).masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: 330,
                gutter: 25
            });
        });
    }

    if ($('.myposts').length > 0) {
        $('.myposts').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 330,
            gutter: 25
        });
    }
    if ($('.avaliables').length > 0) {
        $('.avaliables').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 330,
            gutter: 25
        });
    }

    $("#btn-upload-image").click(function(s) {
        $("#feature-image").click();
        return false;
    });
    $("#btn-add-photo").click(function (e) {
        $("#input-add-image").click();
        return false;
    });
});

function resizeChossenSelect(){

    $(".chosen-container").each(function() {
        $(this).attr('style', 'width: 100%');
    });

}
