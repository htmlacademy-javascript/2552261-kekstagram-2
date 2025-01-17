import {addHidden, isEscKeyDown, removeHidden} from './util.js';

const COMMENTS_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');
const buttonCansel = document.querySelector('.big-picture__cancel');
const buttonLoad = document.querySelector('.social__comments-loader');
const socialCaption = document.querySelector('.social__caption');
let shownCommentsCounter = 0;

buttonCansel.addEventListener('click', () => {
  closeBigPicture();
});

const onBigPictureEscKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    addHidden(bigPicture);
    evt.preventDefault();
    closeBigPicture();
  }
};

const onButtonLoadClick = () => {
  const currentPhoto = buttonLoad.photo;
  addComments(currentPhoto, COMMENTS_AMOUNT + shownCommentsCounter);
  getCommentsShown();
};

const updateBigPicture = (currentPhoto) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src =
    currentPhoto.url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').dataset.photoId =
    currentPhoto.id;
  bigPicture.querySelector('.likes-count').textContent =
    currentPhoto.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent =
    currentPhoto.comments.length.toString();
};

const createBigPicture = (photo) => {
  updateBigPicture(photo);
  addComments(photo, COMMENTS_AMOUNT);
  getCommentsShown();
};

const openBigPicture = (photo) => {
  createBigPicture(photo);
  buttonLoad.photo = photo;
  removeHidden(bigPicture);
  socialCaption.textContent = photo.description;
  buttonLoad.addEventListener('click', onButtonLoadClick);
  document.addEventListener('keydown', onBigPictureEscKeyDown);
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  addHidden(bigPicture);
  removeHidden(document.querySelector('.comments-loader'));
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  buttonLoad.removeEventListener('click', onButtonLoadClick);
};

const clearComments = () => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

const addComments = (photo, amount) => {
  const commentsList = photo.comments.slice();
  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < Math.min(amount, commentsList.length); i++) {
    const comment = commentTemplate.cloneNode(true);
    const element = commentsList[i];
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    documentFragment.appendChild(comment);
  }
  clearComments();
  bigPicture.querySelector('.social__comments').appendChild(documentFragment);
  shownCommentsCounter = amount;
  if (amount >= commentsList.length) {
    addHidden(document.querySelector('.comments-loader'));
    shownCommentsCounter = commentsList.length;
  }
};

const getCommentsShown = () => {
  bigPicture.querySelector('.social__comment-shown-count').textContent =
    shownCommentsCounter.toString();
};

export {openBigPicture, closeBigPicture};
