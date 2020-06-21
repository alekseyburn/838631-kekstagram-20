'use strict';

(function () {
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;

  function generatePictureElement(picture, index) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.pictureId = index;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  }

  function generatePicturesFragment(pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture, index) {
      fragment.appendChild(generatePictureElement(picture, index));
    });

    return fragment;
  }

  function renderPictures(pictures) {
    picturesContainer.appendChild(generatePicturesFragment(pictures));
  }

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

  window.galleryRender = {
    picturesContainer: picturesContainer,
    renderPictures: renderPictures,
    fillPictureInfo: fillPictureInfo
  };
})();
