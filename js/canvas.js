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

var right = true;
var canvas, ctx, pos_x = 0, img;

function movingCanvas(){
    canvas = document.getElementById("canvas2");
    ctx = canvas.getContext("2d");

    img = document.getElementById("canvasImg");

    setTimeout(
        function(){
            ctx.clearRect(0, 0, 650, 400);
            ctx.drawImage(img, pos_x, 0);

            if(right){
                if(pos_x == canvas.width){
                    pos_x--;
                    right = false;
                } else {
                    pos_x++;
                }
            }   
            if(!right){
                if(pos_x == 0){
                    pos_x++;
                    right = true;
                } else {
                    pos_x--;
                } 
            }
            movingCanvas();
        }
    , 2);
}

function onScreenshotPressed() {
    var screenshotCanvas = document.getElementById("screenshotCanvas");
    var video_player = document.getElementById("video_player");
    var ctx = screenshotCanvas.getContext("2d");
    
    ctx.drawImage(video_player, 0, 0, screenshotCanvas.width, screenshotCanvas.height);
}

function onBWPRessed(){
    var RGBCanvas = document.getElementById("RGBCanvas");
    var video_player = document.getElementById("video_player");
    var rgbCtx = RGBCanvas.getContext("2d");
    
    rgbCtx.drawImage(video_player, 0, 0, RGBCanvas.width, RGBCanvas.height);

    try {
        var pixel = rgbCtx.getImageData(0, 0, RGBCanvas.width, RGBCanvas.height);
        var data = pixel.data;
        
        for (var i = 0; i < data.length; i += 4) {
            var m = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = m;
            data[i + 1] = m;
            data[i + 2] = m;
        }
        rgbCtx.putImageData(pixel, 0, 0);
    } catch {

    }
}

function displayBWVideo(){
    var bwCanvas = document.getElementById('RGBCanvas');

    if (bwCanvas.style.display == "block"){
        bwCanvas.style.display = "none";
    } else {
        bwCanvas.style.display = "block";
    }
}