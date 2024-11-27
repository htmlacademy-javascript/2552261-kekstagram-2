import {photos} from './miniatureCreate.js';
import {isEscKeyDown} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');
const buttonCansel = document.querySelector('.big-picture__cancel');

function onBigPictureEscKeyDown(evt) {
  if (isEscKeyDown(evt)) {
    addHidden(bigPicture);
    evt.preventDefault();
    closeBigPicture();
  }
}

function createBicPictureData(evt) {
  const miniature = evt.target.closest('.picture');
  if (miniature.classList.contains('picture')) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src =
      miniature.querySelector('.picture__img').src;
    bigPicture.querySelector('.likes-count').textContent =
      miniature.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.social__comment-total-count').textContent =
      miniature.querySelector('.picture__comments').textContent;
    addComments(miniature.querySelector('.picture__img').src);
    bigPicture.querySelector('.social__comment-shown-count').textContent =
      document.querySelectorAll('.social__comment').length.toString();
  }
}

function openBigPicture(evt) {
  createBicPictureData(evt);
  removeHidden(bigPicture);
  addHidden(bigPicture.querySelector('.social__comment-count'));
  addHidden(bigPicture.querySelector('.comments-loader'));
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeyDown);
}

function closeBigPicture() {
  addHidden(bigPicture);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
}

function getCommentsByUrl(url) {
  for (let i = 0; i < photos.length; i++) {
    if (url.endsWith(photos[i].url)) {
      return photos[i].comments;
    }
  }
}

function addComments(url) {
  const commentsList = getCommentsByUrl(url);
  const documentFragment = document.createDocumentFragment();
  commentsList.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    documentFragment.appendChild(comment);
  });
  bigPicture.querySelector('.social__comments').appendChild(documentFragment);
}

function addHidden(block) {
  block.classList.add('hidden');
}

function removeHidden(block) {
  block.classList.remove('hidden');
}

picturesContainer.addEventListener('click', (evt) => {
  openBigPicture(evt);
});

buttonCansel.addEventListener('click', () => {
  closeBigPicture();
});
