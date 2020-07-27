function adminController() {
  const get = (req, res) => {
    res.send("Welcome to my admin api");
  };

  return { get };
}

module.exports = adminController;
