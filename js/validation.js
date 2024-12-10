const MIN_COMMENT_LENGTH = 0;
const MAX_COMMENT_LENGTH = 140;
const MAX_AMOUNT_HASHTAGS = 5;

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
    'Превышено количество хэштегов'
  );

  pristine.addValidator(
    textHashtags, (value) => {
      const hashtags = transformHashtags(value);
      const uniqueHashtags = new Set(hashtags);
      return uniqueHashtags.size === hashtags.length;
    },
    'Хэштеги повторяются'
  );

  pristine.addValidator(textDescription, (value) => {
    if (value.length > MAX_COMMENT_LENGTH) {
      textDescription.value = value.toString().substring(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH);
    }
    return textDescription.value.length < MAX_COMMENT_LENGTH;
  }, `Достигнуто максимальное количество символов (${MAX_COMMENT_LENGTH})`);
  return pristine;
}

function transformHashtags(value) {
  return value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
}

export {setupUploadFormValidation};
