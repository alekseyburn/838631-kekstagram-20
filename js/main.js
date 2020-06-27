'use strict';

(function () {
  window.ajax.load('https://javascript.pages.academy/kekstagram/data', picturesCallback, function () {});

  function picturesCallback(data) {
    window.picturesRenderer.renderPictures(data);
  }
})();
