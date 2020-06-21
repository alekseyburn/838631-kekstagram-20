'use strict';

(function () {
  var pictureModal = document.querySelector('.big-picture');
  var pictureModalCloseButton = pictureModal.querySelector('.big-picture__cancel');

  function openPictureModal() {
    window.utils.addClass(pictureModal.querySelector('.social__comment-count'), 'hidden');
    window.utils.addClass(pictureModal.querySelector('.comments-loader'), 'hidden');
    window.utils.removeClass(pictureModal, 'hidden');
    window.utils.addClass(document.body, 'modal-open');

    document.addEventListener('keydown', onPictureModalEscPress);
  }

  function closePictureModal() {
    window.utils.addClass(pictureModal, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');

    document.removeEventListener('keydown', onPictureModalEscPress);
  }

  function onPictureModalEscPress(event) {
    window.utils.isEscEvent(event, function () {
      closePictureModal();
    });
  }

  pictureModalCloseButton.addEventListener('click', function () {
    closePictureModal();
  });

  window.pictureModal = {
    openPictureModal: openPictureModal
  };
})();
