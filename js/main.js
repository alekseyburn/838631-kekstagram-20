'use strict';

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

var PHOTO_QUANTITY = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MAX_COMMENTS_COUNT = 4;
var COMMENT_AVATAR_WIDTH = 35;
var COMMENT_AVATAR_HEIGHT = 35;
var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var names = ['Ivan', 'Maria', 'Aleksey', 'Andrey', 'Daria', 'Fred', 'Anna'];

var imgUploadControl = document.querySelector('.img-upload__scale');
var scaleControlSmallerButton = imgUploadControl.querySelector('.scale__control--smaller');
var scaleControlBiggerButton = imgUploadControl.querySelector('.scale__control--bigger');
var scaleControlInput = imgUploadControl.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var ORIGINAL_IMAGE_EFFECT = 'none';
var INITIAL_PICTURE_SCALE = 100;
var INITIAL_FILTER_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;
var MAX_HASHTAG_COUNT = 5;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_TEXTAREA_LENGTH = 140;
var hashtagSymbolsRegexp = /#?[а-яa-z0-9]+/i;

var pictureModal = document.querySelector('.big-picture');
var pictureModalCloseButton = pictureModal.querySelector('.big-picture__cancel');
var uploadFileInput = document.querySelector('#upload-file');
var fileEditModal = document.querySelector('.img-upload__overlay');
var fileEditModalCloseButton = fileEditModal.querySelector('#upload-cancel');

var imgEffectsContainer = document.querySelector('.effects__list');
var effectLevelSlider = document.querySelector('.img-upload__effect-level');
var effectLevelPin = effectLevelSlider.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');
var hashtagInput = document.querySelector('.text__hashtags');
var descriptionTextarea = document.querySelector('.text__description');

function addClass(item, className) {
  item.classList.add(className);
}

function removeClass(item, className) {
  item.classList.remove(className);
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

function generatePicture(number) {
  return {
    url: 'photos/' + number + '.jpg',
    description: 'что-то на фото',
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: generateComments()
  };
}

function generateComment() {
  return {
    avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
    message: generateMessage(),
    name: names[getRandomNumber(0, names.length - 1)]
  };
}

function generateComments() {
  var arr = [];

  for (var i = 0; i <= getRandomNumber(1, MAX_COMMENTS_COUNT); i++) {
    arr.push(generateComment());
  }

  return arr;
}

// generate random message with 1 or 2 sentences
function generateMessage() {
  var message = messages[getRandomNumber(0, messages.length - 1)];

  return (Math.random() >= 0.5) ? message + ' ' + messages[getRandomNumber(0, messages.length - 1)] : message;
}

function generatePictures() {
  var photos = [];
  var numbers = [];

  for (var i = 1; i <= PHOTO_QUANTITY; i++) {
    numbers.push(i);
  }

  var shuffledNumbers = shuffleArray(numbers);

  shuffledNumbers.forEach(function (number) {
    photos.push(generatePicture(number));
  });

  return photos;
}

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
  return picturesContainer.appendChild(generatePicturesFragment(pictures));
}

var pictures = generatePictures();

renderPictures(pictures);

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
  addClass(img, 'social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = COMMENT_AVATAR_WIDTH;
  img.height = COMMENT_AVATAR_HEIGHT;

  var p = document.createElement('p');
  p.textContent = comment.message;
  addClass(p, 'social__text');

  var li = document.createElement('li');
  addClass(li, 'social__comment');
  li.appendChild(img);
  li.appendChild(p);

  return li;
}

function openPictureModal(pictureId) {
  fillPictureInfo(pictureModal, pictures[pictureId]);
  addClass(pictureModal.querySelector('.social__comment-count'), 'hidden');
  addClass(pictureModal.querySelector('.comments-loader'), 'hidden');
  removeClass(pictureModal, 'hidden');
  addClass(document.body, 'modal-open');

  document.addEventListener('keydown', onPictureModalEscPress);
}

function closePictureModal() {
  addClass(pictureModal, 'hidden');
  removeClass(document.body, 'modal-open');

  document.removeEventListener('keydown', onPictureModalEscPress);
}

function onPictureModalEscPress(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closePictureModal();
  }
}

picturesContainer.addEventListener('click', function (event) {
  if (event.target.className === 'picture' || event.target.className === 'picture__img') {
    var pictureId = event.target.dataset.pictureId;
    openPictureModal(pictureId);
  }
});
picturesContainer.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    if (event.target.className === 'picture' || event.target.className === 'picture__img') {
      var pictureId = event.target.children[0].dataset.pictureId;
      openPictureModal(pictureId);
    }
  }
});
pictureModalCloseButton.addEventListener('click', function () {
  closePictureModal();
});

function showSlider() {
  removeClass(effectLevelSlider, 'hidden');
}

function hideSlider() {
  addClass(effectLevelSlider, 'hidden');
}

function openEditorModal() {
  hideSlider();
  scaleControlInput.value = INITIAL_PICTURE_SCALE + '%';
  effectLevelInput.value = INITIAL_PICTURE_SCALE;
  removeClass(fileEditModal, 'hidden');
  addClass(document.body, 'modal-open');
  hashtagInput.focus();

  document.addEventListener('keydown', onEditorModalEscPress);
}

function closeEditorModal() {
  addClass(fileEditModal, 'hidden');
  removeClass(document.body, 'modal-open');
  uploadFileInput.value = '';

  document.removeEventListener('keydown', onEditorModalEscPress);
}

function onEditorModalEscPress(event) {
  if (event.key === 'Escape' && event.target !== hashtagInput && event.target !== descriptionTextarea) {
    event.preventDefault();
    closeEditorModal();
  }
}

uploadFileInput.addEventListener('change', function () {
  openEditorModal();
});
fileEditModalCloseButton.addEventListener('click', function () {
  closeEditorModal();
});

function increasePictureScale() {
  var scaleValue = Number(scaleControlInput.value.slice(0, -1));
  scaleValue += SCALE_STEP;

  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }

  changePictureScale(scaleValue);
}

function decreasePictureScale() {
  var scaleValue = Number(scaleControlInput.value.slice(0, -1));
  scaleValue -= SCALE_STEP;

  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }

  changePictureScale(scaleValue);
}

function changePictureScale(value) {
  scaleControlInput.value = value + '%';
  imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
}

scaleControlSmallerButton.addEventListener('click', function () {
  decreasePictureScale();
});
scaleControlBiggerButton.addEventListener('click', function () {
  increasePictureScale();
});

function onFilterChange(event) {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = null;
  addClass(imgUploadPreview, 'effects__preview--' + event.target.value);
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

function onEffectLevelChange() {
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

effectLevelPin.addEventListener('mouseup', onEffectLevelChange);

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
