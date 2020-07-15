import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/profile" render={() => <Profile />} />
      </BrowserRouter>
    </>
  );
}

export default App;
