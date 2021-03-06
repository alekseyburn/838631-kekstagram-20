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
  var errorButton = document.querySelector('.error__button');
  var currentFilter;
  var ORIGINAL_IMAGE_EFFECT = 'none';
  var INITIAL_FILTER_VALUE = 100;
  var INITIAL_PICTURE_SCALE = 100;
  var MIN_PERCENT = 0;
  var MAX_PERCENT = 100;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;
  var MAX_HASHTAG_COUNT = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_TEXTAREA_LENGTH = 140;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;

  function pasteUploadedImage() {
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var isMatch = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (isMatch) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function openEditorModal() {
    window.utils.addClass(effectLevelSlider, 'hidden');
    scaleControlInput.value = INITIAL_PICTURE_SCALE + '%';
    effectLevelInput.value = INITIAL_PICTURE_SCALE;
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = null;

    if (currentFilter) {
      window.utils.removeClass(imgUploadPreview, currentFilter);
    }

    pasteUploadedImage();
    window.utils.removeClass(fileEditModal, 'hidden');
    window.utils.addClass(document.body, 'modal-open');
    hashtagInput.focus();

    document.addEventListener('keydown', onEditorModalEscPress);
    fileEditModalCloseButton.addEventListener('click', onCloseButtonClick);
    form.addEventListener('submit', onFormSubmit);
    scaleControlSmallerButton.addEventListener('click', onButtonSmallerClick);
    scaleControlBiggerButton.addEventListener('click', onButtonBiggerClick);
    effectLevelPin.addEventListener('mousedown', onMouseDown);
    imgEffectsContainer.addEventListener('change', onFilterChange);
    hashtagInput.addEventListener('input', onHashtagFieldInput);
    descriptionTextarea.addEventListener('input', onTextareaInput);
  }

  function closeEditorModal() {
    window.utils.addClass(fileEditModal, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');
    uploadFileInput.value = '';

    document.removeEventListener('keydown', onEditorModalEscPress);
    fileEditModalCloseButton.removeEventListener('click', onCloseButtonClick);
    form.removeEventListener('submit', onFormSubmit);
    scaleControlSmallerButton.removeEventListener('click', onButtonSmallerClick);
    scaleControlBiggerButton.removeEventListener('click', onButtonBiggerClick);
    effectLevelPin.removeEventListener('mousedown', onMouseDown);
    imgEffectsContainer.removeEventListener('change', onFilterChange);
    hashtagInput.removeEventListener('input', onHashtagFieldInput);
    descriptionTextarea.removeEventListener('input', onTextareaInput);
  }

  function onCloseButtonClick() {
    closeEditorModal();
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

  function changePictureScale(value) {
    scaleControlInput.value = value + '%';
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }

  function onButtonSmallerClick() {
    var scaleValue = Number(scaleControlInput.value.slice(0, -1));
    scaleValue -= SCALE_STEP;

    if (scaleValue <= MIN_SCALE_VALUE) {
      scaleValue = MIN_SCALE_VALUE;
    }

    changePictureScale(scaleValue);
  }

  function onButtonBiggerClick() {
    var scaleValue = Number(scaleControlInput.value.slice(0, -1));
    scaleValue += SCALE_STEP;

    if (scaleValue > MAX_SCALE_VALUE) {
      scaleValue = MAX_SCALE_VALUE;
    }

    changePictureScale(scaleValue);
  }

  function onFilterChange(event) {
    if (currentFilter) {
      window.utils.removeClass(imgUploadPreview, currentFilter);
    }
    currentFilter = 'effects__preview--' + event.target.value;
    imgUploadPreview.style.filter = null;
    window.utils.addClass(imgUploadPreview, currentFilter);
    effectLevelInput.value = INITIAL_FILTER_VALUE;
    effectLevelPin.style.left = INITIAL_FILTER_VALUE + '%';
    effectLevelDepth.style.width = INITIAL_FILTER_VALUE + '%';

    if (event.target.value === ORIGINAL_IMAGE_EFFECT) {
      window.utils.addClass(effectLevelSlider, 'hidden');
    } else {
      window.utils.removeClass(effectLevelSlider, 'hidden');
    }
  }

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

  function onMouseDown(event) {
    event.preventDefault();
    var sliderLineWidth = effectLevelLine.clientWidth;

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
  }

  function markField(element) {
    element.style.outline = '2px solid red';
  }

  function unmarkField(element) {
    element.style = '';
  }

  function onHashtagFieldInput() {
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
      markField(hashtagInput);
    } else {
      hashtagInput.setCustomValidity('');
      unmarkField(hashtagInput);
    }
    if (hashtagInput.value.length === 0) {
      hashtagInput.setCustomValidity('');
      unmarkField(hashtagInput);
    }
  }

  function onTextareaInput() {
    if (descriptionTextarea.value.length > MAX_TEXTAREA_LENGTH) {
      descriptionTextarea.setCustomValidity('длина комментария не может составлять больше 140 символов. Удалите ' + (descriptionTextarea.value.length - MAX_TEXTAREA_LENGTH) + ' символа(ов).');
      markField(descriptionTextarea);
    } else {
      descriptionTextarea.setCustomValidity('');
      unmarkField(descriptionTextarea);
    }
  }

  function onFormSubmit(event) {
    event.preventDefault();
    window.ajax.upload('https://javascript.pages.academy/kekstagram', new FormData(form), onUploadSuccess, onUploadError);
  }

  function onUploadSuccess() {
    form.reset();
    closeEditorModal();
    window.messages.showSuccessMessage();
  }

  function onUploadError(error) {
    form.reset();
    closeEditorModal();
    errorButton.textContent = 'Загрузить другой файл';
    window.messages.showErrorMessage(error);
  }
})();
