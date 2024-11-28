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

const isEscKeyDown = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, isEscKeyDown, addHidden, removeHidden};
