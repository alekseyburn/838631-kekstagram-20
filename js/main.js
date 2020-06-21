'use strict';

(function () {
  var pictureModal = document.querySelector('.big-picture');
  var pictures = window.mockGeneration.generatePictures();
  window.galleryRender.renderPictures(pictures);


  window.galleryRender.picturesContainer.addEventListener('click', function (event) {
    if (event.target.className === 'picture__img') {
      var pictureId = event.target.dataset.pictureId;
      window.galleryRender.fillPictureInfo(pictureModal, pictures[pictureId]);
      window.pictureModal.openPictureModal();
    }
  });
  window.galleryRender.picturesContainer.addEventListener('keydown', function (event) {
    window.utils.isEnterEvent(event, function () {
      if (event.target.className === 'picture') {
        var pictureId = event.target.children[0].dataset.pictureId;
        window.galleryRender.fillPictureInfo(pictureModal, pictures[pictureId]);
        window.pictureModal.openPictureModal();
      }
    });
  });
})();
