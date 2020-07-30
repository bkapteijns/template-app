import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

import Nav from "./Nav";
import Home from "./Home";
import Public from "./Public";
import Private from "./Private";
import Profile from "./Profile";
import Settings from "./Settings";
import Images from "./Images";
import Admin from "./Admin";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/public" render={() => <Public />} />
        <Route exact path="/private" render={() => <Private />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/images" render={() => <Images />} />
        <Route exact path="/admin" render={() => <Admin />} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
