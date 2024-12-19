import {showData, showSortedDiscussedData, showTenRandomPhotos} from './api.js';
import {miniatureCreate} from './miniature.js';
import {debounce} from './util.js';

const filters = document.querySelector('.img-filters');
const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');
const debouncedShowFilteredPhotos = debounce(showFilteredPhotos);

defaultButton.addEventListener('click', () => {
  debouncedShowFilteredPhotos(showData);
  changeActiveButton(defaultButton);
});

randomButton.addEventListener('click', () => {
  debouncedShowFilteredPhotos(showTenRandomPhotos);
  changeActiveButton(randomButton);
});

discussedButton.addEventListener('click', () => {
  debouncedShowFilteredPhotos(showSortedDiscussedData);
  changeActiveButton(discussedButton);
});

function changeActiveButton(buttonFilter) {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonFilter.classList.add('img-filters__button--active');
}

function showFilteredPhotos(callback) {
  callback(miniatureCreate);
}

