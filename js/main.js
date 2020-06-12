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

function generatePictureElement(picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
}


function generatePicturesFragment(pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (picture) {
    fragment.appendChild(generatePictureElement(picture));
  });

  return fragment;
}

function renderPictures(pictures) {
  return picturesContainer.appendChild(generatePicturesFragment(pictures));
}

var pictures = generatePictures();

renderPictures(pictures);

var pictureModal = document.querySelector('.big-picture');
// pictureModal.classList.remove('hidden');

function fillBigPictureInfo(template, picture) {
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
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = COMMENT_AVATAR_WIDTH;
  img.height = COMMENT_AVATAR_HEIGHT;

  var p = document.createElement('p');
  p.textContent = comment.message;
  p.classList.add('social__text');

  var li = document.createElement('li');
  li.classList.add('social__comment');
  li.appendChild(img);
  li.appendChild(p);

  return li;
}

fillBigPictureInfo(pictureModal, pictures[0]);

pictureModal.querySelector('.social__comment-count').classList.add('hidden');
pictureModal.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');

var uploadFileInput = document.querySelector('#upload-file');
var fileEditModal = document.querySelector('.img-upload__overlay');
var fileEditModalClose = fileEditModal.querySelector('#upload-cancel');

function openEditorModal() {
  fileEditModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControlInput.value = INITIAL_PICTURE_SCALE + '%';

  document.addEventListener('keydown', onPopupEscPress);
}

function closeEditorModal() {
  fileEditModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileInput.value = '';

  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeEditorModal();
  }
}

uploadFileInput.addEventListener('change', function () {
  openEditorModal();
});

fileEditModalClose.addEventListener('click', function () {
  closeEditorModal();
});

var imgUploadControl = document.querySelector('.img-upload__scale');
var scaleControlSmaller = imgUploadControl.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadControl.querySelector('.scale__control--bigger');
var scaleControlInput = imgUploadControl.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var INITIAL_PICTURE_SCALE = 100;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;

function changePictureScale(event) {
  // Подобного в лекциях не было, но я додумался только так
  var scaleValue = Number(scaleControlInput.value.slice(0, -1));

  if (event.target === scaleControlSmaller) {
    scaleValue -= SCALE_STEP;
  } else if (event.target === scaleControlBigger) {
    scaleValue += SCALE_STEP;
  }

  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }
  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }

  scaleControlInput.value = scaleValue + '%';
  imgUploadPreview.style.transform = 'scale(' + (scaleValue / 100) + ')';
}

imgUploadControl.addEventListener('click', function (event) {
  changePictureScale(event);
});
