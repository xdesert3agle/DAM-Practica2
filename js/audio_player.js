var audio_player, audio_source, tracklist, playlist, btnPlayPauseAudio, audioTimebar, currentSong, track_dl;

function init_AudioPlayer() {
    audio_player = document.getElementById('audio_player');
    audio_source = document.getElementById('audio_source');
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

function loadTrack(song){
    audio_source.src = playlist[song];
    audio_player.load();
    tracklist.focus();
}

function onTrackSelect(){
    var selectedSong = tracklist.options[tracklist.selectedIndex];

    audioTimeBar.value = 0;

    audio_source.src = selectedSong.getAttribute('data-value');

    currentSong = selectedSong.value;
    
    audio_player.load();
    audio_player.play();

    btnPlayPauseAudio.src = "audio/controls/pause.png";
}

function loadNextTrack(){
    currentSong = ++currentSong < playlist.length ? currentSong : 0;
    audio_source.src = playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    audio_player.load();
}

function loadPrevTrack(){
    currentSong = --currentSong > -1 ? currentSong : playlist.length - 1;
    audio_source.src = playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    audio_player.load();
}

function onSongEnded(){
    repeatPlaylist = document.getElementById('repeatPlaylist').checked;
    if (!isPausedAudio()) {
        if (!repeatPlaylist && currentSong == 2) {
        
        }
        else {
            loadNextTrack();
            audio_player.play();
        }
    }
}

function onAudioPlayPausePressed() {
    if (audio_player.paused) {
        audio_player.play();
        btnPlayPauseAudio.src = "audio/controls/pause.png";
    } else {
        audio_player.pause();
        btnPlayPauseAudio.src = "audio/controls/play.png";
    }
}

function onPrevTrackPressed(){
    loadPrevTrack();

    if (!isPausedAudio()){
        audio_player.play();
    }
}

function onNextTrackPressed(){
    loadNextTrack();

    if (!isPausedAudio()){
        audio_player.play();
    }

    updateAudioCurrentTime();
}

function onAudioTimeChange() {
    audio_player.currentTime = audio_player.duration * (audioTimeBar.value / 100);
}

function updateAudioCurrentTime() {
    var currentTime = document.getElementById('currentAudioTime');
    currentTime.innerHTML = formatTime(audio_player.currentTime);
}

function updateAudioTotalTime() {
    var totalTime = document.getElementById('totalAudioTime');
    totalTime.innerHTML = " / " + formatTime(audio_player.duration);
}

function onAudioPlayingTimePassed() {
    audioTimeBar.value = (100 / audio_player.duration) * audio_player.currentTime;
}

function onAudioTimeBarMouseDown() {
    if (!isPausedAudio()) {
        audio_player.pause();
    }
}

function onAudioTimeBarMouseUp() {
    if (!isPausedAudio()){ // Sólo se da al play si antes se estaba reproduciendo
        audio_player.play();
    } 
}

function onAudioMuteClick() {
    if (!audio_player.muted) {
        audio_player.muted = true;
        btnMuteAudio.src = "audio/controls/mute.png";
    } else {
        audio_player.muted = false;
        btnMuteAudio.src = "audio/controls/speaker.png";
    }
}

function onAudioVolumeChange(){
    audio_player.volume = audioVolumeBar.value;
}

function onAudioLoadSource(){
    track_dl.href = audio_source.src;
}

function isPausedAudio(){
    return btnPlayPauseAudio.getAttribute('src') == "audio/controls/play.png"; 
}