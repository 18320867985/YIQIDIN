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
			 <body data-spy="scroll" data-target="#scroll_ttl">
				 
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

			this.offsetTop = typeof top === "number" ? top : 0;
			this.bindEvent(this.offsetTop);
			this.scrollList();
			this.scroll(this.offsetTop);
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

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				$("body,html").stop().animate({
					scrollTop: $($this.attr("href")).offset().top - top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top) - parseInt(top);
					var m2 = parseInt(item.maxTop) - parseInt(top);
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

			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {
				var obj = {};
				var _el = $(els[i]).find("a").attr("href");

				var _top = Math.floor($(_el).offset().top);

				var maxTop = 0;
				if (i < els.length - 1) {
					var _el2 = $(els[i + 1]).find("a").attr("href");
					maxTop = Math.floor($(_el2).offset().top);
				} else {
					maxTop = $(document).height();
				}

				obj.selector = _el;
				obj.top = _top;
				obj.maxTop = maxTop;
				objs.push(obj);
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

/*
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

	/* 首页图片轮播*/
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
			interval: 3000

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
				$(".huati").stop().show("blind");
			} else {
				$(".huati").stop().hide("blind");
			}
		});
	}

	return {
		lbt: _lbt,
		huati: _huati
	};
}(window.jQuery);