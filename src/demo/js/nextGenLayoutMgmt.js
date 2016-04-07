    $(function() {
        $('.panel').each(function() {
            console.log(' :' + $(this).closest('section').height());
            $(this).height($(this).closest('section').height() - 30);
            $(this).find('.panel-body').height($(this).closest('.panel').height() - 80);

        })


        $('.rg-right').mousedown(function(){
            console.log('test');   

            $(this).closest('.row').children('section').each(function(){
                   $(this).removeClass(function (index, css) {
                        return (css.match (/\bcol-\S+/g) || []).join(' ');
                    })
                   console.log('removed');

               })  

        })


        $('.rg-bottom').mouseup(function(event) {

            $('.panel').each(function() {
                if ($(this).height() > $(this).closest('section').height()) {
                    $(this).height($(this).closest('section').height());
                    $(this).find('.panel-body').height($(this).closest('.panel').height() - 100);
                }
                //console.log('sectionHeight :' + $(this).closest('section').height() + 'panelHeight: ' + $(this).height());

                if ($(this).closest('section').height() - $(this).height() > 30) {
                    $(this).height($(this).closest('section').height());
                    $(this).find('.panel-body').height($(this).closest('.panel').height() - 100);
                }
            })

            $('iframe').each(function(){
                //$(this).height($(this).closest('.panel-body'));
                //$(this).contents().height($(this).contents().find("html").height());
                //$(this).height($(this).closest('.panel-body').height()+80);
                console.log('heightContiner :'+$(this).closest('.panel-body').height());
                $(this).height($(this).closest('.panel-body').height()-10);
            })

        });

    });

    // ========= controls code BEGIN
        var collapsedPanels = [];
        function pushPanel(rPH, PH) {
            if (collapsedPanels.indexOf(rPH) < 0) {
                    console.log('not found :'+rPH);
                    collapsedPanels.push(rPH);
                    $('.toolbar ul').append('<li><a href="#" data-panelid="'+rPH+'">'+PH+'</a></li>');
                }
                console.log('collapsedPanels :'+collapsedPanels);
        }


        $('.close-control').click(function(){
            var panelHeading = $(this).closest('.panel-control').prev('h3').text().toLowerCase();
            var refinedPanelHeading = panelHeading.replace(" ","_");
            var visiblePanels = $(this).closest('.row').children('section:visible').length;

            $(this).closest('section').attr('id',refinedPanelHeading);
            $(this).closest('section').hide();
            pushPanel(refinedPanelHeading, panelHeading);

            /*$('.toolbar ul').append('<li><a href="#" data-panelid="'+refinedPanelHeading+'">'+panelHeading+'</a></li>');*/

            $('.row').each(function(){
                var sections = $(this).children('section:visible').length;
                var visibles = $(this).children('section.resizable:visible').length;
                if ($(this).children('section.resizable:visible').length >= 1  && visibles == sections) {
                    $(this).children('section.resizable:visible').addClass('fullFlexBasis');
                }
            })
            

            if (visiblePanels === 1) {
                $(this).closest('.row').hide();
            }
            else {
                $(this).closest('.row').show();
            }

        });

        $('.maximize-control').click(function(){
            var currentSection = $(this).closest('section');
            var currentRow = $(this).closest('.row');
            $('section').not(currentSection).each(function(){
                var $thisSection = $(this);
                var panelHeading = $thisSection.find('h3').text().toLowerCase();
                var refinedPanelHeading = panelHeading.replace(" ","_");
                $thisSection.attr('id',refinedPanelHeading);
                $thisSection.hide();
                pushPanel(refinedPanelHeading, panelHeading);
                /*$('.toolbar ul').append('<li><a href="#" data-panelid="'+refinedPanelHeading+'">'+panelHeading+'</a></li>');*/
            });
            $(this).hide();

            $('.row').not(currentRow).each(function(){
                $(this).hide();
            })

            currentSection.addClass('fullFlexBasis');



        });

        $('body').on('click','.toolbar a', function(){
            var panelID = $(this).data('panelid');
            collapsedPanels.splice(collapsedPanels.indexOf(panelID),1);
            console.log('collapsedPanels :'+collapsedPanels);
            $('#'+panelID).closest('.row').show();
            $('#'+panelID).show();
            $(this).closest('li').remove();
            $('.maximize-control').show();
            $('.row').each(function(){
                var sections = $(this).children('section:visible').length;
                var visibles = $(this).children('section.resizable:visible').length;


                console.log('resizable: '+$(this).children('section.resizable:visible').length);
                console.log('sections: '+$(this).children('section:visible').length);
                if ($(this).children('section.resizable:visible').length >= 1  && visibles == sections) {
                    $(this).children('section.resizable:visible').addClass('fullFlexBasis');
                }
                else {
                    $(this).children('section').removeClass('fullFlexBasis');
                }
            })

            $('section.resizable:visible').each(function(){
                $(this).css('flex-basis','');
            })

            $('.maximize-control').each(function(){
                $(this).show();
            })
        });

    // ========= controls code END



    document.addEventListener("DOMContentLoaded", function(event) {
        document.addEventListener("mousedown", function(e) {
            var iframes = document.getElementsByTagName("iframe");

            for (var i = 0; i < iframes.length; i++) {
                iframes[i].style.pointerEvents = "none";
            }
        }, true);
        document.addEventListener("mouseup", function(e) {
            var iframes = document.getElementsByTagName("iframe");

            for (var i = 0; i < iframes.length; i++) {
                iframes[i].style.pointerEvents = "auto";
            }
        }, true);
    });
