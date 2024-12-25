const PHOTOS_RANDOM_COUNT = 10;

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}


function addHidden(block) {
  block.classList.add('hidden');
}

function removeHidden(block) {
  block.classList.remove('hidden');
}

function convertPercentageToNumber(percentageString) {
  return parseInt(percentageString.replace('%', ''), 10);
}

function comparedDiscussedFilter(a, b) {
  return b.comments.length - a.comments.length;
}

function getRandomElements(array) {
  const set = new Set();
  let count;
  if (array.length < PHOTOS_RANDOM_COUNT) {
    count = array.length;
  } else {
    count = PHOTOS_RANDOM_COUNT;
  }
  while (set.size !== count) {
    set.add(getRandomArrayElement(array));
  }
  return set;
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscKeyDown = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscKeyDown,
  addHidden,
  removeHidden,
  convertPercentageToNumber,
  comparedDiscussedFilter,
  getRandomElements,
  debounce
};
