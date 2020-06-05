'use strict';

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

var PHOTO_QUANTITY = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MAX_COMMENTS_COUNT = 4;
var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var NAMES = ['Ivan', 'Maria', 'Aleksey', 'Andrey', 'Daria', 'Fred', 'Anna'];

// Генерация рандомного числа от min до max
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

// Перемешивание значений массива
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

// Генерация ссылки на изображение
function generatePhotoUrl(number) {
  return 'photos/' + number + '.jpg';
}

// Создание одного объекта с фото
function createPhotoDescription(number) {
  var obj = {
    url: generatePhotoUrl(number),
    description: 'что-то на фото',
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: generateComments()
  };

  return obj;
}

// Создание одного комментария к фото
function createComment() {
  var obj = {
    avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
    message: generateMessage(),
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };

  return obj;
}

// Создание нескольких комментариев к фото (по условию их может быть несколько)
function generateComments() {
  var arr = [];

  for (var i = 0; i <= getRandomNumber(1, MAX_COMMENTS_COUNT); i++) {
    arr.push(createComment());
  }

  return arr;
}

// Генерация сообщения для комментария (по условию состоит из 1 или 2 предложений из массива)
function generateMessage() {
  var message = '';

  for (var i = 1; i <= getRandomNumber(1, 2); i++) {

    if (i === 2) {
      message += ' ';
    }
    message += messages[getRandomNumber(0, messages.length - 1)];
  }

  return message;
}

// Создание массива из 25 объектов с фото
function createPhotosArray() {
  var photos = [];
  var numbersArray = [];

  for (var i = 1; i <= PHOTO_QUANTITY; i++) {
    numbersArray.push(i);
  }

  var shuffledArray = shuffleArray(numbersArray);
  for (i = 0; i < shuffledArray.length; i++) {
    photos.push(createPhotoDescription(shuffledArray[i]));
  }

  return photos;
}

// Создание DOM-элемента по шаблону
function createPictureElement(picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
}

// Создание всех картинок и добавление их в fragment
function createPicturesFragment(pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (picture) {
    fragment.appendChild(createPictureElement(picture));
  });

  return fragment;
}

// Отрисовка фотографий на странице
function renderPictures() {
  return picturesContainer.appendChild(createPicturesFragment(createPhotosArray()));
}

renderPictures();
