/*
 *	公共类库
*/

common = function ($) {

	/***url对象***/
	var url_fn = {
		//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
		GetQueryString: function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);return null;
		},

		//从WebAPI获取日期json数据 转换成日期时间戳
		jsonToDate: function jsonToDate(apidate) {
			var txts = apidate.replace("/Date(", "").replace(")/");
			return parseInt(txts.trim());
		},

		// 取当前页面名称(不带后缀名)
		getPageName: function getPageName() {
			var a = location.href;
			var b = a.split("/");
			var c = b.slice(b.length - 1, b.length).toString(String).split(".");
			return c.slice(0, 1);
		},

		//取当前页面名称(带后缀名)
		getPageNameExention: function getPageNameExention() {
			var strUrl = location.href;
			var arrUrl = strUrl.split("/");
			var strPage = arrUrl[arrUrl.length - 1];
			return strPage;
		}

		/**
   * 延迟加载
   *  * <img class="load-lazy"
   * 	src="images/Home/lazy.jpg"
   * alt="新品上市图片"
   * data-src="images/Home/板块图片1.png"
   * > 
   * */
		// 延迟加载
	};var jqlazy_fn = function jqlazy_fn() {

		var window_h = $(window).height();

		$(window).scroll(function () {

			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(document).scrollTop() >= img_h && $(document).scrollTop() < img_h2) {

						$(this).attr("src", $(this).attr("data-src"));

						/*ie8 不支持
       * .animate({
      "opacity":0.2
      }).animate({
      "opacity": 1
      }, 500);
      
      * */
					}
				});
			}, 100);
		});
	};

	/*返回对象*/
	return {

		url: url_fn,
		lazy: {
			jqlazy: jqlazy_fn
		}

	};
}(window.jQuery || window.Zepto);

/*
					 滚动监听
					 <body data-spy="spy" data-target="#scroll_ttl">
						 
						 <aside id="scroll_ttl">

							<ul>
								<li class="active">
									<a href="#banner_1">1</a>
								</li>
								<li>
									<a href="#banner_2">2</a>
								</li>
								<li>
									<a href="#banner_3">3</a>
								</li>
							</ul>

						</aside>
					 </body>
				 */

var scroll = function ($) {

	var obj = {

		init: function init(top) {

			var _top = Number(top);
			_top = isNaN(_top) ? 0 : _top;

			this.offsetTop = _top;
			this.bindEvent(this.offsetTop);
			this.onLoad();
			this.onReset();
		},

		offsetTop: 0,

		setOffsetTop: function setOffsetTop(top) {
			this.offsetTop = typeof top === "number" ? top : 0;
		},

		onReset: function onReset() {

			$(window).resize(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},
		onLoad: function onLoad() {

			$(window).load(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
				$("body,html").stop().animate({
					scrollTop: _top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top); //- parseInt(top);
					var m2 = parseInt(item.maxTop); //- parseInt(top);
					if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {
						//alert(item.selector)
						p.find("ul li").removeClass("active");
						$("[href=" + item.selector + "]").parent().addClass("active");
						return false;
					}
				});
			});
		},

		scrollList: function scrollList() {

			var objs = [];

			var _offsetTop = this.offsetTop;
			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {

				var _el = $(els[i]).find("a").attr("href");

				if (_el) {

					var obj = {};
					var _top = Math.floor($(_el).offset().top) - _offsetTop;

					var maxTop = 0;
					if (i < els.length - 1) {
						var _el2 = $(els[i + 1]).find("a").attr("href");
						maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
					} else {
						maxTop = Math.floor($(document).height());
					}

					obj.selector = _el;
					obj.top = _top;
					obj.maxTop = maxTop;
					objs.push(obj);
				}
			}

			return this.getScrollList = objs;
		},

		getScrollList: []

	};

	return {
		init: function init(top) {
			obj.init(top);
		},
		setOffsetTop: function setOffsetTop(top) {
			obj.setOffsetTop(top);
		}
	};
}(window.jQuery || window.Zepto);

/*单个按钮组件
 * 
 * 
 * <ul>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 		
 		//选中点击事件
		$(".comp-btn").on("comp_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".comp-btn").on("comp_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
 * 
 * */

+function ($) {

	$(".comp-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("comp_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("comp_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
/*****单选按钮组件**
 * 
 * 
 * <div class="comp-radio">             
   <div class="comp-radio-item active">盆</div>
   <div class="comp-radio-item">箱</div>
   <div class="comp-radio-item">斤</div>
   <div class="comp-radio-item">米</div>
   </div>
 * 
 * 
 * ****/

+function ($) {

	$(".comp-radio-item").on("tap", function () {
		var p = $(this).parents(".comp-radio");
		$(".comp-radio-item", p).removeClass("active");
		$(this).addClass("active");

		//点击触发自定义事件
		$(this).trigger("radio_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*

 <div class="number" >
    <button class="plus btn" type="button">+</button>
  <input class="num" type="number" value="1"data-min="0" data-max="9999" data-step="1" />
   <button class="minus btn" type="button">-</button>
  
 </div>
	 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(".number").on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

	//minus
	$(".minus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();

		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		//			var max=Number($(".num",p).attr("data-max"));
		//				max=window.isNaN(max)?9999:max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v > min ? v - step : min;

		if (v <= min) {
			v = min;
		}

		$(".num", p).val(v);

		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});

	//plus
	$(".plus").on("click", function (e) {
		e.stopPropagation();
		e.preventDefault();
		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		var max = Number($(".num", p).attr("data-max"));
		max = window.isNaN(max) ? 9999 : max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v < max ? v + step : max;

		if (v >= max) {
			v = max;
		}

		$(".num", p).val(v);
		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*****数字框组件end******/
/**
 * 
 * 缩略图
 * 
 * <div class=" clearfix  thumbnail-slider">
		<!--btn-->
		<div class="pull-left   ">
			<span class="glyphicon glyphicon-menu-left  thumbnail-btn-l"></span>
		</div>
		<div class=" pull-left thumbnail-content ">

			<div class="thumbnail-allitems">

				<ul class=" thumbnail-item">
					<li class="clearfix">
						<a href="javascript:">
							<img src="images/youhui-1.png" alt="优选好货 图片 160*160" />
							<div class="caption">
								<p>
									Nutrilon诺优能 幼儿配方奶粉 3段 12-36月个月800克/罐
								</p>

								<div class="price">
									<span class=" iconfont  renminbi "></span>
									<span>150</span>
								</div>
							</div>
						</a>
					</li>

				</ul>
	
			</div>
			
			<div class="thumbnail-num">
				<span class="l">1</span>
				<span>/</span>
				<span class="r">4</span>
				
			</div>

		</div>
		<div class="pull-left">
			<span class="glyphicon glyphicon-menu-right thumbnail-btn-r"></span>
		</div>
	</div>

 * **/

+function ($) {

	//
	//	$.fn.thumbnail=function(){
	//			
	//			var $content= $(this).find(".thumbnail-content");
	//			var $allitems= $(this).find(".thumbnail-allitems");
	//			var $btn_l= $(this).find(".thumbnail-btn-l");
	//			var $btn_r= $(this).find(".thumbnail-btn-r");
	//			var $item= $(this).find(".thumbnail-item");
	//			var $num= $(this).find(".thumbnail-num");
	//			var $num_r=$num.find(".r");
	//			var $num_l=$num.find(".l");
	//			
	//		
	//			var size= parseInt($item.length);
	//			var width= parseInt($item.outerWidth(true));
	//			var index=0;
	//			$num_r.text(size);
	//			$num_l.text(1);
	//			
	//			// 设置width
	//			$allitems.width(size*width);
	//				
	//			 $btn_r.click(function(){
	//			 	index=index>=0&&index<size-1?++index:size-1;
	//			 	
	//			 	$allitems.animate({left:-index*width},400)
	//			 	$num_l.text(index+1);
	//			 })
	//			 
	//			  $btn_l.click(function(){
	//			 	index=index>0&&index<size?--index:0;
	//			 	$num_l.text(index+1);
	//			 	$allitems.animate({left:-index*width},400)
	//			 	
	//			 })
	//				
	//			return this;
	//			
	//			
	//		}
	//		
	//	
	//	


	$(".thumbnail-slider").each(function () {

		var $content = $(this).find(".thumbnail-content");
		var $allitems = $(this).find(".thumbnail-allitems");
		var $btn_l = $(this).find(".thumbnail-btn-l");
		var $btn_r = $(this).find(".thumbnail-btn-r");
		var $item = $(this).find(".thumbnail-item");
		var $num = $(this).find(".thumbnail-num");
		var $num_r = $num.find(".r");
		var $num_l = $num.find(".l");

		var size = parseInt($item.length);
		var width = parseInt($item.outerWidth(true));
		var index = 0;
		$num_r.text(size);
		var curIndex = size <= 0 ? 0 : 1;
		$num_l.text(curIndex);
		if (size <= 0) {
			$num.hide();
			$btn_l.hide();
			$btn_r.hide();
		}
		// 设置width
		$allitems.width(size * width);

		$btn_r.click(function () {
			index = index >= 0 && index < size - 1 ? ++index : size - 1;

			$allitems.animate({ left: -index * width }, 400);
			$num_l.text(index + 1);
		});

		$btn_l.click(function () {
			index = index > 0 && index < size ? --index : 0;
			$num_l.text(index + 1);
			$allitems.animate({ left: -index * width }, 400);
		});
	});
}(window.jQuery || window.Zepto);
+function () {

	obj = {
		// 头部菜单折叠
		setMenu: function setMenu() {

			$(".navbar-toggle").click(function (e) {
				e.stopPropagation();
				if ($(this).attr("data-bl")) {

					$(this).removeAttr("data-bl");
					slide_l(false);
				} else {

					$(this).attr("data-bl", true);
					slide_l(true);

					if ($(window).width() < 768) {
						$(document).one("click", function () {
							$(".navbar-toggle").removeAttr("data-bl");
							slide_l(false);
						});
					}
				}
			});

			// 张开菜单
			function slide_l(bl) {

				if (bl) {

					$("body").css("background", "#ccc");
					$(".menu-slide").stop().animate({
						right: 0

					}, 600);
				} else {
					$("body").css("background", "#fff");
					$(".menu-slide").stop().animate({
						right: "-" + $(".menu-slide").outerWidth()

					}, 400);
				}
			}

			// 点击doucment关闭 菜单

			$(".menu-slide .dropdown-menu  a").on("click", function (event) {
				event.stopPropagation();
			});
		},

		/*
   <!--视频播放器-->
  	<div class="v-temp" id="v-temp">
  		<span class="glyphicon glyphicon-remove-circle  v-close"></span>
  				<video class="v-video" id="v-video" width="400" height="300" controls="controls">
  				</video>
  			</div>
  	<div class=" ">
  		<!--视频-->
  		<div class="video-temp">
  			<!--hidden-->
  			<div class="video-content v-hide">
  				<source src="video/test.mp4" type="video/mp4"></source>
  				<source src="myvideo.ogv" type="video/ogg"></source>
  				<source src="myvideo.webm" type="video/webm"></source>
  				<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
  			 		<param name="movie" value="myvideo.swf" />
  			 		<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
  	 			</object>
  
  				<p>当前浏览器不支持 video直接播放，<br />点击这里下载视频：
  					<a href="video/test.mp4">下载视频</a>
  				</p>
  			</div>
  			<img src="images/场景系列01.png" alt="当前浏览器不支持html5的 video元素,请升级你的浏览器" />
  		</div>
  	
  		<div class="v-desc">
  			<h2>ALHAMBRA</h2>
  			<p class="p1">1837年以来 Tirffan & CO蒂芙尼</p>
  			<p class="p2">传奇杰作引领风格 见证着世间无数至臻至美 爱情故事</p>
  
  		</div>
  		<img class="v-play" src="images/icon--播放按钮.png" alt="play" />
  
  	</div>
   
   */
		// open video
		htmlVideo: function htmlVideo() {

			// 打开视频
			$(".v-play").click(function () {
				var video = document.getElementById("v-video");
				if (!video.canPlayType) {
					alert("当前浏览器不支持html5的 video元素,请升级你的浏览器");
					return;
				}
				$(".v-temp").show();
				var v = $(this).parent().find(".video-content").html();
				video.innerHTML = v;
				video.load();
				video.play();
			});

			// 关闭视频
			$(".v-temp  .v-close").click(function () {
				var video = document.getElementById("v-video");

				video.pause();
				$(this).closest(".v-temp").hide();
			});
		},

		zhiding: function zhiding() {

			$(window).scroll(function () {

				if ($(window).scrollTop() > 500) {
					$(".zhiding").show();
				} else {
					$(".zhiding").hide();
				}
			});

			//
			$(".zhiding").click(function () {
				$("body,html").animate({
					scrollTop: 0
				}, 500);
			});
		}

		// exec
	};obj.setMenu();
	obj.htmlVideo();
	obj.zhiding();
}(window.jQuery || window.Zepto);
var index = function ($) {

	/* 首页图片轮播
 * 				case "fade":
 			case "fold":
 			case "top":
 			case "left":
 		
 * */

	function _lbt() {

		$(".index-cont-lbt-big").hover(function () {
			$(this).find(".prev,.next").fadeTo("show", 0.5);
		}, function () {
			$(this).find(".prev,.next").hide();
		});

		$(".prev,.next").hover(function () {

			$(this).fadeTo("show", 0.7);
		}, function () {
			$(this).fadeTo("show", 0.1);
		});
		$(".index-cont-lbt-big").slide({
			titCell: ".num ul",
			mainCell: ".lbt-items",
			effect: "fold",
			autoPlay: true,
			delayTime: 700,
			autoPage: true,
			interval: 5000

		});
	}

	/* 滑梯*/
	function _huati() {

		//划梯位置
		function setHeight() {
			var index_left = parseInt($('.container-12').offset().left);
			var _left = parseInt($(".huati").width());
			$(".huati").css("margin-top", -($(".huati").height() / 2));
			if ($(window).width() > 1200 + _left) {

				$(".huati").css("left", index_left - (_left + 2));
			} else {
				$(".huati").css("left", "5px");
			}
		}

		setHeight();

		// 划梯windows大小改变
		$(window).resize(function () {

			setHeight();
		});

		// 置顶
		$(".huati .top").click(function () {

			$('html,body').animate({
				scrollTop: '0px'
			}, 500);
		});

		// 点击锚点
		$(".huati li a").click(function (e) {

			e.preventDefault();

			var id = $(this).attr("href");

			var top = $(id).offset().top;

			$('html,body').animate({
				scrollTop: top
			}, 500);
		});

		// 划梯scroll
		$(window).scroll(function () {

			var index_top = parseInt($("#f1").offset().top);

			if ($(window).scrollTop() >= index_top) {
				$(".huati").stop().show(400);
			} else {
				$(".huati").stop().hide(400);
			}
		});
	}

	return {
		lbt: _lbt,
		huati: _huati
	};
}(window.jQuery);
var proddtl = function ($) {

	var _init = function _init() {

		//缩列图
		$(".jqzoom .list-imgs img").hover(function () {

			$(".jqzoom-img img").attr("src", $(this).attr("src")).hide().show();
		});

		var list = {};
		list.index = 0;

		list.df = 3;
		list.size = $(".list-imgs li").size();

		list.wdith = $(".list-imgs li").outerWidth(true);
		$(".list-imgs").width(list.size * list.wdith);

		$(".list-imgs-big").on("mouseenter", function () {

			if (list.size > list.df) {

				lr_btn_ff();
			}
		});

		function lr_btn_ff() {

			if (list.index === 0) {
				$(".left-btn").hide();
			} else {
				$(".left-btn").show();
			}

			if (list.index + list.df >= list.size) {
				$(".right-btn").hide();
			} else {
				$(".right-btn").show();
			}
		}
		$(".list-imgs-big").on("mouseleave", function () {

			$(this).find(".btn").hide();
		});

		$(".right-btn").click(function () {
			if (list.index + list.df >= list.size) {
				return;
			}
			list.index++;
			$(".list-imgs").animate({

				left: "-=" + list.wdith
			}, 400);

			lr_btn_ff();
		});

		$(".left-btn").click(function () {
			if (list.index === 0) {
				return;
			}
			list.index--;
			$(".list-imgs").animate({

				left: "+=" + list.wdith
			}, 400);

			lr_btn_ff();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);


var sendbox = function () {

	var _init = function _init() {

		// icheckbox_flat
		$('input').iCheck({
			checkboxClass: 'icheckbox_flat-red',
			radioClass: 'iradio_flat-red',
			increaseArea: '20%' // optional
		});

		// 全选
		$(".ck-all").on("click", function () {

			$(".sendbox-list .table  input[type=checkbox]").iCheck('check'); //— 将输入框的状态设置为checked
		});

		// 取消全选
		$(".ck-unall").on("click", function () {

			$(".sendbox-list .table  input[type=checkbox]").iCheck('uncheck'); //— 移除 checked 状态
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
var shopcart = function ($) {

	var _init = function _init() {
		// 全选
		$(".ck-all").on("ifChecked", function () {

			$(".shopcart-cont  .item input").iCheck('check'); //— 将输入框的状态设置为checked
			$(".shopcart-cont  .ck-all").iCheck('check'); //— 将输入框的状态设置为checked
		});

		// 取消全选
		$(".ck-all").on("ifUnchecked", function () {

			$(".shopcart-cont  .item input").iCheck('uncheck'); //— 移除 checked 状态
			$(".shopcart-cont  .ck-all").iCheck('uncheck'); //— 将输入框的状态设置为checked
		});

		// 子项选择
		$(".shopcart-cont .item .ttl2 input").on("ifChecked", function () {

			var p = $(this).parents(".item");
			$(".ttl2-cont input", p).iCheck('check'); //— 将输入框的状态设置为checked
		});

		// 子项选择
		$(".shopcart-cont .item .ttl2 input").on("ifUnchecked", function () {

			var p = $(this).parents(".item");
			$(".ttl2-cont input", p).iCheck('uncheck'); //— 将输入框的状态设置为checked
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
/*

三级联动地址

var el_select1 = document.getElementById("address_1");
var el_select2 = document.getElementById("address_2");
var el_select3 = document.getElementById("address_3");

 * */

var threeAddress = function () {

	var _init = function _init(v1, v2, v3) {
		var el_select1 = document.getElementById("address_1");
		var el_select2 = document.getElementById("address_2");
		var el_select3 = document.getElementById("address_3");
		var select_data2 = [];

		v1 = v1 || "省区";
		v2 = v2 || "市区";
		v3 = v3 || "县城";

		//  一级地址
		for (var i in cityData3) {

			var el_option = document.createElement("option");
			el_option.value = cityData3[i].text.toString();
			el_option.innerText = cityData3[i].text.toString();
			el_select1.insertBefore(el_option, null);
		}

		// 二级地址 change event
		el_select1.addEventListener("change", function (e) {
			e = e || event;

			select_data2 = getBYcityValue(cityData3, e.target.value);
			el_select2.innerHTML = "";
			var el_empty = document.createElement("option");
			el_empty.innerText = v2;
			el_select2.insertBefore(el_empty, null);
			for (var i2 in select_data2) {
				var el_option = document.createElement("option");
				el_option.value = select_data2[i2].text.toString();
				el_option.innerText = select_data2[i2].text.toString();

				el_select2.insertBefore(el_option, null);
			}

			// 恢复三级
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
		});

		// 三级地址 change event
		el_select2.addEventListener("change", function (e) {
			e = e || event;

			var l3 = getBYcityValue(select_data2, e.target.value);
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
			for (var i3 in l3) {
				var el_option = document.createElement("option");
				el_option.value = l3[i3].text.toString();
				el_option.innerText = l3[i3].text.toString();
				el_select3.insertBefore(el_option, null);
			}
		});

		function getBYcityValue(objs, val) {

			for (var name in objs) {
				if (objs[name].text.trim() === val.trim()) {
					return objs[name].children || [];
				}
			}
		}
	};

	return {
		init: _init
	};
}();