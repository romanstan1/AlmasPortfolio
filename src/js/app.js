
$(document).ready(() => {
    // $("p").click(function(){
    //     $(this).hide();
    // });


  $(".image-grid").click(function(e){
    console.log('e', e);
    // var x = e.pageX - this.offsetLeft;
    // var y = e.pageY - this.offsetTop;

    var x = e.offsetX;
    var y = e.offsetY;
    console.log('x', x);
    console.log('y', y);
  });

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
  //
  // $(document).on('mousemove','.pc .'+proListAreaClass,projectMove);


});
