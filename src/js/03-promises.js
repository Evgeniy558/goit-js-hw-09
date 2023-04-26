import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', ev => {
  const { delay, step, amount } = ev.currentTarget;
  ev.preventDefault();
  for (let n = 0; n < Number(amount.value); n++) {
    let position = n + 1;
    let delayLoop = Number(delay.value) + n * Number(step.value);
    setTimeout(() => {
      createPromise(position, delayLoop);
    }, delayLoop);
  }
});

function createPromise(position, delay) {
  new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`Rejected promise ${position} in ${delay}ms`);
    }
  })
    .then(value => {
      Notify.success(value);
    })
    .catch(value => {
      Notify.failure(value);
    });
}
