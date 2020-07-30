function adminController(Article, Image, Paragraph) {
  const get = (req, res) => {
    res.send("Welcome to my admin api");
  };

  const postImage = (req, res) => {
    const image = new Image({
      ...req.body,
      filesId: req.file.id
    });
    image.save();

    res.status(201).send(image.filesId);
  };

  const postParagraph = (req, res) => {
    const paragraph = new Paragraph({ ...req.body });
    paragraph.save();

    res.status(201).send(paragraph._id);
  };

  const postArticle = (req, res) => {
    const article = new Article({ ...req.body });
    article.save();

    res.json(article);
  };

  // eslint-disable-next-line
  return { get, postImage, postParagraph, postArticle };
}

module.exports = adminController;
