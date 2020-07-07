'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainContainer = document.querySelector('main');

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

  var successMessage = document.querySelector('.success');
  var successButton = successMessage.querySelector('.success__button');
  var errorMessage = document.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');

  window.messages = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
