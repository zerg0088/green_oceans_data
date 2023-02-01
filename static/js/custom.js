var isScroll = false;

function focusMove(target) {
    var t = $(target).offset().top - $(".gnb-inner").height();
    // console.log($('html'))

    $("html").scrollTop(t);
}

function openBox(e) {
    var botHeight;
    var topHeight;

    if($(window).width() > 1650) {
        topHeight = $(window).height()/3.5;
        botHeight = -$(window).height()/2.33;
    }else{
        topHeight = $(window).height()/3.5;
        botHeight = -$(window).height()/2.45;
    }

    $('.blue-top').animate({top: "0"}, 1200,"easeInCubic");
    $('.blue-bottom').animate({bottom: "-60vh"}, 1200,"easeInCubic", function () {
        $('.blue-bottom').addClass("change");
        $('.blue-bottom').addClass("change_z");
    });
   
    $('.blue-top').animate({top: topHeight}, 1400,"easeOutSine");
    $('.blue-bottom').animate({bottom: botHeight}, 1400,"easeOutSine", function () {
        $('body').removeClass('no-scroll');
        $('footer, .record').removeClass('wv-hide');
    });
}

function youtubopen2(data, oj) {
    var subscribe = $(oj).next().html();
    var videotitle = $(oj).attr('title');

    $.magnificPopup.open({
        items: {
            src:'https://www.youtube.com/watch?v='+data
        },
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        closeOnBgClick: false,
        fixedContentPos: true,
        closeMarkup: '<button type="button" class="mfp-close tBtn">---</button><div class="mfp-close cBtn" aria-hidden="true"><i class="xi-close"></i></div>',
        autoFocusLast: true,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe title="'+videotitle+'��" class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>'+
                ''+
                '<div  style="bottom: -100px; position: relative; display: block; margin: 0 auto; text-align: left;"><div tabindex="0" style="padding: 15px 15px; color: #0b2e4c; background-color: #fff; border-radius: 5px; font-size: 14px; width:100%;height:100px; display: inline-block; overflow:auto; line-height:normal;">'+ subscribe +'</div></div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
            patterns: {
                youtube: {
                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                    src: '//www.youtube.com/embed/%id%?autoplay=0'
                }

                // you may add here more sources

            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }
    });
}

$(document).ready(function () {

    history.scrollRestoration = "manual"

    openBox();

    //Main Intro
    $(window).resize(function() {

        var percent = 0;
        var percent2 = 0;

        if($(window).width() >= 1650) {
            percent = 2.33;
        }else if($(window).width() < 1650) {
            percent = 2.45;
        }

        var blueTop = $(window).height()/3.5;
        var blueBottom = $(window).height()/percent;
        $(".blue-top.change").css("top",blueTop);
        $(".blue-bottom.change_z").css("bottom",-blueBottom);

    })

    //HEADER
    $('.gnb-menu li').mouseenter(function () {
        $(this).children('.gnb-sub').stop().fadeIn()
    })

    $('.gnb-menu li').focusin(function() {
        $(this).children('.gnb-sub').stop().fadeIn()
    });
    $('.gnb-menu li').mouseleave(function () {
        $(this).children('.gnb-sub').stop().fadeOut()
    })
    $('.gnb-menu li').focusout(function () {
        $(this).children('.gnb-sub').stop().fadeOut()
    })


    //FOOTER
    $('.sitemap-btn').click(function () {
        $(this).siblings().toggleClass('show');
        $(this).toggleClass('closed');
    });

    $(window).on("scroll", function(e){
        if($(window).scrollTop() != 0) {
            $(".lnb-outer, .gnb-outer").css('background-color','#1B3FD8');
        }else{
            $(".lnb-outer, .gnb-outer").css('background-color','transparent');
        }
    })

    $(window).scroll(function(){
        if($(window).scrollTop() > 40) {
            $('.lnb-outer').addClass('active')
        }
        else {
            $('.lnb-outer').removeClass('active')
        }
    })

    $(window).scroll(function(){
        if($(window).scrollTop() > 40) {
            $('.gnb-outer').addClass('topmove')
			if($('#divpop').css('display') == 'none') {
				 $('.gnb-outer').css('position','absolute').css('top','-57px')
			}
        }
        else {
            $('.gnb-outer').removeClass('topmove')
			if($('#divpop').css('display') == 'none') {
				$('.gnb-outer').css('position','').css('top','')
			}
        }
    })

//    top_banner
    $('.top_txt3').click(function(){
        $('.top_banner').addClass( 'top_hidden' );
        $('header').css("top","0");
        $('.container').css("margin-top","0");
    });

});

//accessibility
function acc(target){
    $(target).focus();
};
