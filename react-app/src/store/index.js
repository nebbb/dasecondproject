import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import tweets from "./tweets";
import users from "./users";
import bookmarks from "./bookmarks";
import user from "./user";
import search from "./search";
import channels from "./channels";
import messages from "./messages";

const rootReducer = combineReducers({
  session,
  tweets,
  users,
  bookmarks,
  user,
  search,
  channels,
  messages,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
