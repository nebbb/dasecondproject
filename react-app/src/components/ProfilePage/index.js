import React, { useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "../ProfileSection";
import { loadHomeUsers } from "../../store/users";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import { useParams } from "react-router";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    dispatch(loadHomeUsers());
  }, []);
  return (
    <div className="profile__page--container">
      <LeftSideBar user={user} />
      <ProfileSection />
      <RightSideBar users={users} />
    </div>
  );
}
