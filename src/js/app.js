
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
  if($(ele).on("load")) {
    var prog_width = per_inc + Number(document.getElementById("progress_width").value);
    document.getElementById("progress_width").value = prog_width;
    $("#bar2").animate({width:prog_width + "%"},10,function(){
      $("#percent1").html(prog_width.toFixed(0) + "%");
      if(parseFloat(document.getElementById("bar2").style.width) >= 99.8) {
        $("#bar2").css({"transition": "0.6s ease-out", "width": "0%"});
        $(".bar").css({"transition": "1.0s ease-out", "width": "0%"});
        $(".progress").fadeOut(1000, "swing");
        // $(".progress").fadeOut(1000, "swing");
        setTimeout( (() => {
          $("section.name p").css({'transform': 'translateX(-10%) translateY(-50%)'});
          setTimeout( (() => {
            $("section.name p").css({'transform': 'translateX(-10%) translateY(-50%) rotate(180deg)'});
            setTimeout( (() => {
              $("section.name p").css({'transform': 'translateX(-10%) translateY(-50%) rotate(-360deg)'});
            }), 1500);
          }), 1000);
        }), 1000);
      }
    });
  } else check_element(ele);
}




$(document).ready(() => {
});
