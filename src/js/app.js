
$(document).ready(() => {

  $(window).resize(function(){
    createDiaganol();
  });

  function createGrid() {
    let className = 'top';
    for(let i = 0; i < 8; i++) {
      if (i >= 4 ) className = 'bottom';
      // if (i === 0) className += ' left';
      if (i === 3 || i === 7 ) className += ' right';
      $('section.image-grid div.grid').append(`<div class="${className}"></div>`);
    }
    createDiaganol();
  }

  function createDiaganol () {
    const divWidth =$('section.image-grid div div').css('width').slice(0, -2);
    const divHeight =$('section.image-grid div div').css('height').slice(0, -2);
    const degs = Math.atan(divWidth/divHeight) * (180/Math.PI);
    document.styleSheets[0].addRule('section.image-grid div div::after',`transform: skewX(${degs}deg);`);
  }

  createGrid();


  $('section.image-grid a.click-overlay').mouseout(function(){
    $(this).parent().children('div, section.images').css({'transform': `rotateY(0deg) rotateX(0deg)`});
  });

  $('section.image-grid a.click-overlay').mousemove(function(e){

    const x = e.offsetX;
    const y = e.offsetY;
    const middleX = $(this).css('width').slice(0, -2)*0.5;
    const middleY = $(this).css('height').slice(0, -2)*0.5;
    const yDegs = -(y-middleY) * 0.3;
    const xDegs = (x-middleX) * 0.04;
    $(this).parent().children('div, section.images').css({'transform': `perspective(1000px) rotateY(${xDegs}deg) rotateX(${yDegs}deg)`});
  });


});
