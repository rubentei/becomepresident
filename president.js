//GAME DATA
var score = 0;
$(".score").html(`Score: ${score}`);
var xball2 = 0;
var yball2 = 0;
var changeTime = 3100;
var gameWidth = 700;
var gameHeight = 700;
$(".gamepath").css({width: gameWidth});
$(".gamepath").css({height: gameHeight});
var previouswidth = $(".ball1").css("width").replace("px", '');
var previousheight = $(".ball1").css("height").replace("px", '');
var checkCollisionTime = 300;
var gameFinal = false;
var ball2radius = ($(".ball2").css("width").replace("px", ''))/2;
  
//ball2  
function newPosition(){
    var h = $(".gamepath").height() - 33;
    var w = $(".gamepath").width() - 33;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];    
}

function animateBall(myclass){
    var newq = newPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 2600,   function(){
      animateBall(myclass);        
    }); 
};
   
//ball1 grow
function grow(){
var newWidth = previouswidth * 1.13;
var newHeight = previousheight * 1.13;
$(".ball1").css('width', newWidth);
$(".ball1").css('height', newHeight);
previouswidth = newWidth;
previousheight = newHeight;
}
    
setInterval(function(){
var ball1_position_x = $( ".ball1" ).position().left;
var ball1_position_y = $( ".ball1" ).position().top;
var ball2_position_x = $( ".ball2" ).position().left;
var ball2_position_y = $( ".ball2" ).position().top;
var ball1 = {radius: (previouswidth / 2), x: ball1_position_x, y: ball1_position_y};
var ball2 = {radius: ball2radius, x: ball2_position_x, y: ball2_position_y};
var dx = ball1.x - ball2.x;
var dy = ball1.y - ball2.y;
var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < (ball1.radius + (ball2.radius - 2))) {
    grow();
    score += 50;
    $(".score").html(`Score: ${score}`);
    if(score >= 1200){
        $(".ball1").css("display", "none");
        $(".ball2").css({"border-radius": 0, "background-image": "none" ,"background-color": "white", width: 300, height: 150, "text-align": "center", "font-size": 25});
        $(".ball2").text("Eres PRESIDENTE del GOBIERNO!!       ¡¡ENHORABUENA!!");
        score = 1200;
    }
}
}, checkCollisionTime);

//MOVEMENT
var container = $('#gamepath'),
    ball1 = $('#ball1'),
    diameter = $(".ball1").css('width').replace("px", ''),
    w = container.width() - (ball1.width() + (diameter/2)),
    d = {},
    x = 3;

function newv(v,a,b) {
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
    return n < 0 ? 0 : n > w ? w : n;
}

$(window).keydown(function(e) { d[e.which] = true; });
$(window).keyup(function(e) { d[e.which] = false; });

setInterval(function() {
    ball1.css({
        left: function(i,v) { return newv(v, 65, 68); },
        top: function(i,v) { return newv(v, 87, 83); }
    });
}, 20);

$(document).ready(function(){
    animateBall('.ball2');
});
