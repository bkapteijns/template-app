const { ObjectId } = require("mongodb");

function adminController(Article) {
  const get = (req, res) => {
    res.status(200).send("Welcome to my admin api");
  };

  const postElement = (req, res) => {
    res.status(201).send(req.file._id);
  };

  const postArticle = (req, res) => {
    const article = new Article({
      ...req.body,
      authorId: "0"
    });
    article.save();
    res.status(201).json(article);
  };

  const getArticles = (req, res) => {
    Article.find((err, articles) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(articles);
    });
  };

  const getArticleById = (req, res) => {
    const articleId = ObjectId(req.params.id);
    Article.findById(articleId, (err, article) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(article);
    });
  };

  return {
    get,
    postElement,
    postArticle,
    getArticles,
    getArticleById
  };
}

module.exports = adminController;
