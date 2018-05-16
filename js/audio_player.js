var player, source, tracklist, playlist, btnPlayPauseAudio, audioTimebar, currentSong, track_dl;

function initAudioPlayer() {
    player = document.getElementById('audio_player');
    source = document.getElementById('audio_source');
    tracklist = document.getElementById('tracklist');
    playlist = [];
    btnPlayPauseAudio = document.getElementById('btnPlayPauseAudio');
    audioTimeBar = document.getElementById('audioTimeBar');
    track_dl = document.getElementById('track_dl');

    // Llenamos el array 'playlist' con las canciones del <select>
    for (var j = 0; j < tracklist.length; j++){
        playlist[j] = tracklist.options[j].getAttribute('data-value');
    }
    
    // Se precarga la primera canción
    currentSong = 0;
    loadTrack(0);
}

/*
function onAudioChangeSource(){
    track_dl.href = player.src;
}
*/

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

    btnPlayPauseAudio.src = "audio/controls/pause.png";
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

function onAudioPlayPausePressed() {
    if (player.paused) {
        player.play();
        btnPlayPauseAudio.src = "audio/controls/pause.png";
    } else {
        player.pause();
        btnPlayPauseAudio.src = "audio/controls/play.png";
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

    updateAudioCurrentTime();
}

function onAudioTimeChange() {
    player.currentTime = player.duration * (audioTimeBar.value / 100);
}

function updateAudioCurrentTime() {
    var currentTime = document.getElementById('currentAudioTime');
    
    currentTime.innerHTML = formatTime(player.currentTime);
}

function updateAudioTotalTime() {
    var totalTime = document.getElementById('totalAudioTime');
    totalTime.innerHTML = " / " + formatTime(player.duration);
}

function onAudioPlayingTimePassed() {
    audioTimeBar.value = (100 / player.duration) * player.currentTime;
}

function onAudioTimeBarMouseDown() {
    if (!isPaused()) {
        player.pause();
    }
}

function onAudioTimeBarMouseUp() {
    if (!isPaused()){ // Sólo se da al play si antes se estaba reproduciendo
        player.play();
    } 
}

function onAudioMuteClick() {
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
    return btnPlayPauseAudio.getAttribute('src') == "audio/controls/play.png"; 
}