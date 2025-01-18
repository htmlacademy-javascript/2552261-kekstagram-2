import {showDataAlert} from './alerts.js';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status} — ${response.statusText}`);
  }
};

const getData = (onSuccess) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => checkResponse(response))
    .then((posts) => {
      onSuccess(posts);
    }).catch(() => showDataAlert());
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/', {
    method: 'POST',
    body: body
  }).then((response) => checkResponse(response)).then(() => onSuccess())
    .catch(() => onFail());
};

export {getData, sendData};

