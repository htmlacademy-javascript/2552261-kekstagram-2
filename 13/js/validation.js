const MAX_COMMENT_LENGTH = 140;
const MAX_AMOUNT_HASHTAGS = 5;
const MIN_HASHTAG_LENGTH = 2;

function setupUploadFormValidation(form, textHashtags, textDescription) {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorClass: '--error',
    errorTextClass: 'img-upload__field-wrapper'
  });

  pristine.addValidator(
    textHashtags, (value) => {
      const hashtags = transformHashtags(value);
      return hashtags.length <= MAX_AMOUNT_HASHTAGS;
    },
    'Превышено количество хэштегов', 4, true
  );

  pristine.addValidator(
    textHashtags, (value) => {
      if (value.trim() === '') {
        return true;
      }
      const pattern = /^(#([A-Za-zА-яа-я0-9]{1,19})(\s|$)){1,5}$/i;
      return pattern.test(value);
    },
    'Введён невалидный хэштег', 1, true
  );

  pristine.addValidator(
    textHashtags, (value) => {
      if (value.length !== 0) {
        const hashtags = transformHashtags(value);
        return hashtags.every((hashtag) => hashtag.length >= MIN_HASHTAG_LENGTH);
      }
      return value.length === 0;
    },
    'Минимальная длинна хэштега 2 символа', 2, true
  );

  pristine.addValidator(
    textHashtags, (value) => {
      const hashtags = transformHashtags(value);
      const uniqueHashtags = new Set(hashtags);
      return uniqueHashtags.size === hashtags.length;
    },
    'Хэштеги повторяются', 3, true
  );

  pristine.addValidator(textDescription, (value) => value.length < MAX_COMMENT_LENGTH
    , `Достигнуто максимальное количество символов (${MAX_COMMENT_LENGTH})`);
  return pristine;
}

function transformHashtags(value) {
  return value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
}

export {setupUploadFormValidation};
