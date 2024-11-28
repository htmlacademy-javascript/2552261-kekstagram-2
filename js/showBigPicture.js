import {photos} from './miniatureCreate.js';
import {isEscKeyDown} from './util.js';
import {addHidden, removeHidden} from './util.js';

const COMMENTS_AMOUNT = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');
const buttonCansel = document.querySelector('.big-picture__cancel');
const buttonLoad = document.querySelector('.social__comments-loader');
let shownCommentsCounter = 0;

function onBigPictureEscKeyDown(evt) {
  if (isEscKeyDown(evt)) {
    addHidden(bigPicture);
    evt.preventDefault();
    closeBigPicture();
  }
}

function onButtonLoadClick() {
  const photoId = document.querySelector('.big-picture img').dataset.photoId;
  const currentPhoto = getPhotoById(photoId);
  addComments(currentPhoto, COMMENTS_AMOUNT + shownCommentsCounter);
  getCommentsShown();
}

function createBigPictureData(evt) {
  const miniature = evt.target.closest('.picture');
  if (miniature.classList.contains('picture')) {
    const photoId = miniature.querySelector('.picture__img').dataset.photoId;
    const currentPhoto = getPhotoById(photoId);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src =
      currentPhoto.url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').dataset.photoId = currentPhoto.id;
    bigPicture.querySelector('.likes-count').textContent =
      currentPhoto.likes;
    bigPicture.querySelector('.social__comment-total-count').textContent =
      currentPhoto.comments.length.toString();
    addComments(currentPhoto, COMMENTS_AMOUNT);
    getCommentsShown();
  }
}

function openBigPicture(evt) {
  createBigPictureData(evt);
  removeHidden(bigPicture);
  buttonLoad.addEventListener('click', onButtonLoadClick);
  document.addEventListener('keydown', onBigPictureEscKeyDown);
  document.body.classList.add('modal-open');
}

function closeBigPicture() {
  addHidden(bigPicture);
  removeHidden(document.querySelector('.comments-loader'));
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  buttonLoad.removeEventListener('click', onButtonLoadClick);
}

function addComments(photo, amount) {
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
}

function clearComments() {
  bigPicture.querySelector('.social__comments').innerHTML = '';
}

function getCommentsShown() {
  bigPicture.querySelector('.social__comment-shown-count').textContent =
    shownCommentsCounter.toString();
}

function getPhotoById(id) {
  return photos.find((photo) => photo.id === Number(id));
}

picturesContainer.addEventListener('click', (evt) => {
  openBigPicture(evt);
});

buttonCansel.addEventListener('click', () => {
  closeBigPicture();
});

