import React, { useEffect, useState } from "react";
import "./LeftSideBar.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import {
  twitter,
  home,
  explore,
  messages,
  profile,
  bookmarks,
  more,
  notification,
  boldHome,
  boldExplore,
  boldNotifications,
  boldMessages,
  boldBookmarks,
  boldProfile,
  boldMore,
} from "./icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { loadTheNotifications } from "../../store/notifications";

export default function LeftSideBar({ user }) {
  const dispatch = useDispatch();
  const currentURL = useLocation();
  const [num, setNum] = useState(0);

  useEffect(() => {
    const data = {
      user_id: user.id,
    };
    dispatch(loadTheNotifications(data));
    if (currentURL.pathname === "/") {
      setNum(1);
    } else if (currentURL.pathname.includes("explore")) {
      setNum(2);
    } else if (currentURL.pathname.includes("notifications")) {
      setNum(3);
    } else if (currentURL.pathname.includes("messages")) {
      setNum(4);
    } else if (currentURL.pathname.includes("bookmarks")) {
      setNum(5);
    } else if (currentURL.pathname.includes("profile")) {
      setNum(6);
    } else if (currentURL.pathname.includes("account")) {
      setNum(7);
    }
  }, [dispatch]);

  async function logOutUser() {
    await dispatch(logout());
  }

  return (
    <div className="left_side_bar-container">
      <div>{twitter}</div>
      <nav className="left-side-bar--nav">
        <NavLink to="/" exact activeClassName="active--link">
          <span>{num === 1 ? boldHome : home} Home</span>
        </NavLink>
        <NavLink to="/explore" activeClassName="active--link">
          <span>{num === 2 ? boldExplore : explore} Explore</span>
        </NavLink>
        <NavLink to="/notifications" activeClassName="active--link">
          <span>
            {num === 3 ? boldNotifications : notification} Notifications
          </span>
        </NavLink>
        <NavLink to="/messages" activeClassName="active--link">
          <span>{num === 4 ? boldMessages : messages} Messages</span>
        </NavLink>
        <NavLink to="/bookmarks" activeClassName="active--link">
          <span>{num === 5 ? boldBookmarks : bookmarks} Bookmarks</span>
        </NavLink>
        <NavLink to={`/profile/${user.id}`} activeClassName="active--link">
          <span>{num === 6 ? boldProfile : profile} Profile</span>
        </NavLink>
        <NavLink to="/account" activeClassName="active--link">
          <span>{num === 7 ? boldMore : more} More</span>
        </NavLink>
      </nav>
      <button>Tweet</button>
      <footer className="leftside__footer">
        <img
          src={user.profile_pic}
          alt="profile-pic"
          className="footer__profile-pic"
        />
        <p className="leftside__footer_flex">
          <span className="footer__right-side">{`${user.name}`}</span>
          <span className="footer__right-side-user">{`@${user.username}`}</span>
        </p>
        <svg
          onClick={logOutUser}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="22px"
          height="22px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </footer>
    </div>
  );
}
