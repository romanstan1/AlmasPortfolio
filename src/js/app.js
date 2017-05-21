
document.onreadystatechange = function(e) {
  if(document.readyState === "interactive") {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      check_element(all[i]);
    }
  }
};

function check_element(ele) {
  var all = document.getElementsByTagName("*");
  var totalele = all.length;
  var per_inc = 100/all.length;

  if($(ele).on()) {
    var prog_width = per_inc + Number(document.getElementById("progress_width").value);
    document.getElementById("progress_width").value = prog_width;
    $("#bar2").animate({width:prog_width + "%"},10,function(){
      $("#percent1").html(prog_width.toFixed(0) + "%");
      if(document.getElementById("bar2").style.width === "100%") {
        $("#bar2").css({'transition': '0.6s ease-out', 'width': '0%'});
        $(".bar").css({'transition': '1.0s ease-out', 'width': '0%'});
        $(".progress").fadeOut(1000, 'swing');
        $("html").css('overflow', 'visible');
      }
    });
  } else check_element(ele);
}

$(document).ready(() => {

  $('.image-grid').waypoint(function() {
    const $thisElement = $(this.element);
    function fadeIn() {
      $thisElement.children('section.images').css('opacity', '1');
    }
    setTimeout(fadeIn, 400);
    $(this.element.nextElementSibling).css({'transform': 'translateY(0px)'});
    $(this.element).css({'opacity': '1', 'transform': 'translateY(0px)'});
  }, {
      offset: '120%'
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

  let h1 = null;
  let h2 = null;
  let p = null;

  let h1Interval = null;
  let h2Interval = null;
  let pInterval = null;

  let h1IntervalBoolean = true;
  let h2IntervalBoolean = true;
  let pIntervalBoolean = true;

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
