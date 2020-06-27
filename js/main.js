'use strict';

(function () {
  var pictures = [];
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var imgFilterButtons = imgFilterForm.querySelectorAll('.img-filters__button');
  var MAX_IMAGES_COUNT = 10;

  window.ajax.load('https://javascript.pages.academy/kekstagram/data', picturesCallback, function () {});

  function picturesCallback(data) {
    pictures = data;
    window.picturesRenderer.renderPictures(data);
    window.utils.removeClass(imgFilter, 'img-filters--inactive');
  }

  function updatePictures(event) {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    imgFilterButtons.forEach(function (item) {
      window.utils.removeClass(item, 'img-filters__button--active');
    });
    window.utils.addClass(event.target, 'img-filters__button--active');

    switch (event.target.id) {
      case 'filter-default':
        window.picturesRenderer.renderPictures(pictures);
        break;
      case 'filter-random':
        window.picturesRenderer.renderPictures(window.utils.shuffleArray(pictures.slice()).slice(0, MAX_IMAGES_COUNT));
        break;
      case 'filter-discussed':
        window.picturesRenderer.renderPictures(pictures.slice().sort(function (a, b) {
          var countDiff = b.comments.length - a.comments.length;
          if (countDiff === 0) {
            countDiff = pictures.indexOf(a) - pictures.indexOf(b);
          }
          return countDiff;
        }));
        break;
    }
  }

  imgFilterForm.addEventListener('click', window.debounce(function (event) {
    updatePictures(event);
  }));
})();
