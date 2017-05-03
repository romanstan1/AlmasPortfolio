// // app.js is the main JS file which you should define your Angular module>
// var wW,
// wH,
// nowUrl,
// loadingFlg = false,
// svgFlg = false,
// cvsFlg = false,
// pjaxFlg = true,
// menuFlg = false,
// scbFlg = false,
// scrDelayH = 200,
// cvsImg = [],
// cvsImgCount = 0,
// proAreaClass = 'home_list_area',
// proListClass = 'home_list',
// proListAreaClass = 'home_list_link',
// proListTargetClass01 = 'home_list_img',
// proListTargetClass02 = 'home_list_shadow > div',
// proListAreaW,
// proListAreaH,
// proListMouseX,
// proListMouseY;
//
//
//
//
// //SETTING
// function commonSetting(){
// 	wW = $(window).width();
// 	wH = $(window).height();
// 	proListAreaW = $('.'+proListAreaClass).width();
// 	proListAreaH = $('.'+proListAreaClass).height();
// 	if(wW >= 769){
// 		$('body').addClass('pc');
// 		scrDelayH = 200;
// 	}else{
// 		$('body').removeClass('pc');
// 		scrDelayH = 50;
// 	}
// }
// function pageSetting(){
// 	scbFlg = false;
// 	nowUrl = location.href;
// 	$('.header_button').css({'opacity':''});
// 	if(nowUrl.match(/about/)){
// 		$('.header_button').removeClass('none');
// 		$('.header_button').removeClass('opa');
// 		$('.pc .contents_title').find('p').scrambleText(30);
// 		initialize();
// 	}else if(nowUrl.match(/project/)){
// 		$('.header_button').removeClass('none');
// 		$('.header_button').removeClass('opa');
// 		$('.pc .project_title').find('p').scrambleText(30);
// 	}else{
// 		$('.header_button').addClass('none');
// 		$('.header_button').addClass('opa');
// 		$('.home_menu').find('p').scrambleText(15);
// 	}
// }
//
//
//
// //LOADING
// function loading(){
// 	if(loadingFlg == false){
// 		loadingFlg = true;
// 		$('#logo03 path').attr('class','opa');
// 		svgMove('logo03');
// 		nowUrl = location.href;
// 		if(nowUrl.match(/about/) || nowUrl.match(/project/)){
// 			cvsFlg = true;
// 		}else{
// 			cvsSetting();
// 		}
// 	}else{
// 		commonSetting();
// 		pageSetting();
// 		onScroll();
// 		$('.loading').animate({'opacity':'0'},500,function(){
// 			$(this).addClass('none');
// 		});
// 	}
// }
//
//
//
// //MONITORING
// function monitoring(){
//     monitoringTimer = setInterval(function(){
//         if(svgFlg == true && pjaxFlg == true && cvsFlg == true){
//         	svgFlg = false;
//         	cvsFlg = false;
// 			pjaxFlg = false;
//         	clearInterval(monitoringTimer);
//         	loading();
//         	//console.log("end");
//         }else{
//         	//console.log("loop");
//         }
//     },500);
// }
//
//
//
// //CANVAS_SET
// function cvsSetting(){
// 	for(var i = 0; i < $('.'+proListClass).length; i++){
// 		for(var j = 0; j < 8; j++){
// 			var projectId = $('.'+proAreaClass+' > div:nth-child('+(i+1)+')').attr('id');
// 			cvsImg.push('img/project/home_list_img'+projectId+j+'.jpg');
// 		}
// 	}
// 	var preloadImg = function(cvsImg){
// 		if(!cvsImg.length){
// 			return;
// 		}
// 		var dfd = $.Deferred();
// 		var imgs = [];
// 		for(var i = 0,l = cvsImg.length; i < l; i++){
// 			var img = new Image();
// 			img.src = cvsImg[i];
// 			imgs.push(img);
// 		}
// 		var check = function(){
// 			for(var i = 0, l = imgs.length; i < l; i++){
// 				if(imgs[i].complete !== true){
// 					setTimeout(check,250);
// 					return false;
// 				}
// 			}
// 			dfd.resolve();
// 		};
//   		check();
//   		return dfd.promise();
// 	}
// 	function cvsDrow(){
// 		for(var i = 0; i < $('.'+proListClass).length; i++){
// 			for(var j = 0; j < 8; j++){
// 				var projectId = $('.'+proAreaClass+' > div:nth-child('+(i+1)+')').attr('id');
// 				var canvas = document.getElementById('project_cvs'+projectId+j);
// 				if(!canvas || !canvas.getContext){
// 					return false;
// 				}
// 				var ctx = canvas.getContext('2d');
// 				var img = new Image();
// 				img.src = cvsImg[cvsImgCount];
// 				var rand = Math.floor( Math.random() * 251 ) ;
//     			ctx.drawImage(img,rand,0,1,300,0,0,250,150);
// 				cvsImgCount++;
//  	 		}
//   		}
// 	}
// 	preloadImg(cvsImg).done(function(){
// 		cvsDrow();
//   		cvsFlg = true;
// 	});
// }
//
//
//
// //MENU_MOVE
// function menuMove(){
// 	if(menuFlg == false){
// 		menuFlg = true;
// 		$('.header_menu').find('p').scrambleText(15);
// 		$('.header_button').addClass('header_button_on');
// 	}else{
// 		menuFlg = false;
// 		$('.header_button').removeClass('header_button_on');
// 	}
// 	$('.header_menu').slideToggle(500);
// }
//
//
//
// //PROJECT_MOVE
// function projectMove(i_event){
// 	var eventObj;
// 	var propName;
// 	if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
// 		eventObj = i_event;
// 		propName = "offset";
// 	}else{
// 		eventObj = event;
// 		propName = "layer";
// 	}
// 	proListMouseX = (eventObj[propName + "X"] - proListAreaW * 0.5) * 0.05;
// 	proListMouseY = (eventObj[propName + "Y"] - proListAreaH * 0.5) * 0.1;
// 	$(this).prev('div').find('.'+proListTargetClass01).css({"transform":"rotateX(" + -proListMouseY + "deg) rotateY(" + proListMouseX +"deg)"});
// 	$(this).prev('div').find('.'+proListTargetClass02).css({"transform":"rotateX(" + -proListMouseY + "deg) rotateY(" + proListMouseX +"deg)"});
// }
// function projectOut(){
// 	$(this).prev('div').find('.'+proListTargetClass01).css({"transform":"rotateX(0deg) rotateY(0deg)"});
// 	$(this).prev('div').find('.'+proListTargetClass02).css({"transform":"rotateX(0deg) rotateY(0deg)"});
// }
// function onScroll(){
// 	nowUrl = location.href;
// 	if(!nowUrl.match(/about/) && !nowUrl.match(/project/)){
// 		if($(this).scrollTop() > wH/2){
// 			if($('.header_button').hasClass('none')){
// 				$('.header_button').removeClass('none');
// 				$('.header_button').stop().animate({'opacity':'1'},500);
// 			}
// 		}else if($(this).scrollTop() <= wH/2){
// 			if($('.header_button').hasClass('none') == false){
// 				if(menuFlg == true){
// 					menuMove();
// 				}
// 				$('.header_button').stop().animate({'opacity':'0'},500,function(){
// 					$(this).css({'opacity':''});
// 					$(this).addClass('none');
// 				});
// 			}
// 		}
// 	}
// 	$('.'+proListClass).each(function(){
// 		var srcProjectTop = $(this).offset().top,
// 		srcProjectH = $(this).height(),
// 		scrTop = $(window).scrollTop();
// 		if(scrTop > srcProjectTop - wH + scrDelayH && scrTop < srcProjectTop + srcProjectH){
// 			if($(this).hasClass('home_list_on') == false){
// 				$(this).addClass('home_list_on');
// 				$(this).stop().animate({'opacity':'1'},500);
// 				if($('.pc').length){
// 					$(this).find('p').scrambleText(30);
// 				}
// 			}
// 		}else if(scrTop < srcProjectTop - wH + scrDelayH && scrTop < srcProjectTop + scrDelayH){
// 			$(this).stop().animate({'opacity':'0'},500,function(){
// 				$(this).removeClass('home_list_on');
// 			});
// 		}
// 	});
// }
//
//
//
// //TEXT_MOVE
// function randomNum(){
// 	var rnd = Math.floor(Math.random()*62);
// 	if (rnd >= 52) return String.fromCharCode(rnd - 4);
// 	else if (rnd >= 26) return String.fromCharCode(rnd + 71);
// 	else return String.fromCharCode(rnd + 65);
// }
// $.fn.scrambleText = function(timerDelay){
// 	if(scbFlg == false){
// 		scbFlg = true;
// 		var progressMax = this.length;
// 		progressCount = 0;
// 		this.each(function(){
// 			var $ele = $(this),
//    	 		str = $ele.text(),
// 			progress = 0,
// 			progressFlg = false,
// 			replace = /[^\s]/g,
// 			random = randomNum,
// 			inc = 1;
// 			var scrblTimer = setInterval(function(){
// 				progress += inc
// 				if(progressFlg == false){
// 					if(progress < str.length + inc){
// 						$ele.text(str.substring(0,str.length).replace(replace,random));
// 					}else{
// 						progressFlg = true;
// 					}
// 				}else{
// 					$ele.text(str.substring(0,progress)+str.substring(progress,str.length).replace(replace,random));
// 					if(progress >= str.length + inc){
// 						clearInterval(scrblTimer);
// 						progressCount ++;
// 						if(progressCount == progressMax){
// 							scbFlg = false;
// 						}
// 					}
// 				}
// 			},timerDelay);
// 		});
// 		return this;
// 	}
// };
//
//
//
// //SVG_MOVE
// function svgMove(targetId){
// 	var svg = document.getElementById(targetId),
// 	totalFrame = 2,
// 	currentFrame = 0,
// 	progress = 0,
// 	pathCount = 0,
// 	pathFlg = false,
// 	paths = new Array(),
// 	length = new Array(),
// 	handle;
// 	[].slice.call(svg.querySelectorAll('path')).forEach(function(path,i){
// 		paths[i] = path;
// 		var l = paths[i].getTotalLength() + 30;
// 		length[i] = l;
// 		paths[i].style.strokeDasharray = l + ' ' + l;
// 		paths[i].style.strokeDashoffset = l;
// 	});
// 	timer = function(){
// 		return(
// 			function(callback){
// 				setTimeout(callback,1000/180);
// 			}
// 		);
// 	}();
// 	function draw(){
// 		if(pathFlg == true){
// 			pathCount++;
// 			if(pathCount == paths.length){
// 				window.clearTimeout(handle);
// 				svgFlg = true;
// 			}else{
// 				pathFlg = false;
// 				currentFrame = 0;
// 				progress = 0;
// 				handle = timer(draw);
// 			}
// 		}else{
// 			if(pathFlg !== true){
// 				progress = currentFrame/totalFrame;
// 			}
// 			if(progress < 1){
// 				if(progress == 0){
// 					if(progress == 0 && pathCount == 0){
// 						$('#'+targetId).attr('class','');
// 					}
// 					$('#'+targetId+'_path'+pathCount).attr('class','opa svg_path_on');
// 				}
// 				currentFrame++;
// 				paths[pathCount].style.strokeDashoffset = Math.floor(length[pathCount]*(1-progress));
// 			}else{
// 				pathFlg = true;
// 			}
// 			handle = timer(draw);
// 		}
// 	}
// 	draw();
// }
//
//
//
// //GOOGLE_MAP
// function initialize(){
// 	var myLatLng = new google.maps.LatLng('38.2592','140.875036');
// 	var myOptions = {
// 		zoom: 16,
// 		center: myLatLng,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP,
// 		mapTypeControlOptions: {mapTypeIds:['style',google.maps.MapTypeId.SATELLITE]},
// 		scrollwheel: false
// 	};
// 	map = new google.maps.Map(document.getElementById("map"), myOptions);
// 	var image1 = new google.maps.MarkerImage
// 	('img/marker01.png',
// 	new google.maps.Size(62,62),
// 	new google.maps.Point(0,0),
// 	new google.maps.Point(31,62),
// 	new google.maps.Size(62,62));
// 	new google.maps.Marker({
// 		position: new google.maps.LatLng('38.258773','140.875036'),
// 		map: map,
// 		icon: image1,
// 		clickable: false
// 	});
// 	var mapstyle =
// 	[ { "stylers": [ { "hue": "#252525" }, { "saturation": -100 } ] },{ "featureType": "water", "stylers": [ { "saturation": -100 }, { "hue": "#252525" } ] },{ } ]
// 	;
// 	var myOptions = {
// 		name: "WANNA"
// 	};
// 	var mapType = new google.maps.StyledMapType(mapstyle, myOptions);
// 	map.mapTypes.set('style', mapType);
// 	map.setMapTypeId('style');
// }
//
//
//
// //PJAX
// $(document).on('click','.link',function(e){
//     e.preventDefault();
//     var href = $(this).attr('href');
//     $('.loading').removeClass('none');
// 	$('.loading').animate({'opacity':'1'},500,function(){
// 		$('#logo03 path').attr('class','opa');
// 		svgMove('logo03');
// 		monitoring();
// 		if(menuFlg == true){
// 			menuMove();
// 		}
// 		$.pjax({
// 			url:href,
// 			container:'.wrap',
// 			fragment:'.wrap',
// 			scrollTo:0
// 		});
// 	});
// });
// $(document).on('pjax:popstate',function(){
//     $('.loading').removeClass('none');
// 	$('.loading').css({'opacity':'1'});
// 	loadingFlg = false;
// 	loading();
// 	monitoring();
// });
// $(document).on('pjax:end',function(){
// 	pjaxFlg = true;
// 	nowUrl = location.href;
// 	if(nowUrl.match(/about/) || nowUrl.match(/project/)){
// 		cvsFlg = true;
// 	}else{
// 		cvsSetting();
// 	}
// 	var newPath = window.location.pathname + window.location.search;
// 	ga('send','pageview',newPath);
// });
//
//
//
// $(document).ready(function(){
// 	if(navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome") < 0){
// 		$('body').addClass('safari');
// 	}else{
// 		$('body').addClass('nosafari');
// 	}
// 	loading();
// 	monitoring();
// });
// $(window).on('resize',commonSetting);
// $(window).on('scroll resize',onScroll);
// $(document).on('click','.header_button',menuMove);
// $(document).on('mousemove','.pc .'+proListAreaClass,projectMove);
// $(document).on('mouseout','.pc .'+proListAreaClass,projectOut);
// $(document).on('mouseenter','.pc .menu_list',function(){
// 	$(this).find('p').scrambleText(15);
// });
// $(document).on('mouseenter','.pc .home_list_link',function(){
// 	$(this).parent().next().find('p').scrambleText(30);
// 	$(this).parent().find('.home_list_picture > div:nth-child(2)').stop().animate({'opacity':'1'},500);
// });
// $(document).on('mouseleave','.pc .home_list_link',function(){
// 	$(this).parent().find('.home_list_picture > div:nth-child(2)').stop().animate({'opacity':'0'},500);
// });
// $(document).on('mouseenter','.pc .project_next',function(){
// 	$(this).find('p').scrambleText(15);
// });
// $(document).on('mouseenter','.pc .project_visit',function(){
// 	$(this).removeClass('project_visit_off');
// 	$(this).addClass('project_visit_on');
// 	$(this).find('p').scrambleText(60);
// });
// $(document).on('mouseleave','.pc .project_visit',function(){
// 	$(this).removeClass('project_visit_on');
// 	$(this).addClass('project_visit_off');
// });
//
//
//
//
//
//
//
//
//
//
//
//
// $(document).ready(() => {
//     $("p").click(function(){
//         $(this).hide();
//     });
//
//
//
// });
