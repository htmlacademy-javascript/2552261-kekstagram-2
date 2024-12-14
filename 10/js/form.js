import {isEscKeyDown, convertPercentageToNumber} from './util.js';
import {setupUploadFormValidation} from './validation.js';
import {createSlider, updateValueField, resetSlider, updateSlider, onUpdateSlider, updateRange} from './sliderBar.js';

const FIRST_FILE = 0;
const STEP_CHANGING_SCALE = 25;
const MIN_SCALE_VALUE = 0;
const MAX_SCALE_VALUE = 100;
const HUNDREDTH = 100;

const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 1;
const MAX_SLIDER_INVERT_VALUE = 100;
const MAX_SLIDER_BRIGHTNESS_VALUE = 3;
const STEP_SLIDER = 0.1;
const STEP_SLIDER_INVERT = 1;

const form = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectsPreview = imgUploadEffects.querySelectorAll('.effects__preview');
const uploadButtonClose = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const effectLevelValue = document.querySelector('.effect-level__value');

const radioEffectNone = document.getElementById('effect-none');
const radioEffectChrome = document.getElementById('effect-chrome');
const radioEffectSepia = document.getElementById('effect-sepia');
const radioEffectMarvin = document.getElementById('effect-marvin');
const radioEffectPhobos = document.getElementById('effect-phobos');
const radioEffectHeat = document.getElementById('effect-heat');

const sliderBar = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const pristine = setupUploadFormValidation(form, textHashtags, textDescription);

createSlider(sliderBar, MIN_SLIDER_VALUE, MAX_SLIDER_VALUE, STEP_SLIDER);
updateValueField(sliderBar, effectLevelValue);

sliderContainer.style.visibility = 'hidden';

radioEffectNone.addEventListener('change', () => {
  sliderContainer.style.visibility = 'hidden';
  resetSlider(sliderBar);
  imgUploadPreview.style.filter = 'none';
});
radioEffectChrome.addEventListener('change', () => {
  setupImageEffect('grayscale');
});
radioEffectSepia.addEventListener('change', () => {
  setupImageEffect('sepia');
});
radioEffectMarvin.addEventListener('change', () => {
  setupImageEffect('invert');
});
radioEffectPhobos.addEventListener('change', () => {
  setupImageEffect('blur');
});
radioEffectHeat.addEventListener('change', () => {
  setupImageEffect('brightness');
});

buttonScaleSmaller.addEventListener('click', () => {
  let value = convertPercentageToNumber(scaleControl.value);
  if (value - STEP_CHANGING_SCALE >= MIN_SCALE_VALUE) {
    value -= STEP_CHANGING_SCALE;
  }
  imgUploadPreview.style.transform = `scale(${value / HUNDREDTH})`;
  scaleControl.value = `${value}%`;
});

buttonScaleBigger.addEventListener('click', () => {
  let value = convertPercentageToNumber(scaleControl.value);
  if (value + STEP_CHANGING_SCALE <= MAX_SCALE_VALUE) {
    value += STEP_CHANGING_SCALE;
  }
  imgUploadPreview.style.transform = `scale(${value / HUNDREDTH})`;
  scaleControl.value = `${value}%`;
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscKeyDown(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscKeyDown(evt)) {
    evt.stopPropagation();
  }
});

imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeydownEsc);
  changePreviewImage(imgUploadInput);
});

uploadButtonClose.addEventListener('click', () => {
  close();
});

function onKeydownEsc(evt) {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    close();
  }
}

function changePreviewImage(uploadFile) {
  const file = uploadFile.files[FIRST_FILE];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      imgPreview.src = result.toString();
      for (const effect of effectsPreview) {
        effect.style.backgroundImage = `url(${result})`;
      }
    };
    reader.readAsDataURL(file);
  }
}

function close() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydownEsc);
  form.reset();
}

function setupImageEffect(filterName) {
  sliderContainer.style.visibility = 'visible';
  resetSlider(sliderBar);
  applyEffectLevel(imgUploadPreview, filterName);
}

function applyEffectLevel(image, filterName) {
  updateSliderOptions(filterName);
  onUpdateSlider(sliderBar, () => {
    image.style.filter = `${filterName}(${getFilterValue(filterName)})`;
  }
  );
}

function updateSliderOptions(filterName) {
  if (filterName === 'invert') {
    updateSlider(sliderBar, MAX_SLIDER_INVERT_VALUE, MIN_SLIDER_VALUE, MAX_SLIDER_INVERT_VALUE, STEP_SLIDER_INVERT);
  } else if (filterName === 'blur' || filterName === 'brightness') {
    updateRange(sliderBar, MAX_SLIDER_BRIGHTNESS_VALUE, MIN_SLIDER_VALUE, MAX_SLIDER_BRIGHTNESS_VALUE, STEP_SLIDER);
  } else {
    updateSlider(sliderBar, MAX_SLIDER_VALUE, MIN_SLIDER_VALUE, MAX_SLIDER_VALUE, STEP_SLIDER);
  }
}

function getFilterValue(filterName) {
  let value = effectLevelValue.value;
  if (filterName === 'invert') {
    value += '%';
  } else if (filterName === 'blur') {
    value += 'px';
  }
  return value;
}
