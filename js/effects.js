import {createSlider, resetSlider, updateSlider, onUpdateSlider} from './slider-bar.js';

const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const sliderBar = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const effects = {
  none: {filter: 'none', start: 1, minSliderValue: 0, maxSliderValue: 1, step: 0.1},
  chrome: {filter: 'grayscale', start: 1, minSliderValue: 0, maxSliderValue: 1, step: 0.1},
  sepia: {filter: 'sepia', start: 1, minSliderValue: 0, maxSliderValue: 1, step: 0.1},
  marvin: {filter: 'invert', start: 100, minSliderValue: 0, maxSliderValue: 100, step: 1},
  phobos: {filter: 'blur', start: 3, minSliderValue: 0, maxSliderValue: 3, step: 0.1},
  heat: {filter: 'brightness', start: 3, minSliderValue: 0, maxSliderValue: 3, step: 0.1},
};

createSlider(sliderBar,
  effects.none.start,
  effects.none.minSliderValue,
  effects.none.maxSliderValue,
  effects.none.step);

onUpdateSlider(sliderBar, () => {
  effectLevelValue.value = sliderBar.noUiSlider.get();
});

sliderContainer.style.visibility = 'hidden';

imgUploadEffects.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    sliderContainer.style.visibility = 'hidden';
  } else {
    sliderContainer.style.visibility = 'visible';
  }
  resetSlider(sliderBar);
  applyEffectLevel(imgUploadPreview, evt.target.value);
});

function applyEffectLevel(image, effectName) {
  updateSliderOptions(effectName);
  if (effectName === 'none') {
    image.style.filter = effects[effectName].filter;
  } else {
    onUpdateSlider(sliderBar, () => {
      image.style.filter = `${effects[effectName].filter}(${getFilterValue(effectName)})`;
    });
  }
}

function updateSliderOptions(effectName) {
  const sliderParameters = {...effects[effectName]};
  delete sliderParameters['filter'];
  switch (effectName) {
    case 'marvin': {
      updateSlider(sliderBar, ...Object.values(sliderParameters));
    }
      break;
    case 'phobos':
    case 'heat': {
      updateSlider(sliderBar, ...Object.values(sliderParameters));
    }
      break;
    default: {
      updateSlider(sliderBar, ...Object.values(sliderParameters));
    }
  }
}

function getFilterValue(effectName) {
  let value = effectLevelValue.value;
  if (effectName === 'marvin') {
    value += '%';
  } else if (effectName === 'phobos') {
    value += 'px';
  }
  return value;
}

