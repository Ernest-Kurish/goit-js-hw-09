import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

flatpickr(datePicker, {
  dateFormat: 'Y-m-d H:i',
  minDate: 'today',
  enableTime: true,
  time_24hr: true,
  onClose: function (selectedDates, dateStr, instance) {
    const selectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', function () {
  const selectedDate = new Date(datePicker.value);

  startButton.disabled = true;
  datePicker.disabled = true;

  const countdownInterval = setInterval(function () {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Time is up!');
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
