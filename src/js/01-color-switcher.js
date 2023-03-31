const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function playMelody() {
  // play melody here
}

startButton.addEventListener('click', () => {
  // Disable the start button 
  startButton.disabled = true;

  intervalId = setInterval(() => {
    changeBackgroundColor();
    playMelody();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  // Re-enable the start button
  startButton.disabled = false;

  clearInterval(intervalId);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
