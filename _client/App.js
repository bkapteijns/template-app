import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/about" render={() => <About />} />
      <Route exact path="/profile" render={() => <Profile />} />
    </BrowserRouter>
  );
}

export default App;
