const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  body.style.backgroundColor = getRandomHexColor();
  function getRandomHexColor() {
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
});
