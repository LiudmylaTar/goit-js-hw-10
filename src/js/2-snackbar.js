import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from '../img/task_2/Error.png';
import helloIcon from '../img/task_2/Inform.png';
import cautionIcon from '../img/task_2/Inform.png';
import okIcon from '../img/task_2/Ok.png';

const form = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', () => {
  iziToast.info({
    title: 'Hello',
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#09f',
    iconColor: '#fff',
    close: true,
    closeColor: '#fff',
    iconUrl: helloIcon,
    message: 'Welcome!',
    position: 'topRight',
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const state = document.querySelector('input[name="state"]:checked')?.value;
  const delay = Number(delayInput.value);

  console.log('Delay:', delay); // Для перевірки
  console.log('State:', state); // Перевіряємо, чи вибраний state

  // Перевірка, чи всі дані введено
  if (!delay || isNaN(delay) || !state) {
    iziToast.show({
      title: 'Caution',
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      message: 'You forgot important data',
      iconUrl: cautionIcon,
      position: 'topRight',
    });
    return;
  }

  //   Функція для створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, Number(delay));
  });
  promise
    .then(message => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '59A10D',
        iconUrl: okIcon,
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(message => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        iconUrl: errorIcon,
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  event.currentTarget.reset();
});
