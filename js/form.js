import {isEscKeyDown} from './util.js';
import {setupUploadFormValidation} from './validation.js';
import {sendData} from './api.js';
import {showErrorAlert, showSuccessAlert} from './alerts.js';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectsPreview = imgUploadEffects.querySelectorAll('.effects__preview');
const uploadButtonClose = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const radioEffectNone = document.getElementById('effect-none');

const pristine = setupUploadFormValidation(form, textHashtags, textDescription);

const changeEvent = new Event('change', {bubbles: true, cancelable: false});

const resetForm = () => {
  radioEffectNone.dispatchEvent(changeEvent);
  imgPreview.style.transform = 'scale(1)';
  imgPreview.src = '';
  form.reset();
};

const onKeydownEsc = (evt) => {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydownEsc);
  resetForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
};

const changePreviewImage = (uploadFile) => {
  const file = uploadFile.files[0];
  if (file) {
    const blobUrl = URL.createObjectURL(file);
    imgPreview.src = blobUrl;
    for (const effect of effectsPreview) {
      effect.style.backgroundImage = `url(${blobUrl})`;
    }
    imgPreview.onload = () => {
      URL.revokeObjectURL(blobUrl);
    };
  }
};

const onSuccess = () => {
  showSuccessAlert();
  unBlockSubmitButton();
  closeForm();
};

const onFail = () => {
  showErrorAlert();
  unBlockSubmitButton();
};

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    blockSubmitButton();
    sendData(onSuccess, onFail, new FormData(evt.target));
  }
});

form.addEventListener('input', (event) => {
  if (pristine.validate(event.target)) {
    pristine.reset();
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
  closeForm();
});

