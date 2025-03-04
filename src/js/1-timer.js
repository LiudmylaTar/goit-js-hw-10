import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/task_2/Error.png';

const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const fildDay = document.querySelector('[data-days]');
const fildHour = document.querySelector('[data-hours]');
const fildMinute = document.querySelector('[data-minutes]');
const fildSecond = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let countdownInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        iconUrl: errorIcon,
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;
  startButton.disabled = true;
  dateInput.disabled = true;

  countdownInterval = setInterval(() => {
    const now = Date.now();
    const timeLeft = userSelectedDate.getTime() - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      resetTimer();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    fildDay.textContent = String(days).padStart(2, '0');
    fildHour.textContent = String(hours).padStart(2, '0');
    fildMinute.textContent = String(minutes).padStart(2, '0');
    fildSecond.textContent = String(seconds).padStart(2, '0');
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function resetTimer() {
  fildDay.textContent = '00';
  fildHour.textContent = '00';
  fildMinute.textContent = '00';
  fildSecond.textContent = '00';
  dateInput.disabled = false; // Активуємо інпут
  userSelectedDate = null; // Очищаємо вибрану дату
  startButton.disabled = true;
}
