import {showDataAlert} from './alerts.js';

const getData = (onSuccess) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((posts) => {
      onSuccess(posts);
    }).catch(() => showDataAlert());
};

function sendData(onSuccess, onFail, body) {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/', {
    method: 'POST',
    body: body
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  }).then(() => onSuccess())
    .catch(() => onFail());
}

export {getData, sendData};

