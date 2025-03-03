import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    iconUrl: '../img/task_2/Inform.png',
    message: 'Welcome!',
    position: 'topRight',
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = document.querySelector('input[name="delay"]');
  const state = document.querySelector('input[name="state"]:checked')?.value;

  console.log('Delay:', delay); // Для перевірки
  console.log('State:', state); // Перевіряємо, чи вибраний state

  // Перевірка, чи всі дані введено
  if (!delay || !state) {
    iziToast.show({
      title: 'Caution',
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      message: 'You forgot important data',
      iconUrl: '../img/task_2/Caution.png',
      position: 'topRight',
    });
    return;
  }

  //   Функція для створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, Number(delay));
  });
  promise
    .then(message => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '59A10D',
        iconUrl: '../img/task_2/Ok.png',
        message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        iconUrl: '../img/task_2/Error.png',
        message,
        position: 'topRight',
      });
    });
  event.currentTarget.reset();
});
