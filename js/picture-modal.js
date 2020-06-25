'use strict';

(function () {
  var pictureModal = document.querySelector('.big-picture');
  var pictureModalCloseButton = pictureModal.querySelector('.big-picture__cancel');
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;

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

  function fillPictureInfo(template, picture) {
    var fragment = document.createDocumentFragment();
    var commentsList = template.querySelector('.social__comments');

    template.querySelector('.big-picture__img img').src = picture.url;
    template.querySelector('.likes-count').textContent = picture.likes;
    template.querySelector('.comments-count').textContent = picture.comments.length;
    template.querySelector('.social__caption').textContent = picture.description;

    picture.comments.forEach(function (comment) {
      fragment.appendChild(generateCommentElement(comment));
    });

    commentsList.appendChild(fragment);
  }

  function generateCommentElement(comment) {
    var img = document.createElement('img');
    window.utils.addClass(img, 'social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = COMMENT_AVATAR_WIDTH;
    img.height = COMMENT_AVATAR_HEIGHT;

    var p = document.createElement('p');
    p.textContent = comment.message;
    window.utils.addClass(p, 'social__text');

    var li = document.createElement('li');
    window.utils.addClass(li, 'social__comment');
    li.appendChild(img);
    li.appendChild(p);

    return li;
  }

  window.pictureModal = {
    openPictureModal: openPictureModal,
    fillPictureInfo: fillPictureInfo
  };
})();
