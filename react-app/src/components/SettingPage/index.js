import React, { useEffect } from "react";
import LeftSideBar from "../LeftSideBar";
import SettingSection from "../SettingSection";
import "./SettingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleUser } from "../../store/user";
import ProfilePictureEditSection from "../ProfilePictureEditSection";

export default function SettingPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentUserData = useSelector((state) => state.user);
  const { name, description, profile_pic, banner_pic } = user;

  useEffect(() => {
    const data = { user_id: user.id };
    dispatch(loadSingleUser(data));
  }, []);

  return (
    <div className="setting__page--container">
      <LeftSideBar user={user} />
      <SettingSection name={name} description={description} user={user} />
      <ProfilePictureEditSection
        user={user}
        profile_pic={profile_pic}
        banner_pic={banner_pic}
      />
    </div>
  );
}
