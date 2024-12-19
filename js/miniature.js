const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();
const filters = document.querySelector('.img-filters');

function miniatureCreate(photos) {
  const pictures = document.querySelectorAll('.picture');
  removeAllPictures(pictures);
  photos.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').alt = photo.description;
    picture.querySelector('.picture__img').dataset.photoId = photo.id;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    documentFragment.appendChild(picture);
  });
  picturesContainer.appendChild(documentFragment);
  filters.classList.remove('img-filters--inactive'); //TODO не должен быть тут
}

function removeAllPictures(pictures) {
  if (pictures.length !== 0) {
    pictures.forEach((picture) =>
      picture.remove());
  }
}

export {miniatureCreate};
