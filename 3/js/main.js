const NAMES = [
  'Александр', 'Мария', 'Дмитрий', 'Екатерина', 'Иван',
  'Анна', 'Максим', 'Ольга', 'Сергей', 'Татьяна',
  'Анастасия', 'Павел', 'Светлана', 'Николай', 'Елена',
  'Артем', 'Юлия', 'Роман', 'Дарья', 'Алексей',
  'Ксения', 'Виктор', 'Олег', 'Ирина', 'Валентина'
];

let messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!'
];

let photoDescriptions = [
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

function createMessage(message) {
  return message;
}

/**
 *
 * @returns {string}
 * @description функция для выполнения тестового задания. Создаёт текст комментария — message — из одного или двух представленных предложений.
 */
function createMessages() {
  let count = getRandomInteger(1, 2);
  let message = '';
  for (let i = 0; i < count; i++) {
    const randomMessage = getRandomArrayElement(messages);
    if (!message.includes(randomMessage)) {
      message += `${randomMessage}`;
      count--;
    }
  }
  return message;
}

function createComment(id) {
  return {
    id: id,
    avatar: createAvatar(),
    message: createMessage(createMessages()),
    name: getRandomArrayElement(NAMES)
  };
}

/**
 *
 * @returns {comments[]}
 * @description функция для выполнения тестового задания. Создаёт случайное количество комментариев.
 */
function createComments(commentId) {
  const comments = [];
  const count = getRandomInteger(0, 30);
  for (let i = 1; i <= count; i++) {
    commentId += 1;
    comments.push(createComment(commentId));
  }
  return comments;
}

function createDescription() {
  return getRandomArrayElement(photoDescriptions);
}

function createUrl(id) {
  return `photos/${id}.jpg`;
}

function createPhotoInfo(id) {
  return {
    id: id,
    url: createUrl(id),
    description: createDescription(),
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
}

/**
 *
 * @param amount
 * @returns {*[]}
 * @description функция для выполнения тестового задания. Создаёт n-количество постов.
 */
function createPhotos(amount) {
  const array = [];
  let commentId = 1;
  for (let i = 1; i <= amount; i++) {
    const comments = createComments(commentId);
    const photos = createPhotoInfo(i);
    photos.comments = comments;
    commentId += comments.length;
    array.push(photos);
  }
  return array;
}

console.table(createPhotos(25));


