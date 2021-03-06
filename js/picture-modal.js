'use strict';

(function () {
  var pictureModal = document.querySelector('.big-picture');
  var pictureModalCloseButton = pictureModal.querySelector('.big-picture__cancel');
  var commentsLoadButton = pictureModal.querySelector('.comments-loader');
  var commentsContainer = pictureModal.querySelector('.social__comments');
  var loadedCommentsCount = pictureModal.querySelector('.loaded-comments-count');
  var commentsCount = pictureModal.querySelector('.comments-count');
  var currentPicture;
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;
  var COMMENTS_TO_LOAD_COUNT = 5;
  var lastLoadedCommentIndex = 0;

  function openPictureModal() {
    window.utils.removeClass(pictureModal, 'hidden');
    window.utils.addClass(document.body, 'modal-open');

    document.addEventListener('keydown', onPictureModalEscPress);
    pictureModalCloseButton.addEventListener('click', onCloseButtonClick);
    commentsLoadButton.addEventListener('click', onCommentsLoadButtonClick);
  }

  function closePictureModal() {
    window.utils.addClass(pictureModal, 'hidden');
    window.utils.removeClass(document.body, 'modal-open');

    document.removeEventListener('keydown', onPictureModalEscPress);
    pictureModalCloseButton.removeEventListener('click', onCloseButtonClick);
    commentsLoadButton.removeEventListener('click', onCommentsLoadButtonClick);
  }

  function onCloseButtonClick() {
    closePictureModal();
  }

  function onPictureModalEscPress(event) {
    window.utils.isEscEvent(event, function () {
      closePictureModal();
    });
  }

  function fillPictureInfo(template, picture) {
    lastLoadedCommentIndex = 0;
    currentPicture = picture;
    var comments = template.querySelectorAll('.social__comment');

    comments.forEach(function (item) {
      item.remove();
    });

    template.querySelector('.big-picture__img img').src = picture.url;
    template.querySelector('.likes-count').textContent = picture.likes;
    template.querySelector('.comments-count').textContent = picture.comments.length;
    template.querySelector('.social__caption').textContent = picture.description;

    addComments(template, picture);
  }

  function addComments(template, picture) {
    var fragment = document.createDocumentFragment();
    var commentsList = template.querySelector('.social__comments');

    picture.comments.slice(lastLoadedCommentIndex, lastLoadedCommentIndex + COMMENTS_TO_LOAD_COUNT).forEach(function (comment) {
      fragment.appendChild(generateCommentElement(comment));
    });

    commentsList.appendChild(fragment);

    loadedCommentsCount.textContent = String(commentsContainer.children.length);

    if (loadedCommentsCount.textContent === commentsCount.textContent) {
      window.utils.addClass(commentsLoadButton, 'hidden');
    } else {
      window.utils.removeClass(commentsLoadButton, 'hidden');
    }
  }

  function onCommentsLoadButtonClick() {
    lastLoadedCommentIndex += COMMENTS_TO_LOAD_COUNT;

    addComments(pictureModal, currentPicture);
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
