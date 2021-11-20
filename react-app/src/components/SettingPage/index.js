import React from "react";
import LeftSideBar from "../LeftSideBar";
import SettingSection from "../SettingSection";
import "./SettingPage.css";
import { useDispatch, useSelector } from "react-redux";

export default function SettingPage() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="setting__page--container">
      <LeftSideBar user={user} />
      <SettingSection />
    </div>
  );
}
