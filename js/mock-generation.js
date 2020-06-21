'use strict';

(function () {
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

  function generatePicture(number) {
    return {
      url: 'photos/' + number + '.jpg',
      description: 'что-то на фото',
      likes: window.utils.getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: generateComments()
    };
  }

  function generateComment() {
    return {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: generateMessage(),
      name: names[window.utils.getRandomNumber(0, names.length - 1)]
    };
  }

  function generateComments() {
    var arr = [];

    for (var i = 0; i <= window.utils.getRandomNumber(1, MAX_COMMENTS_COUNT); i++) {
      arr.push(generateComment());
    }

    return arr;
  }

  // generate random message with 1 or 2 sentences
  function generateMessage() {
    var message = messages[window.utils.getRandomNumber(0, messages.length - 1)];

    return (Math.random() >= 0.5) ? message + ' ' + messages[window.utils.getRandomNumber(0, messages.length - 1)] : message;
  }

  function generatePictures() {
    var photos = [];
    var numbers = [];

    for (var i = 1; i <= PHOTO_QUANTITY; i++) {
      numbers.push(i);
    }

    var shuffledNumbers = window.utils.shuffleArray(numbers);

    shuffledNumbers.forEach(function (number) {
      photos.push(generatePicture(number));
    });

    return photos;
  }

  window.mockGeneration = {
    generatePictures: generatePictures
  };
})();
