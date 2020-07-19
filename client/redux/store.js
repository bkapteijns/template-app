import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import initialState from "./initialState";
import reducer from "./reducers";

// Add support for Redux dev tools
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
