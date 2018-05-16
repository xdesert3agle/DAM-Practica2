var player, source, tracklist, playlist, btnplayPause, videoTimeBar, currentSong, track_dl;

function initVideoPlayer() {
    player = document.getElementById('video_player');
    source = document.getElementById('video_player');
    tracklist = document.getElementById('tracklist');
    playlist = [];
    btnPlayPause = document.getElementById('btnPlayPause');
    videoTimeBar = document.getElementById('videoTimeBar');
    track_dl = document.getElementById('track_dl');

    // Llenamos el array 'playlist' con las canciones del <select>
    for (var j = 0; j < tracklist.length; j++){
        playlist[j] = tracklist.options[j].getAttribute('data-value');
    }
    
    // Se precarga la primera canción
    currentSong = 0;
    loadTrack(0);
}