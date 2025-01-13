import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();

function miniatureCreate(photos) {
  photos.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').alt = photo.description;
    picture.querySelector('.picture__img').dataset.photoId = photo.id;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.addEventListener('click', () => {
      openBigPicture(photo);
    });
    documentFragment.appendChild(picture);
  });
  picturesContainer.appendChild(documentFragment);
}

export {miniatureCreate};
