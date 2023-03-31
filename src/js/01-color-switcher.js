const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const playButton = document.querySelector('#play-melody');
const music = document.querySelector('#music');

let intervalId = null;

function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function playMelody() {
  music.play();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  intervalId = setInterval(() => {
    changeBackgroundColor();
    playMelody();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;

  clearInterval(intervalId);
  music.pause();
});
