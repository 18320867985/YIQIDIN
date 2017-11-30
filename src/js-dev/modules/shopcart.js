var shopcart= (function($){
		
		
		var   _init=function(){
			// 全选
				$(".ck-all").on("ifChecked",function(){
					
					$(".shopcart-cont  .item input").iCheck('check'); //— 将输入框的状态设置为checked
					$(".shopcart-cont  .ck-all").iCheck('check'); //— 将输入框的状态设置为checked
				})
				
				// 取消全选
				$(".ck-all").on("ifUnchecked",function(){
					
					$(".shopcart-cont  .item input").iCheck('uncheck'); //— 移除 checked 状态
					$(".shopcart-cont  .ck-all").iCheck('uncheck') //— 将输入框的状态设置为checked
				})
				
				// 子项选择
				$(".shopcart-cont .item .ttl2 input").on("ifChecked",function(){
					
					var p=$(this).parents(".item")
					$(".ttl2-cont input",p).iCheck('check'); //— 将输入框的状态设置为checked
							
				});
			
				// 子项选择
				$(".shopcart-cont .item .ttl2 input").on("ifUnchecked",function(){
					
					var p=$(this).parents(".item")
					$(".ttl2-cont input",p).iCheck('uncheck'); //— 将输入框的状态设置为checked
							
				});
		
		}
		
		return {
			init:_init
		}
	
})(window.jQuery)
