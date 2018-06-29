"use strict";

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
})();

function circle() {

    //　Canvas未サポートは実行しない
    if(!window.HTMLCanvasElement) return;
    var canvas = document.getElementById("colorCanvas");
    var ctx = canvas.getContext('2d');
    var clickPoint = { x: 0, y: 0 };

    class Particle{
      constructor(scale, speed) {
        this.scale = scale;
        this.speed = speed;
        this.position =  { x: 0, y: 0 }
      }
    }

    var particle = new Particle(50, 6);

    particle.draw = function() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);
      ctx.fillStyle = 'gray';
      ctx.fill();
    }

    particle.update = function() {
      this.position.x += (clickPoint.x - this.position.x) / this.speed;
      this.position.y += (clickPoint.y - this.position.y) / this.speed;
      this.draw();
    }

    var loop = function() {
        requestAnimFrame(loop);
        // 再描画時の処理
        //ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = $('.tbc-banner').css("background-color");
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1;
        particle.update();
    };
    loop();

    var rect = canvas.getBoundingClientRect();

    canvas.addEventListener('mousemove', function(e) {
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        clickPoint.x = mouseX;
        clickPoint.y = mouseY;
    }, false);
};
