const { celebrate, Joi } = require('celebrate');
const { joiUrlValidation } = require('../utils/utils');

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'Поле "keyword" не может быть пустым',
        'any.required': 'Поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'Поле "title" не может быть пустым',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'Поле "text" не может быть пустым',
        'any.required': 'Поле "text" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'Поле "source" не может быть пустым',
        'any.required': 'Поле "source" должно быть заполнено',
      }),
    link: Joi.string().required().custom(joiUrlValidation, 'custom validation')
      .messages({
        'string.empty': 'Поле "link" не может быть пустым',
        'any.required': 'Поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom(joiUrlValidation, 'custom validation')
      .messages({
        'string.empty': 'Поле "image" не может быть пустым',
        'any.required': 'Поле "image" должно быть заполнено',
      }),
  }).unknown(true),
});

const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Поле "email" должно быть валидным email-адресом',
      )
      .messages({
        'string.empty': 'Поле "email" не может быть пустым',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" не может быть пустым',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required()
      .messages({
        'string.empty': 'Поле "name" не может быть пустым',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }).unknown(true),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Поле "email" должно быть валидным email-адресом',
      )
      .messages({
        'string.empty': 'Поле "email" не может быть пустым',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" не может быть пустым',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  // validateObjectId,
  validateArticle,
  validateDeleteArticle,
  validateSignup,
  validateSignin,
};
