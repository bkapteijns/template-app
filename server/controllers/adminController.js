function adminController() {
  const get = (req, res) => {
    res.send("Welcome to my admin api");
  };

  const postArticle = (req, res) => {
    console.log(req.body);
    res.send(req.body);
  };

  return { get, postArticle };
}

module.exports = adminController;
