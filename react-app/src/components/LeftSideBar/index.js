import React, { useEffect } from "react";
import "./LeftSideBar.css";
import { NavLink } from "react-router-dom";
import {
  twitter,
  home,
  explore,
  messages,
  profile,
  bookmarks,
  more,
} from "./icons";

export default function LeftSideBar({ user }) {
  return (
    <div className="left_side_bar-container">
      <div>{twitter}</div>
      <nav className="left-side-bar--nav">
        <NavLink to="/" activeClassName="active--link">
          <span>{home} Home</span>
        </NavLink>
        <NavLink to="/explore" activeClassName="active--link">
          <span>{explore} Explore</span>
        </NavLink>
        <NavLink to="/messages" activeClassName="active--link">
          <span>{messages} Messages</span>
        </NavLink>
        <NavLink to="/bookmarks" activeClassName="active--link">
          <span>{bookmarks} Bookmarks</span>
        </NavLink>
        <NavLink to="/profile" activeClassName="active--link">
          <span>{profile} Profile</span>
        </NavLink>
        <NavLink to="/more" activeClassName="active--link">
          <span>{more} More</span>
        </NavLink>
      </nav>
      <button>Tweet</button>
      <footer className="leftside__footer">
        <img
          src={user.profile_pic}
          alt="profile-pic"
          className="footer__profile-pic"
        />
        <span className="footer__right-side">{`@${user.username}`}</span>
      </footer>
    </div>
  );
}
