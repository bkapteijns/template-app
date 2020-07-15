class publicController {
  constructor(user) {
    this.user = user;
  }

  get = (req, res) => {
    res.send("Welcome to my public api");
  };
}

module.exports = publicController;
