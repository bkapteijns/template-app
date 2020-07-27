function publicController() {
  const get = (req, res) => {
    res.send("Welcome to my public api!");
  };

  return { get };
}

module.exports = publicController;
