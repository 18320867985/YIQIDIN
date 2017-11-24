var index = (function($) {

	/* 首页图片轮播*/
	function _lbt(){
	
			$(".index-cont-lbt-big").hover(function() {
				$(this).find(".prev,.next").fadeTo("show", 0.5);
			}, function() {
				$(this).find(".prev,.next").hide();
			})
		
			$(".prev,.next").hover(function() {
				
				$(this).fadeTo("show", 0.7);
			}, function() {
				$(this).fadeTo("show", 0.1);
			})
			$(".index-cont-lbt-big").slide({
				titCell: ".num ul",
				mainCell: ".lbt-items",
				effect: "fold",
				autoPlay: true,
				delayTime: 700,
				autoPage: true,
				interval:3000
				
			});
	
	}
	
	
	/* 滑梯*/
	function _huati(){
			
		
		//划梯位置
		function  setHeight(){
			var index_left = parseInt($('.container-12').offset().left);
			var _left=	parseInt($(".huati").width());
			$(".huati").css("margin-top",-($(".huati").height()/2) );
			if($(window).width()>(1200+_left)){
				
				$(".huati").css("left", index_left -(_left+2) );
			}else{
				$(".huati").css("left", "5px" );
			}
		
		}
		
		 setHeight();
		
		// 划梯windows大小改变
		$(window).resize(function() {

		  setHeight();

		});
			
			
		
		// 置顶
		$(".huati .top").click(function() {
	
				$('html,body').animate({
					scrollTop: '0px'
				}, 500);
			});
			
			// 点击锚点
			$(".huati li a").click(function(e) {
	
				e.preventDefault();
	
				var id = $(this).attr("href");
	
				var top = $(id).offset().top;
	
				$('html,body').animate({
					scrollTop: top
				}, 500);
	
			});
			
			
			
		// 划梯scroll
		$(window).scroll(function() {

			var index_top = parseInt($("#f1").offset().top);

			if($(window).scrollTop() >= index_top) {
				$(".huati").stop().show("blind");

			} else {
				$(".huati").stop().hide("blind");
			}
		});

		
			
	}
	
	
	
	return {
		lbt:_lbt,
		huati:_huati
	}
		
})(window.jQuery);