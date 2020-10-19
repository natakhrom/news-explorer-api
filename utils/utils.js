module.exports.urlValidation = (value) => /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z]{2,})(\/([-.=/?%#\d/a-z]))*/gi.test(value);

module.exports.joiUrlValidation = (value, helpers) => {
  if (module.exports.urlValidation(value)) {
    return value;
  }

  return helpers.error(`В поле невалидный url-адрес ${value}`);
};
