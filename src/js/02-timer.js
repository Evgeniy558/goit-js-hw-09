import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const btnStart = document.querySelector('[data-start]');
const fieldDay = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');
btnStart.disabled = true;
let ms;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= new Date()) {
      btnStart.disabled = false;
      ms = selectedDates[0].getTime();
    } else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function addZero(value) {
  return value.toString().length < 2
    ? value.toString().padStart(2, '0')
    : value;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  fieldDay.textContent = addZero(days);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  fieldHours.textContent = addZero(hours);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  fieldMinutes.textContent = addZero(minutes);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  fieldSeconds.textContent = addZero(seconds);

  return { days, hours, minutes, seconds };
}
btnStart.addEventListener('click', () => {
  setInterval(() => {
    if (ms - new Date() > 0) {
      convertMs(ms - new Date());
    }
  }, 1000);
});
