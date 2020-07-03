'use strict';

(function () {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var pictureModal = document.querySelector('.big-picture');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var imgFilterButtons = imgFilterForm.querySelectorAll('.img-filters__button');
  var MAX_IMAGES_COUNT = 10;

  function generatePictureElement(picture, index) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.pictureId = index;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function renderPictures() {
    var pictures = window.main.getPictures();

    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture, index) {
      fragment.appendChild(generatePictureElement(picture, index));
    });
    picturesContainer.appendChild(fragment);
    picturesContainer.addEventListener('click', onPicturesContainerClick);
    picturesContainer.addEventListener('keydown', onPicturesContainerKeydown);
  }

  function onPicturesContainerClick(event) {
    var pictures = window.main.getPictures();

    if (event.target.className === 'picture__img') {
      var pictureId = event.target.dataset.pictureId;
      window.pictureModal.fillPictureInfo(pictureModal, pictures[pictureId]);
      window.pictureModal.openPictureModal();
    }
  }

  function onPicturesContainerKeydown(event) {
    var pictures = window.main.getPictures();

    window.utils.isEnterEvent(event, function () {
      if (event.target.className === 'picture') {
        var pictureId = event.target.children[0].dataset.pictureId;
        window.pictureModal.fillPictureInfo(pictureModal, pictures[pictureId]);
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

  function updatePictures(event, pictures) {
    removePictures();
    imgFilterButtons.forEach(function (item) {
      window.utils.removeClass(item, 'img-filters__button--active');
    });
    window.utils.addClass(event.target, 'img-filters__button--active');
    renderPictures(getFilteredPictures(event, pictures));
  }

  function getFilteredPictures(event, pictures) {
    var filteredPictures = [];

    switch (event.target.id) {
      case 'filter-default':
        filteredPictures = pictures.slice();
        break;
      case 'filter-random':
        filteredPictures = window.utils.shuffleArray(pictures.slice()).slice(0, MAX_IMAGES_COUNT);
        break;
      case 'filter-discussed':
        filteredPictures = pictures.slice().sort(function (a, b) {
          var sortingWeight = b.comments.length - a.comments.length;
          if (sortingWeight === 0) {
            sortingWeight = pictures.indexOf(a) - pictures.indexOf(b);
          }
          return sortingWeight;
          // вернуть это значение внутри if не могу, так как функция вернет значение только если выполнено условие,а это условие может не выполняться.
        });
    }
    return filteredPictures;
  }

  window.picturesRenderer = {
    renderPictures: renderPictures,
    updatePictures: updatePictures
  };
})();
