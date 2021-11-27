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
import SettingPage from "./components/SettingPage";
import NotificationPage from "./components/NotificationPage";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
  };

  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/logintest" exact={true}>
            <LoginPage />
          </Route>
          <ProtectedRoute path="/" exact={true}>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path="/explore" exact={true}>
            <ExplorePage />
          </ProtectedRoute>
          <ProtectedRoute path="/notifications" exact={true}>
            <NotificationPage />
          </ProtectedRoute>
          <ProtectedRoute path="/bookmarks" exact={true}>
            <BookmarkPage />
          </ProtectedRoute>
          <ProtectedRoute path="/messages" exact={true}>
            <MessagePage />
          </ProtectedRoute>
          <ProtectedRoute path="/account" exact={true}>
            <SettingPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/:profileId" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/status/:tweetId" exact={true}>
            <TweetPage />
          </ProtectedRoute>
        </Switch>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
