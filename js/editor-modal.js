'use strict';

(function () {
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadControl.querySelector('.scale__control--value');
  var uploadFileInput = document.querySelector('#upload-file');
  var fileEditModal = document.querySelector('.img-upload__overlay');
  var fileEditModalCloseButton = fileEditModal.querySelector('#upload-cancel');
  var INITIAL_PICTURE_SCALE = 100;

  function openEditorModal() {
    window.filter.hideSlider();
    scaleControlInput.value = INITIAL_PICTURE_SCALE + '%';
    window.scale.initScale();
    window.filter.effectLevelInput.value = INITIAL_PICTURE_SCALE;
    window.utils.removeClass(fileEditModal, 'hidden');
    window.utils.addClass(document.body, 'modal-open');
    window.validation.hashtagInput.focus();

    document.addEventListener('keydown', onEditorModalEscPress);
  }

  function closeEditorModal() {
    window.utils.addClass(fileEditModal, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');
    uploadFileInput.value = '';

    document.removeEventListener('keydown', onEditorModalEscPress);
  }

  function onEditorModalEscPress(event) {
    window.utils.isEscEvent(event, function () {
      if (event.target !== window.validation.hashtagInput && event.target !== window.validation.descriptionTextarea) {
        event.preventDefault();
        closeEditorModal();
      }
    });
  }

  uploadFileInput.addEventListener('change', function () {
    openEditorModal();
  });
  fileEditModalCloseButton.addEventListener('click', function () {
    closeEditorModal();
  });
})();
