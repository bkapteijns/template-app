class scopedController {
  constructor(user) {
    this.user = user;
  }

  get = (req, res) => {
    res.send("Welcome to my scoped api");
  };
}

module.exports = scopedController;
