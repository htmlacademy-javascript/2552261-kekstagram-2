import {comparedDiscussedFilter, debounce, getRandomElements} from './util.js';
import {miniatureCreate} from './miniature.js';

const PHOTOS_RANDOM_COUNT = 10;

const filters = document.querySelector('.img-filters__form');
const defaultButton = filters.querySelector('#filter-default');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');

const removeAllPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures.length !== 0) {
    pictures.forEach((picture) =>
      picture.remove());
  }
};

const showFilteredPhotos = (filteredPhotos) => {
  removeAllPictures();
  miniatureCreate(filteredPhotos);
};

const debouncedShowFilteredPhotos = debounce(showFilteredPhotos);

const changeActiveButton = (buttonFilter) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonFilter.classList.add('img-filters__button--active');
};

const setButton = (button, photos) => {
  debouncedShowFilteredPhotos(photos);
  changeActiveButton(button);
};

const sortedPhotoDiscussed = (photos) => {
  const copyPhotos = photos.slice();
  return copyPhotos.sort(comparedDiscussedFilter);
};

const getTenRandomPhotos = (photos) => getRandomElements(photos, PHOTOS_RANDOM_COUNT);

const onFilterButtonClick = (evt, photos) => {
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
};

const setFilters = (photos) => {
  filters.addEventListener('click', (evt) => {
    onFilterButtonClick(evt, photos);
  });
};

export {setFilters};
