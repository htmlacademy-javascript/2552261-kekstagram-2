import {comparedDiscussedFilter, getRandomElements} from './util.js';

const PHOTOS_RANDOM_COUNT = 10;
const filters = document.querySelector('.img-filters');
const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');

function setDefaultButton(showPhotos, photos) {
  defaultButton.addEventListener('click', () => {
    showPhotos(photos);
    changeActiveButton(defaultButton);
  });
}

function setRandomButton(showPhotos, photos) {
  randomButton.addEventListener('click', () => {
    showPhotos(getTenRandomPhotos(photos));
    changeActiveButton(randomButton);
  });
}

function setDiscussedButton(showPhotos, photos) {
  discussedButton.addEventListener('click', () => {
    showPhotos(sortedPhotoDiscussed(photos));
    changeActiveButton(discussedButton);
  });
}

function sortedPhotoDiscussed(photos) {
  const copyPhotos = photos.slice();
  return copyPhotos.sort(comparedDiscussedFilter);
}

function getTenRandomPhotos(photos) {
  return getRandomElements(photos, PHOTOS_RANDOM_COUNT);
}

function changeActiveButton(buttonFilter) {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonFilter.classList.add('img-filters__button--active');
}

export {setDefaultButton, setRandomButton, setDiscussedButton};

