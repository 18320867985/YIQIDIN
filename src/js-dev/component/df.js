
// 默认js

+(function(){
	
	 // 点击样式 
	$(".distri-cont-l dd a").on("click",function(event){
		
		event.preventDefault();
		$(".distri-cont-l dd ").removeClass("active");
		$(this).closest("dd").addClass("active");
		var _src=$(this).attr("href");
		$(".parent-window").attr("src",_src);
		$(".parent-window").css("height",0);
		$('html,body').animate({
				scrollTop: 0
			}, 400);
		
	});
	
	

})(window.jQuery);
