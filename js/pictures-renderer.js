'use strict';

(function () {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var pictureModal = document.querySelector('.big-picture');
  var activeFilter = document.querySelector('.img-filters__button--active');
  var RANDOM_IMAGES_COUNT = 10;
  var serverPictures = [];

  function generatePictureElement(picture, index) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.pictureId = index;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function renderPictures(pictures) {
    serverPictures = pictures;
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture, index) {
      fragment.appendChild(generatePictureElement(picture, index));
    });

    picturesContainer.appendChild(fragment);

    picturesContainer.addEventListener('click', onPicturesContainerClick);
    picturesContainer.addEventListener('keydown', onPicturesContainerKeydown);
  }

  function onPicturesContainerClick(event) {
    if (event.target.className === 'picture__img') {
      var pictureId = event.target.dataset.pictureId;
      window.pictureModal.fillPictureInfo(pictureModal, serverPictures[pictureId]);
      window.pictureModal.openPictureModal();
    }
  }

  function onPicturesContainerKeydown(event) {
    window.utils.isEnterEvent(event, function () {
      if (event.target.className === 'picture') {
        var pictureId = event.target.children[0].dataset.pictureId;
        window.pictureModal.fillPictureInfo(pictureModal, serverPictures[pictureId]);
        window.pictureModal.openPictureModal();
      }
    });
  }

  function removePictures() {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });

    picturesContainer.removeEventListener('click', onPicturesContainerClick);
    picturesContainer.removeEventListener('keydown', onPicturesContainerKeydown);
  }

  function updatePictures(target, pictures) {
    removePictures();

    window.utils.removeClass(activeFilter, 'img-filters__button--active');
    activeFilter = target;
    window.utils.addClass(activeFilter, 'img-filters__button--active');

    renderPictures(getFilteredPictures(target.id, pictures));
  }

  function getFilteredPictures(filterName, pictures) {

    switch (filterName) {
      case 'filter-random':
        return window.utils.shuffleArray(pictures).slice(0, RANDOM_IMAGES_COUNT);
      case 'filter-discussed':
        return pictures.sort(function (a, b) {
          var sortingWeight = b.comments.length - a.comments.length;
          if (sortingWeight === 0) {
            sortingWeight = pictures.indexOf(a) - pictures.indexOf(b);
          }
          return sortingWeight;
        });
      default:
        return pictures;
    }
  }

  window.picturesRenderer = {
    renderPictures: renderPictures,
    updatePictures: updatePictures
  };
})();
