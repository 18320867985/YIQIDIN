


var sendbox=(function(){
	
	var _init=function(){
		
				// icheckbox_flat
				$('input').iCheck({
					checkboxClass: 'icheckbox_flat-red',
					radioClass: 'iradio_flat-red',
					increaseArea: '20%' // optional
				});
				
			// 全选
				$(".ck-all").on("click",function(){
					
					$(" .table  input[type=checkbox]").iCheck('check'); //— 将输入框的状态设置为checked
					
				});
				
				// 取消全选
				$(".ck-unall").on("click",function(){
					
					$(".table  input[type=checkbox]").iCheck('uncheck'); //— 移除 checked 状态
				});
				
			
		}
		
		return {
			init:_init
		}
	
})(window.jQuery);
