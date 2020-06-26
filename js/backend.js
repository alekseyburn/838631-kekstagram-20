'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  function createXHR(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case StatusCode.INTERNAL_SERVER_ERROR:
          error = 'Ошибка на стороне сервера';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  }

  function upload(data, onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/kekstagram';
    var xhr = createXHR(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function load(onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/kekstagram/data';
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', URL);
    xhr.send();
  }

  window.backend = {
    upload: upload,
    load: load
  };
})();
