import {isEscKeyDown} from './util.js';

const successUploadContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorUploadContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const dataAlertContainer = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
const successButton = successUploadContainer.querySelector('.success__button');
const errorButton = errorUploadContainer.querySelector('.error__button');
const imgUpload = document.querySelector('.img-upload__input');

const onKeyDownEsc = (evt, container) => {
  if (isEscKeyDown(evt)) {
    evt.stopPropagation();
    container.remove();
  }
};

const onClick = (evt, container, evtClass) => {
  if (evt.target.classList.contains(evtClass)) {
    container.remove();
  }
};

const addAlertElement = (element, elementButton) => {
  document.body.appendChild(element);
  elementButton.focus();
};

const showSuccessAlert = () => {
  addAlertElement(successUploadContainer, successButton);
};

const showErrorAlert = () => {
  addAlertElement(errorUploadContainer, errorButton);
};

const showDataAlert = () => {
  document.body.appendChild(dataAlertContainer);
  setTimeout(() => dataAlertContainer.remove(), 5000);
};

successUploadContainer.addEventListener('keydown', (evt) =>
  onKeyDownEsc(evt, successUploadContainer));

successUploadContainer.addEventListener('click', (evt) =>
  onClick(evt, successUploadContainer, 'success'));

successButton.addEventListener('click', () => {
  successUploadContainer.remove();
});

successButton.addEventListener('blur', () => {
  successButton.focus();
});

errorUploadContainer.addEventListener('keydown', (evt) => {
  onKeyDownEsc(evt, errorUploadContainer);
  imgUpload.focus();
});


errorUploadContainer.addEventListener('click', (evt) => {
  onClick(evt, errorUploadContainer, 'error');
  imgUpload.focus();
});

errorButton.addEventListener('click', () => {
  imgUpload.focus();
  errorUploadContainer.remove();
});

errorButton.addEventListener('blur', () => {
  errorButton.focus();
});

export {showSuccessAlert, showErrorAlert, showDataAlert};
