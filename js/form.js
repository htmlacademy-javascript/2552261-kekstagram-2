import {isEscKeyDown} from './util.js';
import {setupUploadFormValidation} from './validation.js';

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
const FIRST_FILE = 0;

const pristine = setupUploadFormValidation(form, textHashtags, textDescription);

form.action = 'https://31.javascript.htmlacademy.pro/kekstagram';
form.method = 'POST';
form.enctype = 'multipart/form-data';

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
  imgUploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
}
