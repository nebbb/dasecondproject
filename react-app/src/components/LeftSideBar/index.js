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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { loadTheNotifications } from "../../store/notifications";

export default function LeftSideBar({ user }) {
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );
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
        {/* <NavLink to="/explore" activeClassName="active--link">
          <span>{num === 2 ? boldExplore : explore} Explore</span>
        </NavLink> */}
        <NavLink
          to="/notifications"
          activeClassName="active--link"
          className="notification__menu"
        >
          <span>
            {num === 3 ? boldNotifications : notification} Notifications
          </span>
          {notifications && (
            <div className="notification__count">
              {
                notifications?.filter(
                  (notification) =>
                    notification.sender !== notification.reciever
                )?.length
              }
            </div>
          )}
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
        <a href="https://github.com/nebbb" target="_blank">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            Github
          </span>
        </a>
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
