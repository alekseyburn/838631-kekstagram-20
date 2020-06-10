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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

// Заполнение блока Big-picture информацией из массива
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

// Создание элемента комментария
function generateCommentElement(comment) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  var p = document.createElement('p');
  li.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.appendChild(img);
  li.appendChild(p);

  return li;
}

fillBigPictureInfo(bigPicture, pictures[0]);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');
