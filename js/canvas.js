function drawCanvas(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Rectángulo
    ctx.fillStyle = "#1C478E"
    ctx.fillRect(0, 0, 250, 100);
    
    // Línea
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(250, 150);
    ctx.stroke();

    // Arco
    ctx.beginPath();
    ctx.arc(375, 0, 100, 0, Math.PI);
    ctx.stroke();

    // Gradiente
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 175, 250, 100);

    // Texto
    ctx.font = "30px Arial";
    ctx.fillStyle = "#1C478E";
    ctx.fillText("Texto", 0, 135);

    // Imagen
    var image = document.getElementById("canvasImg");
    ctx.drawImage(image, 275, 170, 303, 118)
}

var forward = true;
var cnv, ctx, pos_x = 0, img;

function movingCanvas(){
    cnv = document.getElementById("canvas2");
    ctx = cnv.getContext("2d");

    img = document.getElementById("canvasImg");

    setTimeout(
        function(){
            ctx.clearRect(0, 0, 650, 400);
            ctx.drawImage(img, pos_x, 0);

            if(forward){
                if(pos_x == cnv.width){
                    pos_x -= 1;
                    forward = false;
                } else {
                    pos_x += 1;
                }
            }   
            if(!forward){
                if(pos_x == 0){
                    pos_x += 1;
                    forward = true;
                } else {
                    pos_x -= 1;
                } 
            }
            movingCanvas();
        }
    , 2);
}