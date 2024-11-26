const tracks = [
    "blaknot.mp3",
    "bolnica.mp3",
    "fotografii.mp3",
    "furafurafura.mp3",
    "pochemu.mp3",
    "pridet vesna.mp3",
    "skrivau.mp3",
    "stanet.mp3",
    "tusovatsa doma.mp3"
];

const phrases = [
    "Я говорю с собой, и мне норм.",
    "Тусуюсь дома, мир не нужен.",
    "Вы там, а я тут — лучше не бывает.",
    "Мне не скучно, когда я один.",
    "Вы мне не нужны, и я вам тоже (у, у).",
    "Закрываю дверь, открываю себя.",
    "Наедине с собой — мой стиль жизни.",
    "Мой дом — мой вечный клуб.",
    "Одиночество звучит лучше, чем толпа."
];

const audio = new Audio();
let currentTrackIndex = 0;

const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const titleElement = document.getElementById('title');

function changeTitle() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    titleElement.textContent = phrases[randomIndex];
}

setInterval(changeTitle, 10000);

function playTrack(index) {
    currentTrackIndex = index;
    audio.src = tracks[currentTrackIndex];
    audio.play();
    playButton.textContent = 'Пауза';
}

let isPlaying = false;

playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Играть';
    } else {
        playTrack(currentTrackIndex);
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
});

audio.addEventListener('ended', () => {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    playTrack(currentTrackIndex);
    changeTitle();
});

volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value;
});
