export default class adminController {
  constructor(user) {
    this.user = user;
  }

  get = (req, res) => {
    res.send("Welcome to my admin api");
  };
}

module.exports = adminController;
