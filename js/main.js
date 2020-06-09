'use strict';

var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var PHOTO_QUANTITY = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MAX_COMMENTS_COUNT = 4;
var messagesArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var namesArray = ['Ivan', 'Maria', 'Aleksey', 'Andrey', 'Daria', 'Fred', 'Anna'];

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

function generatePictureObject(number) {
  return {
    url: 'photos/' + number + '.jpg',
    description: 'что-то на фото',
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: generateCommentsArray()
  };
}

function generateCommentObject() {
  return {
    avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
    message: generateMessage(),
    name: namesArray[getRandomNumber(0, namesArray.length - 1)]
  };
}

function generateCommentsArray() {
  var arr = [];

  for (var i = 0; i <= getRandomNumber(1, MAX_COMMENTS_COUNT); i++) {
    arr.push(generateCommentObject());
  }

  return arr;
}

// generate random message with 1 or 2 sentences
function generateMessage() {
  var message = messagesArray[getRandomNumber(0, messagesArray.length - 1)];

  return (Math.random() >= 0.5) ? message + ' ' + messagesArray[getRandomNumber(0, messagesArray.length - 1)] : message;
}

function generatePicturesArray() {
  var photos = [];
  var numbersArray = [];

  for (var i = 1; i <= PHOTO_QUANTITY; i++) {
    numbersArray.push(i);
  }

  var shuffledArray = shuffleArray(numbersArray);

  shuffledArray.forEach(function (number) {
    photos.push(generatePictureObject(number));
  });

  return photos;
}

function generatePictureElement(pictureObject) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureObject.url;
  pictureElement.querySelector('.picture__likes').textContent = pictureObject.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureObject.comments.length;

  return pictureElement;
}


function generatePicturesFragment(picturesArray) {
  var fragment = document.createDocumentFragment();

  picturesArray.forEach(function (pictureObject) {
    fragment.appendChild(generatePictureElement(pictureObject));
  });

  return fragment;
}

function renderPictures(picturesArray) {
  return picturesContainer.appendChild(generatePicturesFragment(picturesArray));
}

var picturesArray = generatePicturesArray();

renderPictures(picturesArray);
