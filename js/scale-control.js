import {convertPercentageToNumber} from './util.js';

const STEP_CHANGING_SCALE = 25;
const MIN_SCALE_VALUE = 0;
const MAX_SCALE_VALUE = 100;
const HUNDREDTH = 100;

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');

function setButtonScaleSmaller(image) {
  buttonScaleSmaller.addEventListener('click', () => onButtonScaleClick('-', image));
}

function setButtonScaleBigger(image) {
  buttonScaleBigger.addEventListener('click', () => onButtonScaleClick('+', image));
}

function onButtonScaleClick(arithmeticOperand, image) {
  let value = convertPercentageToNumber(scaleControl.value);
  switch (arithmeticOperand) {
    case '+':
      if (value + STEP_CHANGING_SCALE <= MAX_SCALE_VALUE) {
        value += STEP_CHANGING_SCALE;
        changeImageScale(value, image);
      }
      break;
    case '-':
      if (value - STEP_CHANGING_SCALE >= MIN_SCALE_VALUE) {
        value -= STEP_CHANGING_SCALE;
        changeImageScale(value, image);
      }
  }
}

function changeImageScale(value, image) {
  image.style.transform = `scale(${value / HUNDREDTH})`;
  scaleControl.value = `${value}%`;
}

export {setButtonScaleSmaller, setButtonScaleBigger};

