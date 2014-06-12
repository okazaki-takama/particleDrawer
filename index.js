jQuery(function($){
  var canvas = $("#canvas1");
  var input = $("input");

  canvas.particleDrawer(input[0].value);

  input.on("keyup", function(){
    canvas.particleDrawer(this.value);
  });

  $("#canvas2").particleDrawer("js", {
    ratio: 6,
    font: "40px 'Times New Roman'",
    color: "rgba(255, 255, 0, 0.8)",
    align: "right",
    baseline: "bottom"
  });

  $("#canvas3").particleDrawer({
    text: "php",
    ratio: 6,
    font: "20px sans-serif",
    color: "#0000ff",
    align: "left",
    baseline: "top"
  });

  $("#canvas4").particleDrawer("HTML", {
    ratio: "5",
    font: "40px 'Lobster'",
    webfont: "Lobster"
  });
});