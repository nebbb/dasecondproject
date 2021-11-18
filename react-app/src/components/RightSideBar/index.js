import React from "react";
import SearchBar from "../SearchBar";
import WhatsHappening from "../WhatsHappening";
import WhoToFollow from "../WhoToFollow";
import "./RightSideBar.css";

export default function RightSideBar({ users }) {
  return (
    <div className="right-side-bar-container">
      <SearchBar />
      <WhatsHappening />
      <WhoToFollow users={users} />
      <span>2021 Twitta, inc</span>
    </div>
  );
}
