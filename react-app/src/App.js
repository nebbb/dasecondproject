import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import TweetPage from "./components/TweetPage";
import ExplorePage from "./components/ExplorePage";
import BookmarkPage from "./components/BookmarkPage";
import MessagePage from "./components/MessagePage";
import ProfilePage from "./components/ProfilePage";

import { authenticate } from "./store/session";

import "./reset.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/explore" exact={true}>
          <ExplorePage />
        </ProtectedRoute>
        <ProtectedRoute path="/bookmarks" exact={true}>
          <BookmarkPage />
        </ProtectedRoute>
        <ProtectedRoute path="/messages" exact={true}>
          <MessagePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:profileId" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/status/:tweetId" exact={true}>
          <TweetPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
