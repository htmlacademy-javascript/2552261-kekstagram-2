import {showDataAlert} from './alerts.js';

async function getData() {
  let response;
  try {
    response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (error) {
    showDataAlert();
  }
}

async function sendData(onSuccess, onFail, body) {
  let response;
  try {
    response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: body
    });
    if (response.ok) {
      await onSuccess();
    } else {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (error) {
    onFail();
  }
}

export {getData, sendData};
