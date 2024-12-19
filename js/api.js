import {showDataAlert} from './alerts.js';

function getData() {
  return fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Неуспешный ответ от сервера');
      }
    })
    .catch(() => {
      showDataAlert();
    });
}

function sendData(onSuccess, onFail, body) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: body
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error('Неуспешный ответ от сервера');
    }
  }).catch(() => onFail());
}

function showData(onSuccess) {
  getData().then((data) => {
    onSuccess(data);
  });
}

export {getData, sendData, showData};

