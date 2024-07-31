/*=========


Template Name: DashCode -  HTML Template

=========*/

/*=========
----- JS INDEX -----

=========*/

$(document).ready(function($) {

	// Whole Script Strict Mode Syntax
	"use strict";
    $("[data-background").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });

	// Sticky Header JS Start
	$(window).on( 'scroll', function(){
		if ($(window).scrollTop() >= 100) {
			$('.header-area').addClass('sticky-header');
		}
		else {
			$('.header-area').removeClass('sticky-header');
		}
	});
	var a = 0;
	var b = 0;
	$(window).on('scroll', function() {

	// Counting JS Start
		var oTop = $('#counter').offset().top - window.innerHeight;
		if (a === 0 && $(window).scrollTop() > oTop) {
			$('.counting-data').each(function() {
			  var $this = $(this),
			      countTo = $this.attr('data-count');
			  
			  $({ countNum: $this.text()}).animate({
			    countNum: countTo
			  },

			  {

			    duration: 3000,
			    easing:'linear',
			    step: function() {
			      $this.text(Math.floor(this.countNum));
			    },
			    complete: function() {
			      $this.text(this.countNum);
			    }

			  });  
			  
			});
		a = 1;
	  	}
	// Counting JS End

	});
	
$("[data-toggle=\"tooltip\"]").tooltip();
$("input.slider").on("input change", function(event) {
	var element = $(this).parents("div.banner-slider");
	var pos = event.target.value;
	
	element.find("div.before").css({width: pos + "%"});
	element.find("div.slider-button").css({left: "calc(" + pos + "% - 18px)"});
});



		// banner carousel JS Start
$('.review-slider').owlCarousel({
    loop:true,
    margin:20,
		dots: true,
		nav: false,

    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
		1000:{
            items:3
        },
        1200:{
            items:4
        }
    }
});
$('.partner-carousel').owlCarousel({
    loop:true,
	autoplay:true,
	autoplayTimeout:3000,
    margin:20,
	dots:false,
	nav: false,

    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
		1000:{
            items:4
        },
        1200:{
            items:6
        }
    }
});

  	// Toggle Menu Mobile JS Two
	$(".toggle-button").on( 'click', function(){
		$(".main-navigation").toggleClass('toggle-menu');
		$(".main-menu  .black-shadow").fadeToggle();
	});
	$(".main-navigation ul li a").on( 'click', function(){
		$(".main-navigation").removeClass('toggle-menu');
		$(".main-menu  .black-shadow").fadeOut();
	});
	$(".main-navigation ul li.sub-items>a").on( 'click', function(){
		$(".main-navigation").addClass('toggle-menu');
		$(".main-menu  .black-shadow").stop();
	});
	$(".main-menu  .black-shadow").on( 'click', function(){
		$(this).fadeOut();
		$(".main-navigation").removeClass('toggle-menu');
	});

		$("#nav-tab").on('click', 'a.nav-item', function() {
            if ($('a.nav-item').hasClass('active')) {
                $('a.nav-item').removeClass('active');
            }
            $(this).addClass('active');
        });
        var FeaturesOwl = $('#features .owl-carousel');
        FeaturesOwl.owlCarousel({
            items: 1,
            loop: true,
            autoplay: false,
            center: true,
            margin: 10,
            URLhashListener: true,
            startPosition: 'URLHash',
            dots: false,
            nav: true,
            navText: [
            '<i class="fa fa-arrow-left"></i>',
            '<i class="fas fa-arrow-right"></i>',
            ],
            addClassActive: true,
			
        });
        $(function(event) {
            var hash = $(".owl-item.active").children().attr('data-hash');
            $('.' + hash).addClass('active');
        });
        FeaturesOwl.on('changed.owl.carousel', function(event) {
            var current = event.item.index;
            var hash = $(event.target).find(".owl-item").eq(current).children().attr('data-hash');
            $('.' + hash).siblings().removeClass('active');
            $('.' + hash).addClass('active');
        });
	
		// owl carousel 
		$('.applications-carousel').owlCarousel({
			loop: true,
			margin: 15,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>',
			],
			dots: false,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				},
				1200: {
					items: 4
				}
			}
		});
		

});