import Notiflix from "notiflix";

const form = document.querySelector('.form');
const labels = document.querySelectorAll('label');
const firstDelayInput = document.querySelector('[name="delay"]');
const delayStepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

labels.forEach(label => {
  label.style.cssText = 'display: flex; flex-direction: column; font-weight: 700';
});

form.style.cssText = 'display: flex; gap: 1rem; align-items: flex-end';

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const amount = Number(amountInput.value);
  let firstDelay = Number(firstDelayInput.value);
  const delayStep = Number(delayStepInput.value);

  setTimeout(() => {
    for (let index = 1; index <= amount; index += 1) {
      createPromise(index, firstDelay).then(onResolve).catch(onReject);
      firstDelay += delayStep;
    }
  }, firstDelay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
