// Se declaran los elementos como una variable global para poder ser alcanzadas en toda la librería
var video_player, video_source, alt_video_source, video_catalog, video_playlist, alt_video_playlist, btnPlayPauseVideo, videoTimeBar, currentVideo, video_dl, alt_video_dl;

// Inicialización de todos los elementos
function init_VideoPlayer() {
    video_player = document.getElementById('video_player');
    video_source = document.getElementById('video_source');
    alt_video_source = document.getElementById('alt_video_source');
    video_catalog = document.getElementById('video_catalog');
    video_playlist = ["video/videos/fresh_guacamole.mp4", "video/videos/submarine_sandwich.mp4"];
    alt_video_playlist = ["video/videos/fresh_guacamole.webm", "video/videos/submarine_sandwich.webm"];
    btnPlayPauseVideo = document.getElementById('btnPlayPauseVideo');
    videoTimeBar = document.getElementById('videoTimeBar');
    video_dl = document.getElementById('video_dl');
    alt_video_dl = document.getElementById('alt_video_dl');

    // Se precarga el primer video
    currentVideo = 0;
    loadVideo(0);
}

// Util. Carga un vídeo pasando por parámetro el índice del array donde se encuentra dicho vídeo
function loadVideo(video){
    video_source.src = video_playlist[video];
    alt_video_source.src = alt_video_playlist[video];

    video_player.load();
}

// Al elegir una vídeo de la lista
function onVideoSelect(video){
    var selectedVideo = video;

    videoTimeBar.value = 0;

    video_source.src = selectedVideo.getAttribute('data-value');
    alt_video_source.src = selectedVideo.getAttribute('data-value-alt');

    video_player.load();
    video_player.play();

    btnPlayPauseVideo.src = "video/controls/pause.png";
}

// Muestra el tiempo actual del vídeo
function updateVideoCurrentTime() {
    var currentTime = document.getElementById('currentVideoTime');
    
    currentTime.innerHTML = formatTime(video_player.currentTime);
}

// Actualiza el tiempo total del vídeo
function updateVideoTotalTime() {
    var totalTime = document.getElementById('totalVideoTime');
    totalTime.innerHTML = " / " + formatTime(video_player.duration);
}

// Pausa el vídeo cuando se esta moviendo la barra de tiempo
function onVideoTimeBarMouseDown() {
    if (!isPausedVideo()) {
        video_player.pause();
    }
}

// Despausa el vídeo cuando se suelta la barra de tiempo
function onVideoTimeBarMouseUp() {
    if (!isPausedVideo()){ // Sólo se da al play si antes se estaba reproduciendo
        video_player.play();
    } 
}

// Botón play/pausa
function onVideoPlayPausePressed() {
    if (video_player.paused) {
        video_player.play();
        btnPlayPauseVideo.src = "video/controls/pause.png";
    } else {
        video_player.pause();
        btnPlayPauseVideo.src = "video/controls/play.png";
    }
}

// Control de volumen del vídeo con el input range
function onVideoVolumeChange(){
    video_player.volume = videoVolumeBar.value;
}

// Botón mute audio
function onVideoMuteClick() {
    if (!video_player.muted) {
        video_player.muted = true;
        btnVideoMute.src = "video/controls/mute.png";
        console.log("muted");
    } else {
        video_player.muted = false;
        btnVideoMute.src = "video/controls/speaker.png";
        console.log("unmuted");
    }
}

// Util. Carga el vídeo siguiente
function loadNextVideo(){
    currentVideo = ++currentVideo < video_playlist.length ? currentVideo : 0;
    video_source.src = video_playlist[currentVideo];
    alt_video_source.src = alt_video_playlist[currentVideo];

    video_catalog.value = currentVideo;
    video_catalog.focus();
    
    video_player.load();
}

// Util. Carga el vídeo anterior
function loadPrevVideo(){
    currentVideo = --currentVideo > -1 ? currentVideo : video_playlist.length - 1;
    video_source.src = video_playlist[currentVideo];
    alt_video_source.src = alt_video_playlist[currentVideo];

    video_catalog.value = currentVideo;
    video_catalog.focus();
    
    video_player.load();
}

// Botón vídeo anterior
function onPrevVideoPressed(){
    loadPrevVideo();

    if (!isPausedVideo()){
        video_player.play();
    }
}

// Botón siguiente vídeo
function onNextVideoPressed(){
    loadNextVideo();

    console.log(video_source);
    console.log(alt_video_source);

    if (!isPausedVideo()){
        video_player.play();
    }

    updateVideoCurrentTime();
}

// Botón fullscreen
function onFullscreenPressed(){
    if (video_player.requestFullscreen) {
        video_player.requestFullscreen();
    } else if (video_player.mozRequestFullScreen) {
        video_player.mozRequestFullScreen(); // Firefox
    } else if (video_player.webkitRequestFullscreen) {
        video_player.webkitRequestFullscreen(); // Chrome and Safari
    }
}

// Hace avanzar la barra de tiempo cuando se está reproduciendo el vídeo
function onVideoPlayingTimePassed() {
    videoTimeBar.value = (100 / video_player.duration) * video_player.currentTime;
}

// Para saltar a una posición determinada del vídeo al hacer click al input range
function onVideoTimeChange() {
    video_player.currentTime = video_player.duration * (videoTimeBar.value / 100);
}

// Carga el link de descarga oculto cuando se elige un vídeo, en caso de que el navegador no soporte el vídeo
function onVideoLoadSource(){
    video_dl.href = video_source.src;
    alt_video_dl.href = alt_video_source.src;
}

// Botón avance rápido
function onFastForwardPressed(){
    if (video_player.playbackRate == 1.0) {
        video_player.playbackRate = 2.0;
    } else {
        video_player.playbackRate = 1.0;
    } 
}

// Util. ¿Está pausado el vídeo?
function isPausedVideo(){
    return btnPlayPauseVideo.getAttribute('src') == "video/controls/play.png"; 
}