import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';

// Get elements from the DOM
const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

// Disable start button initially
startButton.disabled = false;

// Set up flatpickr date picker
flatpickr(datePicker, {
dateFormat: 'Y-m-d',
minDate: 'today',
onClose: function (selectedDates, dateStr, instance) {
// Check if selected date is in the future
const selectedDate = new Date(selectedDates[0]);
const currentDate = new Date();
if (selectedDate <= currentDate) {
// Show error message
Notiflix.Notify.failure('Please choose a date in the future');
startButton.disabled = true;
} else {
startButton.disabled = false;
}
},
});

// Add event listener to start button
startButton.addEventListener('click', function () {
// Get selected date from date picker
const selectedDate = new Date(datePicker.value);

// Disable start button and date picker
startButton.disabled = true;
datePicker.disabled = true;

// Set up countdown timer
const countdownInterval = setInterval(function () {
// Calculate time remaining
const timeRemaining = selectedDate.getTime() - new Date().getTime();
if (timeRemaining <= 0) {
// Stop countdown when time is up
clearInterval(countdownInterval);
// Show success message
Notiflix.Notify.success('Time is up!');
// Reset start button and date picker
startButton.disabled = false;
datePicker.disabled = false;
return;
}
const timeRemainingObj = convertMs(timeRemaining);
timerDays.textContent = addLeadingZero(timeRemainingObj.days);
timerHours.textContent = addLeadingZero(timeRemainingObj.hours);
timerMinutes.textContent = addLeadingZero(timeRemainingObj.minutes);
timerSeconds.textContent = addLeadingZero(timeRemainingObj.seconds);
}, 1000);
});

function convertMs(ms) {
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
