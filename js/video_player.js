var player, source, tracklist, playlist, btnplayPause, audioTimebar, currentSong;

function init() {
    player = document.getElementById('audio_player');
    source = document.getElementById('audio_source');
    tracklist = document.getElementById('tracklist');
    playlist = [];
    btnPlayPause = document.getElementById('btnPlayPause');
    audioTimeBar = document.getElementById('audioTimeBar');

    // Llenamos el array 'playlist' con las canciones del <select>
    for (var j = 0; j < tracklist.length; j++){
        playlist[j] = tracklist.options[j].getAttribute('data-value');
    }
    
    // Se precarga la primera canción
    currentSong = 0;
    loadTrack(0);
}

function loadTrack(song){
    source.src = playlist[song];
    player.load();
    tracklist.focus();
}

function onTrackSelect(){
    var selectedSong = tracklist.options[tracklist.selectedIndex];
    
    audioTimeBar.value = 0;

    source.src = selectedSong.getAttribute('data-value');

    currentSong = selectedSong.value;
    
    player.load();
    player.play();

    btnPlayPause.src = "audio/controls/pause.png";
}

function loadNextTrack(){
    currentSong = ++currentSong < playlist.length ? currentSong : 0;
    source.src = playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    player.load();
}

function loadPrevTrack(){
    currentSong = --currentSong > -1 ? currentSong : playlist.length - 1;
    source.src = playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    player.load();
}

function onSongEnded(){
    repeatPlaylist = document.getElementById('repeatPlaylist').checked;
    if (!isPaused()) {
        if (!repeatPlaylist && currentSong == 2) {
        
        }
        else {
            loadNextTrack();
            player.play();
        }
    }
}

function onPlayPausePressed() {
    if (player.paused) {
        player.play();
        btnPlayPause.src = "audio/controls/pause.png";
    } else {
        player.pause();
        btnPlayPause.src = "audio/controls/play.png";
    }
}

function onPrevTrackPressed(){
    loadPrevTrack();

    if (!isPaused()){
        player.play();
    }
}

function onNextTrackPressed(){
    loadNextTrack();

    if (!isPaused()){
        player.play();
    }
}

function onAudioTimeChange() {
    player.currentTime = player.duration * (audioTimeBar.value / 100);
}

function updateCurrentTime() {
    var currentTime = document.getElementById('currentTime');
    
    currentTime.innerHTML = formatTime(player.currentTime);
}

function updateTotalTime() {
    var totalTime = document.getElementById('totalTime');
    totalTime.innerHTML = " / " + formatTime(player.duration);
}

function onPlayingTimePassed() {
    audioTimeBar.value = (100 / player.duration) * player.currentTime;
}

function onTimeBarMouseDown() {
    if (!isPaused()) {
        player.pause();
    }
}

function onTimeBarMouseUp() {
    if (!isPaused()){ // Sólo se da al play si antes se estaba reproduciendo
        player.play();
    } 
}

function onMuteClick() {
    var player = document.getElementById('audio_player');
    var btnMuteAudio = document.getElementById('btnMuteAudio');

    if (!player.muted) {
        player.muted = true;
        btnMuteAudio.src = "audio/controls/mute.png";
    } else {
        player.muted = false;
        btnMuteAudio.src = "audio/controls/speaker.png";
    }
}

function onAudioVolumeChange(){
    var player = document.getElementById('audio_player');
    var audioVolumeBar = document.getElementById('audioVolumeBar');

    player.volume = audioVolumeBar.value;
}

function isPaused(){
    return btnPlayPause.getAttribute('src') == "audio/controls/play.png"; 
}