
$(document).ready(() => {

  let h1 = null;
  let h2 = null;
  let p = null;

  let h1Interval = null;
  let h2Interval = null;
  let pInterval = null;

  $(window).resize(function(){
    // createDiaganol();
  });

  function createGrid() {
    let className = null;
    for(let i = 0; i < 8; i++) {
      if (i >= 4 ) className = 'bottom';
      if (i < 4 ) className = 'top';
      if (i === 0 || i === 4) className += ' left';
      if (i === 3 || i === 7 ) className += ' right';
      $('section.image-grid div.grid').append(`<div class="${className}"></div>`);
    }
    // createDiaganol();
  }
  //
  // function createDiaganol () {
  //   const divWidth =$('section.image-grid div div').css('width').slice(0, -2);
  //   const divHeight =$('section.image-grid div div').css('height').slice(0, -2);
  //   const degs = Math.atan(divWidth/divHeight) * (180/Math.PI);
  //   document.styleSheets[0].addRule('section.image-grid div div::after',`transform: skewX(${degs}deg);`);
  // }

  //  createGrid();

  $('section.image-grid a.click-overlay').mouseout(function(){
    $(this).parent().children('div, section.images').css({'transform': `rotateY(0deg) rotateX(0deg)`});

    clearInterval(h1Interval);
    clearInterval(h2Interval);
    clearInterval(pInterval);

    const text = $(this).parent().next().children();
    $.each(text, function(index, value){
      if(index === 0) value.textContent = h1 ;
      else if(index === 1) value.textContent = h2;
      else value.textContent = p;
    });
  });

  function shuffle(array) { // The Fisher Yates Shuffle!
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  function jumbleLetters (value) {
    let textArray = value.textContent.split('');
    textArray = shuffle(textArray);
    value.textContent = textArray.join('');
  }

  function clearIntervals(element, thisElement) {
    if(element === 'h1') clearInterval(h1Interval);
    else if(element === 'h2') clearInterval(h2Interval);
    else clearInterval(pInterval);

    const text = $(thisElement).parent().next().children();
    $.each(text, function(index, value){
      if(index === 0) value.textContent = h1 ;
      else if(index === 1) value.textContent = h2;
      else value.textContent = p;
    });
  }

  $('section.image-grid a.click-overlay').mouseover(function(){
    const text = $(this).parent().next().children();
    const thisElement = this;
    $.each(text, function(index, value){
      if(index === 0) {
        h1 = value.textContent;
        h1Interval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 600, 'h1', thisElement);
      } else if(index === 1) {
        h2 = value.textContent;
        h2Interval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 1000, 'h2', thisElement);
      } else {
        p = value.textContent;
        pInterval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 1400, 'p', thisElement);
      }
    });
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
