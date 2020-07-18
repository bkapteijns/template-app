import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Public from "./Public";
import Private from "./Private";
import Profile from "./Profile";
import Settings from "./Settings";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/public" render={() => <Public />} />
      <Route exact path="/private" render={() => <Private />} />
      <Route exact path="/profile" render={() => <Profile />} />
      <Route exact path="/settings" render={() => <Settings />} />
    </BrowserRouter>
  );
}

export default App;
