class privateController {
  constructor(user) {
    this.user = user;
  }

  get = (req, res) => {
    res.send("Welcome to my private api");
  };
}

module.exports = privateController;
