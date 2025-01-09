import './big-picture.js';
import './form.js';
import './effects.js';
import {getData} from './api.js';
import {miniatureCreate} from './miniature.js';
import {setButtonsScale} from './scale-control.js';
import {debounce} from './util.js';
import {setDefaultButton, setDiscussedButton, setRandomButton} from './filters.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelector('.img-filters');
const debouncedShowFilteredPhotos = debounce(showFilteredPhotos);

getData(showPhotos);
setButtonsScale(imgUploadPreview);


function showPhotos(photos) {
  if (photos !== undefined && photos.length > 0) {
    miniatureCreate(photos);
    filters.classList.remove('img-filters--inactive');
    filt(photos);
  }
}

function filt(photos) {
  setDefaultButton(debouncedShowFilteredPhotos, photos);
  setRandomButton(debouncedShowFilteredPhotos, photos);
  setDiscussedButton(debouncedShowFilteredPhotos, photos);
}

function showFilteredPhotos(filteredPhotos) {
  removeAllPictures();
  miniatureCreate(filteredPhotos);
}

function removeAllPictures() {
  const pictures = document.querySelectorAll('.picture');
  if (pictures.length !== 0) {
    pictures.forEach((picture) =>
      picture.remove());
  }
}

