import './form.js';
import './effects.js';
import {setFilters} from './filters.js';
import {getData} from './api.js';
import {miniatureCreate} from './miniature.js';
import {setButtonsScale} from './scale-control.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelector('.img-filters');

getData(showPhotos);
setButtonsScale(imgUploadPreview);

function showPhotos(photos) {
  if (photos !== undefined && photos.length > 0) {
    miniatureCreate(photos);
    filters.classList.remove('img-filters--inactive');
    setFilters(photos);
  }
}


