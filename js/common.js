var jjang = (function() {
	var language="kor";
	var addr=location.href;
	var getNameFromPath = function(strFilepath) {
		var objRE = new RegExp(/([^\/\\]+)$/);
		var strName = objRE.exec(strFilepath);
		if (strName == null) {
		   return null;
		}
		else {
			return strName[0].split(".")[0];
		}
	}
	var getParameter = function (strParamName){
		 var arrResult = null;
		 if(strParamName){
			 arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
		 }
		 return arrResult && arrResult[1] ? arrResult[1] : null;
	}
	var mod = function (a,b){
		if(a%b < 0) {
			return b+a%b;
		} else {
			return a%b;
		}
	}
	var addZero = function (num) {
		if(num<10){
			return "0"+num;
		} else {
			return num;
		}
	}
	var gnb = function() {
		$("#gnb").on("mouseenter",function(e){		
			if($("body").hasClass("pc")){
				$("#header").stop().animate({height:285},"easeOutQuint");
				$("#header").addClass("on");
			}
		})

		$("#header").on("mouseleave",function(e){
			if($("body").hasClass("pc")){
				$("#header").stop().animate({height:90},"easeOutQuint");
				if($(window).scrollTop()<50){
					$("#header").removeClass("on");
				}
			}
		})

		$("#header .btnGnbAll").on("click",function(){
			$(this).toggleClass("on");
			if($("body").hasClass("pc")){
				if($(this).hasClass("on")){
					$("#header").stop().animate({height:285},"easeOutQuint");
				} else {
					$("#header").stop().animate({height:90},"easeOutQuint");
				}
			} else {
				if($(this).hasClass("on")){
					$("#gnb").stop().animate({left:0},"easeOutQuint");
					$(".cover").fadeIn();
					$("html").addClass("overHidden");
					$("html").on("scroll touchmove mousewheel", function(e){
						e.preventDefault();
						e.stopPropagation();
						return false;
					})
				} else {
					$("#gnb").stop().animate({left:"-100%"},"easeOutQuint",function(){
						$("#gnb .sub").hide();
					});
					$(".cover").fadeOut();
					$("html").removeClass("overHidden");
				}
			}
			return false;
		})

		$("#gnb > .gnbList > li > a").on("click",function(e){
			if(!$("body").hasClass("pc")){
				$(this).parent().siblings("li").find(".sub").slideUp("swing");
				$(this).next(".sub").stop().slideToggle("swing");
				return false;
			}
		})
	}
	var mainVisual = function() {
		var mainVisual = new Swiper ("#mainVisual .mask", {
			loop: true,
			speed:1000,
			autoplay: {
				delay: 3000,
				disableOnInteraction:false
			},
			pagination: {
				el:"#mainVisual .pager",
				clickable:true
			},
			navigation: {
				nextEl: "#mainVisual .btnNext",
				prevEl: "#mainVisual .btnPrev",
			}
		});

		$("#mainVisual .btnAuto").on("click",function(){
			if($(this).hasClass("pause")){
				mainVisual.autoplay.stop();	
				$(this).removeClass("pause");
			} else {
				mainVisual.autoplay.start();	
				$(this).addClass("pause");
			}
			return false;
		})
		if($("#mainVisual .mainCopy").length!=0){
			var mainCopy = new SplitText("#mainVisual .mainCopy", {type:"chars,words"});
			var chars = mainCopy.chars;
			TweenMax.staggerFrom(chars, 1.25, {opacity:0,delay:0.5,x:30,ease:Back.easeOut},0.05,function(){
				
			});
			TweenMax.delayedCall(1.5,function(){
				$("#mainVisual .mainCopy em").append("<span></span>");
				TweenMax.staggerTo($("#mainVisual .mainCopy em").find("span"),1,{opacity:1,top:-16,ease:Bounce.easeOut},0.15,function(){
					$("#mainVisual .mainCopy em span").remove();
					$("#mainVisual .mainCopy").addClass("on");
					mainCopy.revert();
				});
			})
		}
	}
	

	var facility = function() {
		var facility = new Swiper ("#room .mask", {
			loop: true,
			speed:1000,
			autoplay: {
				delay: 3000,
				disableOnInteraction:false
			},
			navigation: {
				nextEl: "#room .btnNext",
				prevEl: "#room .btnPrev",
			}
		});
	}
	var gallery = function() {
		$('[data-fancybox="gallery"]').fancybox({
			// Options will go here
		});
	}
	var selectBox = function (){
		$(".selectBox > a").on("click",function(e){
			$(this).next("ul").toggleClass("blind");
			return false;
		})
	}
	var makeSubTitle = function (kor) {
		$(".subTitle").text(kor);
	}
	var makeContentsTitle = function (mainTxt) {
		$(".contentsTitle span").text(mainTxt);
	}
	var makeBreadCrumb  = function (depth01,depth02,depth03,depth04){
		$(".breadCrumb li").eq(1).remove();
		$(".breadCrumb li").eq(2).remove();
		$(".breadCrumb").append('<li><i class="fa fa-angle-right"></i>'+depth01+'</li>');
		$(".breadCrumb").append('<li><i class="fa fa-angle-right"></i>'+depth02+'</li>');
	}
	var subVisual = function (mainSel) {
		$("#subVisual").removeClass();
		$("#subVisual").addClass("subVisual0"+(mainSel+1));
	}
	var lnbLoad = function (mainSel) {
		$("#lnb > ul").remove();
		$("#lnb").append($("#header #gnb .gnbList > li").eq(mainSel).find(".sub").clone().removeClass("blind"));
		$("#lnb").find(".depth03").remove();
		var total = $("#lnb li").length;
		$("#lnb").trigger("mouseleave");
	}
	var snbLoad = function (mainSel,lnbSel) {
		$("#snb > ul").remove();
		$("#snb").append($("#header #gnb .gnbList > li").eq(mainSel).find(".sub > li").eq(lnbSel).find(".depth03").clone().removeClass("blind"));
		$("#snb").find(".depth04").remove();
		$("#snb li h4").contents().unwrap();
		$("#snb").trigger("mouseleave");
		if($("#snb li").length<=0){
			$("#snb").remove();
		}
		var snbNum = $("#snb li").length;
		$("#snb").addClass("snb0"+(snbNum));
	}
	var lnbFix = function (lnbSel) {
		$("#lnb > ul > li").on("mouseenter",function(e){
			$("#lnb > ul > li").removeClass("on");
			$(this).addClass("on")
		})
		$("#lnb > ul > li").on("mouseleave",function(e){
			$("#lnb > ul > li").removeClass("on")
			$("#lnb > ul > li").eq(lnbSel).addClass("on")
		})
		$("#lnb > ul > li").trigger("mouseleave");
	}
	var snbFix = function (tabSel) {
		$("#snb > ul > li").on("mouseenter",function(e){
			$("#snb > ul > li").removeClass("on");
			$(this).addClass("on")
		})
		$("#snb > ul > li").on("mouseleave",function(e){
			$("#snb > ul > li").removeClass("on")
			$("#snb > ul > li").eq(tabSel).addClass("on")
		})
		$("#snb > ul > li").trigger("mouseleave");
	}

	var makePrevNext = function (prev,next) {
		var prevURL=$("#lnb > ul > li").eq(prev).children("a").attr("href");
		var nextURL=$("#lnb > ul > li").eq(next).children("a").attr("href");
		var prevTxt=$("#lnb > ul > li").eq(prev).children("a").text();
		var nextTxt=$("#lnb > ul > li").eq(next).children("a").text();

		$(".btnPagePrev").attr({href:prevURL});
		$(".btnPageNext").attr({href:nextURL});

		$(".btnPagePrev .txt").text(prevTxt);
		$(".btnPageNext .txt").text(nextTxt);


	}

	var allFix = function (obj){
		var temp=getNameFromPath(addr);
		var defaults={};
		var option=$.extend(defaults,obj);
		var mainSel = option.mainSel;
		var lnbSel = option.lnbSel;
		var tabSel = option.tabSel;
		var lnbTotal;
		var depth04Sel = option.depth04Sel;
		var depth01 = $(".gnbList > li").eq(mainSel).clone();
		var depth02 = depth01.find(".sub > li").eq(lnbSel).clone();
		var depth03 = depth02.find(".depth03 > li").eq(tabSel).clone();
		var depth04 = depth03.find(".depth04 > li").eq(depth04Sel).clone();

		depth01.find("ul").remove();
		depth02.find("ul").remove();
		depth03.find("ul").remove();
		depth04.find("ul").remove();


		depth01.find("li").unwrap();
		depth02.find("li").unwrap();
		depth03.find("li").unwrap();
		depth04.find("li").unwrap();


		var bread01 = depth01.text();
		var bread02 = depth02.text();
		var bread03 = depth03.text();
		var bread04 = depth04.text();
		//console.log("bread01===",bread01);
		

		$("#subContents").addClass(temp);
		var subTitle = $("#gnb > .gnbList > li").eq(mainSel).children("a").text();
		var contentsTitle=$("#gnb > .gnbList > li").eq(mainSel).find(".sub > li").eq(lnbSel).children("a").text();
		lnbLoad(mainSel);
		snbLoad(mainSel,lnbSel);
		lnbFix(lnbSel);
		snbFix(tabSel);
		subVisual(mainSel);
		makeSubTitle(subTitle);
		makeContentsTitle(contentsTitle);
		lnbTotal = $("#lnb > ul > li").length;
		var prev = (lnbSel-1)%lnbTotal;
		var next = (lnbSel+1)%lnbTotal;
		makePrevNext(prev,next);
		//makeBreadCrumb(bread01,bread02,bread03,bread04);
		$("#contents").addClass(""+temp);
	}
	
	var fix = function() {
		var addr=location.href
		var temp=getNameFromPath(addr);
		switch (temp){
			case "greeting":                 allFix({mainSel:0,lnbSel:0}); break;
			case "history":                  allFix({mainSel:0,lnbSel:1});break;
			case "media":                    allFix({mainSel:0,lnbSel:2});break;
			case "use-guide":                allFix({mainSel:0,lnbSel:3});break;
			case "location":                 allFix({mainSel:0,lnbSel:4});break;
	//---------------------------------------------------------------------------------------
			case "special":                  allFix({mainSel:1,lnbSel:0}); break;
			case "vision":                   allFix({mainSel:1,lnbSel:1});break;
			case "facilities":               allFix({mainSel:1,lnbSel:2});break;
	//---------------------------------------------------------------------------------------
			case "health-care":              allFix({mainSel:2,lnbSel:0}); break;
			case "convenience":              allFix({mainSel:2,lnbSel:1});break;
			case "environment":              allFix({mainSel:2,lnbSel:2});break;
			case "management":               allFix({mainSel:2,lnbSel:3});break;
	//---------------------------------------------------------------------------------------
			case "mother-program":           allFix({mainSel:3,lnbSel:0}); break;
			case "baby-program":             allFix({mainSel:3,lnbSel:1});break;
			case "nutriment-program":        allFix({mainSel:3,lnbSel:2});break;
			case "weekly-program":           allFix({mainSel:3,lnbSel:3});break;
	//---------------------------------------------------------------------------------------
			case "baby-album":               allFix({mainSel:4,lnbSel:0}); break;
	//---------------------------------------------------------------------------------------
			case "review":                   allFix({mainSel:5,lnbSel:0}); break;
			case "qna":                      allFix({mainSel:5,lnbSel:1});break;
	//---------------------------------------------------------------------------------------


			default:allFix({mainSel:-1,lnbSel:-1,tabSel:-1});
		}
	}
	var resize = function() {
		$(window).on("resize",function(e){
			var w = $(document).outerWidth(true);
			console.log(w);
			if(w>1200){
				$("body").removeClass().addClass("pc");
				$("#gnb").removeAttr("style");
				$("#gnb .sub").removeAttr("style");
				$(".cover").removeAttr("style");
				$(".btnGnbAll").removeClass("on");
			} else if(w<=1200 && w > 960){
				$("body").removeClass().addClass("tablet");
			} else {
				$("body").removeClass().addClass("mobile");
			}
			$("#header").removeAttr("style");
		})
		$(window).trigger("resize");
	}
	var headerShadow = function() {
		$(window).on("scroll",function(e){
			var st = $(window).scrollTop();
			if(st>50){
				if(!$("#header").hasClass("on")){
					$("#header").addClass("on");
				}
			} else {
				if($("#header").hasClass("on")){
					$("#header").removeClass("on");
				}
			}
		})
		$(window).trigger("scroll");
	}
	return {
		gnb:gnb,
		mainVisual:mainVisual,
		facility:facility,
		fix:fix,
		headerShadow:headerShadow,
		resize:resize,
		gallery:gallery,
	}
}());

$(function(){
	jjang.gnb();
	jjang.mainVisual();
	jjang.facility();
	jjang.fix();
	jjang.headerShadow();
	jjang.resize();
	jjang.gallery();
})