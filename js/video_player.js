var video_player, source, video_catalog, video_playlist, btnPlayPauseVideo, videoTimeBar, currentVideo, video_dl;

function initVideoPlayer() {
    video_player = document.getElementById('video_player');
    video_source = document.getElementById('video_source');
    video_catalog = document.getElementById('video_catalog');
    video_playlist = [];
    btnPlayPauseVideo = document.getElementById('btnPlayPauseVideo');
    videoTimeBar = document.getElementById('videoTimeBar');
    video_dl = document.getElementById('video_dl');

    console.log("Vídeos disponibles:");
    // Llenamos el array 'video_playlist' con los vídeos del <select>
    for (var j = 0; j < video_catalog.length; j++){
        video_playlist[j] = video_catalog.options[j].getAttribute('data-value');
        console.log(video_playlist[j]);
    }
    
    // Se precarga la primera canción
    currentVideo = 0;
    loadVideo(0);
}

function loadVideo(video){
    video_source.src = video_playlist[video];
    video_player.load();
    video_catalog.focus();
}

function onVideoSelect(){
    var selectedVideo = video_catalog.options[video_catalog.selectedIndex];

    videoTimeBar.value = 0;

    source.src = video_catalog.getAttribute('data-value');

    currentVideo = video_catalog.value;
    
    video_player.load();
    video_player.play();

    btnPlayPauseVideo.src = "video/controls/pause.png";
}

function updateVideoCurrentTime() {
    var currentTime = document.getElementById('currentVideoTime');
    
    currentTime.innerHTML = formatTime(player.currentTime);
}

function updateVideoTotalTime() {
    var totalTime = document.getElementById('totalVideoTime');
    totalTime.innerHTML = " / " + formatTime(player.duration);
}

function onVideoPlayingTimePassed() {
    videoTimeBar.value = (100 / video_player.duration) * video_player.currentTime;
}

function onVideoTimeChange() {
    video_player.currentTime = video_player.duration * (videoTimeBar.value / 100);
}

function onVideoTimeBarMouseDown() {
    if (!isPaused()) {
        video_player.pause();
    }
}

function onVideoTimeBarMouseUp() {
    if (!isPaused()){ // Sólo se da al play si antes se estaba reproduciendo
        video_player.play();
    } 
}

function onVideoPlayPausePressed() {
    if (video_player.paused) {
        video_player.play();
        btnPlayPauseVideo.src = "video/controls/pause.png";
    } else {
        video_player.pause();
        btnPlayPauseVideo.src = "video/controls/play.png";
    }
}