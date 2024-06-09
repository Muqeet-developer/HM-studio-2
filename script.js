const songs = [
    { title: 'why not meri jaan',  src: 'Why Not Meri Jaan Ft. Young Stunners.mp3' },
    { title: 'Din Te Rat ', src: 'Din Te Raat - FUKRA INSAAN x KKartik ( Official Music Video ) !! My 26th Birthday Surprise❤️.mp3' },
    { title: 'QURANTINE', src: 'QUARANTINE - Young Stunners Talha Anjum x Talhah Yunus x KR$NA (Official Music Video).mp3' }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const playlistElement = document.getElementById('playlist');

// Load the first song
loadSong(currentSongIndex);

// Event listeners
playButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPrevSong);
nextButton.addEventListener('click', playNextSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', setProgress);

// Load song function
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    titleElement.textContent = song.title;
    artistElement.textContent = song.artist;
    updatePlaylist();
}

// Play or pause the song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Play';
    } else {
        audio.play();
        playButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

// Play previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Play next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Update progress bar as the song plays
function updateProgressBar() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
}

// Set song progress based on progress bar input
function setProgress() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

// Update playlist UI
function updatePlaylist() {
    playlistElement.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title + ' - ' + song.artist;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            if (isPlaying) audio.play();
        });
        playlistElement.appendChild(li);
    });
}
