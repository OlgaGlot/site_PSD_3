"use strict";

        $(document).ready(function() {
            
            $(window).scroll(function() {
                
                // изменения вида фиксированного верхнего меню в зависимости от положения на странице
                // и размера экрана устр-ва
                let topNow = $(window).scrollTop();
                if (Modernizr.mq('(min-width: 610px)')) {
                    if (topNow < 27) $(".nav").css({paddingTop: '0px', paddingBottom: '0px', backgroundColor: 'transparent', opacity: '1'});
                    else $(".nav").css({top: '0', paddingTop: '0px', paddingBottom: '0px', backgroundColor: '#f0f0f0', opacity: '0.9'});
                } else {
                    $(".nav").css({paddingTop: '0px', paddingBottom: '0px', backgroundColor: 'transparent', opacity: '1'});

                }

                // индикация нахождения на определенном разделе страницы (отображение индикации в верхнем фиксированном меню)
                let home_top = $(".header_bg").offset().top - 10;
                let about_top = $(".about_us_bg").offset().top  - 10;
                let team_top = $(".team_bg").offset().top  - 10;
                let services_top = $(".services_bg").offset().top  - 10;
                let blog_top = $(".btn_visit_blog").offset().top  - 10;
                let contact_top = $(".contact_us_bg").offset().top  - 10;
                if (topNow >= contact_top) {
                    $(".active").removeClass("active");
                    $(".second-part > li:nth-child(3)").addClass("active");
                } else if (topNow >= blog_top) {
                    $(".active").removeClass("active");
                    $(".second-part > li:nth-child(2)").addClass("active");
                } else if (topNow >= services_top) {
                    $(".active").removeClass("active");
                    $(".second-part > li:nth-child(1)").addClass("active");
                } else if (topNow >= team_top) {
                    $(".active").removeClass("active");
                    $(".first-part > li:nth-child(3)").addClass("active");
                } else if (topNow >= about_top) {
                    $(".active").removeClass("active");
                    $(".first-part > li:nth-child(2)").addClass("active");
                } else if (topNow >= home_top) {
                    $(".active").removeClass("active");
                    $(".first-part > li:nth-child(1)").addClass("active");
                }
            }); 

            // при уменьшении и увеличении размера окна браузера тоже меняем св-ва верхнего меню
                $(window).resize(function() {
                if (Modernizr.mq('(max-width: 610px)')) {
                    $(".nav").css({paddingTop: '0px', paddingBottom: '0px', backgroundColor: 'transparent', opacity: '1'});
                } else {
                    let topNow1 = $(window).scrollTop();
                    if (topNow1 < 27) $(".nav").css({paddingTop: '0px', paddingBottom: '0px', backgroundColor: 'transparent', opacity: '1'});
                    else $(".nav").css({top: '0', paddingTop: '0px', paddingBottom: '0px', backgroundColor: '#f0f0f0', opacity: '0.9'});
                }
            });

            // переход к определенному разделу страницы при щелчке на пункте верхнего фиксированного меню
            let menu_header_items = $.merge($(".first-part > li"), $(".second-part > li"));
            for (let menu_header_item of menu_header_items) {
                $(menu_header_item).click( function(event) {     
                    event.preventDefault();
                    if ($(menu_header_item).text() == 'Home') 
                        $('html, body').animate({
                            scrollTop: $(".header_bg").offset().top 
                        }, 1000);
                    else if ($(menu_header_item).text() == 'About Us')
                        $('html, body').animate({
                            scrollTop: $(".about_us_bg").offset().top 
                        }, 1000);
                    else if ($(menu_header_item).text() == 'Team')
                        $('html, body').animate({
                            scrollTop: $(".team_bg").offset().top 
                        }, 1000);
                    else if ($(menu_header_item).text() == 'Services')
                        $('html, body').animate({
                            scrollTop: $(".services_bg").offset().top 
                        }, 1000);
                    else if ($(menu_header_item).text() == 'Blog')
                        $('html, body').animate({
                            scrollTop: $(".btn_visit_blog").offset().top 
                        }, 1000);
                    else if ($(menu_header_item).text() == 'Contact Us')
                        $('html, body').animate({
                            scrollTop: $(".contact_us_bg").offset().top 
                        }, 1000);
                });
            }    
        });