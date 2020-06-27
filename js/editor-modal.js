'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgEffectsContainer = document.querySelector('.effects__list');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevelSlider.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
  var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var imgUploadControl = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadControl.querySelector('.scale__control--value');
  var scaleControlSmallerButton = imgUploadControl.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = imgUploadControl.querySelector('.scale__control--bigger');
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionTextarea = document.querySelector('.text__description');
  var uploadFileInput = document.querySelector('#upload-file');
  var fileEditModal = document.querySelector('.img-upload__overlay');
  var fileEditModalCloseButton = fileEditModal.querySelector('#upload-cancel');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainContainer = document.querySelector('main');
  var ORIGINAL_IMAGE_EFFECT = 'none';
  var INITIAL_FILTER_VALUE = 100;
  var INITIAL_PICTURE_SCALE = 100;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;
  var MAX_HASHTAG_COUNT = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_TEXTAREA_LENGTH = 140;
  var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;

  function showSlider() {
    window.utils.removeClass(effectLevelSlider, 'hidden');
  }

  function hideSlider() {
    window.utils.addClass(effectLevelSlider, 'hidden');
  }

  function openEditorModal() {
    hideSlider();
    scaleControlInput.value = INITIAL_PICTURE_SCALE + '%';
    effectLevelInput.value = INITIAL_PICTURE_SCALE;
    imgUploadPreview.style.transform = '';
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = null;
    window.utils.removeClass(fileEditModal, 'hidden');
    window.utils.addClass(document.body, 'modal-open');
    hashtagInput.focus();

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
      if (event.target !== hashtagInput && event.target !== descriptionTextarea) {
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

  function changePictureScale(value) {
    scaleControlInput.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }

  scaleControlSmallerButton.addEventListener('click', function () {
    var scaleValue = Number(scaleControlInput.value.slice(0, -1));
    scaleValue -= SCALE_STEP;

    if (scaleValue <= MIN_SCALE_VALUE) {
      scaleValue = MIN_SCALE_VALUE;
    }

    changePictureScale(scaleValue);
  });

  scaleControlBiggerButton.addEventListener('click', function () {
    var scaleValue = Number(scaleControlInput.value.slice(0, -1));
    scaleValue += SCALE_STEP;

    if (scaleValue > MAX_SCALE_VALUE) {
      scaleValue = MAX_SCALE_VALUE;
    }

    changePictureScale(scaleValue);
  });

  function onFilterChange(event) {
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = null;
    window.utils.addClass(imgUploadPreview, 'effects__preview--' + event.target.value);
    effectLevelInput.value = INITIAL_FILTER_VALUE;
    effectLevelPin.style.left = INITIAL_FILTER_VALUE + '%';
    effectLevelDepth.style.width = INITIAL_FILTER_VALUE + '%';

    if (event.target.value === ORIGINAL_IMAGE_EFFECT) {
      hideSlider();
    } else {
      showSlider();
    }
  }

  imgEffectsContainer.addEventListener('change', onFilterChange);

  function onEffectLevelChange(value) {
    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelInput.value = Math.floor(value);

    switch (imgUploadPreview.className) {
      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        var resultInputValue = effectLevelInput.value * 3 / 100;
        resultInputValue = (resultInputValue < 1) ? 1 : resultInputValue;
        imgUploadPreview.style.filter = 'brightness(' + resultInputValue + ')';
        break;
      default:
        imgUploadPreview.style.filter = null;
    }
  }

  effectLevelPin.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var sliderLineWidth = effectLevelLine.clientWidth;
    var MIN_PERCENT = 0;
    var MAX_PERCENT = 100;

    function getCoordX(coordEvent) {
      var coordX = ((coordEvent.clientX - effectLevelLine.getBoundingClientRect().left) * 100) / sliderLineWidth;

      if (coordX > MAX_PERCENT) {
        coordX = MAX_PERCENT;
      } else if (coordX < MIN_PERCENT) {
        coordX = MIN_PERCENT;
      }

      return coordX;
    }

    onEffectLevelChange(getCoordX(event));

    function onMouseMove(moveEvent) {
      moveEvent.preventDefault();
      onEffectLevelChange(getCoordX(moveEvent));
    }

    function onMouseUp(upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  hashtagInput.addEventListener('input', function () {
    var values = hashtagInput.value.toLowerCase().split(' ');
    var errors = [];

    values.forEach(function (hashtag, index, array) {
      var message = 'Хештег ' + hashtag + ' не соответствует данным критериям: ';
      var hashtagErrors = [];

      if (hashtag[0] !== '#') {
        hashtagErrors.push('хештег должен начинаться с #');
      }
      if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagErrors.push('длина хештега должна быть от 2 до 20 символов, включая #');
      }
      if (!hashtagSymbolsRegexp.test(hashtag)) {
        hashtagErrors.push('хештег должен состоять только из букв и цифр');
      }
      if (array.indexOf(hashtag) !== array.lastIndexOf(hashtag)) {
        hashtagErrors.push('повторяющиеся хештеги запрещены');
      }
      if (array.length > MAX_HASHTAG_COUNT) {
        hashtagErrors.push('количество хештегов не должно быть больше 5');
      }
      message += hashtagErrors.join(', ');
      if (hashtagErrors.length > 0) {
        errors.push(message);
      }
    });
    if (errors.length > 0) {
      hashtagInput.setCustomValidity(errors.join('. '));
    } else {
      hashtagInput.setCustomValidity('');
    }
  });

  descriptionTextarea.addEventListener('input', function () {
    if (descriptionTextarea.value.length > MAX_TEXTAREA_LENGTH) {
      descriptionTextarea.setCustomValidity('длина комментария не может составлять больше 140 символов. Удалите ' + (descriptionTextarea.value.length - MAX_TEXTAREA_LENGTH) + ' символа(ов).');
    } else {
      descriptionTextarea.setCustomValidity('');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    window.ajax.upload('https://javascript.pages.academy/kekstagram', new FormData(form), onUploadSuccess, onUploadError);
  });

  function onUploadSuccess() {
    form.reset();
    closeEditorModal();
    showSuccessMessage();
  }

  function renderSuccessMessage() {
    var message = successMessageTemplate.cloneNode(true);
    window.utils.addClass(message, 'hidden');

    mainContainer.appendChild(message);
  }

  function showSuccessMessage() {
    window.utils.removeClass(successMessage, 'hidden');
    window.utils.addClass(document.body, 'modal-open');
    successButton.focus();

    successButton.addEventListener('click', function () {
      hideSuccessMessage();
    });
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', hideSuccessMessage);
  }

  function hideSuccessMessage() {
    window.utils.addClass(successMessage, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');

    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', hideSuccessMessage);
  }

  function onSuccessMessageEscPress(event) {
    window.utils.isEscEvent(event, function () {
      hideSuccessMessage();
    });
  }

  function onUploadError(error) {
    form.reset();
    closeEditorModal();
    showErrorMessage(error);
  }

  function renderErrorMessage() {
    var message = errorMessageTemplate.cloneNode(true);
    window.utils.addClass(message, 'hidden');

    mainContainer.appendChild(message);
  }

  function showErrorMessage(error) {
    errorMessage.querySelector('.error__title').textContent = error;
    window.utils.removeClass(errorMessage, 'hidden');
    window.utils.addClass(document.body, 'modal-open');
    errorButton.focus();

    errorButton.addEventListener('click', function () {
      hideErrorMessage();
    });
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', hideErrorMessage);
  }

  function hideErrorMessage() {
    window.utils.addClass(errorMessage, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');

    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', hideErrorMessage);
  }

  function onErrorMessageEscPress(event) {
    window.utils.isEscEvent(event, function () {
      hideErrorMessage();
    });
  }

  renderSuccessMessage();
  renderErrorMessage();

  // Эти объявления пришлось спустить после вызова рендеров успеха и ошибки, потому что до вызова этих функций эти объявления в коде не существуют и вызывают ошибку. Это не слишком красиво, поэтому у меня они находились прямиком в функциях.
  var successMessage = document.querySelector('.success');
  var successButton = successMessage.querySelector('.success__button');
  var errorMessage = document.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
})();
