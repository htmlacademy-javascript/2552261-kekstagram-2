const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arrays) => arrays[getRandomInteger(0, arrays.length - 1)];

const addHidden = (block) => {
  block.classList.add('hidden');
};

const removeHidden = (block) => {
  block.classList.remove('hidden');
};

const convertPercentageToNumber = (percentageString) => parseInt(percentageString.replace('%', ''), 10);

const comparedDiscussedFilter = (a, b) => b.comments.length - a.comments.length;

const getRandomElements = (arrays, amountElements) => {
  const set = new Set();
  let count;
  if (arrays.length < amountElements) {
    count = arrays.length;
  } else {
    count = amountElements;
  }
  while (set.size !== count) {
    set.add(getRandomArrayElement(arrays));
  }
  return Array.from(set);
};

const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

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
