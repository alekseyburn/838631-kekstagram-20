'use strict';

(function () {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var pictureModal = document.querySelector('.big-picture');

  function generatePictureElement(picture, index) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.pictureId = index;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function generatePicturesFragment(pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture, index) {
      fragment.appendChild(generatePictureElement(picture, index));
    });

    return fragment;
  }

  function renderPictures(pictures) {
    picturesContainer.appendChild(generatePicturesFragment(pictures));

    picturesContainer.addEventListener('click', function (event) {
      if (event.target.className === 'picture__img') {
        var pictureId = event.target.dataset.pictureId;
        window.pictureModal.fillPictureInfo(pictureModal, pictures[pictureId]);
        window.pictureModal.openPictureModal();
      }
    });

    picturesContainer.addEventListener('keydown', function (event) {
      window.utils.isEnterEvent(event, function () {
        if (event.target.className === 'picture') {
          var pictureId = event.target.children[0].dataset.pictureId;
          window.pictureModal.fillPictureInfo(pictureModal, pictures[pictureId]);
          window.pictureModal.openPictureModal();
        }
      });
    });
  }

  window.picturesRenderer = {
    renderPictures: renderPictures
  };
})();
