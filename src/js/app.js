
$(document).ready(() => {

  $(window).resize(function(){
    createDiaganol();
  });

  function createDiaganol() {
    const divWidth =$('section.image-grid div div').css('width').slice(0, -2);
    const divHeight =$('section.image-grid div div').css('height').slice(0, -2);
    const degs = Math.atan(divWidth/divHeight) * (180/Math.PI);
    document.styleSheets[0].addRule('section.image-grid div div::after',`transform: skewX(${degs}deg);`);
  }

  createDiaganol();

  $('section.image-grid div.click-overlay').mouseout(function(){
    $(this).parent().children('div.grid').css({'transform': `rotateY(0deg) rotateX(0deg)`});
  });

  $('section.image-grid div.click-overlay').mousemove(function(e){
    // console.log('this.offsetX', this.offsetX);
    // e.stopPropagation();
    // console.log('e', e);
    //
    // console.log(e.offsetX);
    // console.log(e.target.offsetLeft);
    // console.log(e.currentTarget.offsetLeft);

    // const x = (e.target.offsetLeft - e.currentTarget.offsetLeft) + e.offsetX;
    // const y = (e.target.offsetTop - e.currentTarget.offsetTop) + e.offsetY;

    // console.log(x, 'x');
    // console.log(y, 'y');
    // console.log(e.target.offsetWidth);
    // console.log($(e.target).parent()[0].offsetLeft);
    // console.log($(e.target).offset().left);

    // const childOffset = $(this);

    // console.log(childOffset);
    // console.log(e.pageX - e.childOffset);

    // $(e.target).offset().left;
    // $(e.target).parent();
    // console.log('e.currentTarget', e.currentTarget);
    // console.log('e', e);

    // $(this).prev('div').find('.'+proListTargetClass01)
    // var x = e.pageX - this.offsetLeft;
    // var y = e.pageY - this.offsetTop;
    //  <!-- inject:js -->
    //  <!-- endinject -->

    console.log('fire');

    const x = e.offsetX;
    const y = e.offsetY;
    const middleX = $(this).css('width').slice(0, -2)*0.5;
    const middleY = $(this).css('height').slice(0, -2)*0.5;
    const yDegs = -(y-middleY) * 0.3;
    const xDegs = (x-middleX) * 0.04;

    // transform: perspective(50em) rotateY(50deg)
    $(this).parent().children('div.grid').css({'transform': `perspective(1000px) rotateY(${xDegs}deg) rotateX(${yDegs}deg)`});


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
