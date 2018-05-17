var video_player, source, video_catalog, video_playlist, btnPlayPauseVideo, videoTimeBar, currentVideo, video_dl;

function init_VideoPlayer() {
    video_player = document.getElementById('video_player');
    video_source = document.getElementById('video_source');
    video_catalog = document.getElementById('video_catalog');
    video_playlist = ["video/videos/fresh_guacamole.mp4", "video/videos/submarine_sandwich.mp4"];
    btnPlayPauseVideo = document.getElementById('btnPlayPauseVideo');
    videoTimeBar = document.getElementById('videoTimeBar');
    video_dl = document.getElementById('video_dl');
    
    // Se precarga el primer video
    currentVideo = 0;
    loadVideo(0);
}

function loadVideo(video){
    video_source.src = video_playlist[video];
    video_player.load();
    video_catalog.focus();
}

function onVideoSelect(element){
    var selectedVideo = element;

    videoTimeBar.value = 0;

    video_source.src = selectedVideo.getAttribute('data-value');

    currentVideo = selectedVideo.value;
    
    video_player.load();
    video_player.play();

    btnPlayPauseVideo.src = "video/controls/pause.png";
}

function updateVideoCurrentTime() {
    var currentTime = document.getElementById('currentVideoTime');
    
    currentTime.innerHTML = formatTime(video_player.currentTime);
}

function updateVideoTotalTime() {
    var totalTime = document.getElementById('totalVideoTime');
    totalTime.innerHTML = " / " + formatTime(video_player.duration);
}

function onVideoTimeBarMouseDown() {
    if (!isPausedVideo()) {
        video_player.pause();
    }
}

function onVideoTimeBarMouseUp() {
    if (!isPausedVideo()){ // Sólo se da al play si antes se estaba reproduciendo
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

function onVideoVolumeChange(){
    video_player.volume = videoVolumeBar.value;
}

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

function loadNextVideo(){
    currentVideo = ++currentVideo < video_playlist.length ? currentVideo : 0;
    video_source.src = video_playlist[currentVideo];

    video_catalog.value = currentVideo;
    video_catalog.focus();
    
    video_player.load();
}

function loadPrevVideo(){
    currentVideo = --currentVideo > -1 ? currentVideo : video_playlist.length - 1;
    video_source.src = video_playlist[currentVideo];

    video_catalog.value = currentVideo;
    video_catalog.focus();
    
    video_player.load();
}

function onPrevVideoPressed(){
    loadPrevVideo();

    if (!isPausedVideo()){
        video_player.play();
    }
}

function onNextVideoPressed(){
    loadNextVideo();

    if (!isPausedVideo()){
        video_player.play();
    }

    updateVideoCurrentTime();
}

function onFullscreenPressed(){
    if (video_player.requestFullscreen) {
        video_player.requestFullscreen();
    } else if (video_player.mozRequestFullScreen) {
        video_player.mozRequestFullScreen(); // Firefox
    } else if (video_player.webkitRequestFullscreen) {
        video_player.webkitRequestFullscreen(); // Chrome and Safari
    }
}

function onVideoPlayingTimePassed() {
    videoTimeBar.value = (100 / video_player.duration) * video_player.currentTime;
}

function onVideoTimeChange() {
    video_player.currentTime = video_player.duration * (videoTimeBar.value / 100);
}

function onVideoLoadSource(){
    video_dl.href = video_source.src;
}

function onFastForwardPressed(){
    if (video_player.playbackRate == 1.0) {
        video_player.playbackRate = 2.0;
    } else {
        video_player.playbackRate = 1.0;
    } 
}

function isPausedVideo(){
    return btnPlayPauseVideo.getAttribute('src') == "video/controls/play.png"; 
}