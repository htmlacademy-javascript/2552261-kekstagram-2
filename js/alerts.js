import {isEscKeyDown} from './util.js';

const successUploadContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorUploadContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const dataAlertContainer = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
const successButton = successUploadContainer.querySelector('.success__button');
const errorButton = errorUploadContainer.querySelector('.error__button');

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

errorUploadContainer.addEventListener('keydown', (evt) =>
  onKeyDownEsc(evt, errorUploadContainer));

errorUploadContainer.addEventListener('click', (evt) =>
  onClick(evt, errorUploadContainer, 'error'));

errorButton.addEventListener('click', () => {
  errorUploadContainer.remove();
});

errorButton.addEventListener('blur', () => {
  errorButton.focus();
});

function onKeyDownEsc(evt, container) {
  if (isEscKeyDown(evt)) {
    evt.stopPropagation();
    container.remove();
  }
}

function onClick(evt, container, evtClass) {
  if (evt.target.classList.contains(evtClass)) {
    container.remove();
  }
}

function showSuccessAlert() {
  addAlertElement(successUploadContainer, successButton);
}

function showErrorAlert(cb) {
  return function () {
    addAlertElement(errorUploadContainer, errorButton);
    cb();
  };
}

function showDataAlert() {
  document.body.appendChild(dataAlertContainer);
  setTimeout(() => dataAlertContainer.remove(), 5000);
}

function addAlertElement(element, elementButton) {
  document.body.appendChild(element);
  elementButton.focus();
}

export {showSuccessAlert, showErrorAlert, showDataAlert};
