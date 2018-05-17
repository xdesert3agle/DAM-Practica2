// Se declaran los elementos como una variable global para poder ser alcanzadas en toda la librería
var audio_player, audio_source, alt_audio_source, tracklist, playlist, alt_playlist, btnPlayPauseAudio, audioTimebar, currentSong, track_dl, alt_track_dl;

// Inicialización de todos los elementos
function init_AudioPlayer() {
    audio_player = document.getElementById('audio_player');
    audio_source = document.getElementById('audio_source');
    alt_audio_source = document.getElementById('alt_source');
    tracklist = document.getElementById('tracklist');
    playlist = [];
    alt_playlist = [];
    btnPlayPauseAudio = document.getElementById('btnPlayPauseAudio');
    audioTimeBar = document.getElementById('audioTimeBar');
    track_dl = document.getElementById('track_dl');
    alt_track_dl = document.getElementById('alt_track_dl');

    // Se llena el array 'playlist' y 'alt_playlist' con las canciones del <select>, en mp3 y en ogg respectivamente
    for (var j = 0; j < tracklist.length; j++){
        playlist[j] = tracklist.options[j].getAttribute('data-value');
        alt_playlist[j] = tracklist.options[j].getAttribute('data-value-alt');
    }
    
    // Se precarga la primera canción
    currentSong = 0;
    loadTrack(0);
}

// Util. Carga una canción pasando por parámetro el índice del array donde se encuentra la canción
function loadTrack(song){
    audio_source.src = playlist[song];
    alt_audio_source.src = alt_playlist[song];

    audio_player.load();
    tracklist.focus();
}

// Al elegir una canción de la lista
function onTrackSelect(){
    var selectedSong = tracklist.options[tracklist.selectedIndex];

    audioTimeBar.value = 0;

    audio_source.src = selectedSong.getAttribute('data-value');
    alt_audio_source.src = selectedSong.getAttribute('data-value-alt');

    currentSong = selectedSong.value;
    
    audio_player.load();
    audio_player.play();

    btnPlayPauseAudio.src = "audio/controls/pause.png";
}

// Canción siguiente
function loadNextTrack(){
    currentSong = ++currentSong < playlist.length ? currentSong : 0;
    audio_source.src = playlist[currentSong];
    alt_audio_source.src = alt_playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    audio_player.load();
}

// Canción anterior
function loadPrevTrack(){
    currentSong = --currentSong > -1 ? currentSong : playlist.length - 1;
    audio_source.src = playlist[currentSong];
    alt_audio_source.src = alt_playlist[currentSong];

    tracklist.value = currentSong;
    tracklist.focus();
    
    audio_player.load();
}

// Cuando termina una canción
function onSongEnded(){
    repeatPlaylist = document.getElementById('repeatPlaylist').checked;
    
    if (!isPausedAudio()) {
        
        // No he encontrado la forma de invertir la condición para que quede más presentable.
        // Si es la ultima canción y no está puesta la repetición de la playlist no hace nada, si no
        // vuelve a empezar por la primera canción.
        if (!repeatPlaylist && currentSong == 2) {
            
        }
        else {
            loadNextTrack();
            audio_player.play();
        }
    }
}

// Botón play/pausa
function onAudioPlayPausePressed() {
    if (audio_player.paused) {
        audio_player.play();
        btnPlayPauseAudio.src = "audio/controls/pause.png";
    } else {
        audio_player.pause();
        btnPlayPauseAudio.src = "audio/controls/play.png";
    }
}

// Canción anterior
function onPrevTrackPressed(){
    loadPrevTrack();

    if (!isPausedAudio()){
        audio_player.play();
    }
}

// Canción siguiente
function onNextTrackPressed(){
    loadNextTrack();

    if (!isPausedAudio()){
        audio_player.play();
    }

    updateAudioCurrentTime();
}

// Para saltar a una posición determinada de la canción al hacer click al input range
function onAudioTimeChange() {
    audio_player.currentTime = audio_player.duration * (audioTimeBar.value / 100);
}

// Muestra el tiempo actual de la canción
function updateAudioCurrentTime() {
    var currentTime = document.getElementById('currentAudioTime');
    currentTime.innerHTML = formatTime(audio_player.currentTime);
}

// Muestra el tiempo total de la canción
function updateAudioTotalTime() {
    var totalTime = document.getElementById('totalAudioTime');
    totalTime.innerHTML = " / " + formatTime(audio_player.duration);
}

// Hace avanzar la barra de tiempo cuando se está reproduciendo la canción
function onAudioPlayingTimePassed() {
    audioTimeBar.value = (100 / audio_player.duration) * audio_player.currentTime;
}

// Pausa la canción cuando se esta moviendo la barra de tiempo
function onAudioTimeBarMouseDown() {
    if (!isPausedAudio()) {
        audio_player.pause();
    }
}

// Despausa la canción cuando se suelta la barra de tiempo
function onAudioTimeBarMouseUp() {
    if (!isPausedAudio()){ // Sólo se da al play si antes se estaba reproduciendo
        audio_player.play();
    } 
}

// Botón mute audio
function onAudioMuteClick() {
    if (!audio_player.muted) {
        audio_player.muted = true;
        btnMuteAudio.src = "audio/controls/mute.png";
    } else {
        audio_player.muted = false;
        btnMuteAudio.src = "audio/controls/speaker.png";
    }
}

// Control del volumen con el input range
function onAudioVolumeChange(){
    audio_player.volume = audioVolumeBar.value;
}

// Carga el link de descarga oculto cuando se elige una canción, en caso de que el navegador no soporte el audio
function onAudioLoadSource(){
    track_dl.href = audio_source.src;
    alt_track_dl.href = alt_audio_source.src;
}

// Util. ¿Está pausada la canción?
function isPausedAudio(){
    return btnPlayPauseAudio.getAttribute('src') == "audio/controls/play.png"; 
}