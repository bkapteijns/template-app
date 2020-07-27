function privateController() {
  const get = (req, res) => {
    res.send("Welcome to my private api!");
  };

  return { get };
}

module.exports = privateController;
