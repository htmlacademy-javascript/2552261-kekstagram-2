import {comparedDiscussedFilter, debounce, getRandomElements} from './util.js';
import {miniatureCreate} from './miniature.js';

const PHOTOS_RANDOM_COUNT = 10;

const filters = document.querySelector('.img-filters__form');
const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');
const debouncedShowFilteredPhotos = debounce(showFilteredPhotos);

function setFilters(photos) {
  filters.addEventListener('click', (evt) => {
    onFilterButtonClick(evt, photos);
  });
}

function setButton(button, photos) {
  debouncedShowFilteredPhotos(photos);
  changeActiveButton(button);
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

function onFilterButtonClick(evt, photos) {
  switch (evt.target.id) {
    case 'filter-random':
      setButton(randomButton, getTenRandomPhotos(photos));
      break;
    case 'filter-discussed':
      setButton(discussedButton, sortedPhotoDiscussed(photos));
      break;
    default:
      setButton(defaultButton, photos);
  }
}

export {setFilters};
