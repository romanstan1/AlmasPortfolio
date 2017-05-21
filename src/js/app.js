
// $(function() {
//
//   // Default
//   // jQuery.scrollSpeed(100, 800);
//
//   // Custom Easing
//   $.scrollSpeed(20, 1000, 'easeOutCubic');
//
// });

// $.scrollSpeed(100, 800, 'easeOutCubic');
$(document).ready(() => {

  $('.image-grid').waypoint(function() {
    // this.css( 'opacity', '1' );
    // $.css( 'opacity', '1' );

    const $thisElement = $(this.element);
    console.log($(this.element));
    console.log($(this.element).children('section.images'));
    function fadeIn() {
      $thisElement.children('section.images').css('opacity', '1');
    }
    setTimeout(fadeIn, 400);
    $(this.element.nextElementSibling).css({'transform': 'translateY(0px)'});
    $(this.element).css({'opacity': '1', 'transform': 'translateY(0px)'});
  }, {
      offset: '100%'
  });

  const imageParent = $('section.image-grid').find('img').parent();
  imageParent.append( '<canvas> You browser does not support canvas </canvas>' );

  imageParent.children('canvas').each((index, canvas) => {
    const source = canvas.previousSibling.previousSibling.src;
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = source;

      function draw() {
        if(!image.complete) {
          setTimeout(draw, 50);
          return;
        }
        ctx.drawImage(image,canvas.previousSibling.previousSibling.naturalWidth * 0.2,0,3,canvas.previousSibling.previousSibling.naturalHeight,0,0, canvas.width ,canvas.height);
      }

      draw();
  });


  //
  // $( "li.item-ii" ).find( "li" ).css( "background-color", "red" );
  //
  // const canvas1 = $('#canvas-overlay')[0];
  // console.log(canvas1, "thisone");
  // canvas.width = canvas.scrollWidth;
  // canvas.height = canvas.scrollHeight;
  //
  // const ctx = canvas.getContext('2d');
  // const image = new Image();
  // image.src = 'images/BubbleTwo.png';
  // console.log(image.src);
  // // ctx.drawImage(image,10,300,1,300,0,0,500,300);
  // ctx.drawImage(image,20,0,1,2200,0,0, canvas.width ,canvas.height);

  // $.scrollSpeed(100, 800, 'easeOutCubic');

  // const waypoint = new Waypoint({
  //   element: document.getElementById('basic-waypoint'),
  //   handler: function() {
  //     // notify('Basic waypoint triggered');
  //     console.log('Basic waypoint triggered');
  //   }
  // });

  // $(function() {
  //
  //   // Default
  //   // jQuery.scrollSpeed(100, 800);
  //
  //   // Custom Easing
  //   jquery.scrollSpeed(100, 800, 'easeOutCubic');
  //
  // });

  // const waypoint2 = new Waypoint({
  //   element: document.getElementById('basic-waypoint'),
  //   handler: function(direction) {
  //     // notify('Direction: ' + direction);
  //     console.log(direction);
  //   }
  // });

  // const waypoint3 = new Waypoint({
  //   element: document.getElementById('px-offset-waypoint'),
  //   handler: function(down) {
  //     notify('I am 20px from the top of the window');
  //     console.log('I am 20px from the top of the window');
  //   },
  //   offset: 20
  // });

  let h1 = null;
  let h2 = null;
  let p = null;

  let h1Interval = null;
  let h2Interval = null;
  let pInterval = null;

  let h1IntervalBoolean = true;
  let h2IntervalBoolean = true;
  let pIntervalBoolean = true;

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
    createDiaganol();
  }
  //
  function createDiaganol () {
    const divWidth =$('section.image-grid div div').css('width').slice(0, -2);
    const divHeight =$('section.image-grid div div').css('height').slice(0, -2);
    const degs = Math.atan(divWidth/divHeight) * (180/Math.PI);
    document.styleSheets[0].addRule('section.image-grid div div::after',`transform: skewX(${degs}deg);`);
  }

   createGrid();

  $('section.image-grid a.click-overlay').mouseout(function(){
    $(this).parent().children('div, section.images').css({'transform': `rotateY(0deg) rotateX(0deg)`});

    clearInterval(h1Interval);
    clearInterval(h2Interval);
    clearInterval(pInterval);

    h1IntervalBoolean = false;
    h2IntervalBoolean = false;
    pIntervalBoolean = false;

    resetLetters(this);
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

  function resetLetters(thisElement) {
    const text = $(thisElement).parent().next().children();
    $.each(text, function(index, value){
      if(index === 0) value.textContent = h1 ;
      else if(index === 1) value.textContent = h2;
      else value.textContent = p;
    });
  }

  function jumbleLetters (value) {
    let textArray = value.textContent.split('');
    textArray = shuffle(textArray);
    value.textContent = textArray.join('');
  }

  function clearIntervals(element, textContent, thisElement) {
    if(element === 'h1' && h1IntervalBoolean) clearInterval(h1Interval);
    else if (element === 'h2' && h2IntervalBoolean) clearInterval(h2Interval);
    else if (element === 'p' && pIntervalBoolean) clearInterval(pInterval);
    else console.log();
    $(thisElement).parent().next().children(element)[0].textContent = textContent;
  }

  $('section.image-grid a.click-overlay').mouseover(function(){
    const text = $(this).parent().next().children();
    const thisElement = this;
    h1IntervalBoolean = true;
    h2IntervalBoolean = true;
    pIntervalBoolean = true;
    $.each(text, function(index, value){
      if(index === 0) {
        h1 = value.textContent;
        const hOne = value.textContent;
        h1Interval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 600, 'h1', hOne, thisElement);
      } else if(index === 1) {
        h2 = value.textContent;
        const hTwo = value.textContent;
        h2Interval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 1000, 'h2', hTwo, thisElement);
      } else {
        p = value.textContent;
        const para = value.textContent;
        pInterval = setInterval(function(){ jumbleLetters(value);}, 70);
        setTimeout(clearIntervals, 1400, 'p', para, thisElement);
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
