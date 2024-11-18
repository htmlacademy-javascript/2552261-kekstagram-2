const names = [
  'Александр', 'Мария', 'Дмитрий', 'Екатерина', 'Иван',
  'Анна', 'Максим', 'Ольга', 'Сергей', 'Татьяна',
  'Анастасия', 'Павел', 'Светлана', 'Николай', 'Елена',
  'Артем', 'Юлия', 'Роман', 'Дарья', 'Алексей',
  'Ксения', 'Виктор', 'Олег', 'Ирина', 'Валентина'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!'
];

const photoDescriptions = [
  'Солнечный закат на пляже.',
  'Горы, покрытые снежным покровом.',
  'Яркие цветы весной.',
  'Ночной город с огнями.',
  'Спокойное озеро в лесу.',
  'Семейный пикник на природе.',
  'Друзья, наслаждающиеся вечеринкой.',
  'Уютный уголок в кафе.',
  'Старинная архитектура города.',
  'Путешествие по живописным дорогам.',
  'Улыбающиеся дети на прогулке.',
  'Красивая радуга после дождя.',
  'Пейзаж с полями и деревьями.',
  'Зимний лес с падающим снегом.',
  'Кулинарные шедевры на столе.',
  'Спортивное событие с болельщиками.',
  'Морская прогулка на яхте.',
  'Фотография любимого питомца.',
  'Творческий процесс художника.',
  'Светлое утро с чашкой кофе.',
  'Уютный вечер с книгой.',
  'Забавные моменты с друзьями.',
  'Классическая музыка на концерте.',
  'Дорога, ведущая в никуда.',
  'Путешествие по историческим местам.',
  'Счастливые моменты на свадьбе.'
];

let countId = 1;
let countCommentId = 1;
let countUrl = 1;

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function createAvatar() {
  return `img/avatar-${getRandomInteger(0, 6)}.svg`;
}

function createMessage(array) {
  let count = getRandomInteger(1, 2);
  let message = '';
  while (count >= 1) {
    const randomMessage = getRandomArrayElement(array);
    if (!message.includes(randomMessage)) {
      message += `${randomMessage}`;
      count--;
    }
  }
  return message;
}

function createComments() {
  let count = getRandomInteger(0, 30);
  const comments = [];
  while (count >= 0) {
    comments.push({
      id: createCommentId(),
      avatar: createAvatar(),
      message: createMessage(messages),
      name: getRandomArrayElement(names)
    });
    count--;
  }
  return comments;
}

function createDescription(array) {
  return getRandomArrayElement(array);
}

function createId() {
  return countId++;
}

function createCommentId() {
  return countCommentId++;
}

function createUrl() {
  return `photos/${countUrl++}.jpg`;
}


function createPhotoInfo() {
  return {
    id: createId(),
    url: createUrl(),
    description: createDescription(photoDescriptions),
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
}


function createPhotos(amount) {
  const array = [];
  for (let i = 1; i <= amount; i++) {
    array.push(createPhotoInfo());
  }
  return array;
}

createPhotos(25);


