const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({}).select('+owner')
    .then((articles) => {
      const userArticles = articles.filter((item) => item.owner.equals(req.user._id));
      res.send({ data: userArticles });
    })
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
    .orFail(() => new NotFoundError({ message: 'Нет статьи с таким id' }))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new Forbidden({ message: 'Нет прав на удаление статьи' });
      }

      Article.deleteOne(article)
        .then((deleteArticle) => {
          if (!deleteArticle) {
            throw new NotFoundError({ message: 'Не удалось удалить статью' });
          }
          res.send({ data: article });
        });
    })
    .catch(next);
};
