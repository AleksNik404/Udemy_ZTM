const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');

const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');

music.volume = 0.01;

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Puuse
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//  Current Song
let songIndex = 0;

// Next Song
function nextSong() {
  if (songIndex < 3) songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  if (songIndex > 0) songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

//  On Load - Select First Song
loadSong(songs[songIndex]);

//  Update Proggres Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    let durationMinutes = Math.trunc(duration / 60);
    let durationSeconds = String(Math.trunc(duration % 60)).padStart(2, '0');

    if (durationSeconds !== 'NaN')
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    // Calculate display for current
    let currentMinutes = Math.trunc(currentTime / 60);
    let currentSeconds = String(Math.trunc(currentTime % 60)).padStart(2, '0');

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
