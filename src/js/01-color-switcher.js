const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const playButton = document.querySelector('#play-melody');

let intervalId = null;

function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
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



// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
// }

// const startBtn = document.querySelector('[data-start]');
// const stopBtn = document.querySelector('[data-stop]');
// let intervalId = null;

// startBtn.addEventListener('click', () => {
//   if (!intervalId) {
//     startBtn.disabled = true;
//     intervalId = setInterval(() => {
//       document.body.style.backgroundColor = getRandomHexColor();
//     }, 1000);
//   }
// });

// stopBtn.addEventListener('click', () => {
//   clearInterval(intervalId);
//   intervalId = null;
//   startBtn.disabled = false;
// });


