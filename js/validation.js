'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionTextarea = document.querySelector('.text__description');
  var MAX_HASHTAG_COUNT = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_TEXTAREA_LENGTH = 140;
  var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;

  hashtagInput.addEventListener('input', function () {
    var values = hashtagInput.value.toLowerCase().split(' ');
    var errors = [];

    values.forEach(function (hashtag, index, array) {
      var errorMessage = 'Хештег ' + hashtag + ' не соответствует данным критериям: ';
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
      errorMessage += hashtagErrors.join(', ');
      if (hashtagErrors.length > 0) {
        errors.push(errorMessage);
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

  window.validation = {
    hashtagInput: hashtagInput,
    descriptionTextarea: descriptionTextarea
  };
})();
