import * as data from './data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';


function createAvatar() {
  return `img/avatar-${getRandomInteger(0, 6)}.svg`;
}

function createMessage(message) {
  return message;
}

/**
 *
 * @returns {string}
 * @description функция для выполнения тестового задания. Создаёт текст комментария — message — из одного или двух представленных предложений.
 */
function createMessages() {
  let count = getRandomInteger(1, 2);
  let message = '';
  for (let i = 0; i < count; i++) {
    const randomMessage = getRandomArrayElement(data.messages);
    if (!message.includes(randomMessage)) {
      message += randomMessage;
      count--;
    }
  }
  return message;
}

function createComment(id) {
  return {
    id: id,
    avatar: createAvatar(),
    message: createMessage(createMessages()),
    name: getRandomArrayElement(data.NAMES)
  };
}

/**
 *
 * @returns {comments[]}
 * @description функция для выполнения тестового задания. Создаёт случайное количество комментариев.
 */
function createComments(commentId) {
  const comments = [];
  const count = getRandomInteger(0, 30);
  for (let i = 1; i <= count; i++) {
    comments.push(createComment(commentId));
    commentId += 1;
  }
  return comments;
}

function createDescription() {
  return getRandomArrayElement(data.photoDescriptions);
}

function createUrl(id) {
  return `photos/${id}.jpg`;
}

function createPhotoInfo(id) {
  return {
    id: id,
    url: createUrl(id),
    description: createDescription(),
    likes: getRandomInteger(15, 200),
    comments: []
  };
}

/**
 *
 * @param amount
 * @returns {*[]}
 * @description функция для выполнения тестового задания. Создаёт n-количество постов.
 */
function createPhotos(amount) {
  const array = [];
  let commentId = 1;
  for (let i = 1; i <= amount; i++) {
    const comments = createComments(commentId);
    const photos = createPhotoInfo(i);
    photos.comments = comments;
    commentId += comments.length;
    array.push(photos);
  }
  return array;
}

export {createPhotos};


