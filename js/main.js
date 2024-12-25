import './big-picture.js';
import './form.js';
import './effects.js';
import './filters.js';
import {getData} from './api.js';
import {miniatureCreate} from './miniature.js';
import {setButtonsScale} from './scale-control.js';
import {debounce} from './util.js';
import {setDefaultButton, setDiscussedButton, setRandomButton} from './filters.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelector('.img-filters');
const debouncedShowFilteredPhotos = debounce(showFilteredPhotos);
const photos = await getData();

showPhotos();
setButtonsScale(imgUploadPreview);
setDefaultButton(debouncedShowFilteredPhotos, photos);
setRandomButton(debouncedShowFilteredPhotos, photos);
setDiscussedButton(debouncedShowFilteredPhotos, photos);

function showPhotos() {
  miniatureCreate(photos);
  if (photos.length > 0) {
    filters.classList.remove('img-filters--inactive');
  }
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

export {photos};
