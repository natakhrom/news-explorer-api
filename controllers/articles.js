const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  /** получим из объекта запроса данные статьи */
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  /** создадим статью на основе пришедших данных */
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Нет статьи с таким id'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new Forbidden('Нет прав на удаление статьи');
      }

      Article.findByIdAndRemove(req.params.articleId)
        .then((deleteArticle) => {
          if (!deleteArticle) {
            throw new NotFoundError('Не удалось удалить карточку');
          }
          res.send({ data: deleteArticle });
        });
    })
    .catch(next);
};
