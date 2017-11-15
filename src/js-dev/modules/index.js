var index = (function() {

	
	
	function lbt(){
		
		// 轮播图		
		setCarouselLfBtn();

		$(window).resize(function() {
			setCarouselLfBtn();
		});

		function setCarouselLfBtn() {
			if($(window).width() > 767) {
				$(' .carousel.slide ').mouseenter(function() {

					$(this).find('.left.carousel-control,.right.carousel-control').stop().show();

				});

				$(' .carousel.slide').mouseleave(function() {

					$(this).find('.left.carousel-control,.right.carousel-control').stop().hide();
				});
			}else{
				
				$('.carousel.slide').find('.left.carousel-control,.right.carousel-control').hide();
			}
		}
		
		
	}

	return {

		init: function() {
			
			lbt(); //轮播图
			
		
		}
	}

})();